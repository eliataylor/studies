function nearestGreater(a) {
    if (a.length < 2) return [-1];

    function scanOutward(start, arr) {
        for (let i = 1; i < arr.length; i++) {
            if (start - i >= 0 && arr[start - i] > arr[start]) {
                return start - i;
            }
            if (start + i <= arr.length - 1 && arr[start + i] > arr[start]) {
                return start + i;
            }
        }
        return -1;
    }

    let result = a.map((v, i) => {
        return scanOutward(i, a);
    });
    console.log(result);
    return result;

}

function nearestGreaterInterative(a) {
    let stack = [];
    let b = Array(a.length).fill(-1);

    for (let i = 0; i < a.length; i++) {
        while (stack.length && a[stack[stack.length - 1]] < a[i]) {
            let last_index = stack.pop();
            if (b[last_index] === -1 || i - last_index < last_index - b[last_index]) {
                b[last_index] = i;
            }
        }

        if (!stack.length) {
            b[i] = -1;
        } else {
            if (a[stack[stack.length - 1]] > a[i]) {
                b[i] = stack[stack.length - 1];
            } else {
                b[i] = b[stack[stack.length - 1]];
            }
        }

        stack.push(i);
    }

    return b;
}


const tests = [
    {
        name: 'Test 1',
        arg: [[1, 4, 2, 1, 7, 6]],
        expected: [1, 4, 1, 2, -1, 4]
    },
    {
        name: 'Test 2',
        arg: [[3]],
        expected: [-1]
    }
    ,
    {
        name: 'Test 4',
        arg: [[2, 1, 2, 1, 2]],
        expected: [-1, 0, -1, 2, -1]
    }
];

tests.forEach((o, i) => {
    let result = nearestGreater(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
