/**
 * LinearSearch.ts - Implementation of linear search algorithm
 *
 * Linear search is the simplest searching algorithm that searches
 * for an element in a list sequentially.
 */

import { runArraySearch, type ArraySearchFunction } from '../utils';

/**
 * Linear Search
 *
 * Sequentially checks each element of the array for the target value
 * until a match is found or until all elements have been searched.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param arr The array to search
 * @param target The value to search for
 * @returns The index of the target if found, -1 otherwise
 */
export function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

// Uncomment to test this algorithm individually
// import { generateRandomArray, selectSearchTargets } from './utils';
//
// // Generate test array and targets
// const testArray = generateRandomArray(100);
// const targets = selectSearchTargets(testArray, 50, 5);
//
// // Run tests
// console.log('=== Linear Search Test ===');
// console.log(`Array size: ${testArray.length}`);
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//   const result = runArraySearch(linearSearch, testArray, target, 'Linear Search');
//   console.log(`Result: ${result.result}, Time: ${result.time.toFixed(4)} ms, Success: ${result.success ? 'Yes' : 'No'}`);
// });
