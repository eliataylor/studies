/**
 * utils.ts - Enhanced utilities for testing sorting algorithms
 *
 * This file provides:
 * 1. Functions to generate various types of test arrays
 * 2. Utility functions to run sorting algorithms and measure performance
 * 3. Functions to verify sorting correctness
 */

import chalk from 'chalk';
import { Logger } from '../logger';

/**
 * Type definition for sorting functions
 */
export type SortFunction = (arr: number[]) => number[];

/**
 * Generates an array of random integers between min and max (inclusive)
 * @param size The number of elements in the array
 * @param min The minimum value (default: 0)
 * @param max The maximum value (default: 1000)
 * @returns An array of random integers
 */
export function generateRandomArray(size: number, min: number = 0, max: number = 1000): number[] {
  const array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return array;
}

/**
 * Generates a nearly sorted array
 * @param size The number of elements in the array
 * @param swapPercentage Percentage of elements to swap (default: 5%)
 * @returns A nearly sorted array
 */
export function generateNearlySortedArray(size: number, swapPercentage: number = 5): number[] {
  // First create a sorted array
  const array = Array.from({ length: size }, (_, i) => i);

  // Swap a percentage of elements
  const swapsCount = Math.ceil(size * (swapPercentage / 100));
  for (let i = 0; i < swapsCount; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
  }

  return array;
}

/**
 * Generates a reversed array
 * @param size The number of elements in the array
 * @returns A reversed array
 */
export function generateReversedArray(size: number): number[] {
  return Array.from({ length: size }, (_, i) => size - i - 1);
}

/**
 * Checks if an array is sorted in ascending order
 * @param array The array to check
 * @returns True if the array is sorted, false otherwise
 */
export function isSorted(array: number[]): boolean {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Runs a sorting algorithm and prints the results and timing
 * @param sortFunction The sorting function to test
 * @param array The array to sort
 * @param algorithmName The name of the algorithm for display
 * @param runs Number of runs to perform (default: 1)
 */
export function runSort(
  sortFunction: SortFunction,
  array: number[],
  algorithmName: string,
  runs: number = 1
): void {
  Logger.section(`${algorithmName} Sort`);

  // Prepare for multiple runs
  let totalTime = 0;
  let lastSortedArray: number[] = [];

  for (let i = 0; i < runs; i++) {
    // Create a copy of the array to avoid modifying the original
    const arrCopy = [...array];

    // Measure execution time
    const startTime = performance.now();
    const sortedArray = sortFunction(arrCopy);
    const endTime = performance.now();

    // Calculate execution time in milliseconds
    const executionTime = endTime - startTime;
    totalTime += executionTime;

    // Store the last sorted array for verification
    lastSortedArray = sortedArray;

    if (runs > 1) {
      Logger.algorithmResult(algorithmName, executionTime, i + 1);
    }
  }

  // Calculate average time
  const avgTime = totalTime / runs;

  // Verify if the array is sorted correctly
  const sorted = isSorted(lastSortedArray);

  // Print results
  Logger.keyValue('Input Array Size', array.length.toString());
  Logger.keyValue(`Average Execution Time (${runs} run${runs !== 1 ? 's' : ''})`, `${avgTime.toFixed(4)} ms`);

  if (sorted) {
    Logger.success('Correctly Sorted');
  } else {
    Logger.error('Not Correctly Sorted!');
  }

  // Optional: print sample of the sorted array
  if (lastSortedArray.length <= 20) {
    Logger.arrayPreview('Sorted Array', lastSortedArray);
  } else {
    Logger.arrayPreview('Sorted Array Preview', lastSortedArray);
  }
}

/**
 * Run multiple sorting algorithms on the same array for comparison
 * @param sortFunctions Object mapping algorithm names to sorting functions
 * @param array The array to sort
 * @param runs Number of runs to perform (default: 1)
 */
export function compareSort(
  sortFunctions: Record<string, SortFunction>,
  array: number[],
  runs: number = 1
): void {
  Logger.section('Sorting Algorithm Comparison');
  Logger.keyValue('Array Size', array.length.toString());
  Logger.keyValue('Number of runs per algorithm', runs.toString());

  // Run each sorting function and collect results
  const results: {name: string, avgTime: number, allTimes: number[]}[] = [];

  for (const [name, func] of Object.entries(sortFunctions)) {
    // Prepare for multiple runs
    const times: number[] = [];
    let sorted = true;

    for (let i = 0; i < runs; i++) {
      // Create a copy of the array
      const arrCopy = [...array];

      // Measure execution time
      const startTime = performance.now();
      const sortedArray = func(arrCopy);
      const endTime = performance.now();

      // Calculate execution time in milliseconds
      const executionTime = endTime - startTime;
      times.push(executionTime);

      // Check sorting on first run
      if (i === 0) {
        sorted = isSorted(sortedArray);
      }
    }

    // Calculate average time
    const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;

    // Report results for this algorithm
    if (runs === 1) {
      Logger.algorithmResult(name, avgTime);
    } else {
      Logger.keyValue(name, `${avgTime.toFixed(4)} ms (avg of ${runs} runs)`);
    }

    if (!sorted) {
      Logger.error(`${name} did not sort the array correctly!`);
    }

    results.push({name, avgTime, allTimes: times});
  }

  // Sort results by execution time (fastest first)
  results.sort((a, b) => a.avgTime - b.avgTime);

  // Print results table
  Logger.comparisonTable(results);

  // Show relative performance
  if (results.length > 1) {
    Logger.subsection('Relative Performance (fastest = 1.0)');
    Logger.relativePerformanceTable(results);
  }
}

/**
 * A shared test array for comparing different sorting algorithms
 * Default size is 1000 elements
 */
export const TestArray = generateRandomArray(1000);
