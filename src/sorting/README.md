# TypeScript Sorting Algorithms

This repository contains implementations of various sorting algorithms in TypeScript, along with utilities for testing and comparing their performance.

## Installation

1. Install the dependencies:

```bash
npm install
```

2. Build the TypeScript files:

```bash
npm run build
```

## CLI Commands

The package has been updated with command-line interfaces to test and compare sorting algorithms with configurable parameters.

### Compare Multiple Sorting Algorithms

```bash
npm run compare -- [options]
```

Options:
- `-s, --size <number>`: Size of the array to sort (default: 1000)
- `-m, --min <number>`: Minimum value in the array (default: 0)
- `-M, --max <number>`: Maximum value in the array (default: 1000)
- `--seed <string>`: Random seed for reproducible arrays
- `-a, --algorithms <string>`: Comma-separated list of algorithms to test, or use "basic", "efficient", "nonComparison", "all" (default: "all")
- `-r, --runs <number>`: Number of runs for each algorithm (avg time will be reported) (default: 1)

Example:
```bash
npm run compare -- --size 5000 --min 0 --max 10000 --seed 12345 --algorithms "quick,merge,heap" --runs 3
```

### Run a Single Sorting Algorithm

```bash
npm run sort -- [options]
```

Options:
- `-a, --algorithm <string>`: Algorithm to run (required)
- `-s, --size <number>`: Size of the array to sort (default: 1000)
- `-m, --min <number>`: Minimum value in the array (default: 0)
- `-M, --max <number>`: Maximum value in the array (default: 1000)
- `--seed <string>`: Random seed for reproducible arrays
- `-v, --verbose`: Show the entire sorted array (careful with large arrays)
- `-r, --runs <number>`: Number of runs (avg time will be reported) (default: 1)

Example:
```bash
npm run sort -- --algorithm quick --size 1000 --min 0 --max 10000 --seed 12345 --runs 3
```

### Test with Different Array Configurations

```bash
npm run test -- [options]
```

Options:
- `-a, --algorithms <string>`: Comma-separated list of algorithms to test, or use "basic", "efficient", "nonComparison", "all" (default: "efficient")
- `-s, --sizes <string>`: Comma-separated list of array sizes to test (default: "100,1000,10000")
- `--seed <string>`: Random seed for reproducible arrays
- `-r, --runs <number>`: Number of runs per test (default: 1)

Example:
```bash
npm run test -- --algorithms "quick,merge" --sizes "10,100,1000,10000" --seed 12345 --runs 2
```

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

## Special Array Types for Testing

The test script includes special array configurations to benchmark performance under different scenarios:

1. **Random Arrays**: Fully randomized data
2. **Nearly Sorted Arrays**: Arrays that are mostly in order with a few elements out of place
3. **Reversed Arrays**: Arrays in reverse order (worst case for many algorithms)
4. **Few Unique Values**: Arrays with many duplicate values

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
