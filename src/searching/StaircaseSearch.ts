/**
 * StaircaseSearch.ts - Implementation of staircase search algorithm for 2D matrices
 *
 * This algorithm works on matrices where each row and each column is sorted.
 * It's similar to row-column search but starts from bottom-left.
 */

import { runMatrixSearch, type MatrixSearchFunction } from './utils';

/**
 * Staircase Search
 *
 * Searches a sorted 2D matrix by starting from the bottom-left corner
 * and eliminating rows and columns.
 *
 * Time Complexity: O(m + n) where m is rows and n is columns
 * Space Complexity: O(1)
 *
 * @param matrix The sorted matrix to search (each row and column is sorted)
 * @param target The value to search for
 * @returns The [row, column] coordinates if found, null otherwise
 */
export function staircaseSearch(matrix: number[][], target: number): [number, number] | null {
  if (!matrix.length || !matrix[0].length) {
    return null;
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  // Start from bottom-left corner
  let row = rows - 1;
  let col = 0;

  while (row >= 0 && col < cols) {
    if (matrix[row][col] === target) {
      return [row, col];
    } else if (matrix[row][col] > target) {
      // The current row has values too large, move up
      row--;
    } else {
      // The current column has values too small, move right
      col++;
    }
  }

  return null;
}

// Uncomment to test this algorithm individually
// import { generateSortedMatrix, selectSearchTargets } from './utils';
//
// // Generate test matrix
// const testMatrix = generateSortedMatrix(10, 10);
//
// // Flatten the matrix to select search targets
// const flatMatrix = testMatrix.flat();
// const targets = selectSearchTargets(flatMatrix, 50, 5);
//
// // Run tests
// console.log('=== Staircase Search Test ===');
// console.log(`Matrix size: ${testMatrix.length} x ${testMatrix[0].length}`);
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//   const result = runMatrixSearch(staircaseSearch, testMatrix, target, 'Staircase Search');
//   console.log(`Result: ${result.result ? `[${result.result}]` : 'Not found'}, Time: ${result.time.toFixed(4)} ms, Success: ${result.success ? 'Yes' : 'No'}`);
// });
