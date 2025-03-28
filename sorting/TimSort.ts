/**
 * TimSort.ts - Implementation of the Tim Sort algorithm
 *
 * Tim sort is a hybrid sorting algorithm derived from merge sort and insertion sort.
 * It was designed to perform well on many kinds of real-world data. It first divides
 * the array into small segments called "runs" and sorts these runs using insertion sort,
 * then repeatedly merges the runs using merge sort methodology.
 *
 * Time Complexity:
 * - Best Case: O(n) when the array is already sorted
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 *
 * Space Complexity: O(n)
 */

import { SortFunction, runSort, TestArray } from './utils';

// Minimum size of a run
const MIN_RUN = 32;

/**
 * Calculates the minimum run length for tim sort
 * @param n The length of the array
 * @returns The minimum run length
 */
function getMinRun(n: number): number {
  let r = 0;
  while (n >= MIN_RUN) {
    r |= (n & 1);
    n >>= 1;
  }
  return n + r;
}

/**
 * Performs insertion sort on a slice of the array
 * @param array The array to sort
 * @param left The start index
 * @param right The end index
 */
function insertionSortForRun(array: number[], left: number, right: number): void {
  for (let i = left + 1; i <= right; i++) {
    const temp = array[i];
    let j = i - 1;
    while (j >= left && array[j] > temp) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = temp;
  }
}

/**
 * Merges two sorted subarrays
 * @param array The array containing both subarrays
 * @param left The start index of the first subarray
 * @param mid The end index of the first subarray
 * @param right The end index of the second subarray
 */
function merge(array: number[], left: number, mid: number, right: number): void {
  // Calculate lengths of subarrays
  const len1 = mid - left + 1;
  const len2 = right - mid;

  // Create temporary arrays
  const leftArr = array.slice(left, mid + 1);
  const rightArr = array.slice(mid + 1, right + 1);

  // Merge the subarrays back into the original array
  let i = 0, j = 0, k = left;

  while (i < len1 && j < len2) {
    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i];
      i++;
    } else {
      array[k] = rightArr[j];
      j++;
    }
    k++;
  }

  // Copy any remaining elements
  while (i < len1) {
    array[k] = leftArr[i];
    i++;
    k++;
  }

  while (j < len2) {
    array[k] = rightArr[j];
    j++;
    k++;
  }
}

/**
 * Implementation of tim sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const timSort: SortFunction = (arr: number[]): number[] => {
  const array = [...arr]; // Create a copy to avoid modifying the original
  const n = array.length;

  // Calculate the minimum run length
  const minRun = getMinRun(n);

  // Sort individual runs with insertion sort
  for (let i = 0; i < n; i += minRun) {
    const end = Math.min(i + minRun - 1, n - 1);
    insertionSortForRun(array, i, end);
  }

  // Start merging from size minRun
  // After this loop, we'll have size = 2*minRun
  for (let size = minRun; size < n; size = 2 * size) {
    // Pick starting point of left subarray for each merge
    for (let left = 0; left < n; left += 2 * size) {
      // Find ending point of left subarray
      // mid+1 is starting point of right subarray
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);

      // Merge the two subarrays if the mid point is valid
      if (mid < right) {
        merge(array, left, mid, right);
      }
    }
  }

  return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(timSort, TestArray, "Tim");
 */

// Uncomment the line below to test the tim sort implementation
// runSort(timSort, TestArray, "Tim");
