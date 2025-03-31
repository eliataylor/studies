# Sorting Algorithm Flashcards

## Selection Sort

**Front:**
Selection Sort key characteristics

**Back:**
```python
# Outer loop: iterate through array
for i in range(n):
    # Inner loop: find minimum in unsorted portion
    for j in range(i + 1, n):
```

**Complexity:** Time(Best/Avg/Worst): O(n²) / O(n²) / O(n²) | Space: O(1) | Stable: No

---

## Merge Sort

**Front:**
Merge Sort key characteristics

**Back:**
```python
# Divide array recursively
mid = len(arr) // 2
left = merge_sort(arr[:mid])
right = merge_sort(arr[mid:])

# Merge loop
while i < len(left) and j < len(right):
```

**Complexity:** Time(Best/Avg/Worst): O(n log n) / O(n log n) / O(n log n) | Space: O(n) | Stable: Yes

---

## Heap Sort

**Front:**
Heap Sort key characteristics

**Back:**
```python
# Build max heap
for i in range(n // 2 - 1, -1, -1):
    heapify(arr, n, i)
    
# Extract elements one by one
for i in range(n - 1, 0, -1):
```

**Complexity:** Time(Best/Avg/Worst): O(n log n) / O(n log n) / O(n log n) | Space: O(1) | Stable: No

---

## Counting Sort

**Front:**
Counting Sort key characteristics

**Back:**
```python
# Store count of each element
for i in range(len(arr)):
    count[arr[i] - min_val] += 1
    
# Build the output array
for i in range(len(arr) - 1, -1, -1):
```

**Complexity:** Time(Best/Avg/Worst): O(n + k) / O(n + k) / O(n + k) | Space: O(n + k) | Stable: Yes

---

## Radix Sort

**Front:**
Radix Sort key characteristics

**Back:**
```python
# Sort for each digit position
while max_val // exp > 0:
    counting_sort_by_digit(arr, exp)
    exp *= 10
    
# Within counting_sort_by_digit
for i in range(n - 1, -1, -1):
```

**Complexity:** Time(Best/Avg/Worst): O(nk) / O(nk) / O(nk) | Space: O(n + k) | Stable: Yes
