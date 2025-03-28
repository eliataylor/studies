/**
 * logger.ts - Colorful logging utilities for sorting algorithms
 */

import chalk from 'chalk';
import { table, getBorderCharacters } from 'table';
import type { TableUserConfig } from 'table';

/**
 * Logger class for colorful console output
 */
export class Logger {
  /**
   * Log a section header with a title
   */
  static section(title: string): void {
    console.log('\n' + chalk.bold.blue('=== ' + title + ' ==='));
  }

  /**
   * Log a subsection header
   */
  static subsection(title: string): void {
    console.log('\n' + chalk.bold.cyan('▶ ' + title));
  }

  /**
   * Log success message
   */
  static success(message: string): void {
    console.log(chalk.green('✓ ' + message));
  }

  /**
   * Log error message
   */
  static error(message: string): void {
    console.log(chalk.red('✗ ' + message));
  }

  /**
   * Log warning message
   */
  static warning(message: string): void {
    console.log(chalk.yellow('⚠ ' + message));
  }

  /**
   * Log info message
   */
  static info(message: string): void {
    console.log(chalk.white(message));
  }

  /**
   * Log a key-value pair
   */
  static keyValue(key: string, value: string | number): void {
    console.log(chalk.bold(key + ': ') + value);
  }

  /**
   * Log algorithm timing result
   */
  static algorithmResult(name: string, time: number, run?: number): void {
    if (run !== undefined) {
      console.log(
        chalk.magenta(name) +
        chalk.dim(' (Run ' + run + '): ') +
        chalk.yellow(time.toFixed(4) + ' ms')
      );
    } else {
      console.log(
        chalk.magenta(name) +
        ': ' +
        chalk.yellow(time.toFixed(4) + ' ms')
      );
    }
  }

  /**
   * Log array preview
   */
  static arrayPreview(title: string, array: number[], maxItems: number = 10): void {
    console.log(chalk.bold('\n' + title + ':'));

    if (array.length <= maxItems * 2) {
      console.log(`[${array.join(', ')}]`);
    } else {
      const firstItems = array.slice(0, maxItems);
      const lastItems = array.slice(-maxItems);
      console.log(`First ${maxItems} elements: [${firstItems.join(', ')}]`);
      console.log(`Last ${maxItems} elements: [${lastItems.join(', ')}]`);
    }
  }

  /**
   * Create a table with algorithm comparison results
   */
  static comparisonTable(
    results: { name: string; avgTime: number; allTimes: number[] }[]
  ): void {
    // Table headers
    const data = [
      [
        chalk.bold('Algorithm'),
        chalk.bold('Avg Time (ms)'),
        chalk.bold('Min (ms)'),
        chalk.bold('Max (ms)')
      ]
    ];

    // Add rows for each algorithm
    results.forEach((result) => {
      const minTime = Math.min(...result.allTimes);
      const maxTime = Math.max(...result.allTimes);

      data.push([
        chalk.magenta(result.name),
        chalk.yellow(result.avgTime.toFixed(4)),
        chalk.green(minTime.toFixed(4)),
        chalk.red(maxTime.toFixed(4))
      ]);
    });

    // Create table config
    const config: TableUserConfig = {
      border: getBorderCharacters('norc'),
      columns: {
        0: { alignment: 'left' as const },
        1: { alignment: 'right' as const },
        2: { alignment: 'right' as const },
        3: { alignment: 'right' as const }
      }
    };

    // Display table
    console.log(table(data, config));
  }

  /**
   * Create a table with relative performance comparison
   */
  static relativePerformanceTable(
    results: { name: string; avgTime: number }[]
  ): void {
    // Only create table if there are results
    if (results.length <= 1) return;

    // Get fastest algorithm time as baseline
    const fastestTime = results[0].avgTime;

    // Table headers
    const data = [
      [chalk.bold('Algorithm'), chalk.bold('Relative Speed')]
    ];

    // Add rows for each algorithm with relative speed
    results.forEach((result) => {
      const relativeSpeed = result.avgTime / fastestTime;

      // Determine color based on performance
      let speedColor = chalk.green;
      if (relativeSpeed > 2) speedColor = chalk.yellow;
      if (relativeSpeed > 5) speedColor = chalk.red;

      data.push([
        chalk.magenta(result.name),
        speedColor(relativeSpeed.toFixed(2) + 'x')
      ]);
    });

    // Create table config
    const config: TableUserConfig = {
      border: getBorderCharacters('norc'),
      columns: {
        0: { alignment: 'left' as const },
        1: { alignment: 'right' as const }
      }
    };

    // Display table
    console.log(table(data, config));
  }
}
