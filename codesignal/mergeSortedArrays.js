var mergeSimple = function(nums1, m, nums2, n) {
    if (nums1.length > m) nums1.splice(m); // js doesn't need the end prepopulated
    if (nums2.length > n) nums2.splice(n); // js doesn't need the end prepopulated

    let b = nums1.concat(nums2).sort((a,b)=> a-b);
    nums1.splice(0, nums1.length, ...b);
    return nums1;
};

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {

    if (nums1.length > m) nums1.splice(m); // js doesn't need the end prepopulated
    if (nums2.length > n) nums2.splice(n); // js doesn't need the end prepopulated

    let left = 0;
    let right = nums1.length;

    while (nums2.length > 0) {
        let target = nums2.shift();

        if (nums1.length < 2) {
            if (nums1.length === 0 || nums1[0] <= target) {
                nums1.push(target);
            } else {
                nums1.unshift(target);
            }
            continue;
        }

        right = nums1.length;
        while (left < right) {
            let mid = left + Math.floor((right - left) / 2);
            if (mid === 0 && nums1[0] <= target) {
                nums1.push(target);
                target = -1;
                break;
            } else if (mid === 0 && nums1[0] >= target) {
                nums1.unshift(target);
                target = -1;
                break;
            } else if (nums1[mid] <= target && (nums1[mid + 1] >= target || !nums1[mid+1]) ) {
                if (nums1[mid + 1] >= target) {
                    nums1.splice(mid + 1, 0, target);
                } else {
                    nums1.push(target);
                }
                target = -1;
                break;
            } else if (nums1[mid - 1] <= target && (nums1[mid] >= target || !nums1[mid-1]) ) {
                if (nums1[mid - 1] <= target) {
                    nums1.splice(mid, 0, target);
                } else {
                    nums1.unshift(target);
                }
                target = -1;
                break;
            } else if (nums1[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        if (target > -1) {
            nums1.splice(right, 0, target)
        }
    }

    console.log(nums1);
    return nums1;
};


const tests = [
    {
        name: 'Test 5',
        arg: [[0,0,3,0,0,0,0,0,0],3,[-1,1,1,1,2,3],6],
        expected: [-1,0,0,1,1,1,2,3,3]
    },{
        name: 'Test 6',
        arg: [[-1,0,0,3,3,3,0,0,0],6,[1,2,2],3],
        expected: [-1,0,0,1,2,2,3,3,3]
    },{
        name: 'Test 4',
        arg: [[4, 0, 0, 0, 0, 0], 1, [1, 2, 3, 5, 6], 5],
        expected: [1, 2, 3, 4, 5, 6]
    },
    {
        name: 'Test 1',
        arg: [[2, 0], 1, [1], 1],
        expected: [1, 2]
    },
    {
        name: 'Test 2',
        arg: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
        expected: [1, 2, 2, 3, 5, 6]
    },
    {
        name: 'Test 3',
        arg: [[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3],
        expected: [1, 2, 3, 4, 5, 6]
    }
];

tests.forEach((o, i) => {
    let result = merge(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
