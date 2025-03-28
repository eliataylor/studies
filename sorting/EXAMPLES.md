# Sorting Algorithm Examples

This document provides simple examples for running different sorting algorithms under their best and worst case conditions. These commands demonstrate when each algorithm performs optimally or poorly.

## Basic O(n²) Algorithms

### Insertion Sort
**Best Case:** Nearly sorted array
```bash
npm run sort-test -- --algorithms insertion --arrayType ascending --sortedness 95
```
**Key Insight:** Insertion sort approaches O(n) time complexity on nearly sorted data.

**Worst Case:** Reverse sorted array
```bash
npm run sort-test -- --algorithms insertion --arrayType descending --sortedness 95
```
**Key Insight:** Insertion sort degrades to O(n²) when elements need to be moved the maximum distance.

---

### Bubble Sort
**Best Case:** Nearly sorted array
```bash
npm run sort-test -- --algorithms bubble --arrayType ascending --sortedness 95
```
**Key Insight:** Bubble sort approaches O(n) with few swaps needed.

**Worst Case:** Reverse sorted array
```bash
npm run sort-test -- --algorithms bubble --arrayType descending --sortedness 95
```
**Key Insight:** Maximum number of swaps required, performing poorly at O(n²).

---

### Selection Sort
**Best Case:** Small array (same as worst case)
```bash
npm run sort-test -- --algorithms selection --size 100
```
**Key Insight:** Selection sort makes exactly n swaps, which can be advantageous when swap operations are expensive.

**Worst Case:** Any array (always O(n²))
```bash
npm run sort-test -- --algorithms selection --size 10000
```
**Key Insight:** Selection sort always performs O(n²) comparisons regardless of input order.

---

### Gnome Sort / Optimized Gnome Sort
**Best Case:** Nearly sorted array
```bash
npm run sort-test -- --algorithms optimizedGnome --arrayType ascending --sortedness 95
```
**Key Insight:** Simple implementation with reasonable performance on small, nearly sorted datasets.

**Worst Case:** Reverse sorted array
```bash
npm run sort-test -- --algorithms gnome --arrayType descending --sortedness 95
```
**Key Insight:** Gnome sort performs poorly (O(n²)) with many backward moves.

---

### Shell Sort
**Best Case:** Partially sorted array
```bash
npm run sort-test -- --algorithms shell --arrayType ascending --sortedness 80
```
**Key Insight:** Significant improvement over insertion sort for larger partially sorted datasets.

**Worst Case:** Reverse sorted array
```bash
npm run sort-test -- --algorithms shell --arrayType descending --sortedness 95
```
**Key Insight:** Shell sort performs worse when the gap sequence isn't optimal for the data pattern.

---

### Comb Sort
**Best Case:** Partially sorted array
```bash
npm run sort-test -- --algorithms comb --arrayType ascending --sortedness 80
```
**Key Insight:** Addresses the "turtle problem" (small values near the end) that slows bubble sort.

**Worst Case:** Reverse sorted array
```bash
npm run sort-test -- --algorithms comb --arrayType descending --sortedness 95
```
**Key Insight:** Performance degrades to O(n²) in worst case.

---

## Efficient O(n log n) Algorithms

### Quick Sort
**Best Case:** Random array with unique values
```bash
npm run sort-test -- --algorithms quick --sortedness 5
```
**Key Insight:** Performs at O(n log n) with balanced partitioning.

**Worst Case:** Already sorted array
```bash
npm run sort-test -- --algorithms quick --arrayType ascending --sortedness 95
```
**Key Insight:** Quick sort degrades to O(n²) when partitioning is unbalanced.

---

### Merge Sort
**Best Case:** Any array (consistent O(n log n))
```bash
npm run sort-test -- --algorithms merge
```
**Key Insight:** Guaranteed O(n log n) performance regardless of input pattern.

**Worst Case:** No true worst case (always O(n log n))
```bash
npm run sort-test -- --algorithms merge --size 100000
```
**Key Insight:** While still O(n log n), merge sort requires O(n) extra space.

---

### Heap Sort
**Best Case:** Random array
```bash
npm run sort-test -- --algorithms heap --sortedness 5
```
**Key Insight:** In-place O(n log n) performance in worst case.

**Worst Case:** Nearly sorted array
```bash
npm run sort-test -- --algorithms heap --arrayType ascending --sortedness 95
```
**Key Insight:** Heap sort doesn't take advantage of partially sorted input.

---

### Tim Sort
**Best Case:** Nearly sorted array
```bash
npm run sort-test -- --algorithms tim --arrayType ascending --sortedness 95
```
**Key Insight:** Hybrid algorithm that exploits real-world data patterns with partially ordered subsequences.

**Worst Case:** Random array
```bash
npm run sort-test -- --algorithms tim --sortedness 5
```
**Key Insight:** Falls back to merge sort's O(n log n) but with some overhead.

---

### Intro Sort
**Best Case:** Random array
```bash
npm run sort-test -- --algorithms intro --sortedness 5
```
**Key Insight:** Hybrid algorithm that combines quick sort's speed with heap sort's worst-case guarantee.

**Worst Case:** Already sorted array (still O(n log n))
```bash
npm run sort-test -- --algorithms intro --arrayType ascending --sortedness 95
```
**Key Insight:** Falls back to heap sort to avoid quicksort's worst-case.

---

## Non-comparison Based Algorithms

### Counting Sort
**Best Case:** Small range of values
```bash
npm run sort-test -- --algorithms counting --min 0 --max 100
```
**Key Insight:** O(n+k) linear time performance when the range of values (k) is small.

**Worst Case:** Large range of values
```bash
npm run sort-test -- --algorithms counting --min 0 --max 1000000
```
**Key Insight:** Performance and space complexity suffer when k >> n.

---

### Radix Sort
**Best Case:** Large numbers with few digits
```bash
npm run sort-test -- --algorithms radix --min 0 --max 1000
```
**Key Insight:** O(nk) performance where k is the number of digits, excellent for large datasets with bounded digits.

**Worst Case:** Small range (overhead not justified)
```bash
npm run sort-test -- --algorithms radix --min 0 --max 10
```
**Key Insight:** Initialization overhead may not be worth it for small datasets.

---

### Bucket Sort
**Best Case:** Uniformly distributed values
```bash
npm run sort-test -- --algorithms bucket --min 0 --max 1000 --sortedness 5
```
**Key Insight:** Approaches O(n) time complexity with uniform distribution.

**Worst Case:** Skewed distribution (many duplicates)
```bash
npm run sort-test -- --algorithms bucket --min 0 --max 10 --uniqueness 0
```
**Key Insight:** Performance degrades toward O(n²) when distribution is highly skewed.

---

## Quick Comparisons

---

### Insertion Sort vs. Quick Sort on Nearly Sorted Data
```bash
npm run sort-test -- --algorithms "insertion,quick" --arrayType ascending --sortedness 95
```

### Counting Sort vs. Merge Sort on Small Range Integers
```bash
npm run sort-test -- --algorithms "counting,merge" --min 0 --max 100
```

### Tim Sort vs. Quick Sort on Partially Sorted Data
```bash
npm run sort-test -- --algorithms "tim,quick" --arrayType ascending --sortedness 80
```

### Quick Sort vs. Heap Sort on Already Sorted Data
```bash
npm run sort-test -- --algorithms "quick,heap" --arrayType ascending --sortedness 95
```

### Basic vs. Efficient Algorithms on Small Arrays
```bash
npm run sort-test -- --algorithms "insertion,quick,merge" --size 50
```

## Helpful Tips

- For smaller arrays (<50 elements), simple algorithms often outperform complex ones
- For nearly sorted data, insertion sort and Tim sort excel
- Add `--seed 12345` to any command for reproducible results
- Use `--loglevel debug` to see detailed execution information
