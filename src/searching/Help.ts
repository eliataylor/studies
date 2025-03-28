/**
 * SearchHelp.ts - Utility to display nicely formatted CLI help information for search algorithms
 *
 * Run with:
 * npm run search-help
 */

import chalk from 'chalk';
import { table, getBorderCharacters } from 'table';
import type { TableUserConfig } from 'table';
import { Logger } from '../logger';

// All search algorithms organized by categories
const SEARCH_ALGORITHM_CATEGORIES: Record<string, string[]> = {
  'array': ['linear', 'binary', 'recursiveBinary', 'jump', 'interpolation', 'exponential', 'fibonacci'],
  'matrix': ['rowColumn', 'binaryMatrix', 'staircase', 'block'],
  'tree': ['preorderDFS', 'inorderDFS', 'postorderDFS', 'bst', 'bfs'],
  'all': ['linear', 'binary', 'recursiveBinary', 'jump', 'interpolation', 'exponential', 'fibonacci',
          'rowColumn', 'binaryMatrix', 'staircase', 'block',
          'preorderDFS', 'inorderDFS', 'postorderDFS', 'bst', 'bfs']
};

// Display main program header
function displayHeader(): void {
  console.log('\n' + chalk.bold.yellowBright('TypeScript Search Algorithms CLI Helper'));
  console.log(chalk.dim('A set of command-line utilities to test and compare search algorithms\n'));
}

// Display available commands section
function displayCommands(): void {
  Logger.section('Available Commands');

  const commandsTable = [
    [chalk.bold('Command'), chalk.bold('Description')],
    ['npm run search', 'Run a specific search algorithm with configurable parameters'],
    ['npm run search-compare', 'Compare multiple search algorithms with the same dataset'],
    ['npm run search-test', 'Test search algorithms with different data configurations'],
    ['npm run search-help', 'Display this help information']
  ];

  const config: TableUserConfig = {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 25 },
      1: { width: 50 }
    }
  };

  console.log(table(commandsTable, config));
}

// Display search command options
function displaySearchOptions(): void {
  Logger.section('Search Command Options');
  console.log(chalk.italic('npm run search -- [options]\n'));

  const optionsTable = [
    [chalk.bold('Option'), chalk.bold('Description'), chalk.bold('Default')],
    ['-a, --algorithm <name>', 'Algorithm to run (required)', ''],
    ['-t, --type <type>', 'Data structure type (array, matrix, tree)', 'array'],
    ['-s, --size <number>', 'Size of the data structure', '1000'],
    ['--targets <number>', 'Number of search targets to test', '10'],
    ['--percent-present <number>', 'Percentage of targets present in data (0-100)', '50'],
    ['--seed <string>', 'Random seed for reproducible data', ''],
    ['-v, --verbose', 'Show detailed information about searches', '']
  ];

  const config: TableUserConfig = {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 25 },
      1: { width: 35 },
      2: { width: 10 }
    }
  };

  console.log(table(optionsTable, config));

  // Example usage
  console.log(chalk.bold('Example:'));
  console.log(chalk.blue('npm run search -- --algorithm binary --type array --size 1000 --targets 5 --seed 12345\n'));
}

// Display compare command options
function displayCompareOptions(): void {
  Logger.section('Compare Command Options');
  console.log(chalk.italic('npm run search-compare -- [options]\n'));

  const optionsTable = [
    [chalk.bold('Option'), chalk.bold('Description'), chalk.bold('Default')],
    ['-t, --type <type>', 'Data structure type (array, matrix, tree)', 'array'],
    ['-s, --size <number>', 'Size of the data structure', '1000'],
    ['--targets <number>', 'Number of search targets to test', '10'],
    ['--percent-present <number>', 'Percentage of targets present in data (0-100)', '50'],
    ['--seed <string>', 'Random seed for reproducible data', ''],
    ['-a, --algorithms <string>', 'Comma-separated list of algorithms or category', '"all"'],
    ['-v, --verbose', 'Show detailed information about searches', '']
  ];

  const config = {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 25 },
      1: { width: 35 },
      2: { width: 10 }
    }
  };

  console.log(table(optionsTable, config));

  // Example usage
  console.log(chalk.bold('Example:'));
  console.log(chalk.blue('npm run search-compare -- --type array --algorithms "binary,linear,jump" --size 10000\n'));
}

// Display test command options
function displayTestOptions(): void {
  Logger.section('Test Command Options');
  console.log(chalk.italic('npm run search-test -- [options]\n'));

  const optionsTable = [
    [chalk.bold('Option'), chalk.bold('Description'), chalk.bold('Default')],
    ['-t, --type <type>', 'Data structure type (array, matrix, tree)', 'array'],
    ['-a, --algorithms <string>', 'Comma-separated list of algorithms or category', '"all"'],
    ['-s, --sizes <string>', 'Comma-separated list of data sizes to test', '"100,1000,10000"'],
    ['--targets <number>', 'Number of search targets to test', '5'],
    ['--percent-present <number>', 'Percentage of targets present in data (0-100)', '50'],
    ['--seed <string>', 'Random seed for reproducible data', '']
  ];

  const config = {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 25 },
      1: { width: 35 },
      2: { width: 10 }
    }
  };

  console.log(table(optionsTable, config));

  // Example usage
  console.log(chalk.bold('Example:'));
  console.log(chalk.blue('npm run search-test -- --type array --algorithms "binary,linear" --sizes "10,100,1000,10000"\n'));
}

// Display available algorithms
function displayAlgorithms(): void {
  Logger.section('Available Search Algorithms');

  // Array search algorithms
  Logger.subsection('Array Search Algorithms');
  console.log(SEARCH_ALGORITHM_CATEGORIES.array.map(algo => chalk.magenta(algo)).join(', '));

  // Matrix search algorithms
  Logger.subsection('Matrix Search Algorithms');
  console.log(SEARCH_ALGORITHM_CATEGORIES.matrix.map(algo => chalk.magenta(algo)).join(', '));

  // Tree search algorithms
  Logger.subsection('Tree Search Algorithms');
  console.log(SEARCH_ALGORITHM_CATEGORIES.tree.map(algo => chalk.magenta(algo)).join(', '));

  // Algorithm categories
  Logger.subsection('Algorithm Categories');
  console.log(`${chalk.cyan('array')}: All array search algorithms`);
  console.log(`${chalk.cyan('matrix')}: All matrix search algorithms`);
  console.log(`${chalk.cyan('tree')}: All tree search algorithms`);
  console.log(`${chalk.cyan('all')}: All available search algorithms`);
}

// Display time complexity information
function displayTimeComplexity(): void {
  Logger.section('Time and Space Complexity');

  // Array search algorithms complexity
  Logger.subsection('Array Search Algorithms');
  const arrayComplexityTable = [
    [chalk.bold('Algorithm'), chalk.bold('Best Time'), chalk.bold('Average Time'), chalk.bold('Worst Time'), chalk.bold('Space'), chalk.bold('Requirements')],
    ['Linear Search', 'O(1)', 'O(n)', 'O(n)', 'O(1)', 'None'],
    ['Binary Search', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)', 'Sorted array'],
    ['Recursive Binary Search', 'O(1)', 'O(log n)', 'O(log n)', 'O(log n)', 'Sorted array'],
    ['Jump Search', 'O(1)', 'O(√n)', 'O(√n)', 'O(1)', 'Sorted array'],
    ['Interpolation Search', 'O(1)', 'O(log log n)', 'O(n)', 'O(1)', 'Sorted, uniform distribution'],
    ['Exponential Search', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)', 'Sorted array'],
    ['Fibonacci Search', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)', 'Sorted array']
  ];

  const config: TableUserConfig = {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 20 },
      1: { width: 12 },
      2: { width: 15 },
      3: { width: 12 },
      4: { width: 8 },
      5: { width: 25 }
    }
  };

  console.log(table(arrayComplexityTable, config));

  // Matrix search algorithms complexity
  Logger.subsection('Matrix Search Algorithms');
  const matrixComplexityTable = [
    [chalk.bold('Algorithm'), chalk.bold('Best Time'), chalk.bold('Average Time'), chalk.bold('Worst Time'), chalk.bold('Space'), chalk.bold('Requirements')],
    ['Row-Column Search', 'O(1)', 'O(m+n)', 'O(m+n)', 'O(1)', 'Sorted rows and columns'],
    ['Binary Search Matrix', 'O(1)', 'O(log(m*n))', 'O(log(m*n))', 'O(1)', 'Sorted matrix'],
    ['Staircase Search', 'O(1)', 'O(m+n)', 'O(m+n)', 'O(1)', 'Sorted rows and columns'],
    ['Block Search', 'O(1)', 'O(√(m*n))', 'O(m+n)', 'O(1)', 'Sorted matrix']
  ];

  console.log(table(matrixComplexityTable, config));

  // Tree search algorithms complexity
  Logger.subsection('Tree Search Algorithms');
  const treeComplexityTable = [
    [chalk.bold('Algorithm'), chalk.bold('Best Time'), chalk.bold('Average Time'), chalk.bold('Worst Time'), chalk.bold('Space'), chalk.bold('Notes')],
    ['Preorder DFS', 'O(1)', 'O(n)', 'O(n)', 'O(h)', 'h is tree height'],
    ['Inorder DFS', 'O(1)', 'O(n)', 'O(n)', 'O(h)', 'Good for BST traversal'],
    ['Postorder DFS', 'O(1)', 'O(n)', 'O(n)', 'O(h)', 'Used for deletion'],
    ['BST Search', 'O(1)', 'O(log n)', 'O(n)', 'O(h)', 'Balanced BST: O(log n)'],
    ['BFS', 'O(1)', 'O(n)', 'O(n)', 'O(w)', 'w is max tree width']
  ];

  console.log(table(treeComplexityTable, config));
  console.log(`Where ${chalk.italic('n')} is the number of elements, ${chalk.italic('m')} and ${chalk.italic('n')} are matrix dimensions, ${chalk.italic('h')} is tree height, and ${chalk.italic('w')} is tree width.`);
}

/**
 * Main function to display all help information
 */
function main(): void {
  displayHeader();
  displayCommands();
  displaySearchOptions();
  displayCompareOptions();
  displayTestOptions();
  displayAlgorithms();
  displayTimeComplexity();

  // Final note
  console.log(chalk.dim('\nFor more information, check the README.md file.\n'));
}

// Run the main function
main();
