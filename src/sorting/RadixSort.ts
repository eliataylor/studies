/**
 * RadixSort.ts - Implementation of the Radix Sort algorithm
 *
 * Radix sort is a non-comparative sorting algorithm that sorts data with
 * integer keys by grouping the keys by individual digits that share the
 * same position and value. It processes the digits from the least significant
 * digit to the most significant digit.
 *
 * Time Complexity:
 * - Best Case: O(n * k) where k is the number of digits in the largest number
 * - Average Case: O(n * k)
 * - Worst Case: O(n * k)
 *
 * Space Complexity: O(n + b) where b is the base (typically 10 for decimal)
 */

import { SortFunction, runSort, TestArray } from './utils';

/**
 * Performs counting sort on the array based on the specified digit position
 * @param array The array to sort
 * @param exp The current digit position (1, 10, 100, etc.)
 */
function countingSortByDigit(array: number[], exp: number): void {
  const n = array.length;
  const output: number[] = new Array(n).fill(0);
  const count: number[] = new Array(10).fill(0);

  // Count occurrences of each digit at the current position
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(array[i] / exp) % 10;
    count[digit]++;
  }

  // Adjust count to store position of this digit in output
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10;
    output[count[digit] - 1] = array[i];
    count[digit]--;
  }

  // Copy the output array to the original array
  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }
}

/**
 * Implementation of radix sort for non-negative integers
 * @param arr The array to sort
 * @returns The sorted array
 */
export const radixSort: SortFunction = (arr: number[]): number[] => {
  const array = [...arr].map(Math.floor); // Create a copy and ensure integers

  // Handle negative numbers by giving an error or using a different algorithm
  if (array.some(num => num < 0)) {
    throw new Error('Radix sort implementation only works with non-negative integers');
  }

  // Find the maximum number to determine the number of digits
  const max = Math.max(...array);

  // Do counting sort for every digit position
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(array, exp);
  }

  return array;
};

/**
 * Extended implementation of radix sort that handles negative numbers
 * by splitting the array, sorting each part, and then combining them
 * @param arr The array to sort
 * @returns The sorted array
 */
export const extendedRadixSort: SortFunction = (arr: number[]): number[] => {
  const array = [...arr].map(Math.floor); // Create a copy and ensure integers

  // If the array is empty, return it
  if (array.length === 0) return array;

  // Separate negative and non-negative numbers
  const negative: number[] = [];
  const nonNegative: number[] = [];

  for (const num of array) {
    if (num < 0) {
      negative.push(-num); // Make negative numbers positive for sorting
    } else {
      nonNegative.push(num);
    }
  }

  // Sort both parts using regular radix sort
  const sortedNegative = negative.length > 0 ? radixSort(negative) : [];
  const sortedNonNegative = nonNegative.length > 0 ? radixSort(nonNegative) : [];

  // Combine the results: negative numbers in reverse order (made negative again),
  // followed by non-negative numbers
  return [
    ...sortedNegative.reverse().map(num => -num),
    ...sortedNonNegative
  ];
};

/**
 * Default export uses the extended version that handles negative numbers
 */
export default extendedRadixSort;

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(extendedRadixSort, TestArray, "Radix");
 */

// Uncomment the line below to test the radix sort implementation
// runSort(extendedRadixSort, TestArray, "Radix");
