/**
 * Bubble Sort implementation in TypeScript
 *
 * Time Complexity:
 * - Best Case: O(n) when array is already sorted
 * - Average Case: O(n²)
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1)
 */

function bubbleSort<T>(arr: T[]): T[] {
    // Create a copy of the array to avoid modifying the original
    const result = [...arr];
    const length = result.length;

    // Flag to check if any swaps were made during a pass
    let swapped: boolean;

    // Outer loop for passes
    for (let i = 0; i < length; i++) {
        swapped = false;

        // Inner loop for comparisons in each pass
        // With each pass, the largest element bubbles to the end
        // So we can reduce the number of comparisons by i
        for (let j = 0; j < length - 1 - i; j++) {
            // Compare adjacent elements
            if (result[j] > result[j + 1]) {
                // Swap if they are in the wrong order
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }

        // If no swaps occurred in this pass, the array is sorted
        if (!swapped) {
            break;
        }
    }

    return result;
}

// Example usage
// Basic array of numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", numbers);
console.log("Sorted array:", bubbleSort(numbers));

// Array of strings
const fruits = ["banana", "apple", "orange", "grape", "pear"];
console.log("Original array:", fruits);
console.log("Sorted array:", bubbleSort(fruits));

// Custom objects (requires proper comparison logic)
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 20 }
];

// For custom objects, we need a custom comparator function
function bubbleSortWithComparator<T>(
    arr: T[],
    comparator: (a: T, b: T) => number
): T[] {
    const result = [...arr];
    const length = result.length;
    let swapped: boolean;

    for (let i = 0; i < length; i++) {
        swapped = false;

        for (let j = 0; j < length - 1 - i; j++) {
            // Use the comparator function to determine order
            if (comparator(result[j], result[j + 1]) > 0) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }

    return result;
}

// Sort by age
const sortedByAge = bubbleSortWithComparator(people, (a, b) => a.age - b.age);
console.log("Sorted by age:", sortedByAge);

// Sort by name
const sortedByName = bubbleSortWithComparator(people, (a, b) => a.name.localeCompare(b.name));
console.log("Sorted by name:", sortedByName);
