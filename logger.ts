/**
 * logger.ts - Enhanced logging utility with colorful formatting
 *
 * This file provides functions for consistently formatted console output
 * with color styling for better readability.
 */

import chalk from 'chalk';

/**
 * LogLevel enum for controlling verbosity of algorithm execution logs
 */
export enum LogLevel {
    NONE = 0,    // No algorithm execution logs
    ERROR = 1,   // Only errors
    INFO = 2,    // Basic information and errors
    DEBUG = 3,   // Detailed execution information
    TRACE = 4    // Verbose step-by-step execution details
}

// Map of log level names to enum values
export const LOG_LEVELS: Record<string, LogLevel> = {
    'none': LogLevel.NONE,
    'error': LogLevel.ERROR,
    'info': LogLevel.INFO,
    'debug': LogLevel.DEBUG,
    'trace': LogLevel.TRACE
};

// Default log level
let currentLogLevel: LogLevel = LogLevel.NONE;

export class Logger {
    /**
     * Set the global log level
     */
    static setLogLevel(level: LogLevel): void {
        currentLogLevel = level;
    }

    /**
     * Get the current log level
     */
    static getLogLevel(): LogLevel {
        return currentLogLevel;
    }

    /**
     * Log a message only if current level is greater than or equal to the specified level
     */
    static logAtLevel(level: LogLevel, message: string): void {
        if (currentLogLevel >= level) {
            console.log(message);
        }
    }

    /**
     * Log algorithm step (used within algorithm implementations)
     */
    static algorithmStep(level: LogLevel, message: string): void {
        if (currentLogLevel >= level) {
            console.log(`    ${chalk.dim('→')} ${message}`);
        }
    }

    static section(title: string): void {
        console.log('\n' + chalk.bold.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
        console.log(' ' + chalk.bold.white(title.toUpperCase()));
        console.log(chalk.bold.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    }

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

    static updateLastLine(message: string): void {
        // Clear the current line and move cursor to beginning
        process.stdout.write('\r\x1B[K');
        // Write the new message without a newline
        process.stdout.write(message);
    }

    /**
     * Display a preloader message that can be updated
     */
    static preloader(message: string): void {
        this.updateLastLine(`  ${chalk.blue('→')} ${message}`);
    }

    /**
     * Finalize the preloader with a completion message
     */
    static completePreloader(message: string): void {
        // Clear the current line
        process.stdout.write('\r\x1B[K');
        // Write the completion message with a newline
        console.log(`  ${chalk.green('✓')} ${message}`);
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

        const lengthStr = `- total elements: ${array.length}`
        console.log(`  ${chalk.cyan(title)} [${preview}] ${chalk.dim(lengthStr)}`);
    }

    /**
     * Display a table comparing algorithm performance
     */
    static comparisonTable(results: { name: string, avgTime: number, allTimes: number[] }[]): void {
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
    static relativePerformanceTable(results: { name: string, avgTime: number }[]): void {
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
