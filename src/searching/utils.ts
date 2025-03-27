/**
 * utils.ts - Utility for testing search algorithms
 *
 * This file provides:
 * 1. Functions to generate test data structures (arrays, matrices, trees)
 * 2. Utility functions to run search algorithms and measure performance
 * 3. Types and interfaces for search functions
 */

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
 * Compares multiple search algorithms on the same dataset
 * @param functions Object mapping algorithm names to search functions
 * @param performFunction Function to run the search and measure performance
 * @param args Arguments for the search functions
 * @param targets Array of search targets
 */
export function compareSearchAlgorithms<T extends ArraySearchFunction | MatrixSearchFunction | TreeSearchFunction>(
  functions: Record<string, T>,
  performFunction: Function,
  args: any[],
  targets: { target: number, exists: boolean }[]
): void {
  const results: Record<string, { totalTime: number, successRate: number }> = {};

  // Initialize results
  Object.keys(functions).forEach(name => {
    results[name] = { totalTime: 0, successRate: 0 };
  });

  // Run each search target against all algorithms
  targets.forEach(({ target, exists }) => {
    console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);

    const searchResults: any[] = [];

    for (const [name, func] of Object.entries(functions)) {
      const result = performFunction(func, ...args, target, name);
      searchResults.push(result);

      // Update aggregate statistics
      results[name].totalTime += result.time;
      if (result.success) {
        results[name].successRate += 1;
      }
    }

    // Sort results by execution time
    searchResults.sort((a, b) => a.time - b.time);

    // Print results for this target
    console.log('Algorithm\t\tTime (ms)\tResult\tSuccess');
    console.log('------------------------------------------------------');
    searchResults.forEach(result => {
      console.log(
        `${result.name.padEnd(20)}\t${result.time.toFixed(4)}\t${
          typeof result.result === 'number' ? result.result : 
          Array.isArray(result.result) ? `[${result.result}]` : 
          result.found ? 'Found' : 'Not Found'
        }\t${result.success ? 'Yes' : 'No'}`
      );
    });
  });

  // Calculate final statistics
  console.log('\n=== Overall Results ===');
  console.log('Algorithm\t\tTotal Time (ms)\tSuccess Rate');
  console.log('------------------------------------------------------');

  // Convert results to array and sort by total time
  const sortedResults = Object.entries(results).map(([name, stats]) => ({
    name,
    totalTime: stats.totalTime,
    successRate: (stats.successRate / targets.length) * 100
  })).sort((a, b) => a.totalTime - b.totalTime);

  // Print final results
  sortedResults.forEach(result => {
    console.log(
      `${result.name.padEnd(20)}\t${result.totalTime.toFixed(4)}\t${result.successRate.toFixed(2)}%`
    );
  });
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
