/**
 * Insertion Sort - builds the sorted array one element at a time
 * TIME COMPLEXITY:
     * Best case: O(n) when the array is already sorted
     * Average/Worst case: O(n²)
 * SPACE COMPLEXITY:
    * O(1) - sorts in-place with only a few variables
 * @param array The array to sort
 * @returns A new sorted array
 */
function insertionSort<T>(array: T[]): T[] {
    // Create a copy to avoid mutating the original array
    const result = [...array];

    for (let i = 1; i < result.length; i++) {
        const current = result[i];
        let j = i - 1;

        while (j >= 0 && result[j] > current) {
            result[j + 1] = result[j];
            j--;
        }

        result[j + 1] = current;
    }

    return result;
}

/**
 * Merge Sort - divide and conquer approach
 * TIME COMPLEXITY:
 * Best/Average/Worst case: O(n log n)
 * Consistently performs in O(n log n) time regardless of input data
 * SPACE COMPLEXITY:
 * O(n) - requires auxiliary space for merging
 * @param array The array to sort
 * @returns A new sorted array
 */
function mergeSort<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

/**
 * Merge two sorted arrays into one sorted array
 * @param left First sorted array
 * @param right Second sorted array
 * @returns Merged sorted array
 */
function merge<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add remaining elements
    return result
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}

/**
 * Quick Sort - divide and conquer with partitioning
 * TIME COMPLEXITY:
 * Best/Average case: O(n log n)
 * Worst case: O(n²) (when poorly pivoted)
 * SPACE COMPLEXITY:
 * * O(log n) average case for the recursive call stack (can be O(n) worst case)
 * @param array The array to sort
 * @returns A new sorted array
 */
function quickSort<T>(array: T[]): T[] {
    // Create a copy to avoid mutating the original array
    const result = [...array];

    // Call the helper function that performs the sort
    quickSortHelper(result, 0, result.length - 1);

    return result;
}

/**
 * Helper function that performs the recursive quick sort
 * @param array Array being sorted
 * @param low Starting index
 * @param high Ending index
 */
function quickSortHelper<T>(array: T[], low: number, high: number): void {
    if (low < high) {
        const pivotIndex = partition(array, low, high);

        quickSortHelper(array, low, pivotIndex - 1);
        quickSortHelper(array, pivotIndex + 1, high);
    }
}

/**
 * Partitions the array and returns the pivot index
 * @param array Array to partition
 * @param low Starting index
 * @param high Ending index
 * @returns The final position of the pivot
 */
function partition<T>(array: T[], low: number, high: number): number {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] <= pivot) {
            i++;
            // Swap elements
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Put the pivot element in its final position
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return i + 1;
}

// Example usage
// const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
// console.log("Original array:", unsortedArray);
// console.log("Insertion Sort:", insertionSort(unsortedArray));
// console.log("Merge Sort:", mergeSort(unsortedArray));
// console.log("Quick Sort:", quickSort(unsortedArray));

// Performance comparison function
function comparePerformance(sizes: number[]): void {
    console.log("Performance comparison (time in ms):");
    console.log("Size | Insertion | Merge | Quick| Results");
    console.log("-----|-----------|-------|------|------");

    sizes.forEach(size => {
        // Generate a random array of the specified size
        const randomArray: number[] = Array.from(
            {length: size},
            () => Math.floor(Math.random() * size*2)
        );
        console.log("Original Random Array:", randomArray);

        // Time each sorting algorithm
        let start = performance.now();
        const iSorted = insertionSort(randomArray);
        const insertionTime = (performance.now() - start).toFixed(2);

        start = performance.now();
        const mSorted = mergeSort(randomArray);
        const mergeTime = (performance.now() - start).toFixed(2);

        start = performance.now();
        const qSorted = quickSort(randomArray);
        const quickTime = (performance.now() - start).toFixed(2);

        console.log(`${size.toString().padEnd(4)} | ${insertionTime.padEnd(11)} | ${mergeTime.padEnd(7)} | ${quickTime}`);

        console.log("Insertion Sorted:", iSorted);
        console.log("Merge Sorted:", mSorted);
        console.log("Quick Sorted:", qSorted);

    });
}

// Uncomment to run performance comparison
// comparePerformance([100, 1000, 10000, 50000]);
comparePerformance([10]);
