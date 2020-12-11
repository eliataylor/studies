/*

Template #1 (left <= right):

Most basic and elementary form of Binary Search
Search Condition can be determined without comparing to the element's neighbors (or use specific elements around it)
No post-processing required because at each step, you are checking to see if the element has been found. If you reach the end, then you know the element is not found


Template #2 (left < right):

An advanced way to implement Binary Search.
Search Condition needs to access element's immediate right neighbor
Use element's right neighbor to determine if condition is met and decide whether to go left or right
Gurantees Search Space is at least 2 in size at each step
Post-processing required. Loop/Recursion ends when you have 1 element left. Need to assess if the remaining element meets the condition.


Template #3 (left + 1 < right):

An alternative way to implement Binary Search
Search Condition needs to access element's immediate left and right neighbors
Use element's neighbors to determine if condition is met and decide whether to go left or right
Gurrantees Search Space is at least 3 in size at each step
Post-processing required. Loop/Recursion ends when you have 2 elements left. Need to assess if the remaining elements meet the condition.

 */

// on sorted array
function binarySearch(nums, target){
    if(nums == null || nums.length == 0)
        return -1;

    let left = 0, right = nums.length - 1;
    while(left <= right){
        // Prevent (left + right) overflow
        let mid = left + Math.floor((right - left) / 2);
        if(nums[mid] == target){ return mid; }
        else if(nums[mid] < target) { left = mid + 1; }
        else { right = mid - 1; }
    }

    // End Condition: left > right
    return -1;
}

function binarySearch2(nums, target){
    if(nums == null || nums.length == 0)
        return -1;

    let left = 0, right = nums.length;
    while(left < right){
        // Prevent (left + right) overflow
        let mid = left + Math.floor((right - left) / 2);
        if(nums[mid] == target){ return mid; }
        else if(nums[mid] < target) { left = mid + 1; }
        else { right = mid - 1; }
    }

    // Post-processing:
    // End Condition: left == right
    if(left != nums.length && nums[left] == target) return left
    return -1;
}


function binarySearch3(nums, target) {
    if (nums == null || nums.length == 0) return -1;

    let left = 0, right = nums.length - 1;
    while (left + 1 < right){
        // Prevent (left + right) overflow
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid;
        } else {
            right = mid;
        }
    }

    // Post-processing:
    // End Condition: left + 1 == right
    if(nums[left] == target) return left;
    if(nums[right] == target) return right;
    return -1;
}

/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
    // find smallest element in the list that is larger than the given target
    if(letters == null || letters.length == 0)
        return -1;

    let left = 0, right = letters.length;
    while(left < right){
        let mid = left + Math.floor((right - left) / 2);

        if(letters[mid] == target){ return letters[mid + 1]; }

        else if(letters[mid] <= target) { left = mid + 1; }
        else { right = mid - 1; }
    }

    // Post-processing:
    // End Condition: left == right
    if(left != letters.length && letters[left] == target) return left
    return -1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
    // returns leftmost (or rightmost) index at which `target` should be
    // inserted in sorted array `nums` via binary search.
    function extremeInsertionIndex(nums, target, left) {
        let lo = 0;
        let hi = nums.length;
        while (lo < hi) {
            let mid = lo + Math.floor((hi - lo) / 2);
            if (nums[mid] > target || (left && target == nums[mid])) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    let targetRange = [-1, -1];
    let leftIdx = extremeInsertionIndex(nums, target, true);

    // assert that `leftIdx` is within the array bounds and that `target`
    // is actually in `nums`.
    if (leftIdx == nums.length || nums[leftIdx] != target) {
        return targetRange;
    }

    targetRange[0] = leftIdx;
    targetRange[1] = extremeInsertionIndex(nums, target, false) - 1;

    return targetRange;
}

var searchRange2 = function(nums, target) {
    let bounds = [-1,-1];
    if (nums == null || nums.length == 0) return bounds;

    let left = 0, right = nums.length - 1;
    while (left + 1 < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) {
            console.log(mid + ' IS ' + target)

            left = mid - 1;
            while(nums[left] === target) {
                console.log('back search ' + left);
                left--;
            }
            bounds[0] = left+1;

            right = mid + 1;
            while(nums[right] === target) {
                right++;
            }
            bounds[1] = right-1;
            console.log('found ', bounds)
            return bounds;
        } else if (nums[mid] < target) {
            left = mid;
        } else {
            right = mid;
        }
    }

    console.log('postprocess target '+ target + ': ' +  left + ',' + right)
    // Post-processing:
    // End Condition: left + 1 == right
    if(nums[left] == target) return bounds[0] = left;
    if(nums[right] == target) return bounds[1] = right;
    return bounds;
};




function firstBadVersion(n) {
    let left = 1;
    let right = n;
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

function findMin(nums) {
    // If the list has just one element then return that element.
    if (nums.length == 1) {
        return nums[0];
    }

    // initializing left and right pointers.
    let left = 0, right = nums.length - 1;

    // if the last element is greater than the first element then there is no rotation.
    // e.g. 1 < 2 < 3 < 4 < 5 < 7. Already sorted array.
    // Hence the smallest element is first element. A[0]
    if (nums[right] > nums[0]) {
        return nums[0];
    }

    // Binary search way
    while (right >= left) {
        // Find the mid element
        let mid = left + Math.floor((right - left) / 2);

        // if the mid element is greater than its next element then mid+1 element is the smallest
        // This point would be the point of change. From higher to lower value.
        if (nums[mid] > nums[mid + 1]) {
            return nums[mid + 1];
        }

        // if the mid element is lesser than its previous element then mid element is the smallest
        if (nums[mid - 1] > nums[mid]) {
            return nums[mid];
        }

        // if the mid elements value is greater than the 0th element this means
        // the least value is still somewhere to the right as we are still dealing with elements
        // greater than nums[0]
        if (nums[mid] > nums[0]) {
            left = mid + 1;
        } else {
            // if nums[0] is greater than the mid value then this means the smallest value is somewhere to
            // the left
            right = mid - 1;
        }
    }
    return -1;
}

function findPeakElement(nums) {
    function search(nums, l, r) {
        if (l == r) return l;
        let mid = Math.floor((l + r) / 2);
        if (nums[mid] > nums[mid + 1]) return search(nums, l, mid);
        return search(nums, mid + 1, r);
    }

    return search(nums, 0, nums.length - 1);

};



// binary
var guessNumberBinary = function(n, fake) {
    let low = 1;
    let high = n;
    let its = 0;
    while(low <= high) {
        let mid = low + Math.ceil((high - low) / 2);
        let res = guess(mid, fake);
        if (res == 0) {
            console.log(n + ' found in ' + its);
            return mid;
        } else if (res < 0) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
        its++;
    }
    return n;
};

// my binary (MUST resolve and slightly slower than binary, probably due to rounding?)
var guessNumber = function(n, fake) {
    let test = n;
    let max = n;
    let min = 0;
    let its = 0;
    let result = guess(test, fake);
    while(result !== 0) {
        its++;
        if (result === 1) {
            min = test;
            test += Math.ceil((max-min)/2);
        } else {
            max = test;
            test -= Math.ceil((max-min)/2);
        }
        result = guess(test, fake);
    }
    console.log(n + ' found in ' + its);
    return test;
};

// ternary
function guessNumberTernary(n, fake) {
    let low = 1;
    let high = n;
    let its = 0;
    while (low <= high) {
        its++;
        let mid1 = low + Math.floor((high - low) / 3);
        let mid2 = high - Math.floor((high - low) / 3);
        let res1 = guess(mid1, fake);
        let res2 = guess(mid2, fake);
        if (res1 == 0) {
            console.log(n + ' found in ' + its);
            return mid1;
        } else if (res2 == 0) {
            console.log(n + ' found in ' + its);
            return mid2;
        }

        if (res1 < 0) {
            high = mid1 - 1;
        } else if (res2 > 0 ) {
            low = mid2 + 1;
        } else {
            low = mid1 + 1;
            high = mid2 - 1;
        }
    }
    return -1;
}


function guess(t, fake){
    if (t === fake) return 0;
    else if (t > fake) return -1;
    else return 1;
}



/* guesses
const tests = [
    {
        name:'guess 2',
        arg: [2e31, 4],
        expected: 4
    },{
        name:'guess 1',
        arg: [10, 6],
        expected: 6
    },
    {
        name:'guess 2',
        arg: [1, 1],
        expected: 1
    },
    {
        name:'guess 3',
        arg: [2, 2],
        expected: 2
    },
    {
        name:'guess 3',
        arg: [219, 24],
        expected: 24
    },
    {
        name:'guess 3',
        arg: [219, 23],
        expected: 23
    },
    {
        name:'guess 3',
        arg: [9999, 8888],
        expected: 8888
    },
    {
        name:'guess 3',
        arg: [9999, 8887],
        expected: 8887
    },
    {
        name:'guess 3',
        arg: [9999, 9998],
        expected: 9998
    }
];

tests.forEach((o, i) => {
    let result = guessNumber(...o.arg);
    console.log('A TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
    result = guessNumberBinary(...o.arg);
    console.log('B TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})

*/


const tests = [
    {
        name:'guess 1',
        arg: [[5,7,7,8,8,10], 6],
        expected: [-1,-1]
    },{
        name:'guess 2',
        arg: [[5,7,7,8,8,10], 8],
        expected: [3,4]
    },
    {
        name:'guess 3',
        arg: [[],0],
        expected: [-1,-1]
    }
];

tests.forEach((o, i) => {
    let result = searchRange(...o.arg);
    console.log('A TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
