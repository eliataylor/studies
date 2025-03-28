/**
 * IntroSort.ts - Implementation of the Introspective Sort (IntroSort) algorithm
 *
 * Intro sort is a hybrid sorting algorithm that provides both fast average
 * performance and optimal worst-case performance. It begins with quicksort,
 * switches to heapsort when the recursion depth exceeds a certain level,
 * and switches to insertion sort for small subarrays.
 *
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 *
 * Space Complexity: O(log n) due to the recursion stack
 */

import {SortFunction} from '../utils';

/**
 * Swaps two elements in an array
 * @param array The array
 * @param i First index
 * @param j Second index
 */
function swap(array: number[], i: number, j: number): void {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

/**
 * Performs insertion sort on a subarray
 * @param array The array to sort
 * @param start The starting index
 * @param end The ending index
 */
function insertionSortRange(array: number[], start: number, end: number): void {
    for (let i = start + 1; i <= end; i++) {
        const key = array[i];
        let j = i - 1;

        while (j >= start && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;
    }
}

/**
 * Converts a subarray into a max heap
 * @param array The array
 * @param index The current index
 * @param heapSize The size of the heap
 */
function heapify(array: number[], index: number, heapSize: number): void {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (left < heapSize && array[left] > array[largest]) {
        largest = left;
    }

    if (right < heapSize && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== index) {
        swap(array, index, largest);
        heapify(array, largest, heapSize);
    }
}

/**
 * Performs heap sort on a subarray
 * @param array The array to sort
 * @param start The starting index
 * @param end The ending index
 */
function heapSortRange(array: number[], start: number, end: number): void {
    const heapSize = end - start + 1;

    // Build the heap
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        heapify(array, start + i, heapSize);
    }

    // Extract elements from the heap
    for (let i = heapSize - 1; i > 0; i--) {
        swap(array, start, start + i);
        heapify(array, start, i);
    }
}

/**
 * Selects a pivot using median-of-three method
 * @param array The array
 * @param start The starting index
 * @param end The ending index
 * @returns The pivot index
 */
function medianOfThree(array: number[], start: number, end: number): number {
    const mid = Math.floor((start + end) / 2);

    // Sort the three elements
    if (array[start] > array[mid]) {
        swap(array, start, mid);
    }

    if (array[mid] > array[end]) {
        swap(array, mid, end);

        if (array[start] > array[mid]) {
            swap(array, start, mid);
        }
    }

    return mid;
}

/**
 * Partitions the array around a pivot
 * @param array The array
 * @param start The starting index
 * @param end The ending index
 * @returns The pivot position
 */
function partition(array: number[], start: number, end: number): number {
    // Choose pivot using median-of-three
    const pivotIndex = medianOfThree(array, start, end);
    const pivotValue = array[pivotIndex];

    // Move pivot to the end
    swap(array, pivotIndex, end);

    let storeIndex = start;

    // Move all elements smaller than pivot to the left
    for (let i = start; i < end; i++) {
        if (array[i] <= pivotValue) {
            swap(array, i, storeIndex);
            storeIndex++;
        }
    }

    // Move pivot to its final position
    swap(array, storeIndex, end);

    return storeIndex;
}

/**
 * Calculates the maximum recursion depth
 * @param n The size of the array
 * @returns The maximum recursion depth
 */
function maxRecursionDepth(n: number): number {
    return Math.floor(2 * Math.log2(n));
}

/**
 * The main introspective sort function
 * @param array The array to sort
 * @param start The starting index
 * @param end The ending index
 * @param depthLimit The maximum recursion depth
 */
function introSortUtil(
    array: number[],
    start: number,
    end: number,
    depthLimit: number
): void {
    const size = end - start + 1;

    // Use insertion sort for small arrays
    if (size <= 16) {
        insertionSortRange(array, start, end);
        return;
    }

    // If recursion depth exceeds limit, switch to heap sort
    if (depthLimit === 0) {
        heapSortRange(array, start, end);
        return;
    }

    // Otherwise, use quicksort
    const pivot = partition(array, start, end);

    // Sort left part
    if (pivot > start) {
        introSortUtil(array, start, pivot - 1, depthLimit - 1);
    }

    // Sort right part
    if (pivot < end) {
        introSortUtil(array, pivot + 1, end, depthLimit - 1);
    }
}

/**
 * Implementation of introspective sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const introSort: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original
    const n = array.length;

    // Calculate the maximum recursion depth
    const depthLimit = maxRecursionDepth(n);

    // Sort the array
    introSortUtil(array, 0, n - 1, depthLimit);

    return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(introSort, TestArray, "Intro");
 */

// Uncomment the line below to test the intro sort implementation
// runSort(introSort, TestArray, "Intro");
