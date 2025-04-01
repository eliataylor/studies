/***
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).



Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.


Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106

 */

/**
 * Typical Two Pointer solution:
 * Merges two sorted arrays into a single sorted array in O(n+m) time complexity
 * @param arr1 First sorted array
 * @param arr2 Second sorted array
 * @returns A new sorted array containing all elements from both input arrays
 */
function mergeSortedArrays<T>(arr1: T[], arr2: T[]): T[] {
  const merged: T[] = [];
  let i = 0;  // Pointer for arr1
  let j = 0;  // Pointer for arr2

  // Traverse both arrays and insert smaller value from either
  // to the result array
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  // If there are remaining elements in arr1, add them
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }

  // If there are remaining elements in arr2, add them
  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }

  return merged;
}


function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const merged = mergeSortedArrays(nums1, nums2); // Use the merge function to combine the two sorted arrays

    // const merged: number[] = nums1.concat(nums2);
    // merged.sort((a, b) => a - b)

    const middle = Math.floor(merged.length / 2);

    if (merged.length % 2 !== 0) {
        return merged[middle]
    } else {
        return (merged[middle - 1] + merged[middle]) / 2
    }

};

findMedianSortedArrays([1, 3], [2]); // 2.00000
