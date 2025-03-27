/**
 * Manually sorts an array of numbers using insertion technique with splice
 * @param {number[]} arr - The array of numbers to sort
 * @returns {number[]} - The sorted array
 */
function insertionSpliceSort(arr) {
  // Create a copy of the array to avoid modifying the original
  const result = [...arr];

  for (let i = 0; i < result.length - 1; i++) {
    // Check if current element is greater than the next one
    while (i >= 0 && result[i] > result[i + 1]) {
      // Remove the element at i+1 and store it
      const elementToMove = result.splice(i + 1, 1)[0];

      // Insert it at position i
      result.splice(i, 0, elementToMove);

      // Move back one position since we've shifted elements
      i--;
    }
  }

  return result;
}

// Example usage:
// const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const unsortedArray = [1, 4, 3, 5, 6, 2];
const sortedArray = insertionSpliceSort(unsortedArray);
console.log("Original array:", unsortedArray);
console.log("Sorted array:", sortedArray);
