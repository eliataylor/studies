# TypeScript Sorting Algorithms

This repository contains implementations of various sorting algorithms in TypeScript, along with a unified framework for
testing and comparing their performance.

## Installation

1. Install the dependencies:

```bash
npm install
```

## Sorting Algorithm Unit Testing

- Test individual or multiple algorithms across various scenarios
- Configure array size, value range, and number of test runs
- Set the initial sortedness level of the test array (0-100%)
- Choose predefined array types (random, sorted, reversed, few unique values)
- Set uniqueness level to control the number of duplicate values
- Use a random seed for reproducible results
- View detailed performance metrics with colorful, well-formatted output

### Command-Line Options

- `-A, --algorithms <string>`: Algorithm name, comma-separated list, or category name ("basic", "efficient", "nonComparison", "all")
- `-s, --size <number>`: Size of the array to sort (default: 10000)
- `--min <number>`: Minimum value in the array (default: 0)
- `--max <number>`: Maximum value in the array (default: --size)
- `--seed <string>`: Random seed for reproducible arrays
- `-r, --runs <number>`: Number of runs per algorithm (default: 4)
- `-t, --arrayType <type>`: Type of array to generate (ascending, descending)
- `--sortedness <number>`: Level of sortedness from 0 (random) to 100 (sorted) (default: 0)
- `--uniqueness <number>`: Level of uniqueness from 0 (all same values) to 100 (all unique values) (default: 100)
- `-l, --loglevel <level>`: Set logging level for algorithm execution (none, error, info, debug, trace)

### Array Types, Value Range, and Sortedness

The framework provides powerful ways to test algorithms with different input characteristics:

- **Sorted arrays (ascending)**: Fully sorted data
- **Reversed arrays (descending)**: Data in reverse order (worst case for many algorithms)

The `--sortedness` parameter controls how sorted the array is (0-100%):

- 0% = completely random
- 100% = perfectly sorted according to the array type
- Any value in between creates a partially sorted array

This parameter works with all array types. For example, with a reversed array:

- `--arrayType descending --sortedness 100` = completely reversed
- `--arrayType descending --sortedness 0` = completely random
- `--arrayType descending --sortedness 80` = mostly reversed with some shuffling

The `--uniqueness` parameter controls the percentage of unique values in the array (0-100%):

- 0% = all values are the same (many duplicates)
- 100% = all values are unique (no duplicates)
- Values in between control the ratio of unique values to duplicates

See [EXAMPLES.md](EXAMPLES.md) for more detailed examples.

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


## Time and Space Complexity
| Algorithm      | Best Time  | When Best Case Occurs | Average Time | Worst Time | When Worst Case Occurs | Space    | Stable |
|----------------|------------|----------------------|--------------|------------|------------------------|----------|--------|
| Bubble Sort    | O(n)       | Already sorted array | O(n²)        | O(n²)      | Reverse sorted array   | O(1)     | Yes    |
| Selection Sort | O(n²)      | All cases            | O(n²)        | O(n²)      | All cases              | O(1)     | No     |
| Insertion Sort | O(n)       | Already sorted array | O(n²)        | O(n²)      | Reverse sorted array   | O(1)     | Yes    |
| Gnome Sort     | O(n)       | Already sorted array | O(n²)        | O(n²)      | Reverse sorted array   | O(1)     | Yes    |
| Comb Sort      | O(n log n) | Evenly distributed elements | O(n²/2^p)    | O(n²)      | Many inversions present | O(1)     | No     |
| Shell Sort     | O(n log n) | Nearly sorted array  | O(n(log n)²) | O(n²)      | Depends on gap sequence | O(1)     | No     |
| Merge Sort     | O(n log n) | All cases            | O(n log n)   | O(n log n) | All cases              | O(n)     | Yes    |
| Quick Sort     | O(n log n) | Balanced partitioning | O(n log n)   | O(n²)      | Already sorted/worst pivot choice | O(log n) | No     |
| Heap Sort      | O(n log n) | All cases            | O(n log n)   | O(n log n) | All cases              | O(1)     | No     |
| Tim Sort       | O(n)       | Already sorted array | O(n log n)   | O(n log n) | Few natural runs       | O(n)     | Yes    |
| Intro Sort     | O(n log n) | Balanced partitioning | O(n log n)   | O(n log n) | Controlled by fallback to heapsort | O(log n) | No     |
| Counting Sort  | O(n + k)   | All cases            | O(n + k)     | O(n + k)   | All cases              | O(n + k) | Yes    |
| Radix Sort     | O(nk)      | All cases            | O(nk)        | O(nk)      | All cases              | O(n + k) | Yes    |
| Bucket Sort    | O(n + k)   | Uniform distribution | O(n + k)     | O(n²)      | All elements in one bucket | O(n + k) | Yes    |

Where:

- n is the number of elements
- k is the range of values or number of digits
- p is the number of increments in comb sort


## License

MIT
