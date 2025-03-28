/**
 * utils.ts - Utility functions for testing packing algorithms
 *
 * This file provides:
 * 1. Types and interfaces for packing algorithms
 * 2. Functions to generate test data sets
 * 3. Utility functions to run packing algorithms and measure performance
 * 4. Framework for algorithm comparisons
 */

import chalk from 'chalk';
import { table, getBorderCharacters } from 'table';
import { Logger } from '../logger';

// ========== Type Definitions ==========

/**
 * Represents an item to be packed
 */
export interface Item {
  id: number;
  width: number;
  height: number;
  value?: number; // For knapsack problems
  weight?: number; // For weighted bin packing
}

/**
 * Represents a bin, container, or knapsack
 */
export interface Container {
  id: number;
  width: number;
  height: number;
  capacity?: number; // For knapsack and bin packing
  items: Item[];
}

/**
 * Result of a packing operation
 */
export interface PackingResult {
  containers: Container[];
  unpackedItems: Item[];
  totalValue?: number; // For knapsack problems
  spaceUtilization: number; // Percentage of space used (0-100)
  executionTime: number; // In milliseconds
}

/**
 * Type definition for packing functions
 */
export type PackingFunction = (items: Item[], containerSpecs: Omit<Container, 'id' | 'items'>) => PackingResult;

/**
 * Predefined item set types
 */
export enum ItemSetType {
  UNIFORM = 'uniform',         // Items of similar size
  VARIED = 'varied',           // Items with varying sizes
  WEIGHTED = 'weighted',       // Items with weights and values
  CORRELATED = 'correlated',   // Items where size correlates with value
  ANTICORRELATED = 'anticorrelated', // Items where size inversely correlates with value
}

// ========== Data Generation Functions ==========

/**
 * Generates a set of items based on the specified type
 * @param count Number of items to generate
 * @param maxWidth Maximum item width
 * @param maxHeight Maximum item height
 * @param type Type of item set to generate
 * @returns Array of items
 */
export function generateItems(
  count: number,
  maxWidth: number = 100,
  maxHeight: number = 100,
  type: ItemSetType = ItemSetType.VARIED
): Item[] {
  const items: Item[] = [];

  for (let i = 0; i < count; i++) {
    let width: number;
    let height: number;
    let value: number | undefined;
    let weight: number | undefined;

    switch (type) {
      case ItemSetType.UNIFORM:
        // Uniform items with small variations
        width = Math.max(1, Math.floor(maxWidth * 0.8 + Math.random() * maxWidth * 0.2));
        height = Math.max(1, Math.floor(maxHeight * 0.8 + Math.random() * maxHeight * 0.2));
        break;

      case ItemSetType.VARIED:
        // Items with wide variation in size
        width = Math.max(1, Math.floor(Math.random() * maxWidth));
        height = Math.max(1, Math.floor(Math.random() * maxHeight));
        break;

      case ItemSetType.WEIGHTED:
        // Items with random weights and values
        width = Math.max(1, Math.floor(Math.random() * maxWidth));
        height = Math.max(1, Math.floor(Math.random() * maxHeight));
        weight = Math.max(1, Math.floor(Math.random() * 100));
        value = Math.max(1, Math.floor(Math.random() * 100));
        break;

      case ItemSetType.CORRELATED:
        // Items where size correlates with value
        width = Math.max(1, Math.floor(Math.random() * maxWidth));
        height = Math.max(1, Math.floor(Math.random() * maxHeight));
        // Value proportional to area
        const area = width * height;
        value = Math.max(1, Math.floor(area * (0.8 + Math.random() * 0.4)));
        weight = Math.max(1, Math.floor(area * (0.8 + Math.random() * 0.4)));
        break;

      case ItemSetType.ANTICORRELATED:
        // Items where size inversely correlates with value
        width = Math.max(1, Math.floor(Math.random() * maxWidth));
        height = Math.max(1, Math.floor(Math.random() * maxHeight));
        // Value inversely proportional to area
        const itemArea = width * height;
        const maxArea = maxWidth * maxHeight;
        value = Math.max(1, Math.floor((maxArea - itemArea) * (0.8 + Math.random() * 0.4)));
        weight = Math.max(1, Math.floor((maxArea - itemArea) * (0.8 + Math.random() * 0.4)));
        break;
    }

    items.push({
      id: i,
      width,
      height,
      value,
      weight
    });
  }

  return items;
}

/**
 * Creates a container specification
 * @param width Container width
 * @param height Container height
 * @param capacity Container capacity (for knapsack and bin packing)
 * @returns Container specification
 */
export function createContainerSpec(
  width: number = 1000,
  height: number = 1000,
  capacity?: number
): Omit<Container, 'id' | 'items'> {
  // If capacity is not provided, default it to the container area for knapsack problems
  const containerCapacity = capacity !== undefined ? capacity : width * height;

  return {
    width,
    height,
    capacity: containerCapacity
  };
}

// ========== Measurement and Testing Functions ==========

/**
 * Calculates the total area of items
 * @param items Array of items
 * @returns Total area
 */
export function calculateTotalItemArea(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.width * item.height, 0);
}

/**
 * Calculates the container's capacity (area)
 * @param container Container specification
 * @returns Container capacity
 */
export function calculateContainerCapacity(container: Omit<Container, 'id' | 'items'>): number {
  return container.width * container.height;
}

/**
 * Calculates space utilization percentage
 * @param items Packed items
 * @param container Container specification
 * @returns Space utilization percentage (0-100)
 */
export function calculateSpaceUtilization(
  items: Item[],
  container: Omit<Container, 'id' | 'items'>
): number {
  const totalItemArea = calculateTotalItemArea(items);
  const containerCapacity = calculateContainerCapacity(container);
  return (totalItemArea / containerCapacity) * 100;
}

/**
 * Verifies that a packing is valid (no overlaps, within container bounds)
 * @param result Packing result to verify
 * @returns Object with validity status and any error messages
 */
export function verifyPacking(result: PackingResult): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check each container
  result.containers.forEach(container => {
    // Check if items fit within container bounds
    container.items.forEach(item => {
      // Check bounds logic would go here
      // This is a simplified placeholder
    });

    // Check for overlaps between items
    // Overlap detection logic would go here
    // This is a simplified placeholder
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Runs a packing algorithm and measures performance
 * @param packingFunction The packing function to run
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result with performance metrics
 */
export function runPackingAlgorithm(
  packingFunction: PackingFunction,
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Start timer
  const startTime = performance.now();

  // Run the packing algorithm
  const result = packingFunction(items, containerSpec);

  // End timer
  const endTime = performance.now();

  // Calculate execution time
  const executionTime = endTime - startTime;

  // Ensure execution time is set
  result.executionTime = executionTime;

  return result;
}

/**
 * Compares multiple packing algorithms and displays the results
 * @param algorithms Object mapping algorithm names to packing functions
 * @param items Items to pack
 * @param containerSpec Container specification
 * @param verbose Whether to show detailed output
 */
export function comparePackingAlgorithms(
  algorithms: Record<string, PackingFunction>,
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>,
  verbose: boolean = false
): void {
  // Store results for each algorithm
  const results: {
    name: string;
    result: PackingResult;
    valid: boolean;
  }[] = [];

  // Test each algorithm
  for (const [name, func] of Object.entries(algorithms)) {
    Logger.info(`Testing ${chalk.magenta(name)}...`);
    const result = runPackingAlgorithm(func, items, containerSpec);
    const validation = verifyPacking(result);

    results.push({
      name,
      result,
      valid: validation.valid
    });
  }

  // Sort results by space utilization (most efficient first)
  results.sort((a, b) => b.result.spaceUtilization - a.result.spaceUtilization);

  // Display results
  Logger.section('Packing Results');

  // Create table data
  const tableData = [
    [
      chalk.bold.cyan('Algorithm'),
      chalk.bold.cyan('Space Utilization'),
      chalk.bold.cyan('Containers Used'),
      chalk.bold.cyan('Items Packed'),
      chalk.bold.cyan('Time (ms)'),
      chalk.bold.cyan('Valid')
    ]
  ];

  // Add data for each algorithm
  results.forEach((result, index) => {
    // Highlight the most efficient algorithm
    const algoName = index === 0
      ? chalk.green.bold(result.name)
      : chalk.magenta(result.name);

    tableData.push([
      algoName,
      `${result.result.spaceUtilization.toFixed(2)}%`,
      result.result.containers.length.toString(),
      (items.length - result.result.unpackedItems.length).toString(),
      result.result.executionTime.toFixed(4),
      result.valid ? chalk.green('✓') : chalk.red('✗')
    ]);
  });

  // Display the table
  console.log(table(tableData, {
    border: getBorderCharacters('norc'),
    columnDefault: {
      alignment: 'right'
    },
    columns: {
      0: { alignment: 'left' }
    }
  }));

  // Display relative performance if verbose
  if (verbose && results.length > 1) {
    Logger.subsection('Relative Performance');

    const bestUtilization = results[0].result.spaceUtilization;
    const relativeTableData = [
      [
        chalk.bold.cyan('Algorithm'),
        chalk.bold.cyan('Relative Efficiency'),
        chalk.bold.cyan('Compared to Best')
      ]
    ];

    results.forEach((result, index) => {
      const relativeEfficiency = result.result.spaceUtilization / bestUtilization;
      const relativeStr = index === 0
        ? chalk.green.bold('1.00x')
        : chalk.yellow(`${relativeEfficiency.toFixed(2)}x`);

      const comparisonStr = index === 0
        ? chalk.green.bold('BEST')
        : chalk.yellow(`${((1 - relativeEfficiency) * 100).toFixed(1)}% less efficient`);

      relativeTableData.push([
        index === 0 ? chalk.green.bold(result.name) : chalk.magenta(result.name),
        relativeStr,
        comparisonStr
      ]);
    });

    console.log(table(relativeTableData, {
      border: getBorderCharacters('norc'),
      columns: {
        0: { alignment: 'left' },
        1: { alignment: 'right' },
        2: { alignment: 'left' }
      }
    }));
  }
}

/**
 * Creates a consistent item set for comparing different algorithms
 * @param count Number of items
 * @param type Type of item set
 * @returns Array of items
 */
export const createComparisonItemSet = (
  count: number = 100,
  type: ItemSetType = ItemSetType.VARIED
): Item[] => {
  return generateItems(count, 100, 100, type);
};
