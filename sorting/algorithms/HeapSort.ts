/**
 * HeapSort.ts - Implementation of the Heap Sort algorithm
 *
 * Heap sort uses a binary heap data structure to sort elements.
 * It works by:
 * 1. Building a max heap from the array
 * 2. Repeatedly extracting the maximum element from the heap and rebuilding the heap
 *
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 *
 * Space Complexity: O(1) - sorts in place
 */

import {SortFunction} from '../utils';

/**
 * Heapify a subtree rooted at index i
 * @param array The array to heapify
 * @param n The size of the heap
 * @param i The root index of the subtree
 */
function heapify(array: number[], n: number, i: number): void {
    // Initialize largest as root
    let largest = i;

    // Calculate indices of left and right children
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        // Swap root with largest
        [array[i], array[largest]] = [array[largest], array[i]];

        // Recursively heapify the affected subtree
        heapify(array, n, largest);
    }
}

/**
 * Implementation of heap sort
 * @param arr The array to sort
 * @returns The sorted array
 */
export const heapSort: SortFunction = (arr: number[]): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original
    const n = array.length;

    // Build a max heap (rearrange the array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root (maximum) to the end
        [array[0], array[i]] = [array[i], array[0]];

        // Call heapify on the reduced heap
        heapify(array, i, 0);
    }

    return array;
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(heapSort, TestArray, "Heap");
 */

// Uncomment the line below to test the heap sort implementation
// runSort(heapSort, TestArray, "Heap");
