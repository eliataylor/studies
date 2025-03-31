# Sorting Algorithms - Core Loop Structure

## Bubble Sort
```
for i in range(n):
    for j in range(0, n-i-1):
```
`i` tracks the number of passes, `j` iterates through unsorted portion of array.

## Selection Sort
```
for i in range(n):
    for j in range(i+1, n):
```
`i` marks the current position to place smallest element, `j` scans remaining unsorted portion.

## Insertion Sort
```
for i in range(1, n):
    while j >= 0 and arr[j] > key:
```
`i` tracks the current element to insert, `j` moves backward to find insertion position, `key` holds current element.

## Gnome Sort
```
while i < n:
    # single loop with conditional increments/decrements
```
`i` is the current position that moves forward and backward as needed.

## Comb Sort
```
while gap > 1 or swapped:
    for i in range(0, n-gap):
```
`gap` is the distance between compared elements, `i` iterates through elements.

## Shell Sort
```
for gap in gaps:
    for i in range(gap, n):
        while j >= gap and arr[j-gap] > tmp:
```
`gap` is current interval, `i` marks element to insert, `j` tracks position during insertion, `tmp` holds current element.

## Merge Sort
```
# Recursion handles outer loop
for i in range(start, end):  # In merge function
```
Recursion divides array, `i` iterates through subarrays during merging.

## Quick Sort
```
# Recursion handles outer loop
while left <= right:  # In partition function
```
Recursion handles divisions, `left` and `right` are indices that approach each other during partitioning.

## Heap Sort
```
for i in range(n//2 - 1, -1, -1):  # Build heap
for i in range(n-1, 0, -1):  # Extract elements
    while largest != i:  # In heapify function
```
First loop builds heap, second extracts elements, inner while restores heap property.

## Tim Sort
```
for i in range(0, n, minRun):  # Split into runs
for size in range(minRun, n, 2*size):  # Merge runs
    for i in range(0, n-size, 2*size):  # Select runs to merge
```
First loop creates sorted runs, second controls merge size, third selects runs to merge.

## Intro Sort
```
# Recursion with depth limit
for i in range(n//2 - 1, -1, -1):  # Build heap if needed
for i in range(n-1, 0, -1):  # Extract elements if needed
```
Recursion with depth check, falls back to heap sort with its loops if needed.

## Counting Sort
```
for i in range(n):  # Count occurrences
for i in range(1, k):  # Calculate cumulative count
for i in range(n-1, -1, -1):  # Build output array
```
First loop counts elements, second creates cumulative counts, third places elements.

## Radix Sort
```
for exp in range(d):  # For each digit position
    for i in range(n):  # Count occurrences
    for i in range(1, 10):  # Calculate cumulative count
    for i in range(n-1, -1, -1):  # Build output array
```
Outer loop processes each digit position, inner loops implement counting sort for that position.

## Bucket Sort
```
for i in range(n):  # Distribute elements
for i in range(k):  # Sort individual buckets
    for j in range(1, len(bucket[i])):  # Using insertion sort
        while p >= 0 and bucket[i][p] > current:
for i in range(k):  # Concatenate results
    for j in range(len(bucket[i])):
```
First loop distributes elements, second iterates through buckets, third sorts each bucket (often with insertion sort), final loops gather results.
