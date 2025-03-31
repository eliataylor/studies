# Algorithm Flashcards

## Graph Algorithms

### Breadth-First Search (BFS)
**Definition**: A traversal algorithm that explores all vertices at the current depth level before moving to vertices at the next depth level. Uses a queue data structure.

**Visualization**:
```
    A
   / \
  B   C
 / \   \
D   E   F
```

Starting from A:
1. Visit A
2. Add A's neighbors (B, C) to queue
3. Visit B (dequeue)
4. Add B's neighbors (D, E) to queue
5. Visit C (dequeue)
6. Add C's neighbors (F) to queue
7. Continue until queue is empty

**Complexity**:
- Time: O(V + E) where V = vertices, E = edges
- Space: O(V)
- Best Case: O(1) if starting node is the target
- Worst Case: O(V + E) if we need to visit all vertices

### Depth-First Search (DFS)
**Definition**: A traversal algorithm that explores as far as possible along each branch before backtracking. Uses a stack data structure (or recursion).

**Visualization**:
```
    A
   / \
  B   C
 / \   \
D   E   F
```

Starting from A:
1. Visit A
2. Visit B (A's neighbor)
3. Visit D (B's neighbor)
4. Backtrack to B
5. Visit E (B's other neighbor)
6. Backtrack to A
7. Visit C (A's other neighbor)
8. Visit F (C's neighbor)

**Complexity**:
- Time: O(V + E) where V = vertices, E = edges
- Space: O(V) in worst case (for the recursion stack)
- Best Case: O(1) if starting node is the target
- Worst Case: O(V + E) if we need to visit all vertices

### Dijkstra's Algorithm
**Definition**: A greedy algorithm that finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.

**Visualization**:
```
    A
   /|\
  / | \
 /  |  \
B-2-C-1-D
 \  |  /
  \ | /
   \|/
    E
```

Numbers represent edge weights. Algorithm maintains a set of vertices whose shortest distance from source is known and iteratively adds the vertex with the minimum distance from the remaining vertices.

**Complexity**:
- Time: O(V²) with array, O((V+E)log V) with binary heap or Fibonacci heap
- Space: O(V)
- Best Case: O(V²) with array implementation
- Worst Case: O(V²) with array implementation

### Bellman-Ford Algorithm
**Definition**: An algorithm that computes shortest paths from a source vertex to all other vertices in a weighted graph. Unlike Dijkstra's, it can handle negative edge weights and detect negative cycles.

**Visualization**:
```
    A
   /|\
  / | \
 /  |  \
B-2-C-1-D
 \  |  /
  \-3-/
```

Algorithm relaxes all edges V-1 times (where V is the number of vertices), and then checks for negative weight cycles.

**Complexity**:
- Time: O(V × E)
- Space: O(V)
- Best Case: O(E) in sparse graphs
- Worst Case: O(V × E) in dense graphs

### Kruskal's Algorithm
**Definition**: A greedy algorithm that finds a minimum spanning tree for a connected, weighted, undirected graph. It sorts all edges by weight and adds them to the MST if they don't create a cycle.

**Visualization**:
```
    A
   /|\
  / | \
 /  |  \
B-2-C-1-D
 \  |  /
  \-3-/
```

1. Sort all edges: (C,D,1), (A,C,2), (B,C,2), (B,E,3)
2. Add edges in order if they don't create cycles

**Complexity**:
- Time: O(E log E) or O(E log V) due to sorting edges
- Space: O(V + E)
- Best Case: O(E log E)
- Worst Case: O(E log E)

### Prim's Algorithm
**Definition**: A greedy algorithm that finds a minimum spanning tree for a connected, weighted, undirected graph. It starts from a vertex and keeps adding the lowest weight edge that connects a vertex in the MST to a vertex outside.

**Visualization**:
```
    A
   /|\
  / | \
 /  |  \
B-2-C-1-D
 \  |  /
  \-3-/
```

Starting from A:
1. Add the lowest weight edge connecting A to another vertex
2. Keep adding the lowest weight edge that connects a vertex in the growing MST to a vertex outside it

**Complexity**:
- Time: O(V²) with array, O(E log V) with binary heap
- Space: O(V)
- Best Case: O(V²) with array
- Worst Case: O(V²) with array

## Greedy Algorithms

### Interval Scheduling
**Definition**: A problem where we want to schedule a maximum number of non-overlapping intervals. The greedy approach is to always select the interval with the earliest finish time.

**Visualization**:
```
0  1  2  3  4  5  6  7  8  9  10
|--|     |------|
   |-----|      |-------|
      |--|   |------|
                  |--|
```

Sorted by finish time:
1. Select interval [0,2]
2. Select interval [3,5]
3. Select interval [8,9]

**Complexity**:
- Time: O(n log n) due to sorting
- Space: O(n) or O(1) if done in-place
- Best Case: O(n) if already sorted
- Worst Case: O(n log n)

### Huffman Coding
**Definition**: A lossless data compression algorithm that uses variable-length codes to represent symbols. Symbols with higher frequency have shorter codes.

**Visualization**:
Frequencies: A:5, B:9, C:12, D:13, E:16, F:45

```
                  100
                 /   \
                /     \
               /       \
              45       55
             /  \      / \
            F    29   26  E
                / \   / \
               D   C  A  B
```

Results in codes:
F: 0, D: 100, C: 101, A: 110, B: 111, E: 11

**Complexity**:
- Time: O(n log n) where n is the number of symbols
- Space: O(n)
- Best Case: O(n log n)
- Worst Case: O(n log n)

### Activity Selection
**Definition**: A problem where we want to schedule a maximum number of activities given their start and finish times. The greedy approach is to always select the activity with the earliest finish time.

**Visualization**:
```
Activities:
1: [1,4]
2: [3,5]
3: [0,6]
4: [5,7]
5: [3,8]
6: [5,9]
7: [6,10]
8: [8,11]
```

Selection process:
1. Select activity 1 [1,4]
2. Select activity 4 [5,7]
3. Select activity 8 [8,11]

**Complexity**:
- Time: O(n log n) due to sorting
- Space: O(n) for storage
- Best Case: O(n) if already sorted
- Worst Case: O(n log n)

## Divide and Conquer

### Binary Search
**Definition**: An algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.

**Visualization**:
```
Array: [1, 3, 4, 6, 8, 9, 11]
Target: 6

Step 1: mid = 4, A[4] = 8 > 6
Step 2: search [1, 3, 4, 6]
Step 3: mid = 2, A[2] = 4 < 6
Step 4: search [6]
Step 5: mid = 3, A[3] = 6 == 6 (found)
```

**Complexity**:
- Time: O(log n)
- Space: O(1) iterative, O(log n) recursive
- Best Case: O(1) if the middle element is the target
- Worst Case: O(log n)

### Merge Sort
**Definition**: A divide and conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.

**Visualization**:
```
Original: [38, 27, 43, 3, 9, 82, 10]

Divide:
[38, 27, 43, 3] [9, 82, 10]
[38, 27] [43, 3] [9, 82] [10]
[38] [27] [43] [3] [9] [82] [10]

Conquer (merge):
[27, 38] [3, 43] [9, 82] [10]
[3, 27, 38, 43] [9, 10, 82]
[3, 9, 10, 27, 38, 43, 82]
```

**Complexity**:
- Time: O(n log n)
- Space: O(n)
- Best Case: O(n log n)
- Worst Case: O(n log n)

### QuickSort
**Definition**: A divide and conquer algorithm that picks an element as a pivot and partitions the array around it, then recursively sorts the sub-arrays.

**Visualization**:
```
Original: [10, 7, 8, 9, 1, 5]

Step 1: Choose pivot (5)
Partition: [1] [5] [10, 7, 8, 9]
Step 2: Recursively sort subarrays
Left: [1] (already sorted)
Right: Choose pivot (9)
Partition: [7, 8] [9] [10]
Step 3: Continue recursion...
Final: [1, 5, 7, 8, 9, 10]
```

**Complexity**:
- Time: Average O(n log n), Worst O(n²)
- Space: O(log n) due to recursion
- Best Case: O(n log n) with good pivot selection
- Worst Case: O(n²) with bad pivot selection (e.g., already sorted array)

### Closest Pair of Points
**Definition**: An algorithm to find the closest pair of points in a set of points in a plane. Uses divide and conquer by splitting points based on x-coordinate.

**Visualization**:
```
Points: [(1,1), (2,3), (3,4), (5,2), (6,7)]

1. Sort points by x-coordinate
2. Divide into two sets
3. Find closest pair in each set
4. Check if there's a closer pair that spans both sets
5. Return the overall closest pair
```

**Complexity**:
- Time: O(n log n)
- Space: O(n)
- Best Case: O(n log n)
- Worst Case: O(n log n)

## Backtracking

### N-Queens Problem
**Definition**: The problem of placing N chess queens on an N×N chessboard so that no two queens threaten each other.

**Visualization**:
For N=4:
```
Q . . .
. . Q .
. . . Q
. Q . .
```

Backtracking approach:
1. Start with an empty board
2. Place queens one by one in different columns
3. When we place a queen, check if it's safe
4. If placing a queen leads to a solution, record it
5. If not, backtrack and try different positions

**Complexity**:
- Time: O(N!)
- Space: O(N)
- Best Case: O(N) if solution found immediately
- Worst Case: O(N!)

### Graph Coloring
**Definition**: Assigning colors to vertices of a graph such that no two adjacent vertices have the same color, using the minimum number of colors.

**Visualization**:
```
    A---B
   /|   |\
  / |   | \
 C--D---E--F
```

Backtracking approach:
1. Try coloring one vertex at a time
2. For each vertex, try all possible colors
3. Check if the color is valid (no adjacent vertices have the same color)
4. If not valid, backtrack and try a different color

**Complexity**:
- Time: O(m^V) where m is the number of colors and V is the number of vertices
- Space: O(V)
- Best Case: O(V) for easily colorable graphs
- Worst Case: O(m^V)

### Subset Sum
**Definition**: Finding a subset of a given set whose sum equals a given target sum.

**Visualization**:
```
Set: {3, 34, 4, 12, 5, 2}
Target Sum: 9

Backtracking Tree:
                 []
              /      \
          [3]          []
        /    \       /    \
    [3,34]  [3]   [34]    []
    ...
```

**Complexity**:
- Time: O(2^n) in worst case
- Space: O(n) for recursion stack
- Best Case: O(1) if first element equals target
- Worst Case: O(2^n)

## Network Flow

### Ford-Fulkerson Algorithm
**Definition**: An algorithm for computing the maximum flow in a flow network. It iteratively finds augmenting paths and increases flow along these paths.

**Visualization**:
```
    B---5-->C
   /|       |
  / |       |
10  2       5
/   |       |
A   v       v
\   |       |
10  2       5
  \ |       |
   \v       |
    D---5-->E
```

Numbers represent capacities. Algorithm repeatedly finds paths from source to sink with available capacity and augments the flow.

**Complexity**:
- Time: O(E × max_flow) where E is the number of edges
- Space: O(V + E)
- Best Case: O(E)
- Worst Case: O(E × max_flow)

### Max Flow-Min Cut
**Definition**: A theorem stating that the maximum flow through a network equals the minimum capacity of a cut that separates the source and sink.

**Visualization**:
```
    B---5-->C
   /|       |
  / |       |
10  2       5
/   |       |
A   v       v
\   |       |
10  2       5
  \ |       |
   \v       |
    D---5-->E
```

Min cut (shown as dotted line) separates {A} from {B,C,D,E} with capacity 20.

**Complexity**:
- Time: Same as the algorithm used to find max flow
- Space: O(V + E)
- Best Case: O(E)
- Worst Case: O(E × max_flow) using Ford-Fulkerson

## String Algorithms

### Knuth-Morris-Pratt (KMP)
**Definition**: An algorithm for pattern matching that uses the observation that when a mismatch occurs, the pattern itself contains sufficient information to determine where the next match could begin.

**Visualization**:
```
Text:    A B C A B C A B C D
Pattern: A B C A B D

Step 1: Compare pattern with text
A B C A B C A B C D
A B C A B D
^ ^ ^ ^ ^ × (mismatch)

Step 2: Using pattern's prefix information, shift pattern
A B C A B C A B C D
      A B C A B D
      ^ ^ ^ ^ ^ × (mismatch)

Step 3: Shift again
A B C A B C A B C D
            A B C A B D
```

**Complexity**:
- Time: O(n + m) where n is text length, m is pattern length
- Space: O(m) for the prefix table
- Best Case: O(n)
- Worst Case: O(n + m)

### Rabin-Karp Algorithm
**Definition**: A string-searching algorithm that uses hashing to find any one of a set of pattern strings in a text.

**Visualization**:
```
Text:    A B C A B C D
Pattern: A B C

Step 1: Compute hash for pattern hash("ABC") = h
Step 2: Compute hash for first m characters of text hash("ABC") = h
Step 3: Compare (match found)
Step 4: Compute hash for next window using rolling hash
        hash("BCA") = h'
Step 5: Continue...
```

**Complexity**:
- Time: Average O(n + m), Worst O(n × m)
- Space: O(1)
- Best Case: O(n + m)
- Worst Case: O(n × m) with many hash collisions

### Tries
**Definition**: A tree-like data structure used to store a dynamic set of strings, where the keys are usually strings.

**Visualization**:
```
Trie for: "to", "tea", "ten", "in", "inn"

      root
     /    \
    t      i
   /       |
  o        n
 /         |
e          n
/ \
a  n
```

**Complexity**:
- Time: O(m) for search/insert/delete, where m is key length
- Space: O(ALPHABET_SIZE × m × n) where n is number of keys
- Best Case: O(1) for very short prefixes
- Worst Case: O(m)

### Suffix Trees/Arrays
**Definition**: Data structures that index all suffixes of a string to allow efficient string operations.

**Visualization**:
```
Suffix tree for "banana":
       root
      /|  \
     a b   n
    /| \   |
   n n$ a  a
  /     |  | \
 a      n  n  $
/ \     |  |
n  $    a  a
|       |  |
a       $  $
|
$
```

**Complexity**:
- Time: O(n) for construction, O(m) for pattern matching
- Space: O(n)
- Best Case: O(m) for pattern matching where m is pattern length
- Worst Case: O(n) for construction where n is text length

## Geometric Algorithms

### Convex Hull
**Definition**: The smallest convex polygon that contains all the points in a set. Graham's scan is a common algorithm to find it.

**Visualization**:
```
Points:
  .   .
 .     .
.   .   .
  .   .

Convex Hull:
  ._____.
 /       \
.         .
 \_______/
```

**Complexity**:
- Time: O(n log n) for Graham's scan
- Space: O(n)
- Best Case: O(n log n)
- Worst Case: O(n log n)

### Line Intersection
**Definition**: Determining if two line segments intersect, and if so, finding the intersection point.

**Visualization**:
```
Line 1: A----B
Line 2:    C
           |
           |
           D

Intersection check:
- Check if the endpoints of each segment are on opposite sides of the other segment
```

**Complexity**:
- Time: O(1) for two line segments
- Space: O(1)
- Best Case: O(1)
- Worst Case: O(1)

### Closest Pair of Points
**Definition**: Finding the pair of points with the smallest distance between them in a set of points.

**Visualization**:
```
Points: . . .
        .   .
        . . .

Divide and conquer approach:
1. Sort points by x-coordinate
2. Divide into left and right halves
3. Find closest pair in each half
4. Check if there's a closer pair that spans the dividing line
```

**Complexity**:
- Time: O(n log n)
- Space: O(n)
- Best Case: O(n log n)
- Worst Case: O(n log n)
