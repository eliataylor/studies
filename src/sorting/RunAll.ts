/**
 * CompareSort.ts - Compare different sorting algorithms
 *
 * This file imports all sorting implementations and compares their performance
 * on arrays of different sizes.
 */

import { generateRandomArray, compareSort } from './utils';
import { bubbleSort } from './BubbleSort';
import { selectionSort } from './SelectionSort';
import { insertionSort } from './InsertionSort';
import { mergeSort } from './MergeSort';
import { quickSort } from './QuickSort';
import { heapSort } from './HeapSort';
import { extendedCountingSort } from './CountingSort';
import { extendedRadixSort } from './RadixSort';
import { bucketSort } from './BucketSort';
import { shellSort } from './ShellSort';
import { timSort } from './TimSort';
import { introSort } from './IntroSort';
import { combSort } from './CombSort';
import { gnomeSort, optimizedGnomeSort } from './GnomeSort';

// Define different array sizes for testing
// For more comprehensive testing, you can uncomment larger sizes
// but be aware that slower algorithms (O(n²)) may take a very long time
const SIZES = [
  10,     // Tiny array
//  100,    // Small array
//  1000,   // Medium array
//  5000,   // Large array for efficient algorithms
  // 10000,  // Very large array (may be slow for O(n²) algorithms)
  50000   // Extremely large array (only for efficient algorithms)
];

// Create a mapping of sort names to sort functions
const sortFunctions = {
  // Basic O(n²) sorting algorithms
  'Bubble Sort': bubbleSort,
  'Selection Sort': selectionSort,
  'Insertion Sort': insertionSort,
  'Gnome Sort': gnomeSort,
  'Optimized Gnome Sort': optimizedGnomeSort,
  'Comb Sort': combSort,
  'Shell Sort': shellSort,

  // Efficient O(n log n) sorting algorithms
  'Merge Sort': mergeSort,
  'Quick Sort': quickSort,
  'Heap Sort': heapSort,
  'Tim Sort': timSort,
  'Intro Sort': introSort,

  // Non-comparison based sorting algorithms
  'Counting Sort': extendedCountingSort,
  'Radix Sort': extendedRadixSort,
  'Bucket Sort': bucketSort
};

// Compare sorts on arrays of different sizes
console.log('Comparing sorting algorithms...\n');

SIZES.forEach(size => {
  console.log(`\n=== Testing with array size: ${size} ===`);
  const testArray = generateRandomArray(size);
  compareSort(sortFunctions, testArray);
});

/**
 * To run:
 * ts-node CompareSort.ts
 *
 * Note: You may need to adjust this command based on your TypeScript setup.
 * If using tsc to compile:
 * 1. tsc CompareSort.ts
 * 2. node CompareSort.js
 */
