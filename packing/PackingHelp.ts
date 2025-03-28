/**
 * PackingHelp.ts - Utility to display nicely formatted CLI help information for packing algorithms
 *
 * Run with:
 * npm run packing-help
 */

import chalk from 'chalk';
import { table, getBorderCharacters } from 'table';
import type { TableUserConfig } from 'table';
import { Logger } from '../logger';

// All packing algorithms organized by categories
const PACKING_ALGORITHM_CATEGORIES: Record<string, string[]> = {
  'bin': ['firstFitBin', 'bestFitBin', 'nextFitBin', 'worstFitBin'],
  'knapsack': ['zeroOneKnapsack', 'fractionalKnapsack', 'greedyKnapsack'],
  'rectangle': ['shelfRectangle', 'guillotineRectangle', 'maximalRectangles', 'skyline'],
  'strip': ['nextFitStrip', 'firstFitStrip', 'bestFitStrip'],
  'online': ['onlineFirstFit', 'onlineBestFit', 'onlineShelf', 'onlineSkyline'],
  'all': ['firstFitBin', 'bestFitBin', 'nextFitBin', 'worstFitBin',
         'zeroOneKnapsack', 'fractionalKnapsack', 'greedyKnapsack',
         'shelfRectangle', 'guillotineRectangle', 'maximalRectangles', 'skyline',
         'nextFitStrip', 'firstFitStrip', 'bestFitStrip',
         'onlineFirstFit', 'onlineBestFit', 'onlineShelf', 'onlineSkyline']
};

// Display main program header
function displayHeader(): void {
  console.log('\n' + chalk.bold.yellowBright('TypeScript Packing Algorithms CLI Helper'));
  console.log(chalk.dim('A comprehensive toolkit for testing and comparing packing algorithms\n'));
}

// Display available commands section
function displayCommands(): void {
  Logger.section('Available Commands');

  const commandsTable = [
    [chalk.bold('Command'), chalk.bold('Description')],
    ['npm run packing-test', 'Run and compare packing algorithms with configurable parameters'],
    ['npm run packing-help', 'Display this help information']
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

// Display packing command options with improved descriptions
function displayPackingOptions(): void {
  Logger.section('Packing Test Command Options');
  console.log(chalk.italic('npm run packing-test -- [options]\n'));

  const optionsTable = [
    [chalk.bold('Option'), chalk.bold('Description'), chalk.bold('Default')],
    ['-a, --algorithms <string>', 'Algorithm(s) to test (name, comma-separated list, or category)', 'all'],
    ['-c, --count <number>', 'Number of items to generate for packing', '100'],
    ['-w, --width <number>', 'Container width in logical units', '1000'],
    ['-h, --height <number>', 'Container height in logical units', '1000'],
    ['--item-type <type>', 'Item generation strategy (see Item Types section)', 'varied'],
    ['--max-item-width <number>', 'Maximum width of generated items', '200'],
    ['--max-item-height <number>', 'Maximum height of generated items', '200'],
    ['--seed <string>', 'Random seed for reproducible test results', ''],
    ['-v, --verbose', 'Display detailed packing information and item samples', '']
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

  // Example usage with better explanation
  console.log(chalk.bold('Example:'));
  console.log(chalk.blue('npm run packing-test -- --algorithms "firstFitBin,bestFitBin" --count 100 --item-type varied'));
  console.log(chalk.dim('Compares First Fit and Best Fit bin packing with 100 randomly sized items\n'));
}

// Display available algorithms with improved descriptions
function displayAlgorithms(): void {
  Logger.section('Available Packing Algorithms');

  // Bin packing algorithms
  Logger.subsection('Bin Packing Algorithms');
  console.log(chalk.dim('Goal: Minimize the number of containers needed to pack all items'));
  const binTable = [
    [chalk.bold('Algorithm'), chalk.bold('Description'), chalk.bold('Best For')],
    ['firstFitBin', 'Places item in the first bin that can fit it', 'General purpose, good balance of speed and efficiency'],
    ['bestFitBin', 'Places item in the bin that leaves least empty space', 'Maximizing space utilization, minimizing waste'],
    ['nextFitBin', 'Only checks the most recently used bin', 'Speed critical applications, simple implementation'],
    ['worstFitBin', 'Places item in the bin with most remaining space', 'Balanced load distribution across containers']
  ];
  console.log(table(binTable, {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 15 },
      1: { width: 35 },
      2: { width: 30 }
    }
  }));

  // Knapsack packing algorithms
  Logger.subsection('Knapsack Algorithms');
  console.log(chalk.dim('Goal: Maximize the value of items packed into a capacity-constrained container'));
  const knapsackTable = [
    [chalk.bold('Algorithm'), chalk.bold('Description'), chalk.bold('Best For')],
    ['zeroOneKnapsack', 'Classic dynamic programming knapsack solver', 'Optimal solution for indivisible items'],
    ['fractionalKnapsack', 'Allows items to be divided for optimal value', 'When items can be partially included'],
    ['greedyKnapsack', 'Sorts by value/weight ratio, quick approximation', 'Large datasets where exact solution is too costly']
  ];
  console.log(table(knapsackTable, {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 15 },
      1: { width: 35 },
      2: { width: 30 }
    }
  }));

  // Rectangle packing algorithms
  Logger.subsection('Rectangle Packing Algorithms');
  console.log(chalk.dim('Goal: Efficiently arrange rectangles within a 2D container to maximize space utilization'));
  const rectangleTable = [
    [chalk.bold('Algorithm'), chalk.bold('Description'), chalk.bold('Best For')],
    ['shelfRectangle', 'Organizes rectangles in horizontal shelves', 'Simple implementation, good for similar height items'],
    ['guillotineRectangle', 'Uses guillotine (straight line) cuts', 'When rectangles need to be extracted by cutting'],
    ['maximalRectangles', 'Tracks all maximal free rectangles', 'Highest space utilization, complex irregular packing'],
    ['skyline', 'Uses contour/skyline to track free space', 'Good balance of efficiency and space utilization']
  ];
  console.log(table(rectangleTable, {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 15 },
      1: { width: 35 },
      2: { width: 30 }
    }
  }));

  // Strip packing algorithms
  Logger.subsection('Strip Packing Algorithms');
  console.log(chalk.dim('Goal: Pack rectangles into a strip with fixed width and minimal height'));
  const stripTable = [
    [chalk.bold('Algorithm'), chalk.bold('Description'), chalk.bold('Best For')],
    ['nextFitStrip', 'Adds to current level or creates new one', 'Speed-critical applications, simple implementation'],
    ['firstFitStrip', 'Places in first level that fits', 'Better utilization than Next Fit, still fast'],
    ['bestFitStrip', 'Minimizes wasted horizontal space', 'Highest space efficiency in strip packing']
  ];
  console.log(table(stripTable, {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 15 },
      1: { width: 35 },
      2: { width: 30 }
    }
  }));

  // Online packing algorithms
  Logger.subsection('Online Packing Algorithms');
  console.log(chalk.dim('Goal: Efficiently pack items as they arrive with no knowledge of future items'));
  const onlineTable = [
    [chalk.bold('Algorithm'), chalk.bold('Description'), chalk.bold('Best For')],
    ['onlineFirstFit', 'First Fit adapted for sequential arrival', 'Real-time packing with good average performance'],
    ['onlineBestFit', 'Best Fit adapted for sequential arrival', 'Better space utilization in online scenarios'],
    ['onlineShelf', 'Shelf-based approach for online packing', 'Online packing of varied rectangular items'],
    ['onlineSkyline', 'Skyline strategy for online packing', 'Complex online packing with irregular shapes']
  ];
  console.log(table(onlineTable, {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 15 },
      1: { width: 35 },
      2: { width: 30 }
    }
  }));

  // Algorithm categories
  Logger.subsection('Algorithm Categories');
  console.log(`${chalk.cyan('bin')}: All bin packing algorithms (minimize number of containers)`);
  console.log(`${chalk.cyan('knapsack')}: All knapsack algorithms (maximize value within capacity)`);
  console.log(`${chalk.cyan('rectangle')}: All rectangle packing algorithms (2D container packing)`);
  console.log(`${chalk.cyan('strip')}: All strip packing algorithms (fixed width, minimize height)`);
  console.log(`${chalk.cyan('online')}: All online packing algorithms (sequential arrival)`);
  console.log(`${chalk.cyan('all')}: All available packing algorithms`);
}

// Display time complexity information with improved explanations
function displayTimeComplexity(): void {
  Logger.section('Time and Space Complexity');

  // Bin packing algorithms complexity
  Logger.subsection('Bin Packing Algorithms');
  const binComplexityTable = [
    [chalk.bold('Algorithm'), chalk.bold('Time Complexity'), chalk.bold('Space Complexity'), chalk.bold('Efficiency'), chalk.bold('Optimality')],
    ['First Fit Bin', 'O(n²)', 'O(n)', 'Medium', 'Approximation: ≤ 1.7 * optimal'],
    ['Best Fit Bin', 'O(n²)', 'O(n)', 'Medium', 'Approximation: ≤ 1.7 * optimal'],
    ['Next Fit Bin', 'O(n)', 'O(n)', 'High', 'Approximation: ≤ 2.0 * optimal'],
    ['Worst Fit Bin', 'O(n²)', 'O(n)', 'Medium', 'Approximation: ≤ 1.7 * optimal']
  ];

  const config: TableUserConfig = {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 15 },
      1: { width: 15 },
      2: { width: 15 },
      3: { width: 10 },
      4: { width: 25 }
    }
  };

  console.log(table(binComplexityTable, config));

  // Knapsack algorithms complexity
  Logger.subsection('Knapsack Algorithms');
  const knapsackComplexityTable = [
    [chalk.bold('Algorithm'), chalk.bold('Time Complexity'), chalk.bold('Space Complexity'), chalk.bold('Efficiency'), chalk.bold('Optimality')],
    ['0/1 Knapsack', 'O(nW)', 'O(nW)', 'Low', 'Optimal solution'],
    ['Fractional Knapsack', 'O(n log n)', 'O(n)', 'High', 'Optimal solution'],
    ['Greedy Knapsack', 'O(n log n)', 'O(n)', 'High', 'Approximation']
  ];

  console.log(table(knapsackComplexityTable, config));

  // Rectangle packing algorithms complexity
  Logger.subsection('Rectangle Packing Algorithms');
  const rectangleComplexityTable = [
    [chalk.bold('Algorithm'), chalk.bold('Time Complexity'), chalk.bold('Space Complexity'), chalk.bold('Efficiency'), chalk.bold('Optimality')],
    ['Shelf Packing', 'O(n log n)', 'O(n)', 'High', 'Approximation'],
    ['Guillotine Packing', 'O(n²)', 'O(n²)', 'Medium', 'Approximation'],
    ['Maximal Rectangles', 'O(n³)', 'O(n²)', 'Low', 'Good approximation'],
    ['Skyline Packing', 'O(n²)', 'O(n)', 'Medium', 'Good approximation']
  ];

  console.log(table(rectangleComplexityTable, config));

  // Strip packing algorithms complexity
  Logger.subsection('Strip Packing Algorithms');
  const stripComplexityTable = [
    [chalk.bold('Algorithm'), chalk.bold('Time Complexity'), chalk.bold('Space Complexity'), chalk.bold('Efficiency'), chalk.bold('Optimality')],
    ['Next Fit Strip', 'O(n)', 'O(n)', 'High', 'Approximation: ≤ 2.0 * optimal'],
    ['First Fit Strip', 'O(n²)', 'O(n)', 'Medium', 'Approximation: ≤ 1.7 * optimal'],
    ['Best Fit Strip', 'O(n²)', 'O(n)', 'Medium', 'Approximation: ≤ 1.7 * optimal']
  ];

  console.log(table(stripComplexityTable, config));

  // Online packing algorithms complexity
  Logger.subsection('Online Packing Algorithms');
  const onlineComplexityTable = [
    [chalk.bold('Algorithm'), chalk.bold('Time Complexity'), chalk.bold('Space Complexity'), chalk.bold('Efficiency'), chalk.bold('Optimality')],
    ['Online First Fit', 'O(n²)', 'O(n)', 'Medium', 'Competitive ratio: ≤ 1.7'],
    ['Online Best Fit', 'O(n²)', 'O(n)', 'Medium', 'Competitive ratio: ≤ 1.7'],
    ['Online Shelf', 'O(n log n)', 'O(n)', 'High', 'Competitive ratio varies'],
    ['Online Skyline', 'O(n²)', 'O(n)', 'Medium', 'Competitive ratio varies']
  ];

  console.log(table(onlineComplexityTable, config));

  console.log(`Where ${chalk.italic('n')} is the number of items and ${chalk.italic('W')} is the knapsack capacity.`);
  console.log(chalk.dim('Note: Approximation ratios indicate theoretical worst-case performance compared to optimal solution.'));
  console.log(chalk.dim('Competitive ratio indicates performance compared to an optimal offline algorithm with complete information.'));
}

// Display item type information
function displayItemTypes(): void {
  Logger.section('Item Set Types');

  const itemTypesTable = [
    [chalk.bold('Item Type'), chalk.bold('Description'), chalk.bold('Use Case')],
    ['uniform', 'Items with similar sizes and little variation', 'Testing algorithm efficiency with predictable inputs'],
    ['varied', 'Items with wide range of different dimensions', 'Simulating real-world heterogeneous items'],
    ['weighted', 'Items with assigned weights and values', 'Testing value optimization in knapsack problems'],
    ['correlated', 'Larger items have higher values (proportional)', 'Realistic scenarios where size correlates with value'],
    ['anticorrelated', 'Smaller items have higher values (inverse)', 'Testing algorithms with valuable but small items']
  ];

  const config: TableUserConfig = {
    border: getBorderCharacters('norc'),
    columns: {
      0: { width: 15 },
      1: { width: 35 },
      2: { width: 30 }
    }
  };

  console.log(table(itemTypesTable, config));
  console.log(chalk.dim('The item type significantly impacts algorithm performance. Select an appropriate type to match your real-world scenario.'));
}

// Display comparison scenarios with more detailed explanations
function displayComparisonScenarios(): void {
  Logger.section('Useful Comparison Scenarios');

  Logger.subsection('1. Efficiency Comparison (Bin Packing)');
  console.log(chalk.blue('npm run packing-test -- --algorithms "bin" --count 100 --item-type varied'));
  console.log(chalk.dim('This compares all bin packing algorithms with varied item sizes to see which minimizes the number of bins used.'));
  console.log(chalk.dim('Look for: Difference in number of containers used between First Fit and Best Fit\n'));

  Logger.subsection('2. Value Optimization (Knapsack)');
  console.log(chalk.blue('npm run packing-test -- --algorithms "knapsack" --count 50 --item-type weighted'));
  console.log(chalk.dim('Compares how different knapsack algorithms maximize value when packing weighted items.'));
  console.log(chalk.dim('Look for: Total value achieved with each approach (0/1 vs Fractional vs Greedy)\n'));

  Logger.subsection('3. Space Utilization (Rectangle Packing)');
  console.log(chalk.blue('npm run packing-test -- --algorithms "rectangle" --count 100 --max-item-width 150 --max-item-height 150'));
  console.log(chalk.dim('Tests rectangle packing algorithms with moderately-sized objects to measure space utilization.'));
  console.log(chalk.dim('Look for: Space utilization percentage, with Maximal Rectangles typically performing best\n'));

  Logger.subsection('4. Online vs. Offline Performance');
  console.log(chalk.blue('npm run packing-test -- --algorithms "firstFitBin,onlineFirstFit" --count 150'));
  console.log(chalk.dim('Directly compares an offline algorithm with its online counterpart to measure the "cost of not knowing."'));
  console.log(chalk.dim('Look for: How much worse the online algorithm performs without future knowledge\n'));

  Logger.subsection('5. Impact of Item Distribution');
  console.log(chalk.blue('npm run packing-test -- --algorithms "all" --count 100 --item-type uniform'));
  console.log(chalk.dim('Run this, then compare with "--item-type varied" to see how item distribution affects performance.'));
  console.log(chalk.dim('Look for: Algorithms that handle uniform items well may struggle with varied items\n'));

  Logger.subsection('6. Strip Height Minimization');
  console.log(chalk.blue('npm run packing-test -- --algorithms "strip" --width 800 --height 5000 --count 200'));
  console.log(chalk.dim('Tests strip packing algorithms to see which produces the lowest strip height.'));
  console.log(chalk.dim('Look for: Final container height as the key performance indicator\n'));
}

// Display tips for interpreting results
function displayInterpretationGuide(): void {
  Logger.section('Interpreting Test Results');

  Logger.subsection('Space Utilization');
  console.log(chalk.dim('Higher percentage means better packing efficiency. Look for:'));
  console.log('  • 90%+ : Excellent utilization');
  console.log('  • 70-90%: Good utilization');
  console.log('  • <70%  : Poor utilization');

  Logger.subsection('Execution Time');
  console.log(chalk.dim('Faster algorithms may sacrifice packing quality. Consider the tradeoff.'));
  console.log('  • For real-time applications, prioritize Next Fit or Online approaches');
  console.log('  • For pre-computation scenarios, Maximal Rectangles or Best Fit typically yield better results');

  Logger.subsection('Items Packed vs. Unpacked');
  console.log(chalk.dim('Sometimes algorithms cannot fit all items. This affects the overall result interpretation.'));
  console.log('  • Compare space utilization only when similar numbers of items are packed');
  console.log('  • An algorithm packing more items with slightly lower utilization may be preferable');

  Logger.subsection('Algorithm Selection Factors');
  console.log(chalk.dim('When choosing an algorithm, consider:'));
  console.log('  1. Item characteristics (size distribution, arrival pattern)');
  console.log('  2. Optimization goal (minimize containers, maximize value, etc.)');
  console.log('  3. Performance requirements (speed vs. quality)');
  console.log('  4. Implementation complexity');
}

/**
 * Main function to display all help information
 */
function main(): void {
  displayHeader();
  displayCommands();
  displayPackingOptions();
  displayAlgorithms();
  displayTimeComplexity();
  displayItemTypes();
  displayComparisonScenarios();
  displayInterpretationGuide();

  // Final note
  console.log(chalk.dim('\nFor more information and code examples, check the README.md file.\n'));
}

// Run the main function
main();
