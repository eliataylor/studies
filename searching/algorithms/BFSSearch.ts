/**
 * BFSSearch.ts - Implementation of breadth-first search for trees
 *
 * Breadth-First Search (BFS) explores all neighbor nodes at the present
 * depth before moving to nodes at the next depth level.
 */

import { TreeNode } from './TreeNode';
import { runTreeSearch, type TreeSearchFunction } from '../utils';

/**
 * Breadth-First Search (BFS)
 *
 * Explores all nodes at the present depth level before
 * moving on to nodes at the next depth level.
 *
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(w) where w is the maximum width of the tree
 *
 * @param root The root node of the tree
 * @param target The value to search for
 * @returns The found node or null if not found
 */
export function bfs(root: TreeNode | null, target: number): TreeNode | null {
  if (root === null) {
    return null;
  }

  // Use queue to store nodes to be visited
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    // Remove the first node from the queue
    const current = queue.shift()!;

    // Check if current node matches target
    if (current.value === target) {
      return current;
    }

    // Add child nodes to the queue
    if (current.left !== null) {
      queue.push(current.left);
    }

    if (current.right !== null) {
      queue.push(current.right);
    }
  }

  return null;
}

/**
 * Level Order Traversal
 *
 * A variation of BFS that processes nodes level by level.
 * Returns an array of nodes at each level.
 *
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(w) where w is the maximum width of the tree
 *
 * @param root The root node of the tree
 * @returns Array of arrays, where each inner array contains nodes at one level
 */
export function levelOrderTraversal(root: TreeNode | null): number[][] {
  const result: number[][] = [];

  if (root === null) {
    return result;
  }

  // Use queue to store nodes to be visited
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    // Process all nodes at the current level
    for (let i = 0; i < levelSize; i++) {
      const current = queue.shift()!;
      currentLevel.push(current.value);

      // Add child nodes to the queue for next level
      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }

    result.push(currentLevel);
  }

  return result;
}

/**
 * BFS Search with Level Tracking
 *
 * A variant of BFS that returns not just the node but also its level in the tree.
 * This is useful for finding the shortest path in unweighted trees/graphs.
 *
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(w) where w is the maximum width of the tree
 *
 * @param root The root node of the tree
 * @param target The value to search for
 * @returns An object with the found node and its level, or null if not found
 */
export function bfsWithLevel(root: TreeNode | null, target: number): { node: TreeNode, level: number } | null {
  if (root === null) {
    return null;
  }

  // Use queue to store nodes to be visited along with their levels
  const queue: { node: TreeNode, level: number }[] = [{ node: root, level: 0 }];

  while (queue.length > 0) {
    // Remove the first node from the queue
    const { node: current, level } = queue.shift()!;

    // Check if current node matches target
    if (current.value === target) {
      return { node: current, level };
    }

    // Add child nodes to the queue with incremented level
    if (current.left !== null) {
      queue.push({ node: current.left, level: level + 1 });
    }

    if (current.right !== null) {
      queue.push({ node: current.right, level: level + 1 });
    }
  }

  return null;
}

/**
 * Bidirectional BFS
 *
 * Runs BFS from both source and target nodes simultaneously.
 * This can be faster for finding paths between two nodes.
 * This implementation is simplified for binary trees and only checks
 * if a path exists between two values.
 *
 * Time Complexity: O(b^(d/2)) where b is branching factor and d is distance
 * Space Complexity: O(b^(d/2))
 *
 * @param root The root node of the tree
 * @param startValue The starting value
 * @param endValue The target value
 * @returns True if a path exists between startValue and endValue, false otherwise
 */
export function bidirectionalBFS(
  root: TreeNode | null,
  startValue: number,
  endValue: number
): boolean {
  if (root === null) {
    return false;
  }

  // If either value doesn't exist in the tree, no path exists
  const startNode = bfs(root, startValue);
  const endNode = bfs(root, endValue);

  if (startNode === null || endNode === null) {
    return false;
  }

  // Use two sets to track visited nodes from both directions
  const visitedFromStart = new Set<number>();
  const visitedFromEnd = new Set<number>();

  // Use two queues for BFS from both directions
  const queueFromStart: TreeNode[] = [startNode];
  const queueFromEnd: TreeNode[] = [endNode];

  visitedFromStart.add(startValue);
  visitedFromEnd.add(endValue);

  while (queueFromStart.length > 0 && queueFromEnd.length > 0) {
    // Expand from start side
    if (expandBFS(queueFromStart, visitedFromStart, visitedFromEnd)) {
      return true;
    }

    // Expand from end side
    if (expandBFS(queueFromEnd, visitedFromEnd, visitedFromStart)) {
      return true;
    }
  }

  return false;
}

/**
 * Helper function to expand BFS from one side in bidirectional search
 */
function expandBFS(
  queue: TreeNode[],
  visited: Set<number>,
  otherVisited: Set<number>
): boolean {
  if (queue.length === 0) {
    return false;
  }

  const current = queue.shift()!;

  // Check children
  const children = [current.left, current.right].filter(node => node !== null) as TreeNode[];

  for (const child of children) {
    if (!visited.has(child.value)) {
      // If this node has been visited from the other direction,
      // we found a meeting point
      if (otherVisited.has(child.value)) {
        return true;
      }

      visited.add(child.value);
      queue.push(child);
    }
  }

  return false;
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
// console.log('\n=== BFS Search Tests ===');
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//
//   console.log('Standard BFS:');
//   const result1 = runTreeSearch(bfs, tree, target, 'BFS');
//   console.log(`Found: ${result1.found}, Time: ${result1.time.toFixed(4)} ms, Success: ${result1.success ? 'Yes' : 'No'}`);
//
//   console.log('BFS with Level:');
//   const startTime = performance.now();
//   const result2 = bfsWithLevel(tree, target);
//   const endTime = performance.now();
//   console.log(`Found: ${result2 !== null}, Level: ${result2?.level ?? 'N/A'}, Time: ${(endTime - startTime).toFixed(4)} ms`);
// });
//
// // Test level order traversal
// console.log('\nLevel Order Traversal:');
// const levels = levelOrderTraversal(tree);
// levels.forEach((level, i) => {
//   console.log(`Level ${i}: ${level.join(', ')}`);
// });
//
// // Test bidirectional BFS
// console.log('\nBidirectional BFS Tests:');
// console.log(`Path from 20 to 80: ${bidirectionalBFS(tree, 20, 80)}`);
// console.log(`Path from 30 to 70: ${bidirectionalBFS(tree, 30, 70)}`);
// console.log(`Path from 20 to 90: ${bidirectionalBFS(tree, 20, 90)}`);
