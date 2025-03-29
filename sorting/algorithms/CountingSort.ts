/**
 * CountingSort.ts - Implementation of the Counting Sort algorithm
 *
 * Counting sort is a non-comparison based sorting algorithm that works well
 * for integers with a known range. It counts the occurrences of each element
 * and uses that information to place elements in their correct sorted positions.
 *
 * Time Complexity:
 * - Best Case: O(n + k) where k is the range of input values
 * - Average Case: O(n + k)
 * - Worst Case: O(n + k)
 *
 * Space Complexity: O(n + k) for the counting array
 *
 * Note: This algorithm is most efficient when k is not significantly larger than n.
 */

import {SortFunction} from '../utils';

/**
 * Implementation of counting sort
 * Works for arrays of non-negative integers
 * @param arr The array to sort
 * @returns The sorted array
 */

// TODO: pass in min / max for more accurate speed measurements
export const countingSort: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original

    // Return if array is empty
    if (array.length === 0) return array;

    // Find the maximum element to determine the count array size
    const max = Math.max(...array);

    // Create a counting array of size max+1
    const count: number[] = new Array(max + 1).fill(0);

    // Count the occurrences of each element
    for (let i = 0; i < array.length; i++) {
        count[array[i]]++;
    }

    // Update count array to store the position of each element in the output
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    // Create the output array
    const output: number[] = new Array(array.length);

    // Build the output array
    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
    }

    return output;
};

/**
 * Extended version of counting sort that works with negative numbers
 * @param arr The array to sort
 * @returns The sorted array
 */
export const extendedCountingSort: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original

    // Return if array is empty
    if (array.length === 0) return array;

    // Find the minimum and maximum elements
    const min = Math.min(...array);
    const max = Math.max(...array);

    // Calculate the range
    const range = max - min + 1;

    // Create a counting array
    const count: number[] = new Array(range).fill(0);

    // Create the output array
    const output: number[] = new Array(array.length);

    // Count occurrences of each element
    for (let i = 0; i < array.length; i++) {
        // Adjust for negative numbers by subtracting min value
        count[array[i] - min]++;
    }

    // Update count array to store positions
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i] - min] - 1] = array[i];
        count[array[i] - min]--;
    }

    return output;
};

/**
 * Default export uses the extended version that handles negative numbers
 */
export default extendedCountingSort;

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(countingSort, TestArray, "Counting");
 * runSort(extendedCountingSort, TestArray, "Extended Counting");
 */

// Uncomment the line below to test the counting sort implementation
// runSort(extendedCountingSort, TestArray, "Counting");
