/**
 * SearchTester.ts - Command-line interface for testing search algorithms
 *
 * This file provides a unified interface for running and comparing
 * search algorithms with various data structures.
 *
 * Run with:
 * npm run search-test -- [options]
 */

import {program} from 'commander';
import chalk from 'chalk';
import seedrandom from 'seedrandom';
import {LOG_LEVELS, Logger} from '../logger';

// Import utilities
import {
    ArraySearchFunction,
    displayComparisonResults,
    generateDataStructure,
    getAllValues,
    MatrixSearchFunction,
    parseAlgorithms,
    runArraySearch,
    runMatrixSearch,
    RunResult,
    runTreeSearch,
    selectSearchTargets,
    TreeSearchFunction
} from './utils';

// Import array search algorithms
import {linearSearch} from './algorithms/LinearSearch';
import {binarySearch, recursiveBinarySearch} from './algorithms/BinarySearch';
import {jumpSearch} from './algorithms/JumpSearch';
import {interpolationSearch} from './algorithms/InterpolationSearch';
import {exponentialSearch} from './algorithms/ExponentialSearch';
import {fibonacciSearch} from './algorithms/FibonacciSearch';

// Import matrix search algorithms
import {rowColumnSearch} from './algorithms/RowColumnSearch';
import {binarySearchMatrix} from './algorithms/BinarySearchMatrix';
import {staircaseSearch} from './algorithms/StaircaseSearch';
import {blockSearch} from './algorithms/BlockSearch';

// Import tree search algorithms
import {bstSearch, inorderDFS, postorderDFS, preorderDFS} from './algorithms/DFSSearch';
import {bfs} from './algorithms/BFSSearch';

/**
 * Union type for all search function types
 */
export type SearchFunction = ArraySearchFunction | MatrixSearchFunction | TreeSearchFunction;

/**
 * Search algorithm data structure type
 */
export interface AlgorithmInfo {
    name: string;
    type: 'array' | 'matrix' | 'tree';
    fn: SearchFunction;
}

// Create a full algorithm registry with functions
export const ALGORITHMS: Record<string, AlgorithmInfo> = {
    // Array search algorithms
    'linear': {name: 'linear', type: 'array', fn: linearSearch},
    'binary': {name: 'binary', type: 'array', fn: binarySearch},
    'recursiveBinary': {name: 'recursiveBinary', type: 'array', fn: recursiveBinarySearch},
    'jump': {name: 'jump', type: 'array', fn: jumpSearch},
    'interpolation': {name: 'interpolation', type: 'array', fn: interpolationSearch},
    'exponential': {name: 'exponential', type: 'array', fn: exponentialSearch},
    'fibonacci': {name: 'fibonacci', type: 'array', fn: fibonacciSearch},

    // Matrix search algorithms
    'rowColumn': {name: 'rowColumn', type: 'matrix', fn: rowColumnSearch},
    'binaryMatrix': {name: 'binaryMatrix', type: 'matrix', fn: binarySearchMatrix},
    'staircase': {name: 'staircase', type: 'matrix', fn: staircaseSearch},
    'block': {name: 'block', type: 'matrix', fn: blockSearch},

    // Tree search algorithms
    'preorderDFS': {name: 'preorderDFS', type: 'tree', fn: preorderDFS},
    'inorderDFS': {name: 'inorderDFS', type: 'tree', fn: inorderDFS},
    'postorderDFS': {name: 'postorderDFS', type: 'tree', fn: postorderDFS},
    'bst': {name: 'bst', type: 'tree', fn: bstSearch},
    'bfs': {name: 'bfs', type: 'tree', fn: bfs}
};

// Setup command line interface
program
    .name('search-test')
    .description('Test and compare search algorithms')
    .version('1.0.0')
    .option('-a, --algorithms <string>', 'Algorithm(s) to run (comma-separated list, category name, or "all")', 'all')
    .option('-d, --dimensions <string>', 'size or dimensions of matrix', '50x50')
    .option('--targets <number>', 'Number of search targets to test', '1')
    .option('--percent-present <number>', 'Percentage of targets present in data (0-100)', '50')
    .option('--seed <string>', 'Random seed for reproducible data')

    .option('-r, --runs <number>', 'Number of runs per algorithm', '4')
    .option('--min <number>', 'Minimum value in the array', '0')
    .option('--max <number>', 'Maximum value in the array', '0')
    .option('-l, --loglevel <level>', `Set logging level for algorithm execution (${Object.keys(LOG_LEVELS).join(', ')})`, 'none')
    .helpOption('-h, --help', 'Display help for command')

    .action((options) => {

        // Set up log level
        const logLevelName = options.loglevel.toLowerCase();
        if (!LOG_LEVELS.hasOwnProperty(logLevelName)) {
            Logger.error(`Unknown log level: ${logLevelName}`);
            Logger.info(`Available log levels: ${Object.keys(LOG_LEVELS).join(', ')}`);
            process.exit(1);
        }

        // Set the global log level
        Logger.setLogLevel(LOG_LEVELS[logLevelName]);

        // Set up a random seed if provided
        if (options.seed) {
            Logger.info(`Using seed: ${options.seed}`);
            (global as any).Math.random = seedrandom(options.seed);
        }

        // Parse sizes & options
        const dimensions: number[] = options.dimensions.split('x').map((size:string) => parseInt(size.trim(), 10));
        const min = parseInt(options.min, 10);
        const max = parseInt(options.max, 10) === 0 ? (dimensions[0] * dimensions[1]) : parseInt(options.max, 10);
        const runs = parseInt(options.runs, 10);

        // Parse algorithms
        const algorithmNames = parseAlgorithms(options.algorithms);

        if (algorithmNames.length === 0) {
            Logger.error('No valid algorithms specified');
            process.exit(1);
        }

        const targetsCount = parseInt(options.targets, 10);
        const percentPresent = parseInt(options.percentPresent, 10);

        // Store results for each algorithm
        const results: Record<string, {
            totalTime: number,
            successCount: number,
            avgTime: number,
            times: number[]
        }> = {};

        // Run tests for each type with its algorithms
        algorithmNames.forEach((name) => {
            const algoInfo: AlgorithmInfo = ALGORITHMS[name];

            results[algoInfo.name] = {
                totalTime: 0,
                successCount: 0,
                avgTime: 0,
                times: []
            };

            // Generate appropriate data structure
            const data = generateDataStructure(algoInfo.type, dimensions);
            const values = getAllValues(algoInfo.type, data);

            // Select search targets
            const targetObjects = selectSearchTargets(values, percentPresent, targetsCount);
            const target: number = targetObjects[0].target

            // Display test information
            Logger.section(`${algoInfo.type.charAt(0).toUpperCase() + algoInfo.type.slice(1)} Search Algorithm Comparison`);
            Logger.keyValue('Size', dimensions.join('x'));
            Logger.keyValue('Targets', targetsCount.toString());
            Logger.keyValue('Percent Present', `${percentPresent}%`);
            Logger.arrayPreview(`${algoInfo.type.charAt(0).toUpperCase() + algoInfo.type.slice(1)} Values Preview`, values);

            // Run tests for each target
            for (let i = 0; i < runs; i++) {

                // Test each algorithm with this target
                let result: RunResult;
                if (algoInfo.type === 'array') {
                    result = runArraySearch(algoInfo, data, target);
                } else if (algoInfo.type === 'matrix') {
                    result = runMatrixSearch(algoInfo, data, target);
                } else { // if (algoInfo.type === 'tree')
                    result = runTreeSearch(algoInfo, data, target);
                }

                // Update statistics
                results[name].totalTime += result.time;
                results[name].times.push(result.time);
                if (result.success) results[name].successCount++;
                displaySearchResult(algoInfo.type, result, result.time, true);

            }

            // Calculate average times
            Object.keys(results).forEach(name => {
                results[name].avgTime = results[name].totalTime / targetsCount;
            });

            // Create and display results table
            displayComparisonResults(results, targetsCount);

        });
    });

// Parse command line arguments
program.parse(process.argv);

// If no arguments provided, show help
if (process.argv.length <= 2) {
    program.help();
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
    if (!result.success) {
        console.log(`  ${chalk.red('Warning:')} Incorrect result!`);
    }

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
