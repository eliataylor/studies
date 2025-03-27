/**
 * ExponentialSearch.ts - Implementation of exponential search algorithm
 *
 * Exponential search is a combination of two algorithms: finding the range
 * where the element might be present and performing a binary search on that range.
 */

import { runArraySearch, type ArraySearchFunction } from './utils';

/**
 * Exponential Search
 *
 * Exponential search involves two steps:
 * 1. Find range where element is present
 * 2. Do binary search in above found range
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @param arr The sorted array to search
 * @param target The value to search for
 * @returns The index of the target if found, -1 otherwise
 */
export function exponentialSearch(arr: number[], target: number): number {
  const n = arr.length;

  // If array is empty
  if (n === 0) {
    return -1;
  }

  // If target is the first element
  if (arr[0] === target) {
    return 0;
  }

  // Find range for binary search by repeated doubling
  let i = 1;
  while (i < n && arr[i] <= target) {
    i *= 2;
  }

  // Call binary search for the found range
  return binarySearch(
    arr,
    target,
    Math.floor(i / 2),
    Math.min(i, n - 1)
  );
}

/**
 * Helper binary search function for exponential search
 */
function binarySearch(
  arr: number[],
  target: number,
  left: number,
  right: number
): number {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
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
// console.log('=== Exponential Search Test ===');
// console.log(`Array size: ${testArray.length}`);
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//   const result = runArraySearch(exponentialSearch, testArray, target, 'Exponential Search');
//   console.log(`Result: ${result.result}, Time: ${result.time.toFixed(4)} ms, Success: ${result.success ? 'Yes' : 'No'}`);
// });
