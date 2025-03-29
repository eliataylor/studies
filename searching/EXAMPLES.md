# Search Algorithm Examples

This document provides example commands for running each search algorithm in its best and worst case scenarios, along with insights on why certain parameters affect performance.

## Array Search Algorithms

### Linear Search

```bash
# Best case: Target is at the beginning of the array
npm run search-test -- --algorithms linear --dimensions 1000 --percent-present 100 --seed "first-element"

# Worst case: Target is at the end or not present
npm run search-test -- --algorithms linear --dimensions 10000 --percent-present 0
```

**Insights**: Linear search performs best when the target is found early in the array (O(1) best case) but degrades as the array size increases or when the target is at the end (O(n) worst case). The algorithm is unaffected by whether the array is sorted or not.

### Binary Search

```bash
# Best case: Perfectly sorted array with target in the middle
npm run search-test -- --algorithms binary --dimensions 1000000 --sortedness 100 --percent-present 100

# Worst case: Nearly unsorted array (binary search requires sorting)
npm run search-test -- --algorithms binary --dimensions 1000 --sortedness 0
```

**Insights**: Binary search requires a sorted array but offers O(log n) time complexity even in the worst case. Performance is excellent for large datasets but degrades if the array isn't properly sorted. The best case occurs when the target is at the middle element (O(1)).

### Recursive Binary Search

```bash
# Best case: Small sorted array with target in the middle
npm run search-test -- --algorithms recursiveBinary --dimensions 1000 --sortedness 100

# Worst case: Very large sorted array (causing deep recursion)
npm run search-test -- --algorithms recursiveBinary --dimensions 1000000 --sortedness 100
```

**Insights**: While recursive binary search has the same time complexity as iterative binary search, it uses O(log n) stack space due to recursion, which can lead to stack overflow for very large arrays. This makes it less efficient in terms of space complexity compared to the iterative version.

### Jump Search

```bash
# Best case: Target is at a jump point in a sorted array
npm run search-test -- --algorithms jump --dimensions 10000 --sortedness 100

# Worst case: Unsorted array or target at the end of a large array
npm run search-test -- --algorithms jump --dimensions 10000 --sortedness 0
```

**Insights**: Jump search works well on sorted arrays with O(√n) time complexity, making it a middle ground between linear and binary search. It performs best when the jump step is optimized for the array size (typically √n). It's particularly effective for medium-sized arrays where binary search overhead might be significant.

### Interpolation Search

```bash
# Best case: Uniformly distributed values in sorted array
npm run search-test -- --algorithms interpolation --dimensions 10000 --sortedness 100 --uniqueness 100

# Worst case: Highly skewed distribution or large gaps between values
npm run search-test -- --algorithms interpolation --dimensions 10000 --sortedness 100 --uniqueness 20
```

**Insights**: Interpolation search can achieve O(log log n) in the best case with uniformly distributed data, making it faster than binary search for such datasets. However, it degrades to O(n) in the worst case with skewed distributions or when values are clustered.

### Exponential Search

```bash
# Best case: Target is near the beginning of a sorted array
npm run search-test -- --algorithms exponential --dimensions 10000 --sortedness 100 --seed "near-beginning"

# Worst case: Target is near the end of a very large sorted array
npm run search-test -- --algorithms exponential --dimensions 1000000 --sortedness 100 --seed "near-end"
```

**Insights**: Exponential search is particularly efficient for unbounded arrays or when the target is near the beginning, as it quickly narrows down the search range. It combines a quick range-finding step with binary search, resulting in O(log n) time complexity.

### Fibonacci Search

```bash
# Best case: Sorted array where target is at a Fibonacci offset
npm run search-test -- --algorithms fibonacci --dimensions 1000 --sortedness 100

# Worst case: Very large sorted array with target at an awkward position
npm run search-test -- --algorithms fibonacci --dimensions 100000 --sortedness 100
```

**Insights**: Fibonacci search uses Fibonacci numbers to define search intervals, providing O(log n) complexity while using only addition operations (avoiding division). This can be more efficient on systems where division is costly, but the algorithm has slightly more overhead than binary search.

## Matrix Search Algorithms

### Row-Column Search

```bash
# Best case: Target in top-right or bottom-left corner
npm run search-test -- --algorithms rowColumn --dimensions 100x100 --percent-present 100 --seed "corner-element"

# Worst case: Target in bottom-right corner or not present
npm run search-test -- --algorithms rowColumn --dimensions 100x100 --percent-present 0 --seed "corner-element"
```

**Insights**: This algorithm starts from a corner (typically top-right) and progressively eliminates rows/columns, achieving O(m+n) time complexity. It works best when the target is found quickly, but must potentially traverse an entire row and column in the worst case.

### Binary Search Matrix

```bash
# Best case: Target is near the middle of the flattened matrix
npm run search-test -- --algorithms binaryMatrix --dimensions 100x100 --percent-present 100 --seed "middle-element"

# Worst case: Large sparse matrix
npm run search-test -- --algorithms binaryMatrix --dimensions 1000x1000 --percent-present 0
```

**Insights**: Binary search matrix treats the 2D matrix as a flattened 1D array, achieving O(log(m*n)) time complexity. This approach works well for fully sorted matrices but may have higher overhead due to the index-to-coordinate conversion.

### Staircase Search

```bash
# Best case: Target in top-right or bottom-left corner
npm run search-test -- --algorithms staircase --dimensions 100x100 --percent-present 100 --seed "corner-element"

# Worst case: Target in bottom-right corner or not present
npm run search-test -- --algorithms staircase --dimensions 1000x1000 --percent-present 0
```

**Insights**: Similar to row-column search, staircase search moves through the matrix in a staircase pattern with O(m+n) time complexity. It's particularly efficient for sorted matrices and easy to implement, but performance degrades for large matrices when the target is far from the starting corner.

### Block Search

```bash
# Best case: Target in a critical block or uniformly distributed matrix
npm run search-test -- --algorithms block --dimensions 1000x1000 --percent-present 100

# Worst case: Target in a position requiring many block checks
npm run search-test -- --algorithms block --dimensions 1000x1000 --percent-present 0
```

**Insights**: Block search divides the matrix into blocks for more efficient searching, achieving O(√(m*n)) average time complexity. It works well for large matrices by reducing the total search space but can degrade to O(m+n) in the worst case.

## Tree Search Algorithms

### Preorder DFS (Depth-First Search)

```bash
# Best case: Target is at the root or left subtree
npm run search-test -- --algorithms preorderDFS --dimensions 1000 --percent-present 100 --seed "root-element"

# Worst case: Target is at the rightmost branch or not present
npm run search-test -- --algorithms preorderDFS --dimensions 1000 --percent-present 0 --seed "deep-right"
```

**Insights**: Preorder DFS visits the root first, then recursively explores left and right subtrees. It performs best when the target is at or near the root, but may need to traverse the entire tree (O(n)) in the worst case. Space complexity is O(h) where h is the tree height.

### Inorder DFS

```bash
# Best case: Target is at the left subtree
npm run search-test -- --algorithms inorderDFS --dimensions 1000 --percent-present 100 --seed "left-element"

# Worst case: Target is at the rightmost node or not present
npm run search-test -- --algorithms inorderDFS --dimensions 1000 --percent-present 0
```

**Insights**: Inorder DFS traverses the left subtree, visits the root, then traverses the right subtree. It's particularly useful for BSTs to retrieve nodes in sorted order but has O(n) time complexity in the worst case. Space complexity remains O(h).

### Postorder DFS

```bash
# Best case: Target is in the leftmost leaf
npm run search-test -- --algorithms postorderDFS --dimensions 1000 --percent-present 100 --seed "leaf-element"

# Worst case: Target is at the root or not present
npm run search-test -- --algorithms postorderDFS --dimensions 1000 --percent-present 0 --seed "root-element"
```

**Insights**: Postorder DFS visits left subtree, right subtree, then the root. Since the root is visited last, this is most efficient when the target is in a leaf node. It has O(n) time complexity in the worst case and O(h) space complexity.

### BST Search (Binary Search Tree)

```bash
# Best case: Balanced BST with target at or near root
npm run search-test -- --algorithms bst --dimensions 10000 --percent-present 100 --seed "balanced-bst"

# Worst case: Skewed tree (essentially a linked list)
npm run search-test -- --algorithms bst --dimensions 1000 --percent-present 0 --seed "skewed-left"
```

**Insights**: BST search achieves O(log n) time complexity for balanced trees but degrades to O(n) for skewed trees. Tree balance is critical for performance, with perfect balance giving the best results. This algorithm is specialized for BSTs and won't work correctly on general binary trees.

### BFS (Breadth-First Search)

```bash
# Best case: Target at or near the root level
npm run search-test -- --algorithms bfs --dimensions 1000 --percent-present 100 --seed "root-element"

# Worst case: Target at the deepest level or not present
npm run search-test -- --algorithms bfs --dimensions 1000 --percent-present 0 --seed "deep-level"
```

**Insights**: BFS explores all nodes at the current depth before moving to nodes at the next depth. It performs best when the target is near the root and is optimal for finding the shortest path to a node. However, it requires O(w) space where w is the maximum tree width, which can be substantial for wide trees.

## Advanced Comparison Examples

### Array Algorithms: Sorted vs. Unsorted Data

```bash
# Compare all array algorithms on perfectly sorted data
npm run search-test -- --algorithms array --dimensions 10000 --sortedness 100 --percent-present 50

# Compare all array algorithms on random data
npm run search-test -- --algorithms array --dimensions 10000 --sortedness 0 --percent-present 50
```

**Insights**: This comparison demonstrates how algorithms like binary search, jump search, and interpolation search require sorted data to function effectively, while linear search performs the same regardless of sortedness.

### Matrix Algorithms: Performance by Matrix Size

```bash
# Compare matrix algorithms on a small matrix
npm run search-test -- --algorithms matrix --dimensions 10x10 --percent-present 50

# Compare matrix algorithms on a large matrix
npm run search-test -- --algorithms matrix --dimensions 1000x1000 --percent-present 50
```

**Insights**: As matrix size increases, the performance gap between different algorithms becomes more pronounced. Block search tends to outperform others for very large matrices due to its sublinear average time complexity.

### Tree Algorithms: Balanced vs. Unbalanced Trees

```bash
# Compare tree algorithms on a balanced binary search tree
npm run search-test -- --algorithms tree --dimensions 1000 --percent-present 50 --seed "balanced-bst"

# Compare tree algorithms on a skewed (unbalanced) tree
npm run search-test -- --algorithms tree --dimensions 1000 --percent-present 50 --seed "skewed-left"
```

**Insights**: The performance of BST search degrades significantly on unbalanced trees, while other traversal methods like BFS and DFS maintain their O(n) complexity regardless of tree balance. This highlights the importance of tree balancing techniques.

## Performance Tuning Tips

1. **Choose algorithms based on data characteristics**:
   - For unsorted data: Use linear search
   - For sorted data with uniform distribution: Consider interpolation search
   - For sorted data with unknown distribution: Binary search is reliable
   - For partially sorted data: Consider exponential search

2. **Consider data structure size**:
   - For small arrays (<100 elements): Linear search may outperform binary search due to lower overhead
   - For medium arrays: Jump search offers a good compromise
   - For large arrays: Binary search is typically optimal

3. **Optimize for specific use cases**:
   - Frequent searches on static data: Consider preprocessing (sorting, building a BST)
   - Single searches on dynamic data: Simpler algorithms may be more appropriate
   - Memory-constrained environments: Avoid recursive implementations

4. **Tree optimization**:
   - Keep trees balanced for optimal BST search performance
   - For level-by-level processing or shortest path finding, use BFS
   - For exhaustive traversal, DFS variants are typically more memory efficient

5. **Matrix search optimization**:
   - For sparse matrices: Consider specialized sparse matrix representations
   - For very large matrices: Block search often performs best
   - For small to medium matrices: Staircase or row-column search are simple and effective
