/**
 * RunSort.ts - Run a specific sorting algorithm with configurable parameters
 *
 * Run with:
 * npm run sort -- [options]
 *
 * Example:
 * npm run sort -- --algorithm quick --size 1000 --min 0 --max 10000 --seed 12345
 */

import { program } from 'commander';
import seedrandom from 'seedrandom';
import { generateRandomArray, runSort, SortFunction } from './utils';
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
const SORT_FUNCTIONS: Record<string, SortFunction> = {
  'bubble': bubbleSort,
  'selection': selectionSort,
  'insertion': insertionSort,
  'gnome': gnomeSort,
  'optimizedGnome': optimizedGnomeSort,
  'comb': combSort,
  'shell': shellSort,
  'merge': mergeSort,
  'quick': quickSort,
  'heap': heapSort,
  'tim': timSort,
  'intro': introSort,
  'counting': extendedCountingSort,
  'radix': extendedRadixSort,
  'bucket': bucketSort
};

// Parse command line arguments
program
  .name('npm run sort --')
  .description('Run a specific sorting algorithm with configurable parameters')
  .requiredOption('-a, --algorithm <name>', `Algorithm to run (options: ${Object.keys(SORT_FUNCTIONS).join(', ')})`)
  .option('-s, --size <number>', 'Size of the array to sort', '1000')
  .option('-m, --min <number>', 'Minimum value in the array', '0')
  .option('-M, --max <number>', 'Maximum value in the array', '1000')
  .option('--seed <string>', 'Random seed for reproducible arrays', '')
  .option('-v, --verbose', 'Show the entire sorted array (careful with large arrays)')
  .option('-r, --runs <number>', 'Number of runs (avg time will be reported)', '1')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpText('after', '\nExample:\n  npm run sort -- --algorithm quick --size 1000 --min 0 --max 10000 --seed 12345 --runs 3')
  .parse(process.argv);

const options = program.opts();

// Parse options
const algorithmName = options.algorithm;
const size = parseInt(options.size, 10);
const min = parseInt(options.min, 10);
const max = parseInt(options.max, 10);
const seed = options.seed;
const verbose = options.verbose;
const runs = parseInt(options.runs, 10);

// Check if the algorithm exists
if (!SORT_FUNCTIONS[algorithmName]) {
  Logger.error(`Unknown algorithm "${algorithmName}"`);
  Logger.info(`Available options: ${Object.keys(SORT_FUNCTIONS).join(', ')}`);
  process.exit(1);
}

// Set up the random number generator with seed if provided
if (seed) {
  Logger.info(`Using seed: ${seed}`);
  (global as any).Math.random = seedrandom(seed);
}

// Configuration information
Logger.section(`${algorithmName.charAt(0).toUpperCase() + algorithmName.slice(1)} Sort Configuration`);
Logger.keyValue('Array Size', size.toString());
Logger.keyValue('Value Range', `[${min}, ${max}]`);
Logger.keyValue('Random Seed', seed || 'Not set (using Math.random)');
Logger.keyValue('Number of runs', runs.toString());

// Generate the test array
const testArray = generateRandomArray(size, min, max);

// Small preview of the array (before sorting)
Logger.arrayPreview('Original Array Preview', testArray);

// Run the sorting algorithm with detailed output
let totalTime = 0;
const algorithm = SORT_FUNCTIONS[algorithmName];
const displayName = algorithmName.charAt(0).toUpperCase() + algorithmName.slice(1);

for (let i = 0; i < runs; i++) {
  // Create a copy of the test array for each run
  const arrayCopy = [...testArray];

  // Measure execution time
  const startTime = performance.now();
  const sortedArray = algorithm(arrayCopy);
  const endTime = performance.now();

  // Calculate execution time
  const executionTime = endTime - startTime;
  totalTime += executionTime;

  if (runs > 1) {
    Logger.algorithmResult(displayName, executionTime, i + 1);
  }

  // Display sorted array if it's the final run or only one run
  if (i === runs - 1) {
    // Show sorted array preview
    if (verbose) {
      Logger.arrayPreview('Sorted Array', sortedArray);
    } else {
      Logger.arrayPreview('Sorted Array Preview', sortedArray);
    }

    // Verify the array is sorted correctly
    if (isSorted(sortedArray)) {
      Logger.success('Array correctly sorted');
    } else {
      Logger.error('Array is NOT correctly sorted!');
    }
  }
}

// Print average execution time
const avgTime = totalTime / runs;
Logger.section(`Performance Summary`);
Logger.keyValue(`Average Execution Time (${runs} run${runs !== 1 ? 's' : ''})`, `${avgTime.toFixed(4)} ms`);

// Helper function to check if array is sorted
function isSorted(array: number[]): boolean {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
}
