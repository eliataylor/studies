/**
 * CompareTreeSearch.ts - Compare tree search algorithms
 *
 * This file focuses on comparing different search algorithms for trees
 * of different sizes and characteristics.
 */

import {createNode, TreeNode} from './algorithms/TreeNode';
import {generateArray} from "../sorting/utils";

export const TEST_CASES = [
    'balanced-bst',       // Balanced binary search tree
    'skewed-left',        // Left-skewed tree (linked list-like)
    'skewed-right',       // Right-skewed tree (linked list-like)
    'complete-binary',    // Complete binary tree (perfect except possibly last level)
    'random-binary'       // Random binary tree (not necessarily a BST)
];

// Helper function to create a left-skewed tree
function createLeftSkewedTree(size: number): TreeNode | null {
    if (size <= 0) return null;

    const root = createNode(size);
    let current = root;

    for (let i = size - 1; i > 0; i--) {
        current.left = createNode(i);
        current = current.left;
    }

    return root;
}

// Helper function to create a right-skewed tree
function createRightSkewedTree(size: number): TreeNode | null {
    if (size <= 0) return null;

    const root = createNode(1);
    let current = root;

    for (let i = 2; i <= size; i++) {
        current.right = createNode(i);
        current = current.right;
    }

    return root;
}

// Helper function to create a complete binary tree
function createCompleteBinaryTree(size: number): TreeNode | null {
    if (size <= 0) return null;

    // Create nodes
    const nodes: TreeNode[] = Array(size)
        .fill(null)
        .map((_, i) => createNode(i + 1));

    // Link nodes (left child at index 2i+1, right at 2i+2)
    for (let i = 0; i < size; i++) {
        const leftIndex = 2 * i + 1;
        const rightIndex = 2 * i + 2;

        if (leftIndex < size) {
            nodes[i].left = nodes[leftIndex];
        }

        if (rightIndex < size) {
            nodes[i].right = nodes[rightIndex];
        }
    }

    return nodes[0];
}

// Helper function to create a random binary tree (not necessarily a BST)
function createRandomBinaryTree(size: number): TreeNode | null {
    if (size <= 0) return null;

    // Create root
    const root = createNode(Math.floor(Math.random() * 1000));

    // Add remaining nodes
    for (let i = 1; i < size; i++) {
        insertRandomly(root, Math.floor(Math.random() * 1000));
    }

    return root;
}

// Helper to insert a node randomly in the tree
function insertRandomly(root: TreeNode, value: number): void {
    const queue = [root];

    while (queue.length > 0) {
        const current = queue.shift()!;

        // Randomly decide whether to insert left or right
        if (!current.left || !current.right) {
            const insertLeft = current.left === null && (current.right !== null || Math.random() < 0.5);
            if (insertLeft) {
                current.left = createNode(value);
            } else {
                current.right = createNode(value);
            }
            return;
        }

        // Add children to queue
        queue.push(current.left);
        queue.push(current.right);
    }
}

// Helper function to collect all values in a tree
function collectTreeValues(root: TreeNode | null): number[] {
    const values: number[] = [];

    function inorderCollect(node: TreeNode | null): void {
        if (node) {
            inorderCollect(node.left);
            values.push(node.value);
            inorderCollect(node.right);
        }
    }

    inorderCollect(root);
    return values;
}


/**
 * Helper function to convert a sorted array to a balanced BST
 * @param arr Sorted array
 * @param start Start index
 * @param end End index
 * @returns Root node of the generated BST
 */
function sortedArrayToBST(arr: number[], start: number, end: number): TreeNode | null {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node: TreeNode = {
        value: arr[mid],
        left: null,
        right: null
    };

    node.left = sortedArrayToBST(arr, start, mid - 1);
    node.right = sortedArrayToBST(arr, mid + 1, end);

    return node;
}

// Main function to run all tree search comparisons
export function generateTree(testCase: string, dimensions: number[]): TreeNode | null {
    let tree: TreeNode | null;

    switch (testCase) {
        case 'skewed-left':
            tree = createLeftSkewedTree(Math.min(dimensions[0], 1000)); // Limit size to avoid stack overflow
            break;

        case 'skewed-right':
            tree = createRightSkewedTree(Math.min(dimensions[0], 1000)); // Limit size to avoid stack overflow
            break;

        case 'complete-binary':
            tree = createCompleteBinaryTree(dimensions[0]);
            break;

        case 'random-binary':
            tree = createRandomBinaryTree(dimensions[0]);
            break;

        default:
            // Generate sorted array of unique values
            const values = generateArray(dimensions[0], 0, 100, 0, dimensions[0] * dimensions[1]);
            // Convert sorted array to balanced BST
            tree = sortedArrayToBST(values, 0, values.length - 1);
    }
    return tree;
}
