function sumSubsets3(arr, num, i = 0, result = []) {
    if (!num) return [[]];

    for (let old; i in arr; old = arr[i++]) {
        if (arr[i] <= num && old != arr[i]) {
            let next = sumSubsets(arr, num - arr[i], i + 1);
            let nextMapped = next.map(v => {
                v.unshift(arr[i]);
                return v;
            });
            result.push(...nextMapped);
        }
    }
    return result;
}

// OTHER
var set = {};

function sumSubsets(arr, num) {
    var retArr = [];
    var tempArr = [];
    helper(arr, num, retArr, tempArr, 0);
    console.log(retArr);
    return retArr;
}

function helper(arr, num, retArr, tempArr, start) {
    if (num < 0) return;
    if (num === 0) {
        if (!set[tempArr]) {
            set[tempArr] = true;
            retArr.push(tempArr.slice());
        }
    }
    for (var i = start; i < arr.length; i++) {
        tempArr.push(arr[i]);
        let diff = num - arr[i];
        helper(arr, diff, retArr, tempArr, i + 1);
        tempArr.splice(-1, 1);
    }
}

const tests = [
    {
        name: 'Test 1',
        arg: [[1, 2, 3, 4, 5], 5],
        expected: [[1, 4],
            [2, 3],
            [5]]
    }
];

tests.forEach((o, i) => {
    let result = sumSubsets(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
