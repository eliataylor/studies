/**
 *
 * Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.
 *
 * Return the sum of the three integers.
 *
 * You may assume that each input would have exactly one solution.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [-1,2,1,-4], target = 1
 * Output: 2
 * Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 * Example 2:
 *
 * Input: nums = [0,0,0], target = 1
 * Output: 0
 * Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
 *
 *
 * Constraints:
 *
 * 3 <= nums.length <= 500
 * -1000 <= nums[i] <= 1000
 * -104 <= target <= 104
 *
 */

function threeSumClosest(nums: number[], target: number): number {

    let result = Infinity;

    nums.sort((a, b) => a -b);

    for (let i=0; i < nums.length - 2; i++ ) {

        let start = i + 1;
        let end = nums.length - 1

        while (start < end) {
            const sum = nums[i] + nums[start] + nums[end];
            const diff = Math.abs(sum - target);

            if (diff === 0) {
                return sum;
            }

            if (diff < Math.abs(result - target)) {
                result = sum;
            }

            if (sum < target) {
                start++;
            } else {
                end--
            }

        }

    }

    return result
}
