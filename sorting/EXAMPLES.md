# Sorting Algorithm Examples

This document provides example commands for running different sorting algorithms under their optimal conditions. Use these examples to understand when specific algorithms perform best and to demonstrate the importance of choosing the right algorithm for your data characteristics.

## Basic O(n²) Algorithms

### Insertion Sort
```bash
npm run sort-test -- --algorithms insertion --arrayType ascending --sortedness 95 --size 10000
```
**Optimal when**: Nearly sorted data, small arrays
**Key insight**: Insertion sort outperforms many O(n log n) algorithms on nearly sorted data.

### Bubble Sort
```bash
npm run sort-test -- --algorithms bubble --arrayType ascending --sortedness 90 --size 1000
```
**Optimal when**: Small, nearly sorted arrays
**Key insight**: While generally inefficient, bubble sort performs adequately on small arrays with high sortedness.

### Selection Sort
```bash
npm run sort-test -- --algorithms selection --size 100
```
**Optimal when**: Small arrays where minimizing swaps is important
**Key insight**: Selection sort makes exactly n swaps, which can be advantageous when swap operations are expensive.

### Gnome Sort / Optimized Gnome Sort
```bash
npm run sort-test -- --algorithms optimizedGnome --size 100 --arrayType ascending --sortedness 80
```
**Optimal when**: Very small arrays, nearly sorted data
**Key insight**: Simple implementation with reasonable performance on tiny datasets.

### Shell Sort
```bash
npm run sort-test -- --algorithms shell --size 5000 --arrayType ascending --sortedness 50
```
**Optimal when**: Medium-sized arrays with some pre-existing order
**Key insight**: Significant improvement over insertion sort for larger datasets.

### Comb Sort
```bash
npm run sort-test -- --algorithms comb --size 5000 --arrayType random
```
**Optimal when**: Medium-sized arrays, improvement over bubble sort
**Key insight**: Addresses the "turtle problem" (small values near the end) that slows bubble sort.

## Efficient O(n log n) Algorithms

### Quick Sort
```bash
npm run sort-test -- --algorithms quick --size 100000 --arrayType random
```
**Optimal when**: Large random arrays, good cache locality is important
**Key insight**: Often the fastest general-purpose sorting algorithm in practice.

### Merge Sort
```bash
npm run sort-test -- --algorithms merge --size 100000 --arrayType random
```
**Optimal when**: Large arrays where stability is required, external sorting
**Key insight**: Guaranteed O(n log n) performance with stability, but requires O(n) extra space.

### Heap Sort
```bash
npm run sort-test -- --algorithms heap --size 100000 --arrayType random
```
**Optimal when**: Large arrays, guaranteed worst-case performance, memory constraints
**Key insight**: In-place O(n log n) performance in worst case, but typically slower than quick sort in practice.

### Tim Sort
```bash
npm run sort-test -- --algorithms tim --arrayType ascending --sortedness 70 --size 50000
```
**Optimal when**: Large arrays with partially ordered subsequences, stability required
**Key insight**: Hybrid algorithm that exploits real-world data patterns, used in Python and Java.

### Intro Sort
```bash
npm run sort-test -- --algorithms intro --size 100000 --arrayType random
```
**Optimal when**: Large random arrays, guaranteed worst-case performance
**Key insight**: Hybrid algorithm that combines quick sort's speed with heap sort's worst-case guarantee.

## Non-comparison Based Algorithms

### Counting Sort
```bash
npm run sort-test -- --algorithms counting --min 0 --max 100 --size 100000
```
**Optimal when**: Large arrays with small range of integer values
**Key insight**: O(n+k) linear time performance when the range of values (k) is small.

### Radix Sort
```bash
npm run sort-test -- --algorithms radix --min 0 --max 1000000 --size 100000
```
**Optimal when**: Large arrays of integers or strings with limited number of digits
**Key insight**: O(nk) performance where k is the number of digits, excellent for large datasets with bounded digits.

### Bucket Sort
```bash
npm run sort-test -- --algorithms bucket --size 100000 --arrayType random --min 0 --max 1000
```
**Optimal when**: Large arrays with uniformly distributed values
**Key insight**: Approaches O(n) time complexity with uniform distribution.

## Comparative Examples

These examples compare algorithms under specific conditions to demonstrate how the optimal choice varies by context:

### Nearly Sorted Data: Insertion Sort vs. Quick Sort
```bash
npm run sort-test -- --algorithms "insertion,quick" --arrayType ascending --sortedness 95 --size 10000
```
**Expected result**: Insertion sort outperforms quick sort on nearly sorted data.

### Small Range Integers: Counting Sort vs. Merge Sort
```bash
npm run sort-test -- --algorithms "counting,merge" --min 0 --max 100 --size 100000
```
**Expected result**: Counting sort dramatically outperforms merge sort when the range of values is small.

### Partially Sorted Data: Tim Sort vs. Quick Sort
```bash
npm run sort-test -- --algorithms "tim,quick" --arrayType ascending --sortedness 70 --size 50000
```
**Expected result**: Tim sort performs better than quick sort on partially sorted data.

### Worst Case for Quick Sort
```bash
npm run sort-test -- --algorithms "quick,heap" --arrayType ascending --sortedness 100 --size 10000
```
**Expected result**: Quick sort degrades to O(n²) on already sorted data, while heap sort maintains O(n log n).

### Best Case for Bucket Sort
```bash
npm run sort-test -- --algorithms "bucket,quick" --size 100000 --arrayType random --min 0 --max 100000
```
**Expected result**: Bucket sort approaches linear time with evenly distributed data.

## Real-world Insights

- The fastest algorithm depends on your data's characteristics
- For small arrays (< 50 elements), simple algorithms often outperform complex ones
- For nearly sorted data, insertion-based algorithms excel
- When stability matters (preserving order of equal elements), choose stable algorithms like merge sort or tim sort
- When memory is constrained, in-place algorithms like heap sort are preferable
- For integers with limited range, non-comparison sorts can achieve linear time

Use these examples to demonstrate and understand the nuanced performance characteristics of sorting algorithms under various conditions.
