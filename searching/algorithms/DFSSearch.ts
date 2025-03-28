/**
 * DFSSearch.ts - Implementation of depth-first search for trees
 *
 * Depth-First Search (DFS) explores as far as possible along each branch
 * before backtracking. This file provides three DFS traversal methods:
 * preorder, inorder, and postorder.
 */

import { TreeNode } from './TreeNode';
import { runTreeSearch, type TreeSearchFunction } from '../utils';

/**
 * Preorder DFS Search
 *
 * Explores the current node, then left subtree, then right subtree.
 *
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(h) where h is the height of the tree
 *
 * @param root The root node of the tree
 * @param target The value to search for
 * @returns The found node or null if not found
 */
export function preorderDFS(root: TreeNode | null, target: number): TreeNode | null {
  // Base case: empty tree or target found
  if (root === null) {
    return null;
  }

  if (root.value === target) {
    return root;
  }

  // Search in left subtree
  const leftResult = preorderDFS(root.left, target);
  if (leftResult !== null) {
    return leftResult;
  }

  // Search in right subtree
  return preorderDFS(root.right, target);
}

/**
 * Inorder DFS Search
 *
 * Explores the left subtree, then current node, then right subtree.
 *
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(h) where h is the height of the tree
 *
 * @param root The root node of the tree
 * @param target The value to search for
 * @returns The found node or null if not found
 */
export function inorderDFS(root: TreeNode | null, target: number): TreeNode | null {
  // Base case: empty tree
  if (root === null) {
    return null;
  }

  // Search in left subtree
  const leftResult = inorderDFS(root.left, target);
  if (leftResult !== null) {
    return leftResult;
  }

  // Check current node
  if (root.value === target) {
    return root;
  }

  // Search in right subtree
  return inorderDFS(root.right, target);
}

/**
 * Postorder DFS Search
 *
 * Explores the left subtree, then right subtree, then current node.
 *
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(h) where h is the height of the tree
 *
 * @param root The root node of the tree
 * @param target The value to search for
 * @returns The found node or null if not found
 */
export function postorderDFS(root: TreeNode | null, target: number): TreeNode | null {
  // Base case: empty tree
  if (root === null) {
    return null;
  }

  // Search in left subtree
  const leftResult = postorderDFS(root.left, target);
  if (leftResult !== null) {
    return leftResult;
  }

  // Search in right subtree
  const rightResult = postorderDFS(root.right, target);
  if (rightResult !== null) {
    return rightResult;
  }

  // Check current node
  if (root.value === target) {
    return root;
  }

  return null;
}

/**
 * Optimized BST Search
 *
 * Uses the binary search tree property to efficiently find a value.
 * Only works on binary search trees (BST) where each node's value is
 * greater than all values in its left subtree and less than all
 * values in its right subtree.
 *
 * Time Complexity: O(log n) for balanced BST, O(n) worst case
 * Space Complexity: O(h) where h is the height of the tree
 *
 * @param root The root node of the BST
 * @param target The value to search for
 * @returns The found node or null if not found
 */
export function bstSearch(root: TreeNode | null, target: number): TreeNode | null {
  // Base case: empty tree or target found
  if (root === null || root.value === target) {
    return root;
  }

  // If target is less than the current node, search in left subtree
  if (target < root.value) {
    return bstSearch(root.left, target);
  }

  // If target is greater than the current node, search in right subtree
  return bstSearch(root.right, target);
}

/**
 * Iterative Preorder DFS Search
 *
 * Non-recursive implementation of preorder DFS using a stack.
 *
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(h) where h is the height of the tree
 *
 * @param root The root node of the tree
 * @param target The value to search for
 * @returns The found node or null if not found
 */
export function iterativePreorderDFS(root: TreeNode | null, target: number): TreeNode | null {
  if (root === null) {
    return null;
  }

  // Use stack to simulate recursion
  const stack: TreeNode[] = [root];

  while (stack.length > 0) {
    // Pop the top node from stack
    const current = stack.pop()!;

    // Check if current node matches target
    if (current.value === target) {
      return current;
    }

    // Push right child first so that left is processed first (LIFO)
    if (current.right !== null) {
      stack.push(current.right);
    }

    if (current.left !== null) {
      stack.push(current.left);
    }
  }

  return null;
}

// Uncomment to test these algorithms individually
// import { createSampleBST, printTree } from './TreeNode';
//
// // Create a sample BST
// const tree = createSampleBST();
//
// // Print the tree structure
// console.log('Sample Binary Search Tree:');
// printTree(tree);
//
// // Define test targets
// const targets = [
//   { target: 40, exists: true },
//   { target: 70, exists: true },
//   { target: 90, exists: false },
//   { target: 20, exists: true },
//   { target: 55, exists: false }
// ];
//
// // Run tests
// console.log('\n=== Tree Search Tests ===');
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//
//   console.log('Preorder DFS:');
//   const result1 = runTreeSearch(preorderDFS, tree, target, 'Preorder DFS');
//   console.log(`Found: ${result1.found}, Time: ${result1.time.toFixed(4)} ms, Success: ${result1.success ? 'Yes' : 'No'}`);
//
//   console.log('Inorder DFS:');
//   const result2 = runTreeSearch(inorderDFS, tree, target, 'Inorder DFS');
//   console.log(`Found: ${result2.found}, Time: ${result2.time.toFixed(4)} ms, Success: ${result2.success ? 'Yes' : 'No'}`);
//
//   console.log('Postorder DFS:');
//   const result3 = runTreeSearch(postorderDFS, tree, target, 'Postorder DFS');
//   console.log(`Found: ${result3.found}, Time: ${result3.time.toFixed(4)} ms, Success: ${result3.success ? 'Yes' : 'No'}`);
//
//   console.log('BST Search:');
//   const result4 = runTreeSearch(bstSearch, tree, target, 'BST Search');
//   console.log(`Found: ${result4.found}, Time: ${result4.time.toFixed(4)} ms, Success: ${result4.success ? 'Yes' : 'No'}`);
//
//   console.log('Iterative Preorder DFS:');
//   const result5 = runTreeSearch(iterativePreorderDFS, tree, target, 'Iterative Preorder DFS');
//   console.log(`Found: ${result5.found}, Time: ${result5.time.toFixed(4)} ms, Success: ${result5.success ? 'Yes' : 'No'}`);
// });

