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

// import { Logger, LogLevel } from '../../logger';
import {SortFunction} from '../utils';

/**
 * Implementation of insertion sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const insertionSort: SortFunction = (arr: number[]): number[] => {
    // Create a copy of the array (to avoid modifying the original)
    const result = [...arr];
    const n = result.length;

    // Logger.algorithmStep(LogLevel.DEBUG, `Starting insertion sort with array of length ${n}`);

    // Start from the second element (index 1)
    for (let i = 1; i < n; i++) {
        // Store the current element to be inserted in the correct position
        const current = result[i];
        // Logger.algorithmStep(LogLevel.DEBUG, `Processing element #${i+1}: ${current}`);

        // Find the correct position for the current element
        let j = i - 1;

        // Move elements greater than current to one position ahead
        while (j >= 0 && result[j] > current) {
            // Logger.algorithmStep(LogLevel.TRACE, `${result[j]} > ${current}, shifting ${result[j]} to position ${j+1}`);
            result[j + 1] = result[j];
            j--;
        }

        // Place the current element in its correct position
        result[j + 1] = current;

        // Logger.algorithmStep(LogLevel.DEBUG, `Placed ${current} at position ${j+1}`);
        // Logger.algorithmStep(LogLevel.TRACE, `Array after processing ${i+1} elements: [${result.join(', ')}]`);
    }

    // Logger.algorithmStep(LogLevel.DEBUG, `Insertion sort complete`);

    return result;
}

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(insertionSort, TestArray, "Insertion");
 */

// runSort(insertionSort, TestArray, "Insertion");
