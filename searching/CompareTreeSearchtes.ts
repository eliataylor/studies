/**
 * CompareTreeSearch.ts - Compare tree search algorithms
 *
 * This file focuses on comparing different search algorithms for trees
 * of different sizes and characteristics.
 */

import {generateBinarySearchTree, selectSearchTargets} from './utils';

import {createNode, TreeNode} from './algorithms/TreeNode';

// Import tree search algorithms
import {bfsWithLevel} from './algorithms/BFSSearch';

// Define tree sizes for testing
const TREE_SIZES = [
    10,      // Small tree (10 nodes)
    100,     // Medium tree (100 nodes)
    1000,    // Large tree (1000 nodes)
    5000     // Very large tree (5000 nodes)
];

// Test case types
const TEST_CASES = [
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

// Main function to run all tree search comparisons
function compareTreeSearchAlgorithms() {
    console.log('===== TREE SEARCH ALGORITHMS COMPARISON =====\n');

    // Run each test case
    TEST_CASES.forEach(testCase => {
        console.log(`\n----- Test Case: ${testCase} -----\n`);

        // Use smaller sizes for skewed trees to avoid stack overflow
        const sizes = testCase.includes('skewed') ? TREE_SIZES.slice(0, 3) : TREE_SIZES;

        sizes.forEach(size => {
            let tree: TreeNode | null;
            let description: string;

            // Generate appropriate tree based on test case
            switch (testCase) {
                case 'balanced-bst':
                    tree = generateBinarySearchTree(size);
                    description = 'Balanced binary search tree';
                    break;

                case 'skewed-left':
                    tree = createLeftSkewedTree(Math.min(size, 1000)); // Limit size to avoid stack overflow
                    description = 'Left-skewed tree (linked list-like)';
                    break;

                case 'skewed-right':
                    tree = createRightSkewedTree(Math.min(size, 1000)); // Limit size to avoid stack overflow
                    description = 'Right-skewed tree (linked list-like)';
                    break;

                case 'complete-binary':
                    tree = createCompleteBinaryTree(size);
                    description = 'Complete binary tree';
                    break;

                case 'random-binary':
                    tree = createRandomBinaryTree(size);
                    description = 'Random binary tree (not a BST)';
                    break;

                default:
                    tree = generateBinarySearchTree([size, size]);
                    description = 'Standard binary search tree';
            }

            // Collect all values in the tree
            const values = collectTreeValues(tree);

            // Select search targets (50% exist in tree)
            const targets = selectSearchTargets(values, 50, 5);

        });
    });

    // Special test: Find path between nodes using BFS
    if (TREE_SIZES.length > 0) {
        console.log('\n----- Test Case: Path Finding in Trees -----\n');

        const size = TREE_SIZES[1]; // Use medium-sized tree
        const tree = generateBinarySearchTree(size);
        const values = collectTreeValues(tree);

        console.log(`Testing path finding in a binary search tree with ${size} nodes\n`);
        console.log('Finding paths between randomly selected nodes:');

        for (let i = 0; i < 5; i++) {
            const startIndex = Math.floor(Math.random() * values.length);
            const endIndex = Math.floor(Math.random() * values.length);

            const startValue = values[startIndex];
            const endValue = values[endIndex];

            const startTime = performance.now();
            const pathExists = bfsWithLevel(tree, endValue) !== null;
            const endTime = performance.now();

            console.log(`  Path from ${startValue} to ${endValue}: ${pathExists ? 'Exists' : 'Does not exist'} (${(endTime - startTime).toFixed(4)} ms)`);
        }
    }
}
