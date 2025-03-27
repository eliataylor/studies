/**
 * RowColumnSearch.ts - Implementation of row-column search algorithm for 2D matrices
 *
 * This algorithm works on matrices where each row and each column is sorted.
 */

import { runMatrixSearch, type MatrixSearchFunction } from './utils';

/**
 * Row-Column Search
 *
 * Searches a sorted 2D matrix by starting from the top-right corner
 * and eliminating rows and columns.
 *
 * Time Complexity: O(m + n) where m is rows and n is columns
 * Space Complexity: O(1)
 *
 * @param matrix The sorted matrix to search (each row and column is sorted)
 * @param target The value to search for
 * @returns The [row, column] coordinates if found, null otherwise
 */
export function rowColumnSearch(matrix: number[][], target: number): [number, number] | null {
  if (!matrix.length || !matrix[0].length) {
    return null;
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  // Start from top-right corner
  let row = 0;
  let col = cols - 1;

  while (row < rows && col >= 0) {
    if (matrix[row][col] === target) {
      return [row, col];
    } else if (matrix[row][col] > target) {
      // The current column has values too large, move left
      col--;
    } else {
      // The current row has values too small, move down
      row++;
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
// console.log('=== Row-Column Search Test ===');
// console.log(`Matrix size: ${testMatrix.length} x ${testMatrix[0].length}`);
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//   const result = runMatrixSearch(rowColumnSearch, testMatrix, target, 'Row-Column Search');
//   console.log(`Result: ${result.result ? `[${result.result}]` : 'Not found'}, Time: ${result.time.toFixed(4)} ms, Success: ${result.success ? 'Yes' : 'No'}`);
// });
