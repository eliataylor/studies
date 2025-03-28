/**
 * logger.ts - Enhanced logging utility with colorful formatting
 *
 * This file provides functions for consistently formatted console output
 * with color styling for better readability.
 */

import chalk from 'chalk';

export class Logger {
  /**
   * Display a major section header
   */
  static section(title: string): void {
    console.log('\n' + chalk.bold.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    console.log(' ' + chalk.bold.white(title.toUpperCase()));
    console.log(chalk.bold.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  }

  /**
   * Display a subsection header
   */
  static subsection(title: string): void {
    console.log('\n' + chalk.bold.white('▶ ' + title));
    console.log(chalk.dim('  ' + '─'.repeat(title.length + 2)));
  }

  /**
   * Display a key-value pair
   */
  static keyValue(key: string, value: string): void {
    console.log(`  ${chalk.bold.blue(key + ':')} ${value}`);
  }

  /**
   * Display a success message
   */
  static success(message: string): void {
    console.log('  ' + chalk.green('✓') + ' ' + chalk.green(message));
  }

  /**
   * Display an error message
   */
  static error(message: string): void {
    console.log('  ' + chalk.red('✗') + ' ' + chalk.red(message));
  }

  /**
   * Display an info message
   */
  static info(message: string): void {
    console.log('  ' + chalk.blue('ℹ') + ' ' + message);
  }

  /**
   * Display a warning message
   */
  static warning(message: string): void {
    console.log('  ' + chalk.yellow('⚠') + ' ' + chalk.yellow(message));
  }

  /**
   * Display algorithm execution result
   */
  static algorithmResult(name: string, executionTime: number, runNumber?: number): void {
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);

    if (runNumber) {
      console.log(`  ${chalk.magenta(displayName)} (Run ${runNumber}): ${executionTime.toFixed(4)} ms`);
    } else {
      console.log(`  ${chalk.magenta(displayName)}: ${executionTime.toFixed(4)} ms`);
    }
  }

  /**
   * Display a preview of an array
   */
  static arrayPreview(title: string, array: number[], maxPreviewLength: number = 10): void {
    const previewLength = Math.min(array.length, maxPreviewLength);

    let preview = '';

    // Add beginning elements
    for (let i = 0; i < Math.min(previewLength, array.length); i++) {
      preview += array[i].toString();
      if (i < previewLength - 1) preview += ', ';
    }

    // Add ellipsis if array is longer than preview
    if (array.length > previewLength) {
      preview += ', ... ';
      // Show the last element too if possible
      if (array.length > previewLength + 1) {
        preview += array[array.length - 1].toString();
      }
    }

    console.log(`  ${chalk.bold(title)} [${preview}]`);
    console.log(`  ${chalk.dim(`Length: ${array.length} elements`)}`);
  }

  /**
   * Display a table comparing algorithm performance
   */
  static comparisonTable(results: {name: string, avgTime: number, allTimes: number[]}[]): void {
    // Create header row
    let table = `  ${chalk.bold('Algorithm'.padEnd(20))} | ${chalk.bold('Avg Time (ms)'.padStart(15))}\n`;
    table += '  ' + '─'.repeat(20) + ' | ' + '─'.repeat(15) + '\n';

    // Add data rows
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const name = i === 0 ? chalk.green(result.name.padEnd(20)) : chalk.magenta(result.name.padEnd(20));
      table += `  ${name} | ${result.avgTime.toFixed(4).padStart(15)}\n`;
    }

    console.log(table);
  }

  /**
   * Display a table showing relative performance
   */
  static relativePerformanceTable(results: {name: string, avgTime: number}[]): void {
    // Create header row
    let table = `  ${chalk.bold('Algorithm'.padEnd(20))} | ${chalk.bold('Relative Performance'.padStart(20))}\n`;
    table += '  ' + '─'.repeat(20) + ' | ' + '─'.repeat(20) + '\n';

    const fastestTime = results[0].avgTime;

    // Add data rows
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const name = i === 0 ? chalk.green(result.name.padEnd(20)) : chalk.magenta(result.name.padEnd(20));
      const relativeSpeed = result.avgTime / fastestTime;
      const relativeStr = i === 0
        ? chalk.green('1.00x'.padStart(20))
        : chalk.yellow(`${relativeSpeed.toFixed(2)}x`.padStart(20));

      table += `  ${name} | ${relativeStr}\n`;
    }

    console.log(table);
  }
}
