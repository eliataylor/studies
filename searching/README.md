# TypeScript Search Algorithms

This repository contains implementations of various search algorithms in TypeScript for different data structures, along
with a unified framework for testing and comparing their performance.

## Installation

1. Install the dependencies:

```bash
npm install
```

## Search Algorithm Unit Testing

- Test individual or multiple search algorithms across various scenarios
- Organize algorithms by data structure type (array, matrix, tree)
- Configure data size, number of test targets, and percentage of present targets
- Use a random seed for reproducible results
- View detailed performance metrics with colorful, well-formatted output

### Command-Line Options

- `-a, --algorithms <string>`: Algorithm name, comma-separated list, or category name (`array`, `matrix`, `tree`, `all`)
- `-s, --sizes <string>`: Comma-separated list of data sizes to test (default: "1000")
- `--targets <number>`: Number of search targets to test (default: 10)
- `--percent-present <number>`: Percentage of targets present in data (0-100) (default: 50)
- `--seed <string>`: Random seed for reproducible test data
- `-v, --verbose`: Show detailed information about searches
- `--compare`: Force comparison mode (automatically enabled for multiple algorithms)

### Example Usage Scenarios

#### 1. Testing a Single Algorithm

```bash
# Test binary search with an array of 1000 elements
npm run search-test -- --algorithms binary

# Test staircase search with a 100x100 matrix
npm run search-test -- --algorithms staircase --sizes 100
```

#### 2. Comparing Algorithm Categories

```bash
# Compare all array search algorithms
npm run search-test -- --algorithms array

# Compare all tree search algorithms with 5 targets
npm run search-test -- --algorithms tree --targets 5
```

#### 3. Comparing Specific Algorithms

```bash
# Compare binary search, interpolation search, and jump search
npm run search-test -- --algorithms "binary,interpolation,jump"

# Compare all matrix search algorithms across different sizes
npm run search-test -- --algorithms matrix --sizes "10,50,100"
```

#### 4. Detailed Analysis

```bash
# Verbose output for detailed search information
npm run search-test -- --algorithms "binary,linear" --verbose

# Compare tree search algorithms with 100% present targets
npm run search-test -- --algorithms tree --percent-present 100
```

## Available Algorithms

### Array Search Algorithms

- **linear**: Linear Search - Simple algorithm that checks each element sequentially until the target is found.
- **binary**: Binary Search - Efficient algorithm for sorted arrays that repeatedly divides the search interval in half.
- **recursiveBinary**: Recursive Binary Search - A recursive implementation of binary search.
- **jump**: Jump Search - Improvement over linear search for sorted arrays that jumps ahead by fixed steps.
- **interpolation**: Interpolation Search - Improved variant of binary search that estimates the position of the target
  value.
- **exponential**: Exponential Search - Combination of binary search and exponential checking that works well for
  unbounded arrays.
- **fibonacci**: Fibonacci Search - Search algorithm that uses Fibonacci numbers to divide the array.

### 2D Matrix Search Algorithms

- **rowColumn**: Row-Column Search - Searches a sorted 2D array by eliminating rows and columns.
- **binaryMatrix**: Binary Search Matrix - Treats a 2D matrix as a flattened sorted array and performs binary search.
- **staircase**: Staircase Search - Starts from the top-right corner and eliminates rows/columns based on comparisons.
- **block**: Block Search (Z-algorithm) - Divides the matrix into blocks and searches efficiently.

### Tree Search Algorithms

- **preorderDFS**: Preorder Depth-First Search - Explores the root, then left subtree, then right subtree.
- **inorderDFS**: Inorder Depth-First Search - Explores the left subtree, then root, then right subtree.
- **postorderDFS**: Postorder Depth-First Search - Explores the left subtree, then right subtree, then root.
- **bst**: Binary Search Tree Search - Optimized search specifically for binary search trees.
- **bfs**: Breadth-First Search - Explores all neighbor nodes at the present depth before moving to nodes at the next
  depth level.

## Time and Space Complexity

### Array Search Algorithms

| Algorithm            | Best Time | Average Time | Worst Time | Space    | Requirements                 | Notes                                        |
|----------------------|-----------|--------------|------------|----------|------------------------------|----------------------------------------------|
| Linear Search        | O(1)      | O(n)         | O(n)       | O(1)     | None                         | Works on any array                           |
| Binary Search        | O(1)      | O(log n)     | O(log n)   | O(1)     | Sorted array                 | Very efficient for large sorted arrays       |
| Recursive Binary     | O(1)      | O(log n)     | O(log n)   | O(log n) | Sorted array                 | Uses stack space for recursion               |
| Jump Search          | O(1)      | O(√n)        | O(√n)      | O(1)     | Sorted array                 | Good middle ground between linear and binary |
| Interpolation Search | O(1)      | O(log log n) | O(n)       | O(1)     | Sorted, uniform distribution | Faster than binary search for uniform data   |
| Exponential Search   | O(1)      | O(log n)     | O(log n)   | O(1)     | Sorted array                 | Useful for unbounded arrays                  |
| Fibonacci Search     | O(1)      | O(log n)     | O(log n)   | O(1)     | Sorted array                 | Reduces divisions to additions               |

### 2D Matrix Search Algorithms

| Algorithm            | Best Time | Average Time | Worst Time  | Space | Requirements            | Notes                            |
|----------------------|-----------|--------------|-------------|-------|-------------------------|----------------------------------|
| Row-Column Search    | O(1)      | O(m+n)       | O(m+n)      | O(1)  | Sorted rows and columns | Fast for sorted matrices         |
| Binary Search Matrix | O(1)      | O(log(m*n))  | O(log(m*n)) | O(1)  | Sorted matrix           | Treats matrix as flattened array |
| Staircase Search     | O(1)      | O(m+n)       | O(m+n)      | O(1)  | Sorted rows and columns | Simple implementation            |
| Block Search         | O(1)      | O(√(m*n))    | O(m+n)      | O(1)  | Sorted matrix           | Efficient for large matrices     |

### Tree Search Algorithms

| Algorithm     | Best Time | Average Time | Worst Time | Space | Notes                           |
|---------------|-----------|--------------|------------|-------|---------------------------------|
| Preorder DFS  | O(1)      | O(n)         | O(n)       | O(h)  | h is the height of the tree     |
| Inorder DFS   | O(1)      | O(n)         | O(n)       | O(h)  | Good for BST traversal in order |
| Postorder DFS | O(1)      | O(n)         | O(n)       | O(h)  | Used for deletion and cleanup   |
| BST Search    | O(1)      | O(log n)     | O(n)       | O(h)  | O(log n) for balanced BSTs      |
| BFS           | O(1)      | O(n)         | O(n)       | O(w)  | w is the max width of the tree  |

Where:

- n is the number of elements
- m and n are the dimensions of the matrix
- h is the height of the tree
- w is the maximum width of the tree

## Understanding Search Algorithm Performance

The framework generates color-coded output showing the relative performance of algorithms. Here's how to interpret the
results:

- **Avg Time (ms)**: Average execution time across all search targets
- **Min/Max Time**: Shows the range of execution times
- **Success Rate**: Percentage of searches with correct results

## Help Information

For detailed information about the search-test command and available algorithms:

```bash
npm run search-help
```

## Project Structure

- `utils.ts`: Utility functions for testing and comparing search algorithms
- Algorithm implementations:
    - Array search algorithms: `LinearSearch.ts`, `BinarySearch.ts`, etc.
    - Matrix search algorithms: `RowColumnSearch.ts`, `StaircaseSearch.ts`, etc.
    - Tree search algorithms: `DFSSearch.ts`, `BFSSearch.ts`, etc.
- `SearchTester.ts`: Command-line interface for running and comparing algorithms
- `SearchHelp.ts`: Help utility with algorithm information and examples

Please ensure your code follows the existing style and includes appropriate tests.

## License

MIT
