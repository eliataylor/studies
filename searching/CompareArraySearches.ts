/**
 * CompareArraySearch.ts - Compare array search algorithms
 *
 * This file focuses on comparing different array search algorithms on
 * arrays of different sizes and distributions.
 */

import {
    generateSortedArray,
} from './utils';

// Import array search algorithms
import {linearSearch} from './algorithms/LinearSearch';
import {binarySearch, recursiveBinarySearch} from './algorithms/BinarySearch';
import {jumpSearch} from './algorithms/JumpSearch';
import {interpolationSearch} from './algorithms/InterpolationSearch';
import {exponentialSearch} from './algorithms/ExponentialSearch';
import {fibonacciSearch} from './algorithms/FibonacciSearch';

// Define array sizes for testing
const ARRAY_SIZES = [
    10,      // Tiny array
    100,     // Small array
    1000,    // Medium array
    10000,   // Large array
    100000   // Very large array
];

// Test case types to run
const TEST_CASES = [
    'sorted-uniform',      // Sorted array with uniform distribution
    'sorted-clustered',    // Sorted array with clustered values
    'sorted-binary-search-friendly', // Arrays where binary search has clear advantage
    'large-range'          // Arrays with large range of values
];

// Main function to run all array search comparisons
function compareArraySearchAlgorithms() {
    console.log('===== ARRAY SEARCH ALGORITHMS COMPARISON =====\n');

    // Run each test case
    TEST_CASES.forEach(testCase => {
        console.log(`\n----- Test Case: ${testCase} -----\n`);

        ARRAY_SIZES.forEach(size => {
            let array: number[];
            let description: string;

            // Generate appropriate arrays based on test case
            switch (testCase) {
                case 'sorted-uniform':
                    array = generateSortedArray([size,size], true);
                    description = 'Sorted array with uniform distribution';
                    break;

                case 'sorted-clustered':
                    // Create array with repeated values (less unique values)
                    array = generateSortedArray([size,size], false);
                    description = 'Sorted array with clustered values';
                    break;

                case 'sorted-binary-search-friendly':
                    // Arrays with exponential growth are good for binary search
                    array = Array.from({length: size}, (_, i) => Math.pow(2, i));
                    description = 'Binary search friendly array';
                    break;

                case 'large-range':
                    // Array with very large differences between consecutive elements
                    array = Array.from({length: size}, (_, i) => i * 1000);
                    description = 'Array with large value ranges';
                    break;

                default:
                    array = generateSortedArray([size,size]);
                    description = 'Standard sorted array';
            }

        });
    });
}
