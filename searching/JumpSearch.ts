/**
 * JumpSearch.ts - Implementation of jump search algorithm
 *
 * Jump search is a searching algorithm for sorted arrays that works by
 * jumping ahead by fixed steps and then performing a linear search.
 */

import { runArraySearch, type ArraySearchFunction } from './utils';

/**
 * Jump Search
 *
 * Like binary search, jump search works on sorted arrays.
 * Instead of dividing, it jumps ahead by fixed steps.
 *
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 *
 * @param arr The sorted array to search
 * @param target The value to search for
 * @returns The index of the target if found, -1 otherwise
 */
export function jumpSearch(arr: number[], target: number): number {
  const n = arr.length;

  // Finding block size to be jumped (optimal step size is √n)
  let step = Math.floor(Math.sqrt(n));

  // Finding the block where element is present (if it is present)
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      return -1;
    }
  }

  // Doing a linear search for target in block beginning with prev
  while (arr[prev] < target) {
    prev++;

    // If we reached next block or end of array, element is not present
    if (prev === Math.min(step, n)) {
      return -1;
    }
  }

  // If element is found
  if (arr[prev] === target) {
    return prev;
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
// console.log('=== Jump Search Test ===');
// console.log(`Array size: ${testArray.length}`);
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//   const result = runArraySearch(jumpSearch, testArray, target, 'Jump Search');
//   console.log(`Result: ${result.result}, Time: ${result.time.toFixed(4)} ms, Success: ${result.success ? 'Yes' : 'No'}`);
// });
