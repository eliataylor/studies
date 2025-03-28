/**
 * CombSort.ts - Implementation of the Comb Sort algorithm
 *
 * Comb sort is an improvement on bubble sort. It addresses the issue of small
 * values near the end of the list (the "turtles") by using a gap sequence to eliminate them.
 * The gap starts out large and shrinks by a factor of 1.3 on each iteration
 * until it reaches 1, at which point the algorithm becomes a bubble sort.
 *
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n²/2^p) where p is the number of increments
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1) - sorts in place
 */

import {SortFunction} from '../utils';

/**
 * Implementation of comb sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const combSort: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original
    const n = array.length;

    // Initialize gap size
    let gap = n;

    // Initialize the shrink factor
    const shrink = 1.3;

    // Initialize swapped as true to enter the loop
    let swapped = true;

    // Keep running while gap is more than 1 and last iteration caused a swap
    while (gap > 1 || swapped) {
        // Update the gap value
        gap = Math.floor(gap / shrink);
        if (gap < 1) gap = 1;

        swapped = false;

        // Compare elements with the given gap
        for (let i = 0; i < n - gap; i++) {
            if (array[i] > array[i + gap]) {
                // Swap the elements
                [array[i], array[i + gap]] = [array[i + gap], array[i]];
                swapped = true;
            }
        }
    }

    return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(combSort, TestArray, "Comb");
 */

// Uncomment the line below to test the comb sort implementation
// runSort(combSort, TestArray, "Comb");
