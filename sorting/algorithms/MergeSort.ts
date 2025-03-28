/**
 * MergeSort.ts - Implementation of the Merge Sort algorithm
 *
 * Merge sort is a divide and conquer algorithm that:
 * 1. Divides the input array into two halves
 * 2. Recursively sorts the two halves
 * 3. Merges the sorted halves to produce the final sorted array
 *
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 *
 * Space Complexity: O(n) - requires additional storage for the merging process
 */

import { SortFunction, runSort, TestArray } from '../utils';

/**
 * Merges two sorted subarrays into a single sorted array
 * @param left The left subarray
 * @param right The right subarray
 * @returns The merged sorted array
 */
function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from both subarrays and merge them in sorted order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Add any remaining elements from the left subarray
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  // Add any remaining elements from the right subarray
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

/**
 * Implementation of merge sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const mergeSort: SortFunction = (arr: number[]): number[] => {
  const array = [...arr]; // Create a copy to avoid modifying the original

  // Base case: arrays with 0 or 1 elements are already sorted
  if (array.length <= 1) {
    return array;
  }

  // Divide the array into two halves
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  // Recursively sort and merge the halves
  return merge(mergeSort(left), mergeSort(right));
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(mergeSort, TestArray, "Merge");
 */

// Uncomment the line below to test the merge sort implementation
// runSort(mergeSort, TestArray, "Merge");
