/**
 * TestSort.ts - Test sorting algorithms with various array configurations
 *
 * Run with:
 * npm run test -- [options]
 *
 * Example:
 * npm run test -- --algorithms "quick,merge" --sizes "10,100,1000" --seed 12345
 */

import { program } from 'commander';
import seedrandom from 'seedrandom';
import { generateRandomArray, compareSort, isSorted, SortFunction } from './utils';
import { Logger } from '../logger';

// Import all sorting algorithms
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

// Create a mapping of sort names to sort functions
const ALL_SORT_FUNCTIONS: Record<string, SortFunction> = {
  // Basic O(n²) sorting algorithms
  'bubble': bubbleSort,
  'selection': selectionSort,
  'insertion': insertionSort,
  'gnome': gnomeSort,
  'optimizedGnome': optimizedGnomeSort,
  'comb': combSort,
  'shell': shellSort,

  // Efficient O(n log n) sorting algorithms
  'merge': mergeSort,
  'quick': quickSort,
  'heap': heapSort,
  'tim': timSort,
  'intro': introSort,

  // Non-comparison based sorting algorithms
  'counting': extendedCountingSort,
  'radix': extendedRadixSort,
  'bucket': bucketSort
};

// Mapping of algorithm categories
const ALGORITHM_CATEGORIES: Record<string, string[]> = {
  'basic': ['bubble', 'selection', 'insertion', 'gnome', 'optimizedGnome', 'comb', 'shell'],
  'efficient': ['merge', 'quick', 'heap', 'tim', 'intro'],
  'nonComparison': ['counting', 'radix', 'bucket'],
  'all': Object.keys(ALL_SORT_FUNCTIONS)
};

// Helper functions for special array types
function nearSortedArray(size: number): number[] {
  const arr = Array.from({ length: size }, (_, i) => i);

  // Swap a small percentage of elements (5%)
  const swapsCount = Math.ceil(size * 0.05);
  for (let i = 0; i < swapsCount; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  return arr;
}

function reversedArray(size: number): number[] {
  return Array.from({ length: size }, (_, i) => size - i - 1);
}

// Parse command line arguments
program
  .name('npm run test --')
  .description('Test sorting algorithms with various array configurations')
  .option('-a, --algorithms <string>', 'Comma-separated list of algorithms to test or category ("basic", "efficient", "nonComparison", "all")', 'efficient')
  .option('-s, --sizes <string>', 'Comma-separated list of array sizes to test', '100,1000,10000')
  .option('-c, --configs <string>', 'Comma-separated list of predefined configs to test (random, nearlySorted, reversed, fewUnique)', 'all')
  .option('--seed <string>', 'Random seed for reproducible arrays', '')
  .option('-r, --runs <number>', 'Number of runs per test (avg time will be reported)', '1')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpText('after', '\nExample:\n  npm run test -- --algorithms "quick,merge" --sizes "10,100,1000,10000" --runs 2')
  .parse(process.argv);

const options = program.opts();

// Set up the random number generator with seed if provided
if (options.seed) {
  Logger.info(`Using seed: ${options.seed}`);
  (global as any).Math.random = seedrandom(options.seed);
}

// Determine which algorithms to run
let algorithmsToRun: string[] = [];

if (ALGORITHM_CATEGORIES[options.algorithms]) {
  // If the input is a category name, use all algorithms in that category
  algorithmsToRun = ALGORITHM_CATEGORIES[options.algorithms];
} else {
  // Otherwise, parse the comma-separated list
  algorithmsToRun = options.algorithms.split(',').map((name: string) => name.trim());

  // Check if all algorithms exist
  const invalidAlgorithms = algorithmsToRun.filter(name => !ALL_SORT_FUNCTIONS[name]);
  if (invalidAlgorithms.length > 0) {
    Logger.error(`Unknown algorithms: ${invalidAlgorithms.join(', ')}`);
    Logger.info(`Available algorithms: ${Object.keys(ALL_SORT_FUNCTIONS).join(', ')}`);
    Logger.info(`Available categories: ${Object.keys(ALGORITHM_CATEGORIES).join(', ')}`);
    process.exit(1);
  }
}

// Create the selected sort functions object
const selectedSortFunctions: Record<string, SortFunction> = {};
algorithmsToRun.forEach(name => {
  selectedSortFunctions[name] = ALL_SORT_FUNCTIONS[name];
});

// Parse array sizes
const sizes = options.sizes.split(',').map((s:string | number) => typeof s === 'number' ? s : parseInt(s.trim(), 10));

// Number of runs per test
const runs = parseInt(options.runs, 10);

Logger.section('Sorting Test Configuration');
Logger.keyValue('Algorithms', Object.keys(selectedSortFunctions).join(', '));
Logger.keyValue('Sizes to test', sizes.join(', '));
Logger.keyValue('Random Seed', options.seed || 'Not set (using Math.random)');
Logger.keyValue('Runs per test', runs.toString());

// Run tests for each size
Logger.section('Testing with different array sizes');
sizes.forEach((size:number) => {
  Logger.subsection(`Testing with array size: ${size}`);
  const testArray = generateRandomArray(size);
  compareSort(selectedSortFunctions, testArray, runs);
});

// Run tests for special configurations
Logger.section('Testing with special array configurations');

// Nearly sorted array
Logger.subsection('Testing with nearly sorted array');
const nearlySorted = nearSortedArray(1000);
compareSort(selectedSortFunctions, nearlySorted, runs);

// Reversed array
Logger.subsection('Testing with reversed array');
const reversed = reversedArray(1000);
compareSort(selectedSortFunctions, reversed, runs);

// Few unique values
Logger.subsection('Testing with few unique values');
const fewUnique = generateRandomArray(1000, 0, 10); // Only 11 possible values
compareSort(selectedSortFunctions, fewUnique, runs);
