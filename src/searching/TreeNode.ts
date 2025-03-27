/**
 * TreeNode.ts - Definition of tree node structures
 *
 * This file provides tree node interfaces and helper functions
 * for tree-based search algorithms.
 */

/**
 * Interface for a basic binary tree node
 */
export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Interface for a tree node that can be used in graph search algorithms
 * Extends TreeNode with additional properties for tracking visited status
 */
export interface GraphTreeNode extends TreeNode {
  visited?: boolean;
  neighbors?: GraphTreeNode[];
}

/**
 * Create a new binary tree node
 * @param value The value of the node
 * @param left The left child (default: null)
 * @param right The right child (default: null)
 * @returns A new TreeNode
 */
export function createNode(
  value: number,
  left: TreeNode | null = null,
  right: TreeNode | null = null
): TreeNode {
  return { value, left, right };
}

/**
 * Creates a basic binary search tree (BST) from a sorted array
 * @param sortedArray A sorted array of numbers
 * @returns The root node of the BST
 */
export function createBSTFromSortedArray(sortedArray: number[]): TreeNode | null {
  return buildBST(sortedArray, 0, sortedArray.length - 1);
}

/**
 * Helper function to recursively build a BST from a sorted array
 * @param arr Sorted array
 * @param start Start index
 * @param end End index
 * @returns Root node of the created BST
 */
function buildBST(arr: number[], start: number, end: number): TreeNode | null {
  if (start > end) {
    return null;
  }

  // Middle element becomes the root
  const mid = Math.floor((start + end) / 2);
  const node = createNode(arr[mid]);

  // Recursively construct left and right subtrees
  node.left = buildBST(arr, start, mid - 1);
  node.right = buildBST(arr, mid + 1, end);

  return node;
}

/**
 * Performs an inorder traversal of a binary tree and returns the values
 * @param root The root node of the tree
 * @returns Array of values in inorder traversal order
 */
export function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];

  function traverse(node: TreeNode | null) {
    if (node) {
      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    }
  }

  traverse(root);
  return result;
}

/**
 * Creates a sample binary search tree for testing
 * @returns A sample BST
 */
export function createSampleBST(): TreeNode {
  //        50
  //      /    \
  //     30     70
  //    /  \   /  \
  //   20  40 60  80

  const root = createNode(50);
  root.left = createNode(30);
  root.right = createNode(70);
  root.left.left = createNode(20);
  root.left.right = createNode(40);
  root.right.left = createNode(60);
  root.right.right = createNode(80);

  return root;
}

/**
 * Print a tree in a simple hierarchical format
 * @param root The root node of the tree
 * @param prefix The prefix to use for indentation (default: '')
 * @param isLeft Whether the current node is a left child (default: true)
 */
export function printTree(
  root: TreeNode | null,
  prefix: string = '',
  isLeft: boolean = true
): void {
  if (!root) {
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}null`);
    return;
  }

  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${root.value}`);

  // Recursively print the children
  const childPrefix = prefix + (isLeft ? '    ' : '│   ');
  if (root.left || root.right) {
    if (root.right) {
      printTree(root.right, childPrefix, false);
    }
    if (root.left) {
      printTree(root.left, childPrefix, true);
    }
  }
}
