/**
 * CompareSorts.ts - Compare multiple sorting algorithms on the same dataset
 *
 * Run with:
 * npm run compare -- [options]
 *
 * Example:
 * npm run compare -- --size 5000 --algorithms "quick,merge,heap" --runs 3
 */

import { program } from 'commander';
import seedrandom from 'seedrandom';
import { generateRandomArray, compareSort, SortFunction } from './utils';
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

// Parse command line arguments
program
  .name('npm run compare --')
  .description('Compare multiple sorting algorithms on the same dataset')
  .option('-s, --size <number>', 'Size of the array to sort', '1000')
  .option('-m, --min <number>', 'Minimum value in the array', '0')
  .option('-M, --max <number>', 'Maximum value in the array', '1000')
  .option('--seed <string>', 'Random seed for reproducible arrays', '')
  .option('-a, --algorithms <string>', 'Comma-separated list of algorithms to test, or use "basic", "efficient", "nonComparison", "all"', 'all')
  .option('-r, --runs <number>', 'Number of runs for each algorithm (avg time will be reported)', '1')
  .option('-v, --verbose', 'Show additional information about the test')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpText('after', '\nExample:\n  npm run compare -- --size 5000 --min 0 --max 10000 --algorithms "quick,merge,heap" --runs 3')
  .parse(process.argv);

const options = program.opts();

// Parse options
const size = parseInt(options.size, 10);
const min = parseInt(options.min, 10);
const max = parseInt(options.max, 10);
const seed = options.seed;
const runs = parseInt(options.runs, 10);
const verbose = options.verbose;

// Set up the random number generator with seed if provided
if (seed) {
  Logger.info(`Using seed: ${seed}`);
  (global as any).Math.random = seedrandom(seed);
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

// Configuration information
Logger.section('Sorting Comparison Configuration');
Logger.keyValue('Array Size', size.toString());
Logger.keyValue('Value Range', `[${min}, ${max}]`);
Logger.keyValue('Random Seed', seed || 'Not set (using Math.random)');
Logger.keyValue('Algorithms', Object.keys(selectedSortFunctions).join(', '));
Logger.keyValue('Number of runs', runs.toString());

// Generate test array
const testArray = generateRandomArray(size, min, max);

// Display array preview if verbose
if (verbose) {
  Logger.arrayPreview('Test Array Preview', testArray);
}

// Run the comparison
Logger.section('Sorting Algorithm Comparison');
compareSort(selectedSortFunctions, testArray, runs);
