# Sorting Algorithm Examples

This document provides example commands for running different sorting algorithms under their optimal and worst-case conditions. Use these examples to understand when specific algorithms perform best or worst and to demonstrate the importance of choosing the right algorithm for your data characteristics.

## Basic O(n²) Algorithms

### Insertion Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms insertion --arrayType ascending --sortedness 95 --size 10000
```
**Best when**: Nearly sorted data, small arrays  
**Key insight**: Insertion sort approaches O(n) time complexity on nearly sorted data.

**Worst Case:**
```bash
npm run sort-test -- --algorithms insertion --arrayType descending --sortedness 100 --size 10000
```
**Worst when**: Reverse sorted data, large arrays  
**Key insight**: Insertion sort degrades to O(n²) when elements need to be moved the maximum distance.

### Bubble Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms bubble --arrayType ascending --sortedness 95 --size 1000
```
**Best when**: Nearly sorted arrays with few inversions  
**Key insight**: Bubble sort approaches O(n) with few swaps needed.

**Worst Case:**
```bash
npm run sort-test -- --algorithms bubble --arrayType descending --sortedness 100 --size 1000
```
**Worst when**: Reverse sorted arrays  
**Key insight**: Maximum number of swaps required, performing poorly at O(n²).

### Selection Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms selection --size 100 --uniqueness 100
```
**Best when**: Small arrays where minimizing swaps is important  
**Key insight**: Selection sort makes exactly n swaps, which can be advantageous when swap operations are expensive.

**Worst Case:**
```bash
npm run sort-test -- --algorithms selection --size 10000 --arrayType ascending --sortedness 100
```
**Worst when**: Large arrays, even already sorted ones  
**Key insight**: Selection sort always performs O(n²) comparisons regardless of input order.

### Gnome Sort / Optimized Gnome Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms optimizedGnome --size 100 --arrayType ascending --sortedness 90
```
**Best when**: Very small arrays, nearly sorted data  
**Key insight**: Simple implementation with reasonable performance on tiny datasets.

**Worst Case:**
```bash
npm run sort-test -- --algorithms gnome --size 1000 --arrayType descending --sortedness 100
```
**Worst when**: Reverse sorted arrays  
**Key insight**: Gnome sort performs poorly (O(n²)) with many backward moves.

### Shell Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms shell --size 5000 --arrayType ascending --sortedness 80
```
**Best when**: Medium-sized arrays with some pre-existing order  
**Key insight**: Significant improvement over insertion sort for larger partially sorted datasets.

**Worst Case:**
```bash
npm run sort-test -- --algorithms shell --size 10000 --arrayType descending --sortedness 100
```
**Worst when**: Reverse sorted large arrays  
**Key insight**: Shell sort performs worse when the gap sequence isn't optimal for the data pattern.

### Comb Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms comb --size 5000 --sortedness 80
```
**Best when**: Medium-sized arrays, especially with some pre-existing order  
**Key insight**: Addresses the "turtle problem" (small values near the end) that slows bubble sort.

**Worst Case:**
```bash
npm run sort-test -- --algorithms comb --size 10000 --arrayType descending --sortedness 100
```
**Worst when**: Reverse ordered arrays  
**Key insight**: Performance degrades to O(n²) in worst case.

## Efficient O(n log n) Algorithms

### Quick Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms quick --size 100000 --sortedness 0 --uniqueness 100
```
**Best when**: Random arrays with high entropy and unique values  
**Key insight**: Performs at O(n log n) with balanced partitioning.

**Worst Case:**
```bash
npm run sort-test -- --algorithms quick --size 10000 --arrayType ascending --sortedness 100
```
**Worst when**: Already sorted (or reverse sorted) arrays  
**Key insight**: Quick sort degrades to O(n²) when partitioning is unbalanced.

### Merge Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms merge --size 100000 --sortedness 0
```
**Best when**: Large arrays where stability is required  
**Key insight**: Guaranteed O(n log n) performance regardless of input pattern.

**Worst Case:**
```bash
npm run sort-test -- --algorithms merge --size 100000 --min 0 --max 0 --uniqueness 0
```
**Worst when**: Memory constraints are tight or with many duplicates  
**Key insight**: While still O(n log n), merge sort requires O(n) extra space.

### Heap Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms heap --size 100000 --sortedness 0
```
**Best when**: Large arrays, guaranteed worst-case performance needed  
**Key insight**: In-place O(n log n) performance in worst case.

**Worst Case:**
```bash
npm run sort-test -- --algorithms heap --size 10000 --arrayType ascending --sortedness 95
```
**Worst when**: Nearly sorted arrays  
**Key insight**: Heap sort doesn't take advantage of partially sorted input.

### Tim Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms tim --arrayType ascending --sortedness 70 --size 50000
```
**Best when**: Large arrays with partially ordered subsequences  
**Key insight**: Hybrid algorithm that exploits real-world data patterns.

**Worst Case:**
```bash
npm run sort-test -- --algorithms tim --size 50000 --sortedness 0 --uniqueness 100
```
**Worst when**: Random data with no patterns or runs  
**Key insight**: Falls back to merge sort's O(n log n) but with some overhead.

### Intro Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms intro --size 100000 --sortedness 0 --uniqueness 100
```
**Best when**: Random arrays with no specific pattern  
**Key insight**: Hybrid algorithm that combines quick sort's speed with heap sort's worst-case guarantee.

**Worst Case:**
```bash
npm run sort-test -- --algorithms intro --size 10000 --arrayType ascending --sortedness 100
```
**Worst when**: Already sorted arrays (but still performs better than pure quicksort)  
**Key insight**: Falls back to heap sort to avoid quicksort's worst-case.

## Non-comparison Based Algorithms

### Counting Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms counting --min 0 --max 100 --size 100000
```
**Best when**: Large arrays with small range of integer values  
**Key insight**: O(n+k) linear time performance when the range of values (k) is small.

**Worst Case:**
```bash
npm run sort-test -- --algorithms counting --min 0 --max 1000000 --size 1000
```
**Worst when**: Small arrays with very large range of values  
**Key insight**: Performance and space complexity suffer when k >> n.

### Radix Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms radix --min 0 --max 1000000 --size 100000
```
**Best when**: Large arrays of integers with limited number of digits  
**Key insight**: O(nk) performance where k is the number of digits, excellent for large datasets with bounded digits.

**Worst Case:**
```bash
npm run sort-test -- --algorithms radix --min 0 --max 10 --size 100
```
**Worst when**: Small arrays with small range (overhead not justified)  
**Key insight**: Initialization overhead may not be worth it for small datasets.

### Bucket Sort
**Best Case:**
```bash
npm run sort-test -- --algorithms bucket --size 100000 --sortedness 0 --min 0 --max 1000 --uniqueness 100
```
**Best when**: Large arrays with uniformly distributed values  
**Key insight**: Approaches O(n) time complexity with uniform distribution.

**Worst Case:**
```bash
npm run sort-test -- --algorithms bucket --size 10000 --min 0 --max 10 --uniqueness 0
```
**Worst when**: Many elements in a single bucket (clustering)  
**Key insight**: Performance degrades toward O(n²) when distribution is highly skewed.

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

### Worst Case for Quick Sort vs. Heap Sort
```bash
npm run sort-test -- --algorithms "quick,heap" --arrayType ascending --sortedness 100 --size 10000
```
**Expected result**: Quick sort degrades to O(n²) on already sorted data, while heap sort maintains O(n log n).

### Best Case for Bucket Sort vs. Quick Sort
```bash
npm run sort-test -- --algorithms "bucket,quick" --size 100000 --sortedness 0 --min 0 --max 100000 --uniqueness 100
```
**Expected result**: Bucket sort approaches linear time with evenly distributed data.

### Effect of Duplicates: Quick Sort vs. Merge Sort
```bash
npm run sort-test -- --algorithms "quick,merge" --size 50000 --uniqueness 20
```
**Expected result**: Merge sort (being stable) handles duplicates more efficiently than quick sort.

## Real-world Insights

- The fastest algorithm depends on your data's characteristics
- For small arrays (< 50 elements), simple algorithms often outperform complex ones
- For nearly sorted data, insertion-based algorithms excel
- When stability matters (preserving order of equal elements), choose stable algorithms like merge sort or tim sort
- When memory is constrained, in-place algorithms like heap sort are preferable
- For integers with limited range, non-comparison sorts can achieve linear time
- The higher the sortedness level, the more advantage insertion sort and tim sort have
- Low uniqueness (many duplicates) favors stable sorting algorithms

Use these examples to demonstrate and understand the nuanced performance characteristics of sorting algorithms under various conditions.

## Logging and Analysis

For detailed logging during algorithm execution, use the log level parameter:

```bash
npm run sort-test -- --algorithms quick --size 1000 --loglevel debug
```

Available log levels:
- `none`: No execution logs (default)
- `error`: Only errors
- `info`: Basic information and errors
- `debug`: Detailed execution information
- `trace`: Verbose step-by-step execution details

For reproducible results, always use the same seed:

```bash
npm run sort-test -- --algorithms "quick,merge" --size 10000 --seed 12345
```
