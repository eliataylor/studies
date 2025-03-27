/**
 * utils.ts - Utility for testing sorting algorithms
 *
 * This file provides:
 * 1. A function to generate random test arrays
 * 2. Utility functions to run sorting algorithms and measure performance
 * 3. A reusable test array for consistent comparisons
 */

/**
 * Generates an array of random integers between min and max (inclusive)
 * @param size The number of elements in the array
 * @param min The minimum value (default: 0)
 * @param max The maximum value (default: 1000)
 * @returns An array of random integers
 */
export function generateRandomArray(size: number, min: number = 0, max: number = 1000): number[] {
  const array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return array;
}

/**
 * Checks if an array is sorted in ascending order
 * @param array The array to check
 * @returns True if the array is sorted, false otherwise
 */
export function isSorted(array: number[]): boolean {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Type definition for sorting functions
 */
export type SortFunction = (arr: number[]) => number[];

/**
 * Runs a sorting algorithm and prints the results and timing
 * @param sortFunction The sorting function to test
 * @param array The array to sort
 * @param algorithmName The name of the algorithm for display
 */
export function runSort(
  sortFunction: SortFunction,
  array: number[],
  algorithmName: string
): void {
  console.log(`\n=== ${algorithmName} Sort ===`);

  // Create a copy of the array to avoid modifying the original
  const arrCopy = [...array];

  // Measure execution time
  const startTime = performance.now();
  const sortedArray = sortFunction(arrCopy);
  const endTime = performance.now();

  // Calculate execution time in milliseconds
  const executionTime = endTime - startTime;

  // Verify if the array is sorted correctly
  const sorted = isSorted(sortedArray);

  // Print results
  console.log(`Input Array Size: ${array.length}`);
  console.log(`Execution Time: ${executionTime.toFixed(4)} ms`);
  console.log(`Correctly Sorted: ${sorted ? 'Yes' : 'No'}`);

  // Optional: print sample of the sorted array
  if (sortedArray.length <= 20) {
    console.log(`Sorted Array: [${sortedArray.join(', ')}]`);
  } else {
    console.log(`First 10 elements: [${sortedArray.slice(0, 10).join(', ')}]`);
    console.log(`Last 10 elements: [${sortedArray.slice(-10).join(', ')}]`);
  }
}

/**
 * A shared test array for comparing different sorting algorithms
 * Default size is 1000 elements
 */
export const TestArray = generateRandomArray(1000);

/**
 * Run multiple sorting algorithms on the same array for comparison
 * @param sortFunctions Object mapping algorithm names to sorting functions
 * @param array The array to sort
 */
export function compareSort(
  sortFunctions: Record<string, SortFunction>,
  array: number[]
): void {
  console.log('\n=== Sorting Algorithm Comparison ===');
  console.log(`Array Size: ${array.length}`);

  // Run each sorting function and collect results
  const results: {name: string, time: number}[] = [];

  for (const [name, func] of Object.entries(sortFunctions)) {
    // Create a copy of the array
    const arrCopy = [...array];

    // Measure execution time
    const startTime = performance.now();
    const sortedArray = func(arrCopy);
    const endTime = performance.now();

    // Calculate execution time in milliseconds
    const executionTime = endTime - startTime;

    // Verify if the array is sorted correctly
    const sorted = isSorted(sortedArray);

    if (!sorted) {
      console.error(`WARNING: ${name} did not sort the array correctly!`);
    }

    results.push({name, time: executionTime});
  }

  // Sort results by execution time (fastest first)
  results.sort((a, b) => a.time - b.time);

  // Print results table
  console.log('\nResults (sorted by execution time):');
  console.log('Algorithm\t\tTime (ms)');
  console.log('------------------------------');

  results.forEach(result => {
    console.log(`${result.name.padEnd(20)}\t${result.time.toFixed(4)}`);
  });
}
