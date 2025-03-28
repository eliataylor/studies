/**
 * utils.ts - Enhanced utilities for testing sorting algorithms
 *
 * This file provides:
 * 1. Functions to generate various types of test arrays
 * 2. Utility functions to run sorting algorithms and measure performance
 * 3. Functions to verify sorting correctness
 * 4. Framework for sorting algorithm comparisons
 */

import chalk from 'chalk';
import {getBorderCharacters, table} from 'table';
import {Logger} from '../logger';

/**
 * Type definition for sorting functions
 */
export type SortFunction = (arr: number[]) => number[];

/**
 * Predefined array types
 */
export enum ArrayType {
    RANDOM = 'random',      // Completely random array (actually controlled by sortedness = 0)
    SORTED = 'ascending',      // Perfectly sorted array
    REVERSED = 'descending',  // Reversed order array
}

/**
 * Generates an array based on the specified type and sortedness level
 *
 * @param size The size of the array
 * @param sortedness Level of sortedness from 0 (completely random) to 100 (fully sorted)
 * @param min Minimum value in the array
 * @param max Maximum value in the array
 * @param arrayType The base type of array to generate
 * @returns An array of numbers
 */
export function generateArray(
    size: number,
    sortedness: number = 0,
    min: number = 0,
    max: number = 1000,
    arrayType: ArrayType = ArrayType.SORTED
): number[] {

    // Method to generate random array with even distribution
    let array: number[] = [];

    if (max - min >= size) {
        // Generate random array, with random value distribution ranging from min to max
        const baseValues = new Set<number>();
        let test = Math.floor(Math.random() * (max - min + 1)) + min;
        for (let i = 0; i < size - 1; i++) {
            while (baseValues.has(test) && baseValues.size < size && baseValues.size < max - min) {
                test = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            baseValues.add(test);
        }
        array = Array.from(baseValues);
    } else {
        // Generate random array with EVEN value distribution ranging from min to max, since max - min < size.
        // This means some duplicates are required TODO: include alpha numeric values to avoid duplicates
        const step = (max - min) / (size - 1 || 1);
        array = Array.from(
            {length: size},
            (_, i) => {
                return Math.round(min + i * step)
            }
        ).sort(() => Math.random() - 0.5);
    }

    if (sortedness === 100) {
        return array; // return completely random array
    }

    switch (arrayType) {
        case ArrayType.SORTED:
            array.sort((a, b) => a - b);
            break;

        case ArrayType.REVERSED: // worst case for many algorithms
            array.sort((a, b) => b - a);
            break;

        default:
            break;
    }

    if (sortedness === 0) {
        return array; // return completely sorted array
    }

    const sortedCount = Math.floor((sortedness / 100) * size);
    const unsortedCount = size - sortedCount;

    // TODO: add argument to control if unsorted area is only a specific area of array
    for (let i = 0; i < unsortedCount; i++) {
        let fromIndex = Math.floor(Math.random() * size);
        let toIndex = Math.floor(Math.random() * size);
        while (fromIndex === toIndex) {
            toIndex = Math.floor(Math.random() * size);
        }
        const original = array[fromIndex];
        array[fromIndex] = array[toIndex];
        array[toIndex] = original;
    }

    return array;
}

/**
 * Checks if an array is sorted in ascending order
 * @param array The array to check
 * @returns True if the array is sorted, false otherwise
 */
export function isSorted(array: number[]): boolean {
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Runs a single sorting algorithm and returns performance metrics
 * @param sortFunction The sorting function to run
 * @param array The array to sort
 * @param runs The number of runs to perform
 * @returns Performance metrics including execution times and success status
 */
export function runSort(
    sortFunction: SortFunction,
    array: number[],
    runs: number = 1
): { times: number[], avgTime: number, success: boolean } {
    const times: number[] = [];
    let success = true;

    for (let i = 0; i < runs; i++) {
        // Create a copy of the array
        const arrayCopy = [...array];

        // Measure execution time
        const startTime = performance.now();
        const sortedArray = sortFunction(arrayCopy);
        const endTime = performance.now();

        // Calculate execution time
        const executionTime = endTime - startTime;
        times.push(executionTime);

        // Check if sorting was successful (only need to check once)
        if (i === 0) {
            success = isSorted(sortedArray);
        }
    }

    // Calculate average execution time
    const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;

    return {times, avgTime, success};
}

/**
 * Compares multiple sorting algorithms and displays the results
 * @param algorithms Object mapping algorithm names to sorting functions
 * @param array The array to sort
 * @param runs Number of runs to perform (default: 1)
 */
export function compareAlgorithms(
    algorithms: Record<string, SortFunction>,
    array: number[],
    runs: number = 1,
    verbose: number = 0
): void {
    // Store results for each algorithm
    const results: { name: string, avgTime: number, times: number[], success: boolean }[] = [];
    let testCount = 0;

    // Test each algorithm
    for (const [name, func] of Object.entries(algorithms)) {
        testCount++;
        Logger.preloader(`Testing ${chalk.magenta(name)}... (${testCount}/${Object.keys(algorithms).length})`);
        const result = runSort(func, array, runs);
        results.push({
            name,
            avgTime: result.avgTime,
            times: result.times,
            success: result.success
        });
    }

    Logger.completePreloader(`${testCount} tests completed successfully`);

    // Sort results by average time (fastest first)
    results.sort((a, b) => a.avgTime - b.avgTime);

    // Display results
    Logger.section('Sorting Results');

    // Create table data
    const tableData = [
        [
            chalk.bold.cyan('Algorithm'),
            chalk.bold.cyan('Avg Time (ms)'),
            chalk.bold.cyan('Min Time (ms)'),
            chalk.bold.cyan('Max Time (ms)'),
            chalk.bold.cyan('Status')
        ]
    ];

    if (results.length === 1) {
        // Add data for each algorithm
        results.forEach((result, index) => {
            // Highlight the fastest algorithm
            const algoName = index === 0
                ? chalk.green.bold(result.name)
                : chalk.magenta(result.name);

            tableData.push([
                algoName,
                result.avgTime.toFixed(4),
                Math.min(...result.times).toFixed(4),
                Math.max(...result.times).toFixed(4),
                result.success ? chalk.green('✓ Success') : chalk.red('✗ Failed')
            ]);
        });

        // Display the table
        console.log(table(tableData, {
            border: getBorderCharacters('norc'),
            columnDefault: {
                alignment: 'right'
            },
            columns: {
                0: {alignment: 'left'}
            }
        }));
    } else {
        Logger.subsection('Relative Performance');

        const fastestTime = results[0].avgTime;
        const relativeTableData = [
            [chalk.bold.cyan('Algorithm'), chalk.bold.cyan('Relative Speed')]
        ];

        results.forEach((result, index) => {
            const relativeSpeed = result.avgTime / fastestTime;

            const comparisonStr = index === 0
                ? chalk.green.bold(`FASTEST (${result.avgTime.toFixed(4)} ms)`)
                : chalk.yellow(`${((relativeSpeed - 1) * 100).toFixed(1)}% slower (${result.avgTime.toFixed(4)} ms)`);

            relativeTableData.push([
                index === 0 ? chalk.green.bold(result.name) : chalk.magenta(result.name),
                comparisonStr
            ]);
        });

        console.log(table(relativeTableData, {
            border: getBorderCharacters('norc'),
            columns: {
                0: {alignment: 'left'},
                1: {alignment: 'left'}
            }
        }));
    }
}
