/**
 * InterpolationSearch.ts - Implementation of interpolation search algorithm
 *
 * Interpolation search is an improved variant of binary search that performs
 * better for uniformly distributed data.
 */

/**
 * Interpolation Search
 *
 * An improved variant of binary search that works better for
 * uniformly distributed data.
 *
 * Time Complexity: O(log log n) average case, O(n) worst case
 * Space Complexity: O(1)
 *
 * @param arr The sorted array to search
 * @param target The value to search for
 * @returns The index of the target if found, -1 otherwise
 */
export function interpolationSearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    // Since array is sorted, an element present in array must be in
    // range defined by corners
    while (
        low <= high &&
        target >= arr[low] &&
        target <= arr[high]
        ) {
        // No division by zero
        if (arr[high] === arr[low]) {
            // If element is present at low or high
            if (arr[low] === target) return low;
            if (arr[high] === target) return high;
            return -1;
        }

        // Probing the position with keeping
        // uniform distribution in mind
        const pos = low + Math.floor(
            ((high - low) / (arr[high] - arr[low])) * (target - arr[low])
        );

        // Target found
        if (arr[pos] === target) {
            return pos;
        }

        // If target is larger, target is in upper part
        if (arr[pos] < target) {
            low = pos + 1;
        }
        // If target is smaller, target is in the lower part
        else {
            high = pos - 1;
        }
    }

    return -1;
}

// Uncomment to test this algorithm individually
// import { generateSortedArray, selectSearchTargets } from './utils';
//
// // Generate test array and targets
// const testArray = generateSortedArray(1000);
// const targets = selectSearchTargets(testArray, 50, 5);
//
// // Run tests
// console.log('=== Interpolation Search Test ===');
// console.log(`Array size: ${testArray.length}`);
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//   const result = runArraySearch(interpolationSearch, testArray, target, 'Interpolation Search');
//   console.log(`Result: ${result.result}, Time: ${result.time.toFixed(4)} ms, Success: ${result.success ? 'Yes' : 'No'}`);
// });
