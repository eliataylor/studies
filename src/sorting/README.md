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

## Unified Testing Framework

The unified testing framework allows you to test individual sorting algorithms or compare multiple algorithms with configurable parameters.

```bash
npm run sort-test -- [options]
```

### Key Features

- Test individual or multiple algorithms
- Configure array size, value range, and number of runs
- Set the initial sortedness level of the test array (0-100%)
- Use predefined array types (random, sorted, reversed, few unique values)
- Set a random seed for reproducible results
- Detailed performance metrics and relative comparison

### Options

- `-a, --algorithm <name>`: Single algorithm to test
- `-A, --algorithms <string>`: Comma-separated list of algorithms to test, or category name
- `-s, --size <number>`: Size of the array to sort (default: 1000)
- `-m, --min <number>`: Minimum value in the array (default: 0)
- `-M, --max <number>`: Maximum value in the array (default: 1000)
- `--seed <string>`: Random seed for reproducible arrays
- `-r, --runs <number>`: Number of runs per algorithm (default: 1)
- `-t, --arrayType <type>`: Type of array to generate (random, sorted, reversed, fewUnique, customSortedness)
- `--sortedness <number>`: Level of sortedness from 0 (random) to 100 (sorted) (default: 0)
- `-v, --verbose`: Show additional details including array previews

### Examples

Test a single algorithm with a random array:
```bash
npm run sort-test -- --algorithm quick --size 1000 --sortedness 0
```

Compare multiple efficient algorithms with a partially sorted array:
```bash
npm run sort-test -- --algorithms "quick,merge,heap" --size 5000 --sortedness 50 --runs 3
```

Test all algorithms with a reversed array:
```bash
npm run sort-test -- --algorithms "all" --arrayType reversed --size 1000 --runs 2
```

### Algorithm Categories

For convenience, you can use predefined algorithm categories:

- `basic`: All O(n²) algorithms (bubble, selection, insertion, gnome, optimizedGnome, comb, shell)
- `efficient`: All O(n log n) algorithms (merge, quick, heap, tim, intro)
- `nonComparison`: Linear complexity algorithms (counting, radix, bucket)
- `all`: All available algorithms

## Available Sorting Algorithms

### Basic O(n²) Algorithms

- **bubble**: Bubble Sort
- **selection**: Selection Sort
- **insertion**: Insertion Sort
- **gnome**: Gnome Sort
- **optimizedGnome**: Optimized Gnome Sort
- **comb**: Comb Sort
- **shell**: Shell Sort

### Efficient O(n log n) Algorithms

- **merge**: Merge Sort
- **quick**: Quick Sort
- **heap**: Heap Sort
- **tim**: Tim Sort
- **intro**: Intro Sort

### Non-comparison Based Algorithms

- **counting**: Counting Sort
- **radix**: Radix Sort
- **bucket**: Bucket Sort

## Time and Space Complexity

| Algorithm       | Best Time      | Average Time   | Worst Time     | Space  | Stable | Notes |
|-----------------|----------------|----------------|----------------|--------|--------|-------|
| Bubble Sort     | O(n)           | O(n²)          | O(n²)          | O(1)   | Yes    | Good for nearly sorted arrays |
| Selection Sort  | O(n²)          | O(n²)          | O(n²)          | O(1)   | No     | Minimizes swaps |
| Insertion Sort  | O(n)           | O(n²)          | O(n²)          | O(1)   | Yes    | Good for small or nearly sorted arrays |
| Gnome Sort      | O(n)           | O(n²)          | O(n²)          | O(1)   | Yes    | Simple implementation |
| Comb Sort       | O(n log n)     | O(n²/2^p)      | O(n²)          | O(1)   | No     | Improves on bubble sort |
| Shell Sort      | O(n log n)     | O(n(log n)²)   | O(n²)          | O(1)   | No     | Improves on insertion sort |
| Merge Sort      | O(n log n)     | O(n log n)     | O(n log n)     | O(n)   | Yes    | Consistent performance |
| Quick Sort      | O(n log n)     | O(n log n)     | O(n²)          | O(log n) | No   | Often fastest in practice |
| Heap Sort       | O(n log n)     | O(n log n)     | O(n log n)     | O(1)   | No     | In-place variant of selection sort |
| Tim Sort        | O(n)           | O(n log n)     | O(n log n)     | O(n)   | Yes    | Python's default sort |
| Intro Sort      | O(n log n)     | O(n log n)     | O(n log n)     | O(log n) | No   | C++'s std::sort implementation |
| Counting Sort   | O(n + k)       | O(n + k)       | O(n + k)       | O(n + k) | Yes  | Good for small range integers |
| Radix Sort      | O(nk)          | O(nk)          | O(nk)          | O(n + k) | Yes  | Good for integers and strings |
| Bucket Sort     | O(n + k)       | O(n + k)       | O(n²)          | O(n + k) | Yes  | Good when input is uniformly distributed |

Where:
- n is the number of elements
- k is the range of values or number of digits
- p is the number of increments in comb sort
