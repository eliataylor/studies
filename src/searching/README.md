# TypeScript Search Algorithms

This repository contains implementations of various search algorithms in TypeScript for different data structures, along with utilities for testing and comparing their performance.

## Available Search Algorithms

### Array Search Algorithms
- **Linear Search**: Simple algorithm that checks each element sequentially until the target is found.
- **Binary Search**: Efficient algorithm for sorted arrays that repeatedly divides the search interval in half.
- **Jump Search**: Improvement over linear search for sorted arrays that jumps ahead by fixed steps.
- **Interpolation Search**: Improved variant of binary search that estimates the position of the target value.
- **Exponential Search**: Combination of binary search and exponential checking that works well for unbounded arrays.

### 2D Matrix Search Algorithms
- **Row-Column Search**: Searches a sorted 2D array by eliminating rows and columns.
- **Binary Search Matrix**: Treats a 2D matrix as a flattened sorted array and performs binary search.
- **Staircase Search**: Starts from the top-right corner and eliminates rows/columns based on comparisons.
- **Block Search (Z-algorithm)**: Divides the matrix into blocks and searches efficiently.

### Tree Search Algorithms
- **Depth-First Search (DFS)**: Explores as far as possible along each branch before backtracking.
  - Preorder Traversal
  - Inorder Traversal
  - Postorder Traversal
- **Breadth-First Search (BFS)**: Explores all neighbor nodes at the present depth before moving to nodes at the next depth level.
- **A* Search**: Finds the shortest path using heuristics to guide the search.
- **Best-First Search**: Explores the most promising node according to a specified heuristic.

## Usage

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

### Running Comparison Tests

To run the comparison tests for different data structures:

```bash
npx ts-node CompareArraySearch.ts  # For array search algorithms
npx ts-node CompareMatrixSearch.ts # For 2D matrix search algorithms
npx ts-node CompareTreeSearch.ts   # For tree search algorithms
```

### Using Individual Search Algorithms

You can import and use any search algorithm:

```typescript
import { binarySearch, linearSearch } from './ArraySearch';

const array = [2, 3, 4, 5, 8];
const target = 5;
const index = binarySearch(array, target);
console.log(index); // 3
```

## Time and Space Complexity

### Array Search Algorithms

| Algorithm           | Best Time | Average Time | Worst Time | Space  | Requirements        | Notes                                  |
|---------------------|-----------|--------------|------------|--------|---------------------|----------------------------------------|
| Linear Search       | O(1)      | O(n)         | O(n)       | O(1)   | None                | Works on any array                     |
| Binary Search       | O(1)      | O(log n)     | O(log n)   | O(1)   | Sorted array        | Very efficient for large sorted arrays |
| Jump Search         | O(1)      | O(√n)        | O(√n)      | O(1)   | Sorted array        | Good middle ground between linear and binary |
| Interpolation Search| O(1)      | O(log log n) | O(n)       | O(1)   | Sorted, uniform distribution | Faster than binary search for uniform data |
| Exponential Search  | O(1)      | O(log n)     | O(log n)   | O(1)   | Sorted array        | Useful for unbounded arrays           |

### 2D Matrix Search Algorithms

| Algorithm           | Best Time   | Average Time | Worst Time  | Space  | Requirements            | Notes                                |
|---------------------|-------------|--------------|-------------|--------|-------------------------|------------------------------------- |
| Row-Column Search   | O(1)        | O(m+n)       | O(m+n)      | O(1)   | Sorted rows and columns | Fast for sorted matrices             |
| Binary Search Matrix| O(1)        | O(log(m*n))  | O(log(m*n)) | O(1)   | Sorted matrix           | Treats matrix as flattened array     |
| Staircase Search    | O(1)        | O(m+n)       | O(m+n)      | O(1)   | Sorted rows and columns | Simple implementation                |
| Block Search        | O(1)        | O(√(m*n))    | O(m+n)      | O(1)   | Sorted matrix           | Efficient for large matrices         |

### Tree Search Algorithms

| Algorithm           | Best Time | Average Time | Worst Time | Space     | Notes                               |
|---------------------|-----------|--------------|------------|-----------|-------------------------------------|
| DFS (Preorder)      | O(1)      | O(n)         | O(n)       | O(h)      | h is the height of the tree         |
| DFS (Inorder)       | O(1)      | O(n)         | O(n)       | O(h)      | Good for BST traversal in order     |
| DFS (Postorder)     | O(1)      | O(n)         | O(n)       | O(h)      | Used for deletion and cleanup       |
| BFS                 | O(1)      | O(n)         | O(n)       | O(w)      | w is the max width of the tree      |
| A* Search           | O(1)      | O(b^d)       | O(b^d)     | O(b^d)    | Optimal path finding with heuristic |
| Best-First Search   | O(1)      | O(b^d)       | O(b^d)     | O(b^d)    | Good for approximate solutions      |

Where:
- n is the number of elements
- m and n are the dimensions of the matrix
- h is the height of the tree
- w is the maximum width of the tree
- b is the branching factor
- d is the depth of the goal node

## Project Structure

- `utils.ts`: Utility functions for testing and comparing search algorithms
- `ArraySearch.ts`: Implementations of array search algorithms
- `MatrixSearch.ts`: Implementations of 2D matrix search algorithms
- `TreeSearch.ts`: Implementations of tree search algorithms
- `TreeNode.ts`: Implementation of a tree node data structure
- `CompareArraySearch.ts`: Script to compare performance of array search algorithms
- `CompareMatrixSearch.ts`: Script to compare performance of matrix search algorithms
- `CompareTreeSearch.ts`: Script to compare performance of tree search algorithms
- `index.ts`: Central export point for all search algorithms

## Contributions

Contributions are welcome! Feel free to add new search algorithms, improve existing implementations, or enhance the utility functions.
