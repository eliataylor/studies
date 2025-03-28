/**
 * StripPacking.ts - Implementation of strip packing algorithms
 *
 * This file provides different strip packing algorithms:
 * - Next Fit Strip Packing: Places items in the current level or creates a new one
 * - First Fit Strip Packing: Places items in the first level that fits
 * - Best Fit Strip Packing: Places items to minimize wasted horizontal space
 */

import { Item, Container, PackingResult } from '../utils';

/**
 * Represents a level in strip packing
 */
interface Level {
  y: number;
  height: number;
  remainingWidth: number;
}

/**
 * Represents a packed item with position information
 */
interface PositionedItem extends Item {
  x: number;
  y: number;
}

/**
 * Next Fit Strip Packing algorithm
 * Only considers the most recently created level for placing items
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function nextFitStripPacking(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Sort items by width (can improve packing quality)
  const sortedItems = [...items].sort((a, b) => b.width - a.width);

  // Container width
  const containerWidth = containerSpec.width;

  // Initialize the first level
  const levels: Level[] = [];
  let currentLevel: Level | null = null;

  const positionedItems: PositionedItem[] = [];
  const unpackedItems: Item[] = [];

  // Process each item
  for (const item of sortedItems) {
    // Skip items wider than the container
    if (item.width > containerWidth) {
      unpackedItems.push(item);
      continue;
    }

    // Check if we can place the item in the current level
    if (currentLevel && item.width <= currentLevel.remainingWidth) {
      // Place the item in the current level
      const positionedItem: PositionedItem = {
        ...item,
        x: containerWidth - currentLevel.remainingWidth,
        y: currentLevel.y
      };

      positionedItems.push(positionedItem);
      currentLevel.remainingWidth -= item.width;
    } else {
      // Create a new level
      const y:number = currentLevel ? currentLevel.y + currentLevel.height : 0;
      currentLevel = {
        y,
        height: item.height,
        remainingWidth: containerWidth - item.width
      };

      levels.push(currentLevel);

      // Place the item in the new level
      const positionedItem: PositionedItem = {
        ...item,
        x: 0,
        y
      };

      positionedItems.push(positionedItem);
    }
  }

  // Calculate the strip height
  const stripHeight = levels.length > 0
    ? levels[levels.length - 1].y + levels[levels.length - 1].height
    : 0;

  // Create the container with the positioned items
  const container: Container = {
    id: 0,
    width: containerWidth,
    height: stripHeight, // Strip height is determined by the algorithm
    items: positionedItems
  };

  // Calculate space utilization
  const totalItemArea = positionedItems.reduce((sum, item) => sum + item.width * item.height, 0);
  const containerArea = containerWidth * stripHeight;
  const spaceUtilization = containerArea > 0
    ? (totalItemArea / containerArea) * 100
    : 0;

  return {
    containers: [container],
    unpackedItems,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}

/**
 * First Fit Strip Packing algorithm
 * Places items in the first level that fits
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function firstFitStripPacking(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Sort items by height (typically improves strip packing quality)
  const sortedItems = [...items].sort((a, b) => b.height - a.height);

  // Container width
  const containerWidth = containerSpec.width;

  // Initialize levels
  const levels: Level[] = [];

  const positionedItems: PositionedItem[] = [];
  const unpackedItems: Item[] = [];

  // Process each item
  for (const item of sortedItems) {
    // Skip items wider than the container
    if (item.width > containerWidth) {
      unpackedItems.push(item);
      continue;
    }

    // Try to place the item in an existing level
    let placed = false;

    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];

      if (item.width <= level.remainingWidth) {
        // Place the item in this level
        const positionedItem: PositionedItem = {
          ...item,
          x: containerWidth - level.remainingWidth,
          y: level.y
        };

        positionedItems.push(positionedItem);
        level.remainingWidth -= item.width;
        placed = true;
        break;
      }
    }

    // If the item wasn't placed, create a new level
    if (!placed) {
      const y = levels.length > 0
        ? levels[levels.length - 1].y + levels[levels.length - 1].height
        : 0;

      const newLevel: Level = {
        y,
        height: item.height,
        remainingWidth: containerWidth - item.width
      };

      levels.push(newLevel);

      // Place the item in the new level
      const positionedItem: PositionedItem = {
        ...item,
        x: 0,
        y
      };

      positionedItems.push(positionedItem);
    }
  }

  // Calculate the strip height
  const stripHeight = levels.length > 0
    ? levels[levels.length - 1].y + levels[levels.length - 1].height
    : 0;

  // Create the container with the positioned items
  const container: Container = {
    id: 0,
    width: containerWidth,
    height: stripHeight, // Strip height is determined by the algorithm
    items: positionedItems
  };

  // Calculate space utilization
  const totalItemArea = positionedItems.reduce((sum, item) => sum + item.width * item.height, 0);
  const containerArea = containerWidth * stripHeight;
  const spaceUtilization = containerArea > 0
    ? (totalItemArea / containerArea) * 100
    : 0;

  return {
    containers: [container],
    unpackedItems,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}

/**
 * Best Fit Strip Packing algorithm
 * Places items to minimize wasted horizontal space
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function bestFitStripPacking(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Sort items by height (typically improves strip packing quality)
  const sortedItems = [...items].sort((a, b) => b.height - a.height);

  // Container width
  const containerWidth = containerSpec.width;

  // Initialize levels
  const levels: Level[] = [];

  const positionedItems: PositionedItem[] = [];
  const unpackedItems: Item[] = [];

  // Process each item
  for (const item of sortedItems) {
    // Skip items wider than the container
    if (item.width > containerWidth) {
      unpackedItems.push(item);
      continue;
    }

    // Find the best level to place the item
    let bestLevelIndex = -1;
    let bestRemainingWidth = Number.MAX_VALUE;

    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];

      // Check if the item fits in this level
      if (item.width <= level.remainingWidth) {
        // Calculate remaining width after placing the item
        const remainingWidth = level.remainingWidth - item.width;

        // Update best level if this one has less remaining width
        if (remainingWidth < bestRemainingWidth) {
          bestRemainingWidth = remainingWidth;
          bestLevelIndex = i;
        }
      }
    }

    // Place the item in the best level or create a new one
    if (bestLevelIndex !== -1) {
      const bestLevel = levels[bestLevelIndex];

      // Place the item in this level
      const positionedItem: PositionedItem = {
        ...item,
        x: containerWidth - bestLevel.remainingWidth,
        y: bestLevel.y
      };

      positionedItems.push(positionedItem);
      bestLevel.remainingWidth -= item.width;
    } else {
      // Create a new level
      const y = levels.length > 0
        ? levels[levels.length - 1].y + levels[levels.length - 1].height
        : 0;

      const newLevel: Level = {
        y,
        height: item.height,
        remainingWidth: containerWidth - item.width
      };

      levels.push(newLevel);

      // Place the item in the new level
      const positionedItem: PositionedItem = {
        ...item,
        x: 0,
        y
      };

      positionedItems.push(positionedItem);
    }
  }

  // Calculate the strip height
  const stripHeight = levels.length > 0
    ? levels[levels.length - 1].y + levels[levels.length - 1].height
    : 0;

  // Create the container with the positioned items
  const container: Container = {
    id: 0,
    width: containerWidth,
    height: stripHeight, // Strip height is determined by the algorithm
    items: positionedItems
  };

  // Calculate space utilization
  const totalItemArea = positionedItems.reduce((sum, item) => sum + item.width * item.height, 0);
  const containerArea = containerWidth * stripHeight;
  const spaceUtilization = containerArea > 0
    ? (totalItemArea / containerArea) * 100
    : 0;

  return {
    containers: [container],
    unpackedItems,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}
