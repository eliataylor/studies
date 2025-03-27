/**
 * BubbleSort.ts - Implementation of the Bubble Sort algorithm
 *
 * Bubble sort works by repeatedly stepping through the list, comparing
 * adjacent elements and swapping them if they are in the wrong order.
 * The pass through the list is repeated until the list is sorted.
 *
 * Time Complexity:
 * - Best Case: O(n) when the array is already sorted
 * - Average Case: O(n²)
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1) - sorts in place
 */

import { SortFunction, runSort, TestArray } from './utils';

/**
 * Basic implementation of bubble sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const bubbleSort: SortFunction = (arr: number[]): number[] => {
  const array = [...arr]; // Create a copy to avoid modifying the original
  const n = array.length;

  for (let i = 0; i < n; i++) {
    // Flag to optimize if no swaps occur in a pass
    let swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (array[j] > array[j + 1]) {
        // Swap them if they are in the wrong order
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }

    // If no swapping occurred in this pass, the array is sorted
    if (!swapped) {
      break;
    }
  }

  return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(bubbleSort, TestArray, "Bubble");
 */

// runSort(bubbleSort, TestArray, "Bubble");
