/**
 * Help.ts - Utility to display nicely formatted CLI help information
 *
 * Run with:
 * npm run help
 */

import chalk from 'chalk';
import type {TableUserConfig} from 'table';
import {getBorderCharacters, table} from 'table';
import {Logger} from '../logger';

// All sorting algorithms organized by categories
const ALGORITHM_CATEGORIES: Record<string, string[]> = {
    'basic': ['bubble', 'selection', 'insertion', 'gnome', 'optimizedGnome', 'comb', 'shell'],
    'efficient': ['merge', 'quick', 'heap', 'tim', 'intro'],
    'nonComparison': ['counting', 'radix', 'bucket'],
    'all': ['bubble', 'selection', 'insertion', 'gnome', 'optimizedGnome', 'comb', 'shell',
        'merge', 'quick', 'heap', 'tim', 'intro', 'counting', 'radix', 'bucket']
};

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
        ['npm run sort', 'Run a specific sorting algorithm with configurable parameters'],
        ['npm run compare', 'Compare multiple sorting algorithms with the same dataset'],
        ['npm run test', 'Test sorting algorithms with different array configurations'],
        ['npm run help', 'Display this help information']
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

// Display sort command options
function displaySortOptions(): void {
    Logger.section('Sort Command Options');
    console.log(chalk.italic('npm run sort -- [options]\n'));

    const optionsTable = [
        [chalk.bold('Option'), chalk.bold('Description'), chalk.bold('Default')],
        ['-a, --algorithm <name>', 'Algorithm to run (required)', ''],
        ['-s, --size <number>', 'Size of the array to sort', '1000'],
        ['-m, --min <number>', 'Minimum value in the array', '0'],
        ['-M, --max <number>', 'Maximum value in the array', '1000'],
        ['--seed <string>', 'Random seed for reproducible arrays', ''],
        ['-v, --verbose', 'Show the entire sorted array', ''],
        ['-r, --runs <number>', 'Number of runs (avg time will be reported)', '1']
    ];

    const config: TableUserConfig = {
        border: getBorderCharacters('norc'),
        columns: {
            0: {width: 25},
            1: {width: 35},
            2: {width: 10}
        }
    };

    console.log(table(optionsTable, config));

    // Example usage
    console.log(chalk.bold('Example:'));
    console.log(chalk.blue('npm run sort -- --algorithm quick --size 1000 --min 0 --max 10000 --seed 12345 --runs 3\n'));
}

// Display compare command options
function displayCompareOptions(): void {
    Logger.section('Compare Command Options');
    console.log(chalk.italic('npm run compare -- [options]\n'));

    const optionsTable = [
        [chalk.bold('Option'), chalk.bold('Description'), chalk.bold('Default')],
        ['-s, --size <number>', 'Size of the array to sort', '1000'],
        ['-m, --min <number>', 'Minimum value in the array', '0'],
        ['-M, --max <number>', 'Maximum value in the array', '1000'],
        ['--seed <string>', 'Random seed for reproducible arrays', ''],
        ['-a, --algorithms <string>', 'Comma-separated list of algorithms or category', '"all"'],
        ['-r, --runs <number>', 'Number of runs for each algorithm', '1']
    ];

    const config = {
        border: getBorderCharacters('norc'),
        columns: {
            0: {width: 25},
            1: {width: 35},
            2: {width: 10}
        }
    };

    console.log(table(optionsTable, config));

    // Example usage
    console.log(chalk.bold('Example:'));
    console.log(chalk.blue('npm run compare -- --size 5000 --algorithms "quick,merge,heap" --runs 3\n'));
}

// Display test command options
function displayTestOptions(): void {
    Logger.section('Test Command Options');
    console.log(chalk.italic('npm run test -- [options]\n'));

    const optionsTable = [
        [chalk.bold('Option'), chalk.bold('Description'), chalk.bold('Default')],
        ['-a, --algorithms <string>', 'Comma-separated list of algorithms or category', '"efficient"'],
        ['-s, --sizes <string>', 'Comma-separated list of array sizes to test', '"100,1000,10000"'],
        ['--seed <string>', 'Random seed for reproducible arrays', ''],
        ['-r, --runs <number>', 'Number of runs per test', '1']
    ];

    const config = {
        border: getBorderCharacters('norc'),
        columns: {
            0: {width: 25},
            1: {width: 35},
            2: {width: 10}
        }
    };

    console.log(table(optionsTable, config));

    // Example usage
    console.log(chalk.bold('Example:'));
    console.log(chalk.blue('npm run test -- --algorithms "quick,merge" --sizes "10,100,1000,10000" --runs 2\n'));
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

/**
 * Main function to display all help information
 */
function main(): void {
    displayHeader();
    displayCommands();
    displaySortOptions();
    displayCompareOptions();
    displayTestOptions();
    displayAlgorithms();
    displayTimeComplexity();

    // Final note
    console.log(chalk.dim('\nFor more information, check the README.md file.\n'));
}

// Run the main function
main();
