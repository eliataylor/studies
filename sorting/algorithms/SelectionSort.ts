/**
 * SelectionSort.ts - Implementation of the Selection Sort algorithm
 *
 * Selection sort works by dividing the input list into two parts:
 * the sublist of items already sorted and the sublist of items remaining to be sorted.
 * It repeatedly finds the minimum element from the unsorted sublist and
 * moves it to the beginning of the unsorted sublist.
 *
 * Time Complexity:
 * - Best Case: O(n²)
 * - Average Case: O(n²)
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1) - sorts in place
 */

import {SortFunction} from '../utils';

/**
 * Implementation of selection sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const selectionSort: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in the unsorted part of the array
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }

    return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(selectionSort, TestArray, "Selection");
 */

// Uncomment the line below to test the selection sort implementation
// runSort(selectionSort, TestArray, "Selection");
