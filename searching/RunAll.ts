/**
 * RunAllSearch.ts - Compare different search algorithms
 *
 * This file imports all search algorithm implementations and compares their performance
 * on different data structures with different sizes.
 */

import {
  generateSortedArray,
  generateRandomArray,
  generateSortedMatrix,
  generateBinarySearchTree,
  selectSearchTargets,
  compareSearchAlgorithms,
  printDatasetInfo,
  runArraySearch,
  runMatrixSearch,
  runTreeSearch
} from './utils';

// Import array search algorithms
import { linearSearch } from './LinearSearch';
import { binarySearch, recursiveBinarySearch } from './BinarySearch';
import { jumpSearch } from './JumpSearch';
import { interpolationSearch } from './InterpolationSearch';
import { exponentialSearch } from './ExponentialSearch';
import { fibonacciSearch } from './FibonacciSearch';

// Import matrix search algorithms
import { rowColumnSearch } from './RowColumnSearch';
import { binarySearchMatrix } from './BinarySearchMatrix';
import { staircaseSearch } from './StaircaseSearch';

// Import tree search algorithms
import { preorderDFS, inorderDFS, postorderDFS, bstSearch } from './DFSSearch';
import { bfs } from './BFSSearch';

// Define different array sizes for testing
const ARRAY_SIZES = [
  10,      // Tiny array
  100,     // Small array
  1000,    // Medium array
  10000,   // Large array
//  100000   // Very large array
];

// Define different matrix sizes for testing
const MATRIX_SIZES = [
  [10, 10],     // Small matrix (10x10)
  [50, 50],     // Medium matrix (50x50)
  [100, 100],   // Large matrix (100x100)
];

// Define different tree sizes for testing
const TREE_SIZES = [
  10,      // Small tree
  100,     // Medium tree
  1000,    // Large tree
];

// Main comparison function
function runAllTests() {
  console.log('=== Search Algorithm Comparison ===\n');

  // ===== 1. Array Search Tests =====
  console.log('\n===== ARRAY SEARCH TESTS =====');

  const arraySortFunctions = {
    'Linear Search': linearSearch,
    'Binary Search': binarySearch,
    'Recursive Binary Search': recursiveBinarySearch,
    'Jump Search': jumpSearch,
    'Interpolation Search': interpolationSearch,
    'Exponential Search': exponentialSearch,
    'Fibonacci Search': fibonacciSearch
  };

  ARRAY_SIZES.forEach(size => {
    // Generate sorted array
    const sortedArray = generateSortedArray(size);

    // Select search targets (50% exist in array)
    const targets = selectSearchTargets(sortedArray, 50, 5);

    // Print dataset info
    printDatasetInfo('Array', size, { 'Type': 'Sorted' });

    // Compare search algorithms
    compareSearchAlgorithms(
      arraySortFunctions,
      runArraySearch,
      [sortedArray],
      targets
    );
  });

  // ===== 2. Matrix Search Tests =====
  console.log('\n===== MATRIX SEARCH TESTS =====');

  const matrixSearchFunctions = {
    'Row-Column Search': rowColumnSearch,
    'Binary Search Matrix': binarySearchMatrix,
    'Staircase Search': staircaseSearch
  };

  MATRIX_SIZES.forEach(([rows, cols]) => {
    // Generate sorted matrix
    const matrix = generateSortedMatrix(rows, cols);

    // Flatten the matrix to select search targets
    const flatMatrix = matrix.flat();

    // Select search targets (50% exist in matrix)
    const targets = selectSearchTargets(flatMatrix, 50, 5);

    // Print dataset info
    printDatasetInfo('Matrix', [rows, cols], { 'Type': 'Sorted' });

    // Compare search algorithms
    compareSearchAlgorithms(
      matrixSearchFunctions,
      runMatrixSearch,
      [matrix],
      targets
    );
  });

  // ===== 3. Tree Search Tests =====
  console.log('\n===== TREE SEARCH TESTS =====');

  const treeSearchFunctions = {
    'Preorder DFS': preorderDFS,
    'Inorder DFS': inorderDFS,
    'Postorder DFS': postorderDFS,
    'BST Search': bstSearch,
    'BFS': bfs
  };

  TREE_SIZES.forEach(size => {
    // Generate binary search tree
    const tree = generateBinarySearchTree(size);

    // Get all values in the tree via inorder traversal
    const values: number[] = [];

    function collectValues(node: any): void {
      if (node) {
        collectValues(node.left);
        values.push(node.value);
        collectValues(node.right);
      }
    }

    collectValues(tree);

    // Select search targets (50% exist in tree)
    const targets = selectSearchTargets(values, 50, 5);

    // Print dataset info
    printDatasetInfo('Tree', size, { 'Type': 'Binary Search Tree' });

    // Compare search algorithms
    compareSearchAlgorithms(
      treeSearchFunctions,
      runTreeSearch,
      [tree],
      targets
    );
  });
}

// Run all tests
runAllTests();

/**
 * To run:
 * ts-node RunAllSearch.ts
 *
 * Note: You may need to adjust this command based on your TypeScript setup.
 * If using tsc to compile:
 * 1. tsc RunAllSearch.ts
 * 2. node RunAllSearch.js
 */
