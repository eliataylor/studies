# TypeScript Sorting Algorithms

This repository contains implementations of various sorting algorithms in TypeScript, along with a unified framework for testing and comparing their performance.

## Installation

1. Install the dependencies:

```bash
npm install
```

2. Build the TypeScript files:

```bash
npm run build
```

## Sorting Algorithm Test Framework

The unified testing framework allows you to test individual algorithms or compare multiple algorithms under configurable conditions to understand their performance characteristics.

```bash
npm run sort-test -- [options]
```

### Key Features

- Test individual or multiple algorithms across various scenarios
- Configure array size, value range, and number of test runs
- Set the initial sortedness level of the test array (0-100%)
- Choose predefined array types (random, sorted, reversed, few unique values)
- Use a random seed for reproducible results
- View detailed performance metrics with colorful, well-formatted output

### Command-Line Options

- `-A, --algorithms <string>`: Algorithm name, comma-separated list, or category name
- `-s, --size <number>`: Size of the array to sort (default: 1000)
- `--min <number>`: Minimum value in the array (default: 0)
- `--max <number>`: Maximum value in the array (default: 1000)
- `--seed <string>`: Random seed for reproducible arrays
- `-r, --runs <number>`: Number of runs per algorithm (default: 1)
- `-t, --arrayType <type>`: Type of array to generate (random, sorted, reversed, fewUnique)
- `--sortedness <number>`: Level of sortedness from 0 (random) to 100 (sorted) (default: 0)
- `-v, --verbose`: Show additional details including array previews

### Array Types and Sortedness

The framework provides powerful ways to test algorithms with different input characteristics:

- **Random arrays**: Completely unsorted data
- **Sorted arrays**: Fully sorted data
- **Reversed arrays**: Data in reverse order (worst case for many algorithms)
- **Few unique values**: Many duplicate values (tests stability)

The `--sortedness` parameter controls how sorted the array is (0-100%):
- 0% = completely random
- 100% = perfectly sorted according to the array type
- Any value in between creates a partially sorted array

This parameter works with all array types. For example, with a reversed array:
- `--arrayType reversed --sortedness 100` = completely reversed
- `--arrayType reversed --sortedness 0` = completely random
- `--arrayType reversed --sortedness 80` = mostly reversed with some shuffling

## Available Algorithms

### Basic O(n²) Algorithms

- **bubble**: Bubble Sort - Simple but inefficient for large arrays
- **selection**: Selection Sort - Makes minimal swaps but always O(n²)
- **insertion**: Insertion Sort - Efficient for small or nearly sorted arrays
- **gnome**: Gnome Sort - Simple implementation with poor performance
- **optimizedGnome**: Optimized Gnome Sort - Slightly better version of gnome sort
- **comb**: Comb Sort - Improves on bubble sort with gap approach
- **shell**: Shell Sort - Improves on insertion sort with gap approach

### Efficient O(n log n) Algorithms

- **merge**: Merge Sort - Stable with consistent O(n log n) performance
- **quick**: Quick Sort - Generally fastest in practice but has worst case O(n²)
- **heap**: Heap Sort - In-place with guaranteed O(n log n) performance
- **tim**: Tim Sort - Hybrid algorithm used in Python and Java
- **intro**: Intro Sort - Hybrid algorithm used in C++ STL

### Non-comparison Based Algorithms

- **counting**: Counting Sort - O(n+k) performance for small ranges of integers
- **radix**: Radix Sort - Efficient for integers with limited number of digits
- **bucket**: Bucket Sort - Good for uniformly distributed data

## Example Usage Scenarios

### 1. Testing a Single Algorithm

```bash
# Test quicksort with a random array of 1000 elements
npm run sort-test --algorithms quick

# Test insertion sort with a nearly sorted array (90% sorted)
npm run sort-test --algorithms insertion --sortedness 90
```

### 2. Comparing Algorithm Categories

```bash
# Compare all basic (O(n²)) algorithms
npm run sort-test --algorithms basic --size 5000

# Compare efficient (O(n log n)) algorithms on reversed data
npm run sort-test --algorithms efficient --arrayType reversed
```

### 3. Comparing Specific Algorithms

```bash
# Compare quick, merge and heap sort with 5 runs for accuracy
npm run sort-test --algorithms "quick,merge,heap" --runs 5

# Compare insertion sort and quick sort on nearly sorted data
npm run sort-test --algorithms "insertion,quick" --sortedness 95
```

### 4. Demonstrating Algorithm Strengths and Weaknesses

The following examples reveal how different algorithms perform under varying conditions:

#### Small Random Array (10 elements, unsorted)
```bash
npm run sort-test --algorithms all --size 10 --sortedness 1
```
*Key insight: Simple O(n²) algorithms like insertion sort are often faster for very small arrays due to less overhead.*

#### Small Nearly-Sorted Array (10 elements, 99% sorted)
```bash
npm run sort-test --algorithms all --size 10 --sortedness 99
```
*Key insight: Insertion sort often outperforms even O(n log n) algorithms on nearly sorted data.*

#### Large Random Array (50000 elements, unsorted)
```bash
npm run sort-test --algorithms all --size 50000 --sortedness 1
```
*Key insight: O(n log n) algorithms dramatically outperform O(n²) algorithms on large datasets. Quick and heap sort typically excel here.*

#### Large Nearly-Sorted Array (50000 elements, 99% sorted)
```bash
npm run sort-test --algorithms all --size 50000 --sortedness 99
```
*Key insight: Algorithms like insertion sort and Tim sort that take advantage of existing order can outperform other algorithms on nearly sorted large arrays.*

## Understanding Sort Algorithm Performance

The framework generates color-coded output showing the relative performance of algorithms. Here's how to interpret the results:

- **Avg Time (ms)**: Average execution time across all runs
- **Min/Max Time**: Shows the range of execution times 
- **Relative Speed**: How many times slower an algorithm is compared to the fastest one
- **Compared to Fastest**: Percentage difference from the fastest algorithm

## Time and Space Complexity

| Algorithm       | Best Time     | Average Time  | Worst Time    | Space  | Stable | Best For                               |
|-----------------|---------------|---------------|---------------|--------|--------|----------------------------------------|
| Bubble Sort     | O(n)          | O(n²)         | O(n²)         | O(1)   | Yes    | Teaching, small or nearly sorted arrays|
| Selection Sort  | O(n²)         | O(n²)         | O(n²)         | O(1)   | No     | Minimizing swaps                       |
| Insertion Sort  | O(n)          | O(n²)         | O(n²)         | O(1)   | Yes    | Small or nearly sorted arrays          |
| Gnome Sort      | O(n)          | O(n²)         | O(n²)         | O(1)   | Yes    | Simplicity of implementation           |
| Comb Sort       | O(n log n)    | O(n²/2^p)     | O(n²)         | O(1)   | No     | Improving on bubble sort               |
| Shell Sort      | O(n log n)    | O(n(log n)²)  | O(n²)         | O(1)   | No     | Improving on insertion sort            |
| Merge Sort      | O(n log n)    | O(n log n)    | O(n log n)    | O(n)   | Yes    | Guaranteeing stable sorting            |
| Quick Sort      | O(n log n)    | O(n log n)    | O(n²)         | O(log n)| No    | General purpose with good cache locality|
| Heap Sort       | O(n log n)    | O(n log n)    | O(n log n)    | O(1)   | No     | Guaranteed worst case, in-place sorting |
| Tim Sort        | O(n)          | O(n log n)    | O(n log n)    | O(n)   | Yes    | Real-world data with partial ordering  |
| Intro Sort      | O(n log n)    | O(n log n)    | O(n log n)    | O(log n)| No    | General purpose, avoiding quick sort's worst case|
| Counting Sort   | O(n + k)      | O(n + k)      | O(n + k)      | O(n + k)| Yes   | Small range integers                   |
| Radix Sort      | O(nk)         | O(nk)         | O(nk)         | O(n + k)| Yes   | Integers or strings with limited digits|
| Bucket Sort     | O(n + k)      | O(n + k)      | O(n²)         | O(n + k)| Yes   | Uniformly distributed data             |

Where:
- n is the number of elements
- k is the range of values or number of digits
- p is the number of increments in comb sort

## Contributing

Contributions are welcome! You can:

1. Add new sorting algorithms
2. Improve existing implementations
3. Enhance the testing framework
4. Fix bugs or improve documentation

Please ensure your code follows the existing style and includes appropriate tests.

## License

MIT
