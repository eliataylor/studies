/**
 * BinarySearchMatrix.ts - Implementation of binary search for 2D matrices
 *
 * This algorithm works on matrices where values are sorted from left to right
 * and top to bottom (i.e., matrix[i][j] <= matrix[i][j+1] and matrix[i][j] <= matrix[i+1][j]).
 */

/**
 * Binary Search Matrix
 *
 * Treats a 2D matrix as a flattened sorted array and performs binary search.
 * Works on matrices where values are sorted from left to right and top to bottom.
 *
 * Time Complexity: O(log(m*n)) where m is rows and n is columns
 * Space Complexity: O(1)
 *
 * @param matrix The sorted matrix to search
 * @param target The value to search for
 * @returns The [row, column] coordinates if found, null otherwise
 */
export function binarySearchMatrix(matrix: number[][], target: number): [number, number] | null {
    if (!matrix.length || !matrix[0].length) {
        return null;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    const totalElements = rows * cols;

    let left = 0;
    let right = totalElements - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Convert 1D index to 2D coordinates
        const row = Math.floor(mid / cols);
        const col = mid % cols;

        if (matrix[row][col] === target) {
            return [row, col];
        } else if (matrix[row][col] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
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
// console.log('=== Binary Search Matrix Test ===');
// console.log(`Matrix size: ${testMatrix.length} x ${testMatrix[0].length}`);
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//   const result = runMatrixSearch(binarySearchMatrix, testMatrix, target, 'Binary Search Matrix');
//   console.log(`Result: ${result.result ? `[${result.result}]` : 'Not found'}, Time: ${result.time.toFixed(4)} ms, Success: ${result.success ? 'Yes' : 'No'}`);
// });
