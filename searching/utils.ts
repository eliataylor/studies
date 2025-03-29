import {AlgorithmInfo, ALGORITHMS} from "./SearchTester";
import chalk from 'chalk';
import {getBorderCharacters, table} from 'table';
import {Logger} from '../logger';
import {ArrayType, generateArray} from "../sorting/utils";
import {generateTree} from "./TreeUtils";

// ========== Type Definitions ==========

export interface RunResult {
    name: string,
    time: number,
    result: unknown,
    success: boolean,
    found?: boolean
}

export interface MatrixResult extends RunResult {
    result: [number, number] | null
}

export interface TreeResult extends RunResult {
    result: TreeNode | null
}

/**
 * Type definition for array search functions
 */
export type ArraySearchFunction = (arr: number[], target: number) => number;

/**
 * Type definition for matrix search functions
 */
export type MatrixSearchFunction = (matrix: number[][], target: number) => [number, number] | null;

/**
 * Interface for a basic tree node
 */
export interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

/**
 * Type definition for tree search functions
 */
export type TreeSearchFunction = (root: TreeNode | null, target: number) => TreeNode | null;

/**
 * Algorithm categories
 */
export const ALGORITHM_CATEGORIES: Record<string, string[]> = {
    'array': ['linear', 'binary', 'recursiveBinary', 'jump', 'interpolation', 'exponential', 'fibonacci'],
    'matrix': ['rowColumn', 'binaryMatrix', 'staircase', 'block'],
    'tree': ['preorderDFS', 'inorderDFS', 'postorderDFS', 'bst', 'bfs']
};

// ========== Data Generation Functions ==========

/**
 * Generate appropriate data structure based on type
 * @param type The data structure type ('array', 'matrix', 'tree')
 * @param size The size of the data structure
 * @returns The generated data structure
 */
export function generateDataStructure(type: string, dimensions: number[]): any {
    switch (type) {
        case 'array':
            return generateArray(dimensions[0], 0, 100, 0, dimensions[0]*dimensions[1]);
        case 'matrix':
            return generateSortedMatrix(dimensions[0], dimensions[1]);
        case 'tree':
            return generateTree('balanced-bst', dimensions);
        default:
            throw new Error(`Unknown data structure type: ${type}`);
    }
}

/**
 * Get all searchable values from a data structure
 * @param type The data structure type
 * @param data The data structure
 * @returns Array of all values in the data structure
 */
export function getAllValues(type: string, data: any): number[] {
    switch (type) {
        case 'array':
            return [...data]; // Simple copy for arrays
        case 'matrix':
            return data.flat(); // Flatten the matrix
        case 'tree':
            // Collect all values from the tree
            const values: number[] = [];

        function collectValues(node: TreeNode | null): void {
            if (node) {
                collectValues(node.left);
                values.push(node.value);
                collectValues(node.right);
            }
        }

            collectValues(data);
            return values;
        default:
            throw new Error(`Unknown data structure type: ${type}`);
    }
}


/**
 * Generates a sorted 2D matrix with rows and columns in ascending order
 * @param rows Number of rows
 * @param cols Number of columns
 * @returns A sorted 2D matrix
 */
export function generateSortedMatrix(rows: number = 10, cols: number = 10, testCase: string = 'standard-sorted'): number[][] {
    let matrix: number[][] = Array(rows).fill(0).map(() => Array(cols).fill(0));
    let value = 0;

    switch (testCase) {
        case 'sparse-matrix':
            // Create a sparse matrix (many zeros)
            // Add some non-zero values in sorted order
            value = 1;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (Math.random() < 0.1) { // 10% chance of non-zero
                        matrix[i][j] = value++;
                    }
                }
            }
            break;

        case 'diagonal-heavy':
            // Create a matrix with significant values along diagonals
            value = 1;

            // Fill diagonals
            for (let d = 0; d < rows + cols - 1; d++) {
                for (let i = 0; i < rows; i++) {
                    const j = d - i;
                    if (j >= 0 && j < cols) {
                        matrix[i][j] = value++;
                    }
                }
            }
            break;

        default:
            value = 0;
            for (let i = 0; i < rows; i++) {
                const row: number[] = [];
                for (let j = 0; j < cols; j++) {
                    value += Math.floor(Math.random() * 5) + 1;
                    row.push(value);
                }
                matrix.push(row);
            }
    }

    return matrix;
}

// ========== Utility Functions ==========

/**
 * Helper function to parse algorithm list
 * @param algorithmsStr String containing algorithm names, comma separated, or a category
 * @returns Array of valid algorithm names
 */
export function parseAlgorithms(algorithmsStr: string): string[] {
    // @ts-ignore
    if (algorithmsStr === 'all') {
        return Object.keys(ALGORITHMS)
    } else if (ALGORITHM_CATEGORIES[algorithmsStr]) {
        return [...ALGORITHM_CATEGORIES[algorithmsStr]];
    }

    // Parse comma-separated list
    const algorithmNames = algorithmsStr.split(',').map(name => name.trim());
    const validAlgorithms = algorithmNames.filter(name => {
        if (!ALGORITHMS[name]) {
            console.log(chalk.yellow(`Warning: Unknown algorithm: ${name}`));
            return false;
        }
        return true;
    });

    return validAlgorithms;
}


// ========== Measurement and Testing Functions ==========

/**
 * Selects valid and invalid search targets from an array
 * @param array Source array
 * @param percentPresent Percentage of targets that should be in the array (0-100)
 * @param count Number of targets to select
 * @returns Array of target values and whether they exist in the array
 */
export function selectSearchTargets(
    array: number[],
    percentPresent: number = 50,
    count: number = 10
): { target: number, exists: boolean }[] {
    const results: { target: number, exists: boolean }[] = [];
    const min = Math.min(...array);
    const max = Math.max(...array);
    const range = max - min;

    for (let i = 0; i < count; i++) {
        // Determine if this target should exist in the array
        const shouldExist = Math.random() * 100 < percentPresent;

        if (shouldExist && array.length > 0) {
            // Select a random existing value
            const index = Math.floor(Math.random() * array.length);
            results.push({target: array[index], exists: true});
        } else {
            // Generate a value outside the array
            let target: number;
            do {
                // Generate a value potentially outside the array's range
                if (Math.random() < 0.5) {
                    target = min - Math.floor(Math.random() * (range / 4) + 1);
                } else {
                    target = max + Math.floor(Math.random() * (range / 4) + 1);
                }
                // Make sure it's actually not in the array
            } while (array.includes(target));

            results.push({target, exists: false});
        }
    }

    return results;
}

export function runArraySearch(
    algoInfo: AlgorithmInfo,
    array: number[],
    target: number
): RunResult {

    const searchFunction = algoInfo.fn as ArraySearchFunction;
    const startTime = performance.now();
    const result = searchFunction(array, target);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Check if result is correct
    const success = (result !== -1 && array[result] === target) ||
        (result === -1 && !array.includes(target));

    return {
        name: algoInfo.name,
        time: executionTime,
        result,
        success
    };
}

export function runMatrixSearch(
    algoInfo: AlgorithmInfo,
    matrix: number[][],
    target: number
): MatrixResult {

    const searchFunction = algoInfo.fn as MatrixSearchFunction;

    const startTime = performance.now();
    const result = searchFunction(matrix, target);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Check if result is correct
    let success = true;
    let exists = false;

    // Check if the target exists in the matrix
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === target) {
                exists = true;
                // If algorithm found a position, verify it's correct
                if (result !== null && (result[0] !== i || result[1] !== j)) {
                    success = false;
                }
                break;
            }
        }
        if (exists) break;
    }

    // If target doesn't exist, success is true if result is null
    if (!exists) {
        success = result === null;
    }

    return {
        name: algoInfo.name,
        time: executionTime,
        result,
        success
    };
}

export function runTreeSearch(
    algoInfo: AlgorithmInfo,
    root: TreeNode | null,
    target: number
): TreeResult {

    const searchFunction = algoInfo.fn as TreeSearchFunction;


    const startTime = performance.now();
    const result = searchFunction(root, target);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Check if target exists in the tree
    const exists = treeContains(root, target);

    // Success if (result found and target exists) or (result null and target doesn't exist)
    const success = (result !== null && exists) || (result === null && !exists);

    return {
        name: algoInfo.name,
        time: executionTime,
        found: result !== null,
        result: result,
        success
    };
}

/**
 * brute force helper to check if a value exists in a binary tree
 * @param root The root node of the tree
 * @param target The value to search for
 * @returns True if the value exists in the tree, false otherwise
 */
function treeContains(root: TreeNode | null, target: number): boolean {
    if (root === null) return false;
    if (root.value === target) return true;

    return treeContains(root.left, target) || treeContains(root.right, target);
}

/**
 * Display comparison results in a formatted table
 * @param results Results of running multiple algorithms
 * @param totalTargets Total number of targets tested
 */
export function displayComparisonResults(
    results: Record<string, {
        totalTime: number,
        successCount: number,
        avgTime: number,
        times: number[]
    }>,
    totalTargets: number
): void {
    Logger.section('Results Summary');

    // Convert results to array and sort by average time
    const sortedResults = Object.entries(results).map(([name, stats]) => ({
        name,
        avgTime: stats.avgTime,
        minTime: Math.min(...stats.times),
        maxTime: Math.max(...stats.times),
        successRate: (stats.successCount / totalTargets) * 100
    })).sort((a, b) => a.avgTime - b.avgTime);

    // Create table data
    const tableData = [
        [
            chalk.bold.cyan('Algorithm'),
            chalk.bold.cyan('Avg Time (ms)'),
            chalk.bold.cyan('Min Time (ms)'),
            chalk.bold.cyan('Max Time (ms)'),
            chalk.bold.cyan('Success Rate')
        ]
    ];

    // Add data for each algorithm
    sortedResults.forEach((result, index) => {
        // Highlight the fastest algorithm
        const algoName = index === 0
            ? chalk.green.bold(result.name)
            : chalk.magenta(result.name);

        tableData.push([
            algoName,
            result.avgTime.toFixed(4),
            result.minTime.toFixed(4),
            result.maxTime.toFixed(4),
            `${result.successRate.toFixed(1)}%`
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
}
