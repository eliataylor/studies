# TypeScript Sorting Algorithms

This repository contains implementations of various sorting algorithms in TypeScript, along with utilities for testing and comparing their performance.

## Available Sorting Algorithms

### Basic O(n²) Algorithms

- **Bubble Sort**: Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
- **Selection Sort**: Divides the input into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region and moves it to the sorted region.
- **Insertion Sort**: Builds the sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position in the sorted part.
- **Gnome Sort**: Similar to insertion sort but moves elements to their proper position by a series of swaps.
- **Comb Sort**: Improvement on bubble sort that eliminates turtles (small values near the end of the list) by using gap values.
- **Shell Sort**: Generalization of insertion sort that allows the exchange of items that are far apart.

### Efficient O(n log n) Algorithms

- **Merge Sort**: Divide and conquer algorithm that divides the input array, recursively sorts the sub-arrays, and then merges them.
- **Quick Sort**: Divide and conquer algorithm that selects a 'pivot' element and partitions the array around it.
- **Heap Sort**: Uses a binary heap data structure to sort elements.
- **Tim Sort**: Hybrid algorithm derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data.
- **Intro Sort**: Hybrid algorithm that provides both fast average performance and optimal worst-case performance, beginning with quicksort and switching to heapsort when needed.

### Non-comparison Based Algorithms

- **Counting Sort**: Integer sorting algorithm that counts occurrences of each element and uses that information to place elements in their correct position.
- **Radix Sort**: Non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by individual digits.
- **Bucket Sort**: Distributes elements into buckets and then sorts these buckets individually.

## Usage

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

### Running Comparison Tests

To run the comparison tests:

```bash
npx ts-node CompareSort.ts
```

### Using Individual Sorting Algorithms

You can import and use any sorting algorithm:

```typescript
import { quickSort, mergeSort } from './index';

const array = [5, 3, 8, 4, 2];
const sortedArray = quickSort(array);
console.log(sortedArray); // [2, 3, 4, 5, 8]
```

### Testing a Specific Sorting Algorithm

Each algorithm file contains commented code to test that specific algorithm:

```typescript
// In QuickSort.ts, uncomment:
// runSort(quickSort, TestArray, "Quick");
```

Then run:

```bash
npx ts-node QuickSort.ts
```

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

## Project Structure

- `utils.ts`: Utility functions for testing and comparing sorting algorithms
- `*Sort.ts`: Individual implementations of each sorting algorithm
- `index.ts`: Central export point for all sorting algorithms
- `RunAll.ts`: Script to compare performance of different algorithms

## Contributions

Contributions are welcome! Feel free to add new sorting algorithms, improve existing implementations, or enhance the utility functions.
