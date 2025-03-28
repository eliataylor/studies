/**
 * SearchTester.ts - Command-line interface for testing search algorithms
 *
 * This file provides a unified interface for running and comparing
 * search algorithms with various data structures.
 *
 * Run with:
 * npm run search-test -- [options]
 */

import { program } from 'commander';
import chalk from 'chalk';
import { Logger } from '../logger';
import seedrandom from 'seedrandom';

// Import utilities
import {
  AlgorithmInfo,
  SearchFunction,
  ArraySearchFunction,
  MatrixSearchFunction,
  TreeSearchFunction,
  ALGORITHMS_REGISTRY,
  ALGORITHM_CATEGORIES,
  selectSearchTargets,
  parseAlgorithms,
  parseSizes,
  groupAlgorithmsByType,
  displayComparisonResults,
  runSearchAlgorithm,
  generateDataStructure,
  getAllValues
} from './utils';

// Import array search algorithms
import { linearSearch } from './algorithms/LinearSearch';
import { binarySearch, recursiveBinarySearch } from './algorithms/BinarySearch';
import { jumpSearch } from './algorithms/JumpSearch';
import { interpolationSearch } from './algorithms/InterpolationSearch';
import { exponentialSearch } from './algorithms/ExponentialSearch';
import { fibonacciSearch } from './algorithms/FibonacciSearch';

// Import matrix search algorithms
import { rowColumnSearch } from './algorithms/RowColumnSearch';
import { binarySearchMatrix } from './algorithms/BinarySearchMatrix';
import { staircaseSearch } from './algorithms/StaircaseSearch';
import { blockSearch } from './algorithms/BlockSearch';

// Import tree search algorithms
import { preorderDFS, inorderDFS, postorderDFS, bstSearch } from './algorithms/DFSSearch';
import { bfs } from './algorithms/BFSSearch';

// Create a full algorithm registry with functions
const ALGORITHMS: Record<string, AlgorithmInfo> = {
  // Array search algorithms
  'linear': { type: 'array', fn: linearSearch },
  'binary': { type: 'array', fn: binarySearch },
  'recursiveBinary': { type: 'array', fn: recursiveBinarySearch },
  'jump': { type: 'array', fn: jumpSearch },
  'interpolation': { type: 'array', fn: interpolationSearch },
  'exponential': { type: 'array', fn: exponentialSearch },
  'fibonacci': { type: 'array', fn: fibonacciSearch },

  // Matrix search algorithms
  'rowColumn': { type: 'matrix', fn: rowColumnSearch },
  'binaryMatrix': { type: 'matrix', fn: binarySearchMatrix },
  'staircase': { type: 'matrix', fn: staircaseSearch },
  'block': { type: 'matrix', fn: blockSearch },

  // Tree search algorithms
  'preorderDFS': { type: 'tree', fn: preorderDFS },
  'inorderDFS': { type: 'tree', fn: inorderDFS },
  'postorderDFS': { type: 'tree', fn: postorderDFS },
  'bst': { type: 'tree', fn: bstSearch },
  'bfs': { type: 'tree', fn: bfs }
};

// Setup command line interface
program
  .name('search-test')
  .description('Test and compare search algorithms')
  .version('1.0.0')
  .option('-a, --algorithms <string>', 'Algorithm(s) to run (comma-separated list, category name, or "all")', 'all')
  .option('-s, --sizes <string>', 'Comma-separated list of data sizes to test', '1000')
  .option('--targets <number>', 'Number of search targets to test', '10')
  .option('--percent-present <number>', 'Percentage of targets present in data (0-100)', '50')
  .option('--seed <string>', 'Random seed for reproducible data')
  .option('-v, --verbose', 'Show detailed information about searches', false)
  .option('--compare', 'Compare multiple algorithms (automatically used if multiple algorithms specified)', false)
  .action((options) => {
    // Set random seed if provided
    if (options.seed) {
      global.Math.random = seedrandom(options.seed);
    }

    // Parse algorithms
    const algorithmNames = parseAlgorithms(options.algorithms);

    if (algorithmNames.length === 0) {
      Logger.error('No valid algorithms specified');
      process.exit(1);
    }

    // Parse sizes
    let sizes: number[];
    if (options.sizes.includes(',')) {
      sizes = parseSizes(options.sizes);
    } else {
      sizes = [parseInt(options.sizes, 10)];
    }

    const targetsCount = parseInt(options.targets, 10);
    const percentPresent = parseInt(options.percentPresent, 10);

    // Force compare mode if multiple algorithms
    const compareMode = options.compare || algorithmNames.length > 1 || sizes.length > 1;

    if (compareMode) {
      // Group algorithms by type
      const groupedAlgorithms = groupAlgorithmsByType(algorithmNames);

      // Run tests for each size
      for (const size of sizes) {
        // If we have multiple sizes, show a section header
        if (sizes.length > 1) {
          Logger.section(`Testing with size: ${size}`);
        }

        // Run tests for each type with its algorithms
        Object.entries(groupedAlgorithms).forEach(([type, algos]) => {
          if (algos.length > 0) {
            const algoMap: Record<string, SearchFunction> = {};
            algos.forEach(algo => {
              algoMap[algo] = ALGORITHMS[algo].fn as SearchFunction;
            });

            compareAlgorithms(type, algoMap, size, targetsCount, percentPresent, options.verbose);
          }
        });
      }
    } else {
      // Single algorithm mode
      const algo = algorithmNames[0];
      const type = ALGORITHMS[algo].type;
      const size = sizes[0];

      runSingleAlgorithm(algo, ALGORITHMS[algo].fn as SearchFunction, type, size, targetsCount, percentPresent, options.verbose);
    }
  });

// Parse command line arguments
program.parse(process.argv);

// If no arguments provided, show help
if (process.argv.length <= 2) {
  program.help();
}

// ===== Implementation of test functions =====

/**
 * Run a single algorithm test
 */
function runSingleAlgorithm(
  algorithmName: string,
  algorithm: SearchFunction,
  type: string,
  size: number,
  targetsCount: number,
  percentPresent: number,
  verbose: boolean
): void {
  // Display test information
  Logger.section(`Testing ${chalk.magenta(algorithmName)} Search`);

  // Generate appropriate data structure
  const data = generateDataStructure(type, size);
  const values = getAllValues(type, data);

  // Select search targets
  const targetObjects = selectSearchTargets(values, percentPresent, targetsCount);

  // Display test information
  Logger.keyValue('Data Structure', type.charAt(0).toUpperCase() + type.slice(1));

  switch (type) {
    case 'array':
      Logger.keyValue('Size', size.toString());
      break;
    case 'matrix':
      Logger.keyValue('Size', `${size}x${size}`);
      break;
    case 'tree':
      Logger.keyValue('Size', size.toString());
      break;
  }

  Logger.keyValue('Targets', targetsCount.toString());
  Logger.keyValue('Percent Present', `${percentPresent}%`);

  if (verbose) {
    if (type === 'array' || (type === 'tree' && size <= 20)) {
      Logger.arrayPreview(`${type.charAt(0).toUpperCase() + type.slice(1)} Values Preview`, values);
    } else if (type === 'matrix' && size <= 10) {
      // Display matrix preview for small matrices
      Logger.subsection('Matrix Preview');
      const matrixStr = (data as number[][]).map(row => row.join('\t')).join('\n');
      console.log(matrixStr);
      console.log('');
    }
  }

  // Run tests for each target
  let totalTime = 0;
  let successCount = 0;

  targetObjects.forEach((targetObj, i) => {
    const { target, exists } = targetObj;

    // Run the search
    Logger.info(`Searching for ${chalk.yellow(target.toString())} (${exists ? chalk.green('exists') : chalk.red('does not exist')})`);
    const result = runSearchAlgorithm(algorithm, type, data, target, algorithmName);

    totalTime += result.time;
    if (result.success) successCount++;

    // Display result
    displaySearchResult(type, result, result.time);

    if (!result.success) {
      Logger.error('Incorrect result!');
    }
  });

  // Display summary
  Logger.section('Test Summary');
  Logger.keyValue('Total Execution Time', `${totalTime.toFixed(4)} ms`);
  Logger.keyValue('Average Time per Search', `${(totalTime / targetsCount).toFixed(4)} ms`);
  Logger.keyValue('Success Rate', `${(successCount / targetsCount * 100).toFixed(2)}%`);
}

/**
 * Compare multiple algorithms
 */
function compareAlgorithms(
  type: string,
  algorithms: Record<string, SearchFunction>,
  size: number,
  targetsCount: number,
  percentPresent: number,
  verbose: boolean
): void {
  // Generate appropriate data structure
  const data = generateDataStructure(type, size);
  const values = getAllValues(type, data);

  // Select search targets
  const targetObjects = selectSearchTargets(values, percentPresent, targetsCount);

  // Display test information
  Logger.section(`${type.charAt(0).toUpperCase() + type.slice(1)} Search Algorithm Comparison`);

  switch (type) {
    case 'array':
      Logger.keyValue('Size', size.toString());
      break;
    case 'matrix':
      Logger.keyValue('Size', `${size}x${size}`);
      break;
    case 'tree':
      Logger.keyValue('Size', size.toString());
      break;
  }

  Logger.keyValue('Targets', targetsCount.toString());
  Logger.keyValue('Percent Present', `${percentPresent}%`);
  Logger.keyValue('Algorithms', Object.keys(algorithms).join(', '));

  if (verbose) {
    if (type === 'array' || (type === 'tree' && size <= 20)) {
      Logger.arrayPreview(`${type.charAt(0).toUpperCase() + type.slice(1)} Values Preview`, values);
    } else if (type === 'matrix' && size <= 10) {
      // Display matrix preview for small matrices
      Logger.subsection('Matrix Preview');
      const matrixStr = (data as number[][]).map(row => row.join('\t')).join('\n');
      console.log(matrixStr);
      console.log('');
    }
  }

  // Store results for each algorithm
  const results: Record<string, {
    totalTime: number,
    successCount: number,
    avgTime: number,
    times: number[]
  }> = {};

  // Initialize results
  Object.keys(algorithms).forEach(name => {
    results[name] = {
      totalTime: 0,
      successCount: 0,
      avgTime: 0,
      times: []
    };
  });

  // Run tests for each target
  targetObjects.forEach((targetObj, i) => {
    const { target, exists } = targetObj;

    if (verbose) {
      Logger.subsection(`Target ${i+1}: ${target} (${exists ? 'exists' : 'does not exist'})`);
    }

    // Test each algorithm with this target
    for (const [name, algorithm] of Object.entries(algorithms)) {
      const result = runSearchAlgorithm(algorithm, type, data, target, name);

      // Update statistics
      results[name].totalTime += result.time;
      results[name].times.push(result.time);
      if (result.success) results[name].successCount++;

      if (verbose) {
        // console.log(`  ${chalk.magenta(name)}: `, end='');
        displaySearchResult(type, result, result.time, true);

        if (!result.success) {
          console.log(`  ${chalk.red('Warning:')} Incorrect result!`);
        }
      }
    }
  });

  // Calculate average times
  Object.keys(results).forEach(name => {
    results[name].avgTime = results[name].totalTime / targetsCount;
  });

  // Create and display results table
  displayComparisonResults(results, targetsCount);
}

/**
 * Display a search result based on the data structure type
 */
function displaySearchResult(
  type: string,
  result: any,
  time: number,
  isIndented: boolean = false
): void {
  const prefix = isIndented ? '  ' : '';

  switch (type) {
    case 'array':
      if (result.result !== -1) {
        Logger.success(`${prefix}Found at index: ${result.result} (${time.toFixed(4)} ms)`);
      } else {
        Logger.info(`${prefix}Not found (${time.toFixed(4)} ms)`);
      }
      break;

    case 'matrix':
      if (result.result !== null) {
        Logger.success(`${prefix}Found at position: [${result.result[0]}, ${result.result[1]}] (${time.toFixed(4)} ms)`);
      } else {
        Logger.info(`${prefix}Not found (${time.toFixed(4)} ms)`);
      }
      break;

    case 'tree':
      if (result.found) {
        Logger.success(`${prefix}Found in tree (${time.toFixed(4)} ms)`);
      } else {
        Logger.info(`${prefix}Not found (${time.toFixed(4)} ms)`);
      }
      break;
  }
}
