/*

Template #1 (left <= right):

Most basic and elementary form of Binary Search
Search Condition can be determined without comparing to the element's neighbors (or use specific elements around it)
No post-processing required because at each step, you are checking to see if the element has been found. If you reach the end, then you know the element is not found


Template #2 (left < right):

An advanced way to implement Binary Search.
Search Condition needs to access element's immediate right neighbor
Use element's right neighbor to determine if condition is met and decide whether to go left or right
Guarantees Search Space is at least 2 in size at each step
Post-processing required. Loop/Recursion ends when you have 1 element left. Need to assess if the remaining element meets the condition.


Template #3 (left + 1 < right):

An alternative way to implement Binary Search
Search Condition needs to access element's immediate left and right neighbors
Use element's neighbors to determine if condition is met and decide whether to go left or right
Guarantees Search Space is at least 3 in size at each step
Post-processing required. Loop/Recursion ends when you have 2 elements left. Need to assess if the remaining elements meet the condition.

 */

/**
 * Binary Search Implementations & Applications
 * ============================================
 *
 * This file contains three standard binary search templates and several
 * practical applications of the binary search algorithm.
 *
 * Binary search is an efficient algorithm for finding a target value within a sorted array.
 * Time complexity: O(log n)
 * Space complexity: O(1)
 */

/**
 * ==========================================
 * TEMPLATE #1: Basic Binary Search (left <= right)
 * ==========================================
 *
 * - Most basic and elementary form of Binary Search
 * - Search condition can be determined without comparing to the element's neighbors
 * - No post-processing required because at each step, we check if the element has been found
 * - End condition: left > right (element not found)
 */
function binarySearch(nums, target) {
    // Handle empty array
    if (nums == null || nums.length == 0)
        return -1;

    let left = 0, right = nums.length - 1;

    while (left <= right) {
        // Calculate middle index safely to prevent integer overflow
        let mid = left + Math.floor((right - left) / 2);

        if (nums[mid] === target) {
            return mid; // Target found, return its index
        } else if (nums[mid] < target) {
            left = mid + 1; // Target is in the right half
        } else {
            right = mid - 1; // Target is in the left half
        }
    }

    // Target not found
    return -1;
}

/**
 * ==========================================
 * TEMPLATE #2: Binary Search with Left < Right
 * ==========================================
 *
 * - An advanced implementation of Binary Search
 * - Search condition needs to access the element's immediate right neighbor
 * - Use the element's right neighbor to determine if the condition is met
 * - Guarantees search space is at least 2 in size at each step
 * - End condition: left == right (post-processing required)
 */
function binarySearch2(nums, target) {
    // Handle empty array
    if (nums == null || nums.length == 0)
        return -1;

    let left = 0, right = nums.length;

    while (left < right) {
        // Calculate middle index safely to prevent integer overflow
        let mid = left + Math.floor((right - left) / 2);

        if (nums[mid] == target) {
            return mid; // Target found, return its index
        } else if (nums[mid] < target) {
            left = mid + 1; // Target is in the right half
        } else {
            right = mid; // Target is in the left half (including mid)
        }
    }

    // Post-processing: Check if the target is found
    if (left != nums.length && nums[left] == target)
        return left;

    return -1; // Target not found
}

/**
 * ==========================================
 * TEMPLATE #3: Binary Search with Left + 1 < Right
 * ==========================================
 *
 * - An alternative way to implement Binary Search
 * - Search condition needs to access the element's immediate left and right neighbors
 * - Use the element's neighbors to determine if the condition is met
 * - Guarantees search space is at least 3 in size at each step
 * - End condition: left + 1 == right (post-processing required)
 */
function binarySearch3(nums, target) {
    // Handle empty array
    if (nums == null || nums.length == 0)
        return -1;

    let left = 0, right = nums.length - 1;

    while (left + 1 < right) {
        // Calculate middle index safely to prevent integer overflow
        let mid = left + Math.floor((right - left) / 2);

        if (nums[mid] == target) {
            return mid; // Target found, return its index
        } else if (nums[mid] < target) {
            left = mid; // Target is in the right half (including mid)
        } else {
            right = mid; // Target is in the left half (including mid)
        }
    }

    // Post-processing: Check if the target is at left or right position
    if (nums[left] == target) return left;
    if (nums[right] == target) return right;

    return -1; // Target not found
}

/**
 * ==========================================
 * BINARY SEARCH APPLICATIONS
 * ==========================================
 */

/**
 * Application 1: Find the next letter greater than target
 *
 * Problem: Given a list of sorted characters and a target character,
 * find the smallest element in the list that is larger than the given target.
 *
 * @param {character[]} letters - Sorted list of characters
 * @param {character} target - Target character
 * @return {character} - Next greatest letter
 */
function nextGreatestLetter(letters, target) {
    // Handle empty array
    if (letters == null || letters.length == 0)
        return -1;

    let left = 0, right = letters.length;

    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);

        if (letters[mid] <= target) {
            left = mid + 1; // Look in the right half
        } else {
            right = mid; // Look in the left half
        }
    }

    // If we've gone beyond the array, wrap around to the first element
    return left == letters.length ? letters[0] : letters[left];
}

/**
 * Application 2: Find First and Last Position of Element in Sorted Array
 *
 * Problem: Given an array of integers sorted in ascending order,
 * find the starting and ending position of a given target value.
 *
 * @param {number[]} nums - Sorted array of integers
 * @param {number} target - Target value
 * @return {number[]} - Array containing the starting and ending positions
 */
function searchRange(nums, target) {
    /**
     * Helper function to find the leftmost or rightmost insertion index
     *
     * @param {number[]} nums - Sorted array
     * @param {number} target - Target value
     * @param {boolean} left - If true, find leftmost index; otherwise, find rightmost
     * @return {number} - The insertion index
     */
    function extremeInsertionIndex(nums, target, left) {
        let lo = 0;
        let hi = nums.length;

        while (lo < hi) {
            let mid = lo + Math.floor((hi - lo) / 2);

            // For leftmost, move right pointer when equal to target
            // For rightmost, move left pointer when equal to target
            if (nums[mid] > target || (left && target == nums[mid])) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        return lo;
    }

    // Initialize result array with default values
    let targetRange = [-1, -1];

    // Find leftmost index
    let leftIdx = extremeInsertionIndex(nums, target, true);

    // Check if target exists in array
    if (leftIdx == nums.length || nums[leftIdx] != target) {
        return targetRange;
    }

    // Set start and end positions
    targetRange[0] = leftIdx;
    targetRange[1] = extremeInsertionIndex(nums, target, false) - 1;

    return targetRange;
}


/**
 * Application 4: Find Minimum in Rotated Sorted Array
 *
 * Problem: Suppose an array sorted in ascending order is rotated at some pivot.
 * Find the minimum element.
 *
 * @param {number[]} nums - Rotated sorted array
 * @return {number} - The minimum element
 */
function findMin(nums) {
    // If the list has just one element, return that element
    if (nums.length == 1) {
        return nums[0];
    }

    let left = 0, right = nums.length - 1;

    // If the array is not rotated, the minimum is the first element
    if (nums[right] > nums[0]) {
        return nums[0];
    }

    // Binary search for the pivot point
    while (right >= left) {
        let mid = left + Math.floor((right - left) / 2);

        // Check if mid is the pivot (greater than next element)
        if (nums[mid] > nums[mid + 1]) {
            return nums[mid + 1];
        }

        // Check if mid-1 is the pivot (greater than mid)
        if (nums[mid - 1] > nums[mid]) {
            return nums[mid];
        }

        // Decide which half to search
        if (nums[mid] > nums[0]) {
            left = mid + 1; // Minimum is in the right half
        } else {
            right = mid - 1; // Minimum is in the left half
        }
    }

    return -1; // Not found (shouldn't happen for valid input)
}

/**
 * Application 5: Find Peak Element
 *
 * Problem: A peak element is an element that is greater than its neighbors.
 * Find a peak element in the array.
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Index of a peak element
 */
function findPeakElement(nums) {
    /**
     * Helper function to recursively search for a peak element
     */
    function search(nums, l, r) {
        if (l == r) return l;

        let mid = Math.floor((l + r) / 2);

        if (nums[mid] > nums[mid + 1]) {
            return search(nums, l, mid); // Peak is in the left half
        } else {
            return search(nums, mid + 1, r); // Peak is in the right half
        }
    }

    return search(nums, 0, nums.length - 1);
}

/**
 * Application 6: Guess Number Higher or Lower
 *
 * Problem: We are playing the Guess Game. The game is as follows:
 * I pick a number from 1 to n. You have to guess which number I picked.
 * Every time you guess wrong, I'll tell you whether the number is higher or lower.
 *
 * @param {number} n - Upper bound of the range
 * @param {number} target - (For testing) The secret number to guess
 * @return {number} - The secret number
 */
function guessNumberBinary(n, target) {
    let low = 1;
    let high = n;
    let iterations = 0;

    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2);
        let res = guess(mid, target);

        if (res == 0) {
            console.log(`Target ${n} found in ${iterations} iterations`);
            return mid; // Correct guess
        } else if (res < 0) {
            high = mid - 1; // Target is lower
        } else {
            low = mid + 1; // Target is higher
        }
        iterations++;
    }

    return -1; // Not found (shouldn't happen for valid input)
}

/**
 * Alternative implementation of Guess Number Higher or Lower
 */
function guessNumber(n, target) {
    let test = n;
    let max = n;
    let min = 0;
    let iterations = 0;
    let result = guess(test, target);

    while (result !== 0) {
        iterations++;

        if (result === 1) {
            min = test;
            test += Math.ceil((max - min) / 2);
        } else {
            max = test;
            test -= Math.ceil((max - min) / 2);
        }

        result = guess(test, target);
    }

    console.log(`Target ${n} found in ${iterations} iterations`);
    return test;
}

/**
 * Ternary search implementation of Guess Number Higher or Lower
 * Divides the range into three parts rather than two
 */
function guessNumberTernary(n, target) {
    let low = 1;
    let high = n;
    let iterations = 0;

    while (low <= high) {
        iterations++;

        // Divide the range into three parts
        let mid1 = low + Math.floor((high - low) / 3);
        let mid2 = high - Math.floor((high - low) / 3);

        let res1 = guess(mid1, target);
        let res2 = guess(mid2, target);

        if (res1 == 0) {
            console.log(`Target ${n} found in ${iterations} iterations`);
            return mid1; // Target found at mid1
        } else if (res2 == 0) {
            console.log(`Target ${n} found in ${iterations} iterations`);
            return mid2; // Target found at mid2
        }

        // Decide which third to search next
        if (res1 < 0) {
            high = mid1 - 1; // Target is in the first third
        } else if (res2 > 0) {
            low = mid2 + 1; // Target is in the last third
        } else {
            low = mid1 + 1;
            high = mid2 - 1; // Target is in the middle third
        }
    }

    return -1; // Not found
}

/**
 * Simulation of the guess API
 *
 * @param {number} num - The guessed number
 * @param {number} target - The secret number
 * @return {number} - -1 if num > target, 1 if num < target, 0 if num == target
 */
function guess(num, target) {
    if (num === target) return 0;
    else if (num > target) return -1;
    else return 1;
}

/**
 * ==========================================
 * TEST CASES
 * ==========================================
 */

/**
 * Test binary search implementations with standard cases
 */
function testStandardBinarySearch() {
    console.log("=== TESTING STANDARD BINARY SEARCH IMPLEMENTATIONS ===");

    const testCases = [
        { arr: [1, 2, 3, 4, 5], target: 3, expected: 2 },
        { arr: [1, 2, 3, 4, 5], target: 6, expected: -1 },
        { arr: [1, 3, 5, 7, 9], target: 5, expected: 2 },
        { arr: [1, 3, 5, 7, 9], target: 4, expected: -1 },
        { arr: [], target: 5, expected: -1 }
    ];

    testCases.forEach((testCase, index) => {
        const template1Result = binarySearch(testCase.arr, testCase.target);
        const template2Result = binarySearch2(testCase.arr, testCase.target);
        const template3Result = binarySearch3(testCase.arr, testCase.target);

        console.log(`Test Case ${index + 1}: Array [${testCase.arr}], Target ${testCase.target}`);
        console.log(`  Template 1: ${template1Result === testCase.expected ? 'PASSED' : 'FAILED'} (${template1Result})`);
        console.log(`  Template 2: ${template2Result === testCase.expected ? 'PASSED' : 'FAILED'} (${template2Result})`);
        console.log(`  Template 3: ${template3Result === testCase.expected ? 'PASSED' : 'FAILED'} (${template3Result})`);
    });
}

/**
 * Test the searchRange function for finding first and last positions
 */
function testSearchRange() {
    console.log("\n=== TESTING SEARCH RANGE ===");

    const tests = [
        {
            name: 'Target not found',
            arg: [[5, 7, 7, 8, 8, 10], 6],
            expected: [-1, -1]
        },
        {
            name: 'Target found with duplicates',
            arg: [[5, 7, 7, 8, 8, 10], 8],
            expected: [3, 4]
        },
        {
            name: 'Empty array',
            arg: [[], 0],
            expected: [-1, -1]
        },
        {
            name: 'Single occurrence',
            arg: [[1, 2, 3, 4, 5], 3],
            expected: [2, 2]
        },
        {
            name: 'All elements are target',
            arg: [[8, 8, 8, 8], 8],
            expected: [0, 3]
        }
    ];

    tests.forEach((test, i) => {
        const result = searchRange(...test.arg);
        const isPassed = JSON.stringify(result) === JSON.stringify(test.expected);

        console.log(`Test ${i + 1} - ${test.name}: ${isPassed ? 'PASSED' : 'FAILED'}`);
        console.log(`  Input: [${test.arg[0]}], Target: ${test.arg[1]}`);
        console.log(`  Expected: [${test.expected}], Got: [${result}]`);
    });
}

/**
 * Test the Guess Number Higher or Lower functions
 */
function testGuessNumber() {
    console.log("\n=== TESTING GUESS NUMBER ALGORITHMS ===");

    const tests = [
        {
            name: 'Small range',
            arg: [10, 6],
            expected: 6
        },
        {
            name: 'Single number',
            arg: [1, 1],
            expected: 1
        },
        {
            name: 'Two numbers',
            arg: [2, 2],
            expected: 2
        },
        {
            name: 'Medium range',
            arg: [219, 24],
            expected: 24
        },
        {
            name: 'Large range with target in middle',
            arg: [9999, 5000],
            expected: 5000
        },
        {
            name: 'Large range with target near end',
            arg: [9999, 9998],
            expected: 9998
        }
    ];

    console.log("Binary Search Implementation:");
    tests.forEach((test, i) => {
        const result = guessNumberBinary(...test.arg);
        const isPassed = result === test.expected;

        console.log(`  Test ${i + 1} - ${test.name}: ${isPassed ? 'PASSED' : 'FAILED'}`);
        console.log(`    Range: 1 to ${test.arg[0]}, Target: ${test.arg[1]}`);
        console.log(`    Expected: ${test.expected}, Got: ${result}`);
    });

    console.log("\nAlternative Implementation:");
    tests.forEach((test, i) => {
        const result = guessNumber(...test.arg);
        const isPassed = result === test.expected;

        console.log(`  Test ${i + 1} - ${test.name}: ${isPassed ? 'PASSED' : 'FAILED'}`);
    });

    console.log("\nTernary Search Implementation:");
    tests.forEach((test, i) => {
        const result = guessNumberTernary(...test.arg);
        const isPassed = result === test.expected;

        console.log(`  Test ${i + 1} - ${test.name}: ${isPassed ? 'PASSED' : 'FAILED'}`);
    });
}

/**
 * Execute all test suites
 */
function runAllTests() {
    testStandardBinarySearch();
    testSearchRange();
    testGuessNumber();

    console.log("\n=== ALL TESTS COMPLETED ===");
}

// Uncomment to run tests
// runAllTests();
