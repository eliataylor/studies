/**
 * Help.ts - Utility to display nicely formatted CLI help information
 *
 * Run with:
 * npm run sort-help
 */

import chalk from 'chalk';
import type {TableUserConfig} from 'table';
import {getBorderCharacters, table} from 'table';
import {Logger} from '../logger';
import {ArrayType} from './utils';
import {ALGORITHM_CATEGORIES} from "./SortTester";

// Display main program header
function displayHeader(): void {
    console.log('\n' + chalk.bold.yellowBright('TypeScript Sorting Algorithms CLI Helper'));
    console.log(chalk.dim('A set of command-line utilities to test and compare sorting algorithms\n'));
}

// Display available commands section
function displayCommands(): void {
    Logger.section('Available Commands');

    const commandsTable = [
        [chalk.bold('Command'), chalk.bold('Description')],
        ['npm run sort-test', 'Run and test sorting algorithms with configurable parameters'],
        ['npm run sort-help', 'Display this help information']
    ];

    const config: TableUserConfig = {
        border: getBorderCharacters('norc'),
        columns: {
            0: {width: 20},
            1: {width: 50}
        }
    };

    console.log(table(commandsTable, config));
}

// Display sort-test command options
function displaySortTestOptions(): void {
    Logger.section('Sort-Test Command Options');
    console.log(chalk.italic('npm run sort-test -- [options]\n'));

    const optionsTable = [
        [chalk.bold('Option'), chalk.bold('Description'), chalk.bold('Default')],
        ['-A, --algorithms <string>', 'Comma-separated list of algorithms, single algorithm, or category ("basic", "efficient", "nonComparison", "all")', '"all"'],
        ['-s, --size <number>', 'Size of the array to sort', '1000'],
        ['--min <number>', 'Minimum value in the array', '0'],
        ['--max <number>', 'Maximum value in the array', '1000'],
        ['--seed <string>', 'Random seed for reproducible arrays', ''],
        ['-r, --runs <number>', 'Number of runs per algorithm', '1'],
        ['-t, --arrayType <type>', `Type of array to generate (${Object.values(ArrayType).join(', ')})`, 'ascending'],
        ['--sortedness <number>', 'Level of sortedness from 0 (random) to 100 (sorted)', '0'],
        ['--uniqueness <number>', 'Level of uniqueness from 0 (all same) to 100 (all unique)', '100'],
        ['-l, --loglevel <level>', 'Set logging level (none, error, info, debug, trace)', 'none'],
        ['-h, --help', 'Display help information', '']
    ];

    const config: TableUserConfig = {
        border: getBorderCharacters('norc'),
        columns: {
            0: {width: 30},
            1: {width: 40},
            2: {width: 10}
        }
    };

    console.log(table(optionsTable, config));

    // Example usage
    console.log(chalk.bold('Examples:'));
    console.log(chalk.blue('npm run sort-test -- --algorithms quick --size 1000 --min 0 --max 10000 --seed 12345 --runs 3'));
    console.log(chalk.blue('npm run sort-test -- --algorithms "quick,merge,heap" --size 5000 --sortedness 50 --runs 3'));
    console.log(chalk.blue('npm run sort-test -- --algorithms "efficient" --arrayType descending --sortedness 80 --size 1000\n'));
}

// Display available algorithms
function displayAlgorithms(): void {
    Logger.section('Available Sorting Algorithms');

    // Basic algorithms
    Logger.subsection('Basic O(n²) Algorithms');
    console.log(ALGORITHM_CATEGORIES.basic.map(algo => chalk.magenta(algo)).join(', '));

    // Efficient algorithms
    Logger.subsection('Efficient O(n log n) Algorithms');
    console.log(ALGORITHM_CATEGORIES.efficient.map(algo => chalk.magenta(algo)).join(', '));

    // Non-comparison algorithms
    Logger.subsection('Non-comparison Based Algorithms');
    console.log(ALGORITHM_CATEGORIES.nonComparison.map(algo => chalk.magenta(algo)).join(', '));

    // Algorithm categories
    Logger.subsection('Algorithm Categories');
    console.log(`${chalk.cyan('basic')}: All basic O(n²) algorithms`);
    console.log(`${chalk.cyan('efficient')}: All efficient O(n log n) algorithms`);
    console.log(`${chalk.cyan('nonComparison')}: All non-comparison based algorithms`);
    console.log(`${chalk.cyan('all')}: All available algorithms`);
}

// Display time complexity information
function displayTimeComplexity(): void {
    Logger.section('Time and Space Complexity');

    const complexityTable = [
        [chalk.bold('Algorithm'), chalk.bold('Best Time'), chalk.bold('Average Time'), chalk.bold('Worst Time'), chalk.bold('Space'), chalk.bold('Stable')],
        ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
        ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', 'No'],
        ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
        ['Gnome Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
        ['Optimized Gnome', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
        ['Comb Sort', 'O(n log n)', 'O(n²/2ᵖ)', 'O(n²)', 'O(1)', 'No'],
        ['Shell Sort', 'O(n log n)', 'O(n(log n)²)', 'O(n²)', 'O(1)', 'No'],
        ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes'],
        ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'No'],
        ['Heap Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', 'No'],
        ['Tim Sort', 'O(n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes'],
        ['Intro Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(log n)', 'No'],
        ['Counting Sort', 'O(n + k)', 'O(n + k)', 'O(n + k)', 'O(n + k)', 'Yes'],
        ['Radix Sort', 'O(nk)', 'O(nk)', 'O(nk)', 'O(n + k)', 'Yes'],
        ['Bucket Sort', 'O(n + k)', 'O(n + k)', 'O(n²)', 'O(n + k)', 'Yes']
    ];

    const config: TableUserConfig = {
        border: getBorderCharacters('norc'),
        columns: {
            0: {width: 15},
            1: {width: 12},
            2: {width: 15},
            3: {width: 12},
            4: {width: 8},
            5: {width: 5}
        }
    };

    console.log(table(complexityTable, config));
    console.log(`Where ${chalk.italic('n')} is the number of elements and ${chalk.italic('k')} is the range of values or number of digits.`);
}

// Display information about array types and sortedness
function displayArrayOptions(): void {
    Logger.section('Array Options and Configurations');

    Logger.subsection('Array Types');
    console.log(`${chalk.bold('ascending')}: Array is sorted in ascending order (1, 2, 3, ...)`);
    console.log(`${chalk.bold('descending')}: Array is sorted in descending order (3, 2, 1, ...)`);

    Logger.subsection('Sortedness Level');
    console.log(`Sortedness controls how sorted the initial array is (0-100%):`);
    console.log(`${chalk.bold('0%')}: Completely random array`);
    console.log(`${chalk.bold('100%')}: Perfectly sorted according to the array type`);
    console.log(`${chalk.bold('Values in between')}: Partially sorted array`);

    Logger.subsection('Uniqueness Level');
    console.log(`Uniqueness controls the percentage of unique values in the array (0-100%):`);
    console.log(`${chalk.bold('0%')}: All values are the same (many duplicates)`);
    console.log(`${chalk.bold('100%')}: All values are unique (no duplicates)`);
    console.log(`${chalk.bold('Values in between')}: Controls the ratio of unique values to duplicates`);

    Logger.subsection('Examples');
    console.log(`${chalk.bold('--arrayType ascending --sortedness 100')}: Completely sorted in ascending order`);
    console.log(`${chalk.bold('--arrayType descending --sortedness 100')}: Completely sorted in descending order`);
    console.log(`${chalk.bold('--arrayType ascending --sortedness 80')}: Mostly sorted ascending with some shuffling`);
    console.log(`${chalk.bold('--arrayType ascending --sortedness 0')}: Completely random array`);
    console.log(`${chalk.bold('--uniqueness 50')}: Approximately half of the values will be unique`);
}

/**
 * Main function to display all help information
 */
function main(): void {
    displayHeader();
    displayCommands();
    displaySortTestOptions();
    displayAlgorithms();
    displayArrayOptions();
    displayTimeComplexity();

    // Final note
    console.log(chalk.dim('\nFor more information, check the README.md and EXAMPLES.md files.\n'));
}

// Run the main function
main();
