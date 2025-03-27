/**
 * index.ts - Export all sorting algorithms
 *
 * This file serves as a central export point for all sorting algorithms.
 * It makes it easier to import multiple algorithms at once.
 */

// Export utility functions
import {selectionSort} from "./SelectionSort";
import {gnomeSort, optimizedGnomeSort} from "./GnomeSort";
import {combSort} from "./CombSort";
import {shellSort} from "./ShellSort";
import {heapSort} from "./HeapSort";
import {timSort} from "./TimSort";
import {introSort} from "./IntroSort";
import extendedCountingSort from "./CountingSort";
import extendedRadixSort from "./RadixSort";
import {bucketSort} from "./BucketSort";

export {
    generateRandomArray,
    isSorted,
    runSort,
    compareSort,
    TestArray,
    type SortFunction
} from './utils';

// Export non-comparison based sorting algorithms
export {
    countingSort,
    extendedCountingSort
} from './CountingSort';

export {
    radixSort,
    extendedRadixSort
} from './RadixSort';

export {bucketSort} from './BucketSort';

/**
 * A collection of all standard sorting algorithms by category
 */
export const sortAlgorithms = {
    // Basic O(n²) sorting algorithms
    basic: {
        bubble: bubbleSort,
        selection: selectionSort,
        insertion: insertionSort,
        gnome: gnomeSort,
        optimizedGnome: optimizedGnomeSort,
        comb: combSort,
        shell: shellSort
    },

    // Efficient O(n log n) sorting algorithms
    efficient: {
        merge: mergeSort,
        quick: quickSort,
        heap: heapSort,
        tim: timSort,
        intro: introSort
    },

    // Non-comparison based sorting algorithms (typically O(n))
    nonComparison: {
        counting: extendedCountingSort,
        radix: extendedRadixSort,
        bucket: bucketSort
    }
};
