/**
 * FibonacciSearch.ts - Implementation of fibonacci search algorithm
 *
 * Fibonacci search is a comparison-based search algorithm that uses Fibonacci numbers
 * to divide the array into unequal parts.
 */

import { runArraySearch, type ArraySearchFunction } from '../utils';

/**
 * Fibonacci Search
 *
 * A comparison-based search that uses Fibonacci numbers
 * to divide the array into unequal parts.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @param arr The sorted array to search
 * @param target The value to search for
 * @returns The index of the target if found, -1 otherwise
 */
export function fibonacciSearch(arr: number[], target: number): number {
  const n = arr.length;

  // Initialize Fibonacci numbers
  let fibM2 = 0; // (m-2)'th Fibonacci number
  let fibM1 = 1; // (m-1)'th Fibonacci number
  let fibM = fibM1 + fibM2; // m'th Fibonacci number

  // Find the smallest Fibonacci number greater than or equal to n
  while (fibM < n) {
    fibM2 = fibM1;
    fibM1 = fibM;
    fibM = fibM1 + fibM2;
  }

  // Marks the eliminated range from front
  let offset = -1;

  // While there are elements to be inspected.
  // Note that we compare arr[fibM2] with target.
  // When fibM becomes 1, fibM2 becomes 0
  while (fibM > 1) {
    // Check if fibM2 is a valid location
    const i = Math.min(offset + fibM2, n - 1);

    // If target is greater than the value at index fibM2,
    // cut the subarray array from offset to i
    if (arr[i] < target) {
      fibM = fibM1;
      fibM1 = fibM2;
      fibM2 = fibM - fibM1;
      offset = i;
    }
    // If target is less than the value at index fibM2,
    // cut the subarray after i+1
    else if (arr[i] > target) {
      fibM = fibM2;
      fibM1 = fibM1 - fibM2;
      fibM2 = fibM - fibM1;
    }
    // Element found
    else {
      return i;
    }
  }

  // Comparing the last element with target
  if (fibM1 && arr[offset + 1] === target) {
    return offset + 1;
  }

  // Element not found
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
// console.log('=== Fibonacci Search Test ===');
// console.log(`Array size: ${testArray.length}`);
//
// targets.forEach(({ target, exists }) => {
//   console.log(`\nSearching for ${target} (${exists ? 'exists' : 'does not exist'})`);
//   const result = runArraySearch(fibonacciSearch, testArray, target, 'Fibonacci Search');
//   console.log(`Result: ${result.result}, Time: ${result.time.toFixed(4)} ms, Success: ${result.success ? 'Yes' : 'No'}`);
// });
