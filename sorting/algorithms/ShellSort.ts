/**
 * ShellSort.ts - Implementation of the Shell Sort algorithm
 *
 * Shell sort is an optimization of insertion sort that allows the exchange of
 * items that are far apart. The idea is to arrange the list of elements so that,
 * starting anywhere, taking every h'th element produces a sorted list.
 * The method starts by sorting elements that are far apart and progressively
 * reduces the gap between elements being compared.
 *
 * Time Complexity (varies based on gap sequence):
 * - Best Case: O(n log n)
 * - Average Case: O(n (log n)²)
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1) - sorts in place
 */

import {SortFunction} from '../utils';

/**
 * Implementation of shell sort using the Knuth sequence for gaps
 * @param arr The array to sort
 * @returns The sorted array
 */
export const shellSort: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original
    const n = array.length;

    // Start with a large gap and reduce it on each iteration
    // This implementation uses Knuth's sequence: h = 3h + 1
    let gap = 1;
    while (gap < n / 3) {
        gap = gap * 3 + 1;
    }

    // Perform insertion sort for elements at the current gap
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            // Save current element
            const temp = array[i];

            // Shift earlier gap-sorted elements up until the correct location for temp is found
            let j = i;
            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
            }

            // Put temp in its correct location
            array[j] = temp;
        }

        // Reduce the gap based on Knuth's sequence
        gap = Math.floor(gap / 3);
    }

    return array;
};

/**
 * Shell sort with a different gap sequence
 * This uses the Shell's original sequence: N/2, N/4, ..., 1
 * @param arr The array to sort
 * @returns The sorted array
 */
export const shellSortOriginal: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original
    const n = array.length;

    // Start with a large gap and reduce it by half on each iteration
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Perform insertion sort for elements at the current gap
        for (let i = gap; i < n; i++) {
            const temp = array[i];

            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
            }

            array[j] = temp;
        }
    }

    return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(shellSort, TestArray, "Shell (Knuth)");
 * runSort(shellSortOriginal, TestArray, "Shell (Original)");
 */

// Uncomment the lines below to test the shell sort implementations
// runSort(shellSort, TestArray, "Shell (Knuth)");
// runSort(shellSortOriginal, TestArray, "Shell (Original)");
