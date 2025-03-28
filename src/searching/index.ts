/**
 * index.ts - Export all search algorithms
 *
 * This file serves as a central export point for all search algorithms.
 * It makes it easier to import multiple algorithms at once.
 */

// Export utility functions
export {
    generateSortedArray,
    generateRandomArray,
    generateSortedMatrix,
    generateBinarySearchTree,
    selectSearchTargets,
    runArraySearch,
    runMatrixSearch,
    runTreeSearch,
    compareSearchAlgorithms,
    type ArraySearchFunction,
    type MatrixSearchFunction,
    type TreeSearchFunction
} from './utils';

// Export tree node types and utilities
export {
    type TreeNode,
    type GraphTreeNode,
    createNode,
    createBSTFromSortedArray,
    inorderTraversal,
    createSampleBST,
    printTree
} from './TreeNode';

// Export array search algorithms
import { linearSearch } from './LinearSearch';
import { binarySearch, recursiveBinarySearch } from './BinarySearch';
import { jumpSearch } from './JumpSearch';
import { interpolationSearch } from './InterpolationSearch';
import { exponentialSearch } from './ExponentialSearch';
import { fibonacciSearch } from './FibonacciSearch';

// Export matrix search algorithms
import { rowColumnSearch } from './RowColumnSearch';
import { binarySearchMatrix } from './BinarySearchMatrix';
import { staircaseSearch } from './StaircaseSearch';

// Export tree search algorithms
import {
    preorderDFS,
    inorderDFS,
    postorderDFS,
    bstSearch,
    iterativePreorderDFS
} from './DFSSearch';

import {
    bfs,
    levelOrderTraversal,
    bfsWithLevel,
    bidirectionalBFS
} from './BFSSearch';

/**
 * A collection of all search algorithms by category
 */
export const searchAlgorithms = {
    // Array search algorithms
    array: {
        linear: linearSearch,
        binary: binarySearch,
        recursiveBinary: recursiveBinarySearch,
        jump: jumpSearch,
        interpolation: interpolationSearch,
        exponential: exponentialSearch,
        fibonacci: fibonacciSearch
    },

    // Matrix search algorithms
    matrix: {
        rowColumn: rowColumnSearch,
        binary: binarySearchMatrix,
        staircase: staircaseSearch
    },

    // Tree search algorithms
    tree: {
        // Depth-First Search variants
        dfs: {
            preorder: preorderDFS,
            inorder: inorderDFS,
            postorder: postorderDFS,
            iterativePreorder: iterativePreorderDFS
        },

        // Breadth-First Search variants
        bfs: {
            standard: bfs,
            withLevel: bfsWithLevel
        },

        // Specialized tree searches
        bst: bstSearch,
        bidirectional: bidirectionalBFS
    }
};
