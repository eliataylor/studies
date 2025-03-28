function firstDuplicate(a) {
    let checks = {};
    let set1 = Array.from(new Set(a));
    let min = set1.reduce((acc, v) => {
        if (checks[v] === false && a.indexOf(v) !== a.lastIndexOf(v)) {
            checks[v] = true;
            if (acc === -1) {
                acc = a.lastIndexOf(v);
            } else {
                acc = Math.min(acc, a.lastIndexOf(v));
            }
        }
        return acc;
    }, -1)

    if (min > -1) {
        return a[min];
    }
    return min;
}

const tests = [
    {
        name: 'Test 3',
        arg: [[1, 1, 2, 2, 1]],
        expected: 1
    },
    {
        name: 'Test 1',
        arg: [[2, 1, 3, 5, 3, 2]],
        expected: 3
    }
];

tests.forEach((o, i) => {
    let result = firstDuplicate(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
