/**
 * Generate appropriate data structure based on type
 * @param type The data structure type ('array', 'matrix', 'tree')
 * @param size The size of the data structure
 * @returns The generated data structure
 */
export function generateDataStructure(type: string, size: number): any {
  switch (type) {
    case 'array':
      return generateSortedArray(size);
    case 'matrix':
      return generateSortedMatrix(size, size);
    case 'tree':
      return generateBinarySearchTree(size);
    default:
      throw new Error(`Unknown data structure type: ${type}`);
  }
}

/**
 * Get all searchable values from a data structure
 * @param type The data structure type
 * @param data The data structure
 * @returns Array of all values in the data structure
 */
export function getAllValues(type: string, data: any): number[] {
  switch (type) {
    case 'array':
      return [...data]; // Simple copy for arrays
    case 'matrix':
      return data.flat(); // Flatten the matrix
    case 'tree':
      // Collect all values from the tree
      const values: number[] = [];
      function collectValues(node: TreeNode | null): void {
        if (node) {
          collectValues(node.left);
          values.push(node.value);
          collectValues(node.right);
        }
      }
      collectValues(data);
      return values;
    default:
      throw new Error(`Unknown data structure type: ${type}`);
  }
}/**
 * utils.ts - Enhanced utility for testing search algorithms
 *
 * This file provides:
 * 1. Functions to generate test data structures (arrays, matrices, trees)
 * 2. Utility functions to run search algorithms and measure performance
 * 3. Types and interfaces for search functions
 * 4. Utility functions for algorithm grouping and categorization
 */

import chalk from 'chalk';
import { table, getBorderCharacters } from 'table';
import { Logger } from '../logger';

// ========== Type Definitions ==========

/**
 * Type definition for array search functions
 */
export type ArraySearchFunction = (arr: number[], target: number) => number;

/**
 * Type definition for matrix search functions
 */
export type MatrixSearchFunction = (matrix: number[][], target: number) => [number, number] | null;

/**
 * Interface for a basic tree node
 */
export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Type definition for tree search functions
 */
export type TreeSearchFunction = (root: TreeNode | null, target: number) => TreeNode | null;

/**
 * Union type for all search function types
 */
export type SearchFunction = ArraySearchFunction | MatrixSearchFunction | TreeSearchFunction;

/**
 * Search algorithm data structure type
 */
export interface AlgorithmInfo {
  type: 'array' | 'matrix' | 'tree';
  fn?: SearchFunction;
}

/**
 * Registry of algorithms with their types
 */
export const ALGORITHMS_REGISTRY: Record<string, AlgorithmInfo> = {
  // Array search algorithms
  'linear': { type: 'array' },
  'binary': { type: 'array' },
  'recursiveBinary': { type: 'array' },
  'jump': { type: 'array' },
  'interpolation': { type: 'array' },
  'exponential': { type: 'array' },
  'fibonacci': { type: 'array' },

  // Matrix search algorithms
  'rowColumn': { type: 'matrix' },
  'binaryMatrix': { type: 'matrix' },
  'staircase': { type: 'matrix' },
  'block': { type: 'matrix' },

  // Tree search algorithms
  'preorderDFS': { type: 'tree' },
  'inorderDFS': { type: 'tree' },
  'postorderDFS': { type: 'tree' },
  'bst': { type: 'tree' },
  'bfs': { type: 'tree' }
};

/**
 * Algorithm categories
 */
export const ALGORITHM_CATEGORIES = {
  'array': ['linear', 'binary', 'recursiveBinary', 'jump', 'interpolation', 'exponential', 'fibonacci'],
  'matrix': ['rowColumn', 'binaryMatrix', 'staircase', 'block'],
  'tree': ['preorderDFS', 'inorderDFS', 'postorderDFS', 'bst', 'bfs'],
  'all': Object.keys(ALGORITHMS_REGISTRY)
};

// ========== Data Generation Functions ==========

/**
 * Generates a sorted array of integers with specified size
 * @param size The number of elements in the array
 * @param uniqueValues Whether all values should be unique (default: true)
 * @returns A sorted array of integers
 */
export function generateSortedArray(size: number, uniqueValues: boolean = true): number[] {
  const array: number[] = [];
  let current = 0;

  for (let i = 0; i < size; i++) {
    // If unique values are required, increment by 1-3 each time
    if (uniqueValues) {
      current += Math.floor(Math.random() * 3) + 1;
    }
    // Otherwise, occasionally repeat values (20% chance)
    else {
      if (Math.random() > 0.2 || i === 0) {
        current += Math.floor(Math.random() * 3) + 1;
      }
    }
    array.push(current);
  }

  return array;
}

/**
 * Generates an unsorted array of random integers
 * @param size The number of elements in the array
 * @param min The minimum value (default: 0)
 * @param max The maximum value (default: 1000)
 * @returns An unsorted array of random integers
 */
export function generateRandomArray(size: number, min: number = 0, max: number = 1000): number[] {
  const array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return array;
}

/**
 * Generates a sorted 2D matrix with rows and columns in ascending order
 * @param rows Number of rows
 * @param cols Number of columns
 * @returns A sorted 2D matrix
 */
export function generateSortedMatrix(rows: number, cols: number): number[][] {
  const matrix: number[][] = [];
  let value = 0;

  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      value += Math.floor(Math.random() * 5) + 1;
      row.push(value);
    }
    matrix.push(row);
  }

  return matrix;
}

/**
 * Generates a random binary search tree with n nodes
 * @param size Number of nodes in the tree
 * @returns The root node of the generated BST
 */
export function generateBinarySearchTree(size: number): TreeNode | null {
  if (size <= 0) return null;

  // Generate sorted array of unique values
  const values = generateSortedArray(size);

  // Convert sorted array to balanced BST
  return sortedArrayToBST(values, 0, values.length - 1);
}

/**
 * Helper function to convert a sorted array to a balanced BST
 * @param arr Sorted array
 * @param start Start index
 * @param end End index
 * @returns Root node of the generated BST
 */
function sortedArrayToBST(arr: number[], start: number, end: number): TreeNode | null {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const node: TreeNode = {
    value: arr[mid],
    left: null,
    right: null
  };

  node.left = sortedArrayToBST(arr, start, mid - 1);
  node.right = sortedArrayToBST(arr, mid + 1, end);

  return node;
}

// ========== Utility Functions ==========

/**
 * Helper function to parse algorithm list
 * @param algorithmsStr String containing algorithm names, comma separated, or a category
 * @returns Array of valid algorithm names
 */
export function parseAlgorithms(algorithmsStr: string): string[] {
  // @ts-ignore
  if (ALGORITHM_CATEGORIES[algorithmsStr]) {
    // Return all algorithms in the specified category
    // @ts-ignore
    return [...ALGORITHM_CATEGORIES[algorithmsStr]];
  }

  // Parse comma-separated list
  const algorithmNames = algorithmsStr.split(',').map(name => name.trim());
  const validAlgorithms = algorithmNames.filter(name => {
    if (!ALGORITHMS_REGISTRY[name]) {
      console.log(chalk.yellow(`Warning: Unknown algorithm: ${name}`));
      return false;
    }
    return true;
  });

  return validAlgorithms;
}

/**
 * Helper function to parse sizes list
 * @param sizesStr Comma-separated list of sizes
 * @returns Array of numbers
 */
export function parseSizes(sizesStr: string): number[] {
  return sizesStr.split(',').map(size => parseInt(size.trim(), 10));
}

/**
 * Group algorithms by their data structure type
 * @param algorithms Array of algorithm names
 * @returns Object with algorithms grouped by type
 */
export function groupAlgorithmsByType(algorithms: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {
    'array': [],
    'matrix': [],
    'tree': []
  };

  algorithms.forEach(algo => {
    const type = ALGORITHMS_REGISTRY[algo]?.type;
    if (type) {
      grouped[type].push(algo);
    }
  });

  return grouped;
}

/**
 * Helper function to run a search algorithm with the appropriate test function
 * @param algorithm The algorithm function to run
 * @param type The data structure type ('array', 'matrix', 'tree')
 * @param data The data structure to search in
 * @param target The target value to search for
 * @param algorithmName The name of the algorithm
 * @returns The search result with timing information
 */
export function runSearchAlgorithm(
  algorithm: SearchFunction,
  type: string,
  data: any,
  target: number,
  algorithmName: string
): any {
  switch (type) {
    case 'array':
      return runArraySearch(algorithm as ArraySearchFunction, data, target, algorithmName);
    case 'matrix':
      return runMatrixSearch(algorithm as MatrixSearchFunction, data, target, algorithmName);
    case 'tree':
      return runTreeSearch(algorithm as TreeSearchFunction, data, target, algorithmName);
    default:
      throw new Error(`Unknown data structure type: ${type}`);
  }
}

// ========== Measurement and Testing Functions ==========

/**
 * Selects valid and invalid search targets from an array
 * @param array Source array
 * @param percentPresent Percentage of targets that should be in the array (0-100)
 * @param count Number of targets to select
 * @returns Array of target values and whether they exist in the array
 */
export function selectSearchTargets(
  array: number[],
  percentPresent: number = 50,
  count: number = 10
): { target: number, exists: boolean }[] {
  const results: { target: number, exists: boolean }[] = [];
  const min = Math.min(...array);
  const max = Math.max(...array);
  const range = max - min;

  for (let i = 0; i < count; i++) {
    // Determine if this target should exist in the array
    const shouldExist = Math.random() * 100 < percentPresent;

    if (shouldExist && array.length > 0) {
      // Select a random existing value
      const index = Math.floor(Math.random() * array.length);
      results.push({ target: array[index], exists: true });
    } else {
      // Generate a value outside the array
      let target: number;
      do {
        // Generate a value potentially outside the array's range
        if (Math.random() < 0.5) {
          target = min - Math.floor(Math.random() * (range / 4) + 1);
        } else {
          target = max + Math.floor(Math.random() * (range / 4) + 1);
        }
        // Make sure it's actually not in the array
      } while (array.includes(target));

      results.push({ target, exists: false });
    }
  }

  return results;
}

/**
 * Runs an array search algorithm and measures performance
 * @param searchFunction The search function to test
 * @param array The array to search in
 * @param target The value to search for
 * @param algorithmName The name of the algorithm for display
 * @returns Object with execution time and result
 */
export function runArraySearch(
  searchFunction: ArraySearchFunction,
  array: number[],
  target: number,
  algorithmName: string
): { name: string, time: number, result: number, success: boolean } {
  // Start timer
  const startTime = performance.now();

  // Run search
  const result = searchFunction(array, target);

  // End timer
  const endTime = performance.now();

  // Calculate execution time
  const executionTime = endTime - startTime;

  // Check if result is correct
  const success = (result !== -1 && array[result] === target) ||
                  (result === -1 && !array.includes(target));

  return {
    name: algorithmName,
    time: executionTime,
    result,
    success
  };
}

/**
 * Runs a matrix search algorithm and measures performance
 * @param searchFunction The search function to test
 * @param matrix The matrix to search in
 * @param target The value to search for
 * @param algorithmName The name of the algorithm for display
 * @returns Object with execution time and result
 */
export function runMatrixSearch(
  searchFunction: MatrixSearchFunction,
  matrix: number[][],
  target: number,
  algorithmName: string
): { name: string, time: number, result: [number, number] | null, success: boolean } {
  // Start timer
  const startTime = performance.now();

  // Run search
  const result = searchFunction(matrix, target);

  // End timer
  const endTime = performance.now();

  // Calculate execution time
  const executionTime = endTime - startTime;

  // Check if result is correct
  let success = true;
  let exists = false;

  // Check if the target exists in the matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === target) {
        exists = true;
        // If algorithm found a position, verify it's correct
        if (result !== null && (result[0] !== i || result[1] !== j)) {
          success = false;
        }
        break;
      }
    }
    if (exists) break;
  }

  // If target doesn't exist, success is true if result is null
  if (!exists) {
    success = result === null;
  }

  return {
    name: algorithmName,
    time: executionTime,
    result,
    success
  };
}

/**
 * Runs a tree search algorithm and measures performance
 * @param searchFunction The search function to test
 * @param root The root node of the tree to search in
 * @param target The value to search for
 * @param algorithmName The name of the algorithm for display
 * @returns Object with execution time and result
 */
export function runTreeSearch(
  searchFunction: TreeSearchFunction,
  root: TreeNode | null,
  target: number,
  algorithmName: string
): { name: string, time: number, found: boolean, success: boolean } {
  // Start timer
  const startTime = performance.now();

  // Run search
  const result = searchFunction(root, target);

  // End timer
  const endTime = performance.now();

  // Calculate execution time
  const executionTime = endTime - startTime;

  // Check if target exists in the tree
  const exists = treeContains(root, target);

  // Success if (result found and target exists) or (result null and target doesn't exist)
  const success = (result !== null && exists) || (result === null && !exists);

  return {
    name: algorithmName,
    time: executionTime,
    found: result !== null,
    success
  };
}

/**
 * Helper function to check if a value exists in a binary tree
 * @param root The root node of the tree
 * @param target The value to search for
 * @returns True if the value exists in the tree, false otherwise
 */
function treeContains(root: TreeNode | null, target: number): boolean {
  if (root === null) return false;
  if (root.value === target) return true;

  return treeContains(root.left, target) || treeContains(root.right, target);
}

/**
 * Display comparison results in a formatted table
 * @param results Results of running multiple algorithms
 * @param totalTargets Total number of targets tested
 */
export function displayComparisonResults(
  results: Record<string, {
    totalTime: number,
    successCount: number,
    avgTime: number,
    times: number[]
  }>,
  totalTargets: number
): void {
  Logger.section('Results Summary');

  // Convert results to array and sort by average time
  const sortedResults = Object.entries(results).map(([name, stats]) => ({
    name,
    avgTime: stats.avgTime,
    minTime: Math.min(...stats.times),
    maxTime: Math.max(...stats.times),
    successRate: (stats.successCount / totalTargets) * 100
  })).sort((a, b) => a.avgTime - b.avgTime);

  // Create table data
  const tableData = [
    [
      chalk.bold.cyan('Algorithm'),
      chalk.bold.cyan('Avg Time (ms)'),
      chalk.bold.cyan('Min Time (ms)'),
      chalk.bold.cyan('Max Time (ms)'),
      chalk.bold.cyan('Success Rate')
    ]
  ];

  // Add data for each algorithm
  sortedResults.forEach((result, index) => {
    // Highlight the fastest algorithm
    const algoName = index === 0
      ? chalk.green.bold(result.name)
      : chalk.magenta(result.name);

    tableData.push([
      algoName,
      result.avgTime.toFixed(4),
      result.minTime.toFixed(4),
      result.maxTime.toFixed(4),
      `${result.successRate.toFixed(1)}%`
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
}

/**
 * Returns a humanized size description for display
 * @param size The size number
 * @returns A string describing the size
 */
export function getSizeDescription(size: number): string {
  if (size <= 10) return "Tiny";
  if (size <= 100) return "Small";
  if (size <= 1000) return "Medium";
  if (size <= 10000) return "Large";
  return "Very Large";
}

/**
 * Prints information about a dataset for testing
 * @param type The type of dataset (Array, Matrix, Tree)
 * @param size The size of the dataset
 * @param extras Any additional information to display
 */
export function printDatasetInfo(type: string, size: number | [number, number], extras?: Record<string, any>): void {
  console.log(`\n=== ${type} Search Test ===`);

  if (Array.isArray(size)) {
    console.log(`Size: ${size[0]} x ${size[1]} (${getSizeDescription(size[0] * size[1])})`);
  } else {
    console.log(`Size: ${size} (${getSizeDescription(size)})`);
  }

  if (extras) {
    Object.entries(extras).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  }

  console.log('');
}
