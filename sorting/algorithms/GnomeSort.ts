/**
 * GnomeSort.ts - Implementation of the Gnome Sort algorithm
 *
 * Gnome sort (also called Stupid sort) is a sorting algorithm similar to insertion sort,
 * but moving elements to their proper position by a series of swaps, similar to bubble sort.
 * It's named after garden gnomes who supposedly sort flower pots by picking up a pot,
 * comparing it with the previous one, and swapping them if needed, then moving backward.
 *
 * Time Complexity:
 * - Best Case: O(n) when the array is already sorted
 * - Average Case: O(n²)
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1) - sorts in place
 */

import {SortFunction} from '../utils';

/**
 * Implementation of gnome sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const gnomeSort: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original
    const n = array.length;

    let index = 0;

    while (index < n) {
        if (index === 0) {
            index++;
        }

        // If the current element is greater or equal than the previous one
        if (array[index] >= array[index - 1]) {
            index++;
        } else {
            // Otherwise, swap them and move back one step
            [array[index], array[index - 1]] = [array[index - 1], array[index]];
            index--;
        }
    }

    return array;
};

/**
 * Optimized gnome sort implementation that uses a technique similar to insertion sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const optimizedGnomeSort: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original
    const n = array.length;

    for (let pos = 1; pos < n; pos++) {
        let index = pos;

        while (index > 0 && array[index] < array[index - 1]) {
            // Swap elements
            [array[index], array[index - 1]] = [array[index - 1], array[index]];
            index--;
        }
    }

    return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(gnomeSort, TestArray, "Gnome");
 * runSort(optimizedGnomeSort, TestArray, "Optimized Gnome");
 */

// Uncomment the lines below to test the gnome sort implementations
// runSort(gnomeSort, TestArray, "Gnome");
// runSort(optimizedGnomeSort, TestArray, "Optimized Gnome");
