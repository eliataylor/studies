/**
 * KnapsackPacking.ts - Implementation of knapsack algorithms
 *
 * This file provides different knapsack algorithms:
 * - 0/1 Knapsack: Classic dynamic programming approach for indivisible items
 * - Fractional Knapsack: Greedy approach for divisible items
 * - Greedy Knapsack: Approximate solution using value/weight ratio
 */

import { Item, Container, PackingResult } from '../utils';

/**
 * 0/1 Knapsack algorithm using dynamic programming
 * Provides optimal solution when items cannot be divided
 *
 * @param items Items to pack, must have value and weight properties
 * @param containerSpec Container specification, must have capacity property
 * @returns Packing result
 */
export function zeroOneKnapsack(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Ensure container has capacity defined
  if (containerSpec.capacity === undefined) {
    throw new Error('Container must have capacity property for knapsack problems');
  }

  // Ensure all items have value and weight properties
  const validItems = items.filter(item =>
    item.value !== undefined && item.weight !== undefined
  );

  if (validItems.length < items.length) {
    console.warn('Some items missing value or weight properties, they will be excluded');
  }

  const capacity = containerSpec.capacity;
  const n = validItems.length;

  // Create dynamic programming table
  const dp: number[][] = Array(n + 1)
    .fill(0)
    .map(() => Array(capacity + 1).fill(0));

  // Fill the dynamic programming table
  for (let i = 1; i <= n; i++) {
    const item = validItems[i - 1];
    const itemWeight = item.weight!;
    const itemValue = item.value!;

    for (let w = 0; w <= capacity; w++) {
      if (itemWeight <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - itemWeight] + itemValue
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Trace back to find which items were included
  const includedItems: Item[] = [];
  let remainingCapacity = capacity;

  for (let i = n; i > 0; i--) {
    // If including this item gives better value
    if (dp[i][remainingCapacity] !== dp[i - 1][remainingCapacity]) {
      const item = validItems[i - 1];
      includedItems.push(item);
      remainingCapacity -= item.weight!;
    }
  }

  // Create the container with the included items
  const container: Container = {
    id: 0,
    width: containerSpec.width,
    height: containerSpec.height,
    capacity: containerSpec.capacity,
    items: includedItems
  };

  // Create the result
  const unpackedItems = items.filter(item => !includedItems.includes(item));
  const totalValue = includedItems.reduce((sum, item) => sum + (item.value || 0), 0);

  // Calculate space utilization (based on weight for knapsack)
  const totalWeight = includedItems.reduce((sum, item) => sum + (item.weight || 0), 0);
  const spaceUtilization = (totalWeight / capacity) * 100;

  return {
    containers: [container],
    unpackedItems,
    totalValue,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}

/**
 * Fractional Knapsack algorithm
 * Allows items to be divided for optimal value
 *
 * @param items Items to pack, must have value and weight properties
 * @param containerSpec Container specification, must have capacity property
 * @returns Packing result
 */
export function fractionalKnapsack(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Ensure container has capacity defined
  if (containerSpec.capacity === undefined) {
    throw new Error('Container must have capacity property for knapsack problems');
  }

  // Ensure all items have value and weight properties
  const validItems = items.filter(item =>
    item.value !== undefined && item.weight !== undefined && item.weight > 0
  );

  if (validItems.length < items.length) {
    console.warn('Some items missing value or weight properties, they will be excluded');
  }

  // Sort items by value/weight ratio in descending order
  const sortedItems = [...validItems].sort((a, b) =>
    (b.value! / b.weight!) - (a.value! / a.weight!)
  );

  const capacity = containerSpec.capacity;
  let remainingCapacity = capacity;
  let totalValue = 0;

  // Fully packed items
  const includedItems: Item[] = [];
  // Fractionally packed items (in a real implementation, would track fraction)
  const fractionalItems: Item[] = [];

  // Pack items
  for (const item of sortedItems) {
    if (remainingCapacity <= 0) break;

    if (item.weight! <= remainingCapacity) {
      // Include the whole item
      includedItems.push(item);
      totalValue += item.value!;
      remainingCapacity -= item.weight!;
    } else {
      // Include a fraction of the item
      const fraction = remainingCapacity / item.weight!;
      const fractionalValue = item.value! * fraction;

      // In a real implementation, we would create a new item with the fractional properties
      // For this example, we'll just add the original item to a separate list
      fractionalItems.push(item);
      totalValue += fractionalValue;
      remainingCapacity = 0;
    }
  }

  // Create the container with the included items
  const container: Container = {
    id: 0,
    width: containerSpec.width,
    height: containerSpec.height,
    capacity: containerSpec.capacity,
    // In a real implementation, we would modify the fractional item's properties
    // For this example, we'll just include all items
    items: [...includedItems, ...fractionalItems]
  };

  // Create the result
  const allPackedItems = new Set([...includedItems, ...fractionalItems]);
  const unpackedItems = items.filter(item => !allPackedItems.has(item));

  // Calculate space utilization
  const totalWeight = includedItems.reduce((sum, item) => sum + item.weight!, 0) +
    (fractionalItems.length > 0 ? remainingCapacity : 0);
  const spaceUtilization = (totalWeight / capacity) * 100;

  return {
    containers: [container],
    unpackedItems,
    totalValue,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}

/**
 * Greedy Knapsack algorithm
 * Approximate solution using value/weight ratio
 *
 * @param items Items to pack, must have value and weight properties
 * @param containerSpec Container specification, must have capacity property
 * @returns Packing result
 */
export function greedyKnapsack(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Ensure container has capacity defined
  if (containerSpec.capacity === undefined) {
    throw new Error('Container must have capacity property for knapsack problems');
  }

  // Ensure all items have value and weight properties
  const validItems = items.filter(item =>
    item.value !== undefined && item.weight !== undefined && item.weight > 0
  );

  if (validItems.length < items.length) {
    console.warn('Some items missing value or weight properties, they will be excluded');
  }

  // Sort items by value/weight ratio in descending order
  const sortedItems = [...validItems].sort((a, b) =>
    (b.value! / b.weight!) - (a.value! / a.weight!)
  );

  const capacity = containerSpec.capacity;
  let remainingCapacity = capacity;
  let totalValue = 0;

  // Pack items
  const includedItems: Item[] = [];

  for (const item of sortedItems) {
    if (remainingCapacity <= 0) break;

    if (item.weight! <= remainingCapacity) {
      // Include the whole item
      includedItems.push(item);
      totalValue += item.value!;
      remainingCapacity -= item.weight!;
    }
    // In greedy approach, we don't include fractions
  }

  // Create the container with the included items
  const container: Container = {
    id: 0,
    width: containerSpec.width,
    height: containerSpec.height,
    capacity: containerSpec.capacity,
    items: includedItems
  };

  // Create the result
  const unpackedItems = items.filter(item => !includedItems.includes(item));

  // Calculate space utilization
  const totalWeight = includedItems.reduce((sum, item) => sum + item.weight!, 0);
  const spaceUtilization = (totalWeight / capacity) * 100;

  return {
    containers: [container],
    unpackedItems,
    totalValue,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}
