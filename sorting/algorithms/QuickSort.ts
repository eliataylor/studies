/**
 * QuickSort.ts - Implementation of the Quick Sort algorithm
 *
 * Quick sort is a divide and conquer algorithm that:
 * 1. Selects a 'pivot' element from the array
 * 2. Partitions the array around the pivot (elements less than pivot go left, greater go right)
 * 3. Recursively sorts the subarrays
 *
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n²) when the array is already sorted or nearly sorted
 *
 * Space Complexity: O(log n) for the recursion stack
 */

import { SortFunction, runSort, TestArray } from '../utils';

/**
 * Partitions the array around a pivot element
 * @param array The array to partition
 * @param low The starting index
 * @param high The ending index
 * @returns The pivot index
 */
function partition(array: number[], low: number, high: number): number {
  // Choose the rightmost element as the pivot
  const pivot = array[high];

  // Index of the smaller element
  let i = low - 1;

  // Place elements smaller than the pivot to the left
  // and larger elements to the right
  for (let j = low; j < high; j++) {
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Place the pivot element in its correct position
  [array[i + 1], array[high]] = [array[high], array[i + 1]];

  // Return the pivot's index
  return i + 1;
}

/**
 * The main recursive function for quick sort
 * @param array The array to sort
 * @param low The starting index
 * @param high The ending index
 */
function quickSortRecursive(array: number[], low: number, high: number): void {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(array, low, high);

    // Recursively sort the subarrays
    quickSortRecursive(array, low, pivotIndex - 1);
    quickSortRecursive(array, pivotIndex + 1, high);
  }
}

/**
 * Implementation of quick sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const quickSort: SortFunction = (arr: number[]): number[] => {
  const array = [...arr]; // Create a copy to avoid modifying the original

  // Call the recursive quick sort function
  quickSortRecursive(array, 0, array.length - 1);

  return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(quickSort, TestArray, "Quick");
 */

// Uncomment the line below to test the quick sort implementation
// runSort(quickSort, TestArray, "Quick");
