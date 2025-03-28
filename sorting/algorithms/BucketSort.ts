/**
 * BucketSort.ts - Implementation of the Bucket Sort algorithm
 *
 * Bucket sort divides the interval [0, 1] into n equal-sized subintervals (buckets),
 * distributes the n input numbers into these buckets, and then sorts each bucket
 * individually using another sorting algorithm. This implementation is adapted to
 * work with any range of numbers.
 *
 * Time Complexity:
 * - Best Case: O(n) when data is uniformly distributed
 * - Average Case: O(n) when data is uniformly distributed
 * - Worst Case: O(n²) when all elements are placed in a single bucket
 *
 * Space Complexity: O(n + k) where k is the number of buckets
 */

import {SortFunction} from '../utils';
import {insertionSort} from './InsertionSort';

/**
 * Implementation of bucket sort
 * @param arr The array to sort
 * @param bucketCount The number of buckets (default is array.length)
 * @returns The sorted array
 */
export const bucketSort: SortFunction = (arr: number[], bucketCount?: number): number[] => {
    const array = [...arr]; // Create a copy to avoid modifying the original
    const n = array.length;

    // If array is empty or has only one element, it's already sorted
    if (n <= 1) return array;

    // Find the minimum and maximum values
    const min = Math.min(...array);
    const max = Math.max(...array);

    // Determine the range
    const range = max - min + 1;

    // Determine the number of buckets (default to array length)
    const numBuckets = bucketCount || n;

    // Create buckets
    const buckets: number[][] = Array.from({length: numBuckets}, () => []);

    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
        // Calculate appropriate bucket index
        // This normalization maps the range to [0, numBuckets-1]
        const bucketIndex = Math.floor((array[i] - min) / range * (numBuckets - 1));
        buckets[bucketIndex].push(array[i]);
    }

    // Sort individual buckets (using insertion sort)
    for (let i = 0; i < numBuckets; i++) {
        if (buckets[i].length > 0) {
            // Apply insertion sort to each bucket
            buckets[i] = insertionSort(buckets[i]);
        }
    }

    // Concatenate all buckets back into the original array
    return buckets.flat();
};

/**
 * Example usage:
 *
 * To run just this sort:
 * runSort(bucketSort, TestArray, "Bucket");
 *
 * To specify a custom number of buckets:
 * runSort((arr) => bucketSort(arr, 10), TestArray, "Bucket (10 buckets)");
 */

// Uncomment the line below to test the bucket sort implementation
// runSort(bucketSort, TestArray, "Bucket");
