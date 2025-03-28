/**
 * BlockSearch.ts - Implementation of the Block Search algorithm for 2D matrices
 *
 * Block search (also known as the Z-algorithm) divides the matrix into blocks
 * and efficiently searches through them. It takes advantage of the sorted
 * nature of the matrix to eliminate multiple blocks at once.
 *
 * Time Complexity:
 * - Best Case: O(1)
 * - Average Case: O(√(m*n))
 * - Worst Case: O(m+n)
 *
 * Space Complexity: O(1)
 *
 * @requires The matrix must be sorted both row-wise and column-wise
 */

/**
 * Searches for a target value in a sorted 2D matrix using Block Search algorithm
 * @param matrix A 2D matrix sorted in both rows and columns
 * @param target The value to search for
 * @returns The [row, col] position of the target or null if not found
 */
export function blockSearch(matrix: number[][], target: number): [number, number] | null {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return null;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;

    // Calculate block size (approximately square blocks)
    const blockSize = Math.floor(Math.sqrt(Math.min(rows, cols)));

    // Start from the top-left corner
    let row = 0;
    let col = 0;

    while (row < rows && col < cols) {
        // Find the diagonal block where target might be located
        let blockFound = false;
        let blockRow = row;
        let blockCol = col;

        // Scan diagonal blocks
        while (blockRow < Math.min(row + blockSize, rows) &&
        blockCol < Math.min(col + blockSize, cols)) {

            // Check block boundaries
            if (blockRow + 1 === rows || blockCol + 1 === cols ||
                (matrix[blockRow][blockCol] <= target &&
                    matrix[blockRow + 1][blockCol + 1] > target)) {
                blockFound = true;
                break;
            }

            blockRow++;
            blockCol++;
        }

        if (blockFound) {
            // Search within the current block
            for (let i = row; i <= blockRow; i++) {
                for (let j = col; j <= blockCol; j++) {
                    if (matrix[i][j] === target) {
                        return [i, j];
                    }
                }
            }

            // Move to the next block (right or down)
            if (blockCol + 1 < cols) {
                col = blockCol + 1;
            } else {
                row = blockRow + 1;
                col = 0;
            }
        } else {
            // No potential block found, move diagonally
            row += blockSize;
            col += blockSize;
        }
    }

    return null;
}

// Example usage:
// const matrix = [
//   [1, 4, 7, 11],
//   [2, 5, 8, 12],
//   [3, 6, 9, 16],
//   [10, 13, 14, 17]
// ];
//
// console.log(blockSearch(matrix, 5));  // [1, 1]
// console.log(blockSearch(matrix, 15)); // null
