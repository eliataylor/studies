/**
 * SortTester.ts - Unified testing framework for sorting algorithms
 *
 * Run with:
 * npm run sort-test -- [options]
 *
 * Examples:
 * - Test a single algorithm:
 *   npm run sort-test -- --algorithms quick --size 1000 --sortedness 0
 *
 * - Compare multiple algorithms:
 *   npm run sort-test -- --algorithms "quick,merge,heap" --size 5000 --sortedness 50 --runs 3
 */

import { program } from 'commander';
import seedrandom from 'seedrandom';
import chalk from 'chalk';
import { Logger } from '../logger';
import {
  generateArray,
  ArrayType,
  compareAlgorithms,
  type SortFunction
} from './utils';

// Import all sorting algorithms
import { bubbleSort } from './algorithms/BubbleSort';
import { selectionSort } from './algorithms/SelectionSort';
import { insertionSort } from './algorithms/InsertionSort';
import { mergeSort } from './algorithms/MergeSort';
import { quickSort } from './algorithms/QuickSort';
import { heapSort } from './algorithms/HeapSort';
import { extendedCountingSort } from './algorithms/CountingSort';
import { extendedRadixSort } from './algorithms/RadixSort';
import { bucketSort } from './algorithms/BucketSort';
import { shellSort } from './algorithms/ShellSort';
import { timSort } from './algorithms/TimSort';
import { introSort } from './algorithms/IntroSort';
import { combSort } from './algorithms/CombSort';
import { gnomeSort, optimizedGnomeSort } from './algorithms/GnomeSort';

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
  .name('npm run sort-test --')
  .description('Unified testing framework for sorting algorithms')
  .option('-A, --algorithms <string>', 'Comma-separated list of algorithms to test, single algorithm, or category ("basic", "efficient", "nonComparison", "all")')
  .option('-s, --size <number>', 'Size of the array to sort', '1000')
  .option('--min <number>', 'Minimum value in the array', '0')
  .option('--max <number>', 'Maximum value in the array', '1000')
  .option('--seed <string>', 'Random seed for reproducible arrays')
  .option('-r, --runs <number>', 'Number of runs per algorithm', '1')
  .option('-t, --arrayType <type>', `Type of array to generate (${Object.values(ArrayType).join(', ')})`, ArrayType.RANDOM)
  .option('--sortedness <number>', 'Level of sortedness from 0 (random) to 100 (sorted)', '0')
  .option('--verbose <number>', 'Show additional details including array previews')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpText('after', `
Examples:
  - Test a single algorithm:
    npm run sort-test -- --algorithms quick --size 1000 --sortedness 0
  
  - Compare multiple algorithms:
    npm run sort-test -- --algorithms "quick,merge,heap" --size 5000 --sortedness 50 --runs 3
  
  - Use predefined array types with sortedness:
    npm run sort-test -- --algorithms "efficient" --arrayType reversed --sortedness 80 --size 1000
  
  - Test all algorithms with few unique values:
    npm run sort-test -- --algorithms all --arrayType fewUnique --size 1000 --runs 2
  `)
  .parse(process.argv);

const options = program.opts();

// Set up a random seed if provided
if (options.seed) {
  Logger.info(`Using seed: ${options.seed}`);
  (global as any).Math.random = seedrandom(options.seed);
}

// Parse options
const size = parseInt(options.size, 10);
const min = parseInt(options.min, 10);
const max = parseInt(options.max, 10);
const runs = parseInt(options.runs, 10);
const sortedness = Math.max(0, Math.min(100, parseInt(options.sortedness, 10)));
const arrayType = options.arrayType as ArrayType;
const verbose = parseInt(options.verbose);

// Determine which algorithms to run
let selectedAlgorithms: Record<string, SortFunction> = {};

if (options.algorithms) {
  const algorithmsInput = options.algorithms;

  // Check if it's a single algorithm (no commas)
  if (!algorithmsInput.includes(',') && ALL_SORT_FUNCTIONS[algorithmsInput]) {
    // Single algorithm mode
    selectedAlgorithms[algorithmsInput] = ALL_SORT_FUNCTIONS[algorithmsInput];
  } else if (ALGORITHM_CATEGORIES[algorithmsInput]) {
    // Use a predefined category
    ALGORITHM_CATEGORIES[algorithmsInput].forEach(algo => {
      selectedAlgorithms[algo] = ALL_SORT_FUNCTIONS[algo];
    });
  } else {
    // Parse comma-separated list
    const algoNames = algorithmsInput.split(',').map((name: string) => name.trim());

    // Validate algorithms
    const invalidAlgos = algoNames.filter((name:string) => !ALL_SORT_FUNCTIONS[name]);
    if (invalidAlgos.length > 0) {
      Logger.error(`Unknown algorithms: ${invalidAlgos.join(', ')}`);
      Logger.info(`Available algorithms: ${Object.keys(ALL_SORT_FUNCTIONS).join(', ')}`);
      Logger.info(`Available categories: ${Object.keys(ALGORITHM_CATEGORIES).join(', ')}`);
      process.exit(1);
    }

    // Add to selected algorithms
    algoNames.forEach((name:string) => {
      selectedAlgorithms[name] = ALL_SORT_FUNCTIONS[name];
    });
  }
} else {
  // Default to comparing efficient algorithms
  Logger.info(chalk.yellow('No algorithms specified, using default "all" category'));
  ALGORITHM_CATEGORIES['all'].forEach(algo => {
    selectedAlgorithms[algo] = ALL_SORT_FUNCTIONS[algo];
  });
}

// Configuration information
Logger.section('Test Configuration');
Logger.keyValue('Array Size', size.toString());
Logger.keyValue('Value Range', `[${min}, ${max}]`);
Logger.keyValue('Array Type', chalk.cyan(arrayType));
Logger.keyValue('Sortedness Level', `${chalk.yellow(sortedness.toString())}%`);
Logger.keyValue('Random Seed', options.seed ? chalk.green(options.seed) : chalk.gray('Not set (using Math.random)'));
Logger.keyValue('Algorithms', Object.keys(selectedAlgorithms).map(algo => chalk.magenta(algo)).join(', '));
Logger.keyValue('Number of runs', chalk.bold(runs.toString()));

// Generate test array
const testArray = generateArray(size, min, max, sortedness, arrayType);

// Display array preview if verbose
if (verbose) {
  Logger.arrayPreview('Test Array Preview', testArray);
}

// Run the algorithm comparison
compareAlgorithms(selectedAlgorithms, testArray, runs, verbose);
