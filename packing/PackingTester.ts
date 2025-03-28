/**
 * PackingTester.ts - Command-line interface for testing packing algorithms
 *
 * This file provides a unified interface for running and comparing
 * packing algorithms with various data sets.
 *
 * Run with:
 * npm run packing-test -- [options]
 */

import { program } from 'commander';
import chalk from 'chalk';
import seedrandom from 'seedrandom';
import { Logger } from '../logger';

// Import utilities
import {
  ItemSetType,
  Item,
  Container,
  PackingResult,
  PackingFunction,
  generateItems,
  createContainerSpec,
  comparePackingAlgorithms,
  runPackingAlgorithm,
  verifyPacking
} from './utils';

// Import bin packing algorithms
import {
  firstFitBinPacking,
  bestFitBinPacking,
  nextFitBinPacking,
  worstFitBinPacking
} from './algorithms/BinPacking';

// Import knapsack packing algorithms
import {
  zeroOneKnapsack,
  fractionalKnapsack,
  greedyKnapsack
} from './algorithms/KnapsackPacking';

// Import rectangle packing algorithms
import {
  shelfRectanglePacking,
  guillotineRectanglePacking,
  maximalRectanglesPacking,
  skylinePacking
} from './algorithms/RectanglePacking';

// Import strip packing algorithms
import {
  nextFitStripPacking,
  firstFitStripPacking,
  bestFitStripPacking
} from './algorithms/StripPacking';

// Import online packing algorithms
import {
  onlineFirstFit,
  onlineBestFit,
  onlineShelf,
  onlineSkyline
} from './algorithms/OnlinePacking';

// Create a full algorithm registry with functions
const ALGORITHMS: Record<string, PackingFunction> = {
  // Bin packing algorithms
  'firstFitBin': firstFitBinPacking,
  'bestFitBin': bestFitBinPacking,
  'nextFitBin': nextFitBinPacking,
  'worstFitBin': worstFitBinPacking,

  // Knapsack packing algorithms
  'zeroOneKnapsack': zeroOneKnapsack,
  'fractionalKnapsack': fractionalKnapsack,
  'greedyKnapsack': greedyKnapsack,

  // Rectangle packing algorithms
  'shelfRectangle': shelfRectanglePacking,
  'guillotineRectangle': guillotineRectanglePacking,
  'maximalRectangles': maximalRectanglesPacking,
  'skyline': skylinePacking,

  // Strip packing algorithms
  'nextFitStrip': nextFitStripPacking,
  'firstFitStrip': firstFitStripPacking,
  'bestFitStrip': bestFitStripPacking,

  // Online packing algorithms
  'onlineFirstFit': onlineFirstFit,
  'onlineBestFit': onlineBestFit,
  'onlineShelf': onlineShelf,
  'onlineSkyline': onlineSkyline
};

// Mapping of algorithm categories
const ALGORITHM_CATEGORIES: Record<string, string[]> = {
  'bin': ['firstFitBin', 'bestFitBin', 'nextFitBin', 'worstFitBin'],
  'knapsack': ['zeroOneKnapsack', 'fractionalKnapsack', 'greedyKnapsack'],
  'rectangle': ['shelfRectangle', 'guillotineRectangle', 'maximalRectangles', 'skyline'],
  'strip': ['nextFitStrip', 'firstFitStrip', 'bestFitStrip'],
  'online': ['onlineFirstFit', 'onlineBestFit', 'onlineShelf', 'onlineSkyline'],
  'all': Object.keys(ALGORITHMS)
};

// Parse command line arguments
program
  .name('packing-test')
  .description('Test and compare packing algorithms')
  .version('1.0.0')
  .option('-a, --algorithms <string>', 'Algorithm(s) to run (comma-separated list, category name, or "all")', 'all')
  .option('-c, --count <number>', 'Number of items to generate', '100')
  .option('-w, --width <number>', 'Container width', '1000')
  .option('-h, --height <number>', 'Container height', '1000')
  .option('--item-type <type>', `Type of items (${Object.values(ItemSetType).join(', ')})`, ItemSetType.VARIED)
  .option('--max-item-width <number>', 'Maximum item width', '200')
  .option('--max-item-height <number>', 'Maximum item height', '200')
  .option('--seed <string>', 'Random seed for reproducible data')
  .option('-v, --verbose', 'Show detailed information about packing', false)
  .action((options) => {
    // Set random seed if provided
    if (options.seed) {
      global.Math.random = seedrandom(options.seed);
    }

    // Parse algorithms
    let algorithmNames: string[] = [];
    if (options.algorithms.includes(',')) {
      algorithmNames = options.algorithms.split(',').map((name: string) => name.trim());
    } else if (ALGORITHM_CATEGORIES[options.algorithms]) {
      algorithmNames = ALGORITHM_CATEGORIES[options.algorithms];
    } else if (ALGORITHMS[options.algorithms]) {
      algorithmNames = [options.algorithms];
    } else {
      algorithmNames = ALGORITHM_CATEGORIES['all'];
    }

    // Validate algorithms
    algorithmNames = algorithmNames.filter(name => {
      if (!ALGORITHMS[name]) {
        Logger.warning(`Unknown algorithm: ${name}`);
        return false;
      }
      return true;
    });

    if (algorithmNames.length === 0) {
      Logger.error('No valid algorithms specified');
      process.exit(1);
    }

    // Parse options
    const itemCount = parseInt(options.count, 10);
    const containerWidth = parseInt(options.width, 10);
    const containerHeight = parseInt(options.height, 10);
    const maxItemWidth = parseInt(options.maxItemWidth, 10);
    const maxItemHeight = parseInt(options.maxItemHeight, 10);
    const itemType = options.itemType as ItemSetType;
    const verbose = options.verbose;

    // Generate items
    const items = generateItems(itemCount, maxItemWidth, maxItemHeight, itemType);

    // Create container specification
    const containerSpec = createContainerSpec(containerWidth, containerHeight);

    // Display test configuration
    Logger.section('Test Configuration');
    Logger.keyValue('Container Size', `${containerWidth} x ${containerHeight}`);
    Logger.keyValue('Item Count', itemCount.toString());
    Logger.keyValue('Item Type', chalk.cyan(itemType));
    Logger.keyValue('Max Item Size', `${maxItemWidth} x ${maxItemHeight}`);
    Logger.keyValue('Random Seed', options.seed || 'Not specified');
    Logger.keyValue('Algorithms', algorithmNames.map(name => chalk.magenta(name)).join(', '));

    if (verbose) {
      // Display item preview
      Logger.subsection('Item Sample');
      for (let i = 0; i < Math.min(5, items.length); i++) {
        console.log(`  Item ${i}: ${items[i].width} x ${items[i].height}`);
      }
      if (items.length > 5) {
        console.log(`  ... and ${items.length - 5} more items`);
      }
    }

    // Create algorithm map
    const selectedAlgorithms: Record<string, PackingFunction> = {};
    algorithmNames.forEach(name => {
      selectedAlgorithms[name] = ALGORITHMS[name];
    });

    // Run algorithms and compare
    comparePackingAlgorithms(selectedAlgorithms, items, containerSpec, verbose);
  });

// Parse command line arguments
program.parse(process.argv);

// If no arguments provided, show help
if (process.argv.length <= 2) {
  program.help();
}
