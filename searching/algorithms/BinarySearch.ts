/**
 * BinarySearch.ts - Implementation of binary search algorithm
 *
 * Binary search is an efficient algorithm for finding an item from a sorted array
 * by repeatedly dividing the search interval in half.
 */

/**
 * Binary Search
 *
 * Finds the position of a target value within a sorted array by
 * repeatedly dividing the search interval in half.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @param arr The sorted array to search
 * @param target The value to search for
 * @returns The index of the target if found, -1 otherwise
 */
export function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Check if target is present at mid
        if (arr[mid] === target) {
            return mid;
        }

        // If target is greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }

    // Target not in array
    return -1;
}

/**
 * Recursive Binary Search
 *
 * A recursive implementation of the binary search algorithm.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to recursion stack
 *
 * @param arr The sorted array to search
 * @param target The value to search for
 * @param left The left boundary index (default: 0)
 * @param right The right boundary index (default: arr.length - 1)
 * @returns The index of the target if found, -1 otherwise
 */
export function recursiveBinarySearch(
    arr: number[],
    target: number,
    left: number = 0,
    right: number = arr.length - 1
): number {
    // Base case: element not found
    if (left > right) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    // Target found
    if (arr[mid] === target) {
        return mid;
    }

    // Search in left half
    if (arr[mid] > target) {
        return recursiveBinarySearch(arr, target, left, mid - 1);
    }

    // Search in right half
    return recursiveBinarySearch(arr, target, mid + 1, right);
}

// Uncomment to test this algorithm individually
// import { generateSortedArray, selectSearchTargets } from './utils';
//
// // Generate test array and targets
// const testArray = generateSortedArray(1000);
// const targets = selectSearchTargets(testArray, 50, 5);
//
// // Run tests
// console.log('=== Binary Search Test ===');
// console.log(`Array size: ${testArray.length}`);
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//
//   console.log('Iterative Binary Search:');
//   const result1 = runArraySearch(binarySearch, testArray, target, 'Binary Search');
//   console.log(`Result: ${result1.result}, Time: ${result1.time.toFixed(4)} ms, Success: ${result1.success ? 'Yes' : 'No'}`);
//
//   console.log('Recursive Binary Search:');
//   const result2 = runArraySearch(recursiveBinarySearch, testArray, target, 'Recursive Binary Search');
//   console.log(`Result: ${result2.result}, Time: ${result2.time.toFixed(4)} ms, Success: ${result2.success ? 'Yes' : 'No'}`);
// });
