/**
 * InsertionSort.ts - Implementation of the Insertion Sort algorithm
 *
 * Insertion sort builds the final sorted array one item at a time. It
 * iterates through the input elements, removing one element each time
 * and finding the location it belongs in the sorted list.
 *
 * Time Complexity:
 * - Best Case: O(n) when the array is already sorted
 * - Average Case: O(n²)
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1) - sorts in place
 */

import { SortFunction, runSort, TestArray } from '../utils';

/**
 * Implementation of insertion sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const insertionSort: SortFunction = (arr: number[]): number[] => {
  const array = [...arr]; // Create a copy to avoid modifying the original
  const n = array.length;

  for (let i = 1; i < n; i++) {
    // Select the current element to be inserted in the sorted part
    const current = array[i];

    // Find the position where current should be inserted
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j]; // Shift elements to the right
      j--;
    }

    // Insert the current element in its correct position
    array[j + 1] = current;
  }

  return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(insertionSort, TestArray, "Insertion");
 */

// runSort(insertionSort, TestArray, "Insertion");
