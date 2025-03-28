/**
 * CompareMatrixSearch.ts - Compare matrix search algorithms
 *
 * This file focuses on comparing different search algorithms for 2D matrices
 * of different sizes and characteristics.
 */

import {
  generateSortedMatrix,
  selectSearchTargets,
  compareSearchAlgorithms,
  printDatasetInfo,
  runMatrixSearch
} from '../utils';

// Import matrix search algorithms
import { rowColumnSearch } from './RowColumnSearch';
import { binarySearchMatrix } from './BinarySearchMatrix';
import { staircaseSearch } from './StaircaseSearch';

// Define matrix sizes for testing
const MATRIX_SIZES = [
  [10, 10],     // Small matrix (10x10)
  [50, 50],     // Medium matrix (50x50)
  [100, 100],   // Large matrix (100x100)
  [200, 200],   // Very large matrix (200x200)
];

// Test case types
const TEST_CASES = [
  'standard-sorted',    // Standard sorted matrix
  'sparse-matrix',      // Matrix with many zeros (sparse)
  'diagonal-heavy'      // Matrix with significant values along diagonals
];

// Main function to run all matrix search comparisons
function compareMatrixSearchAlgorithms() {
  console.log('===== MATRIX SEARCH ALGORITHMS COMPARISON =====\n');

  // Collect all search functions
  const searchFunctions = {
    'Row-Column Search': rowColumnSearch,
    'Binary Search Matrix': binarySearchMatrix,
    'Staircase Search': staircaseSearch
  };

  // Run each test case
  TEST_CASES.forEach(testCase => {
    console.log(`\n----- Test Case: ${testCase} -----\n`);

    MATRIX_SIZES.forEach(([rows, cols]) => {
      let matrix: number[][];
      let description: string;

      // Generate appropriate matrix based on test case
      switch(testCase) {
        case 'standard-sorted':
          matrix = generateSortedMatrix(rows, cols);
          description = 'Standard sorted matrix';
          break;

        case 'sparse-matrix':
          // Create a sparse matrix (many zeros)
          matrix = Array(rows).fill(0).map(() => Array(cols).fill(0));
          // Add some non-zero values in sorted order
          let value = 1;
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              if (Math.random() < 0.1) { // 10% chance of non-zero
                matrix[i][j] = value++;
              }
            }
          }
          description = 'Sparse matrix (90% zeros)';
          break;

        case 'diagonal-heavy':
          // Create a matrix with significant values along diagonals
          matrix = Array(rows).fill(0).map(() => Array(cols).fill(0));
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
          description = 'Diagonal-heavy matrix';
          break;

        default:
          matrix = generateSortedMatrix(rows, cols);
          description = 'Standard sorted matrix';
      }

      // Flatten the matrix to select search targets
      const flatMatrix = matrix.flat().filter(val => val !== 0); // Exclude zeros for sparse matrices

      // Select search targets (50% exist in matrix)
      const targets = selectSearchTargets(flatMatrix, 50, 5);

      // Print dataset info
      printDatasetInfo('Matrix', [rows, cols], { 'Type': description });

      // Compare search algorithms
      compareSearchAlgorithms(
        searchFunctions,
        runMatrixSearch,
        [matrix],
        targets
      );
    });
  });

  // Special test: Non-square matrices
  console.log('\n----- Test Case: Non-Square Matrices -----\n');

  const nonSquareSizes = [
    [10, 100],   // Wide matrix
    [100, 10],   // Tall matrix
    [5, 1000],   // Very wide matrix
    [1000, 5]    // Very tall matrix
  ];

  nonSquareSizes.forEach(([rows, cols]) => {
    const matrix = generateSortedMatrix(rows, cols);
    const flatMatrix = matrix.flat();
    const targets = selectSearchTargets(flatMatrix, 50, 5);

    printDatasetInfo('Matrix', [rows, cols], { 'Type': 'Non-square matrix' });

    compareSearchAlgorithms(
      searchFunctions,
      runMatrixSearch,
      [matrix],
      targets
    );
  });
}

// Run the comparison
compareMatrixSearchAlgorithms();

/**
 * To run:
 * ts-node CompareMatrixSearch.ts
 */
