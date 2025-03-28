// https://app.codesignal.com/interview-practice/task/JAhrxhDQDLDDA3NXe/description

combinationSum = (a, s) => {
    a = [...new Set(a)]
    let res = [];

    calcSums = (t, j, c) => {
        if (t === 0) {
            return res.push('(' + c.sort().join(' ') + ')')
        }
        let e = null;
        for (let i = j; e = a[i]; i++) {
            if (t >= e) {
                calcSums(t - e, i, [...c, e])
            }
        }
    }

    calcSums(s, 0, [])
    return res.sort().join('') || 'Empty'
}


const tests = [
    {
        name: 'Test 1',
        arg: [[2, 3, 5, 9], 9],
        expected: "(2 2 2 3)(2 2 5)(3 3 3)(9)"
    },
    {
        name: 'Test 2',
        arg: [[2, 4, 6, 8], 8],
        expected: "(2 2 2 2)(2 2 4)(2 6)(4 4)(8)"
    }
];

tests.forEach((o, i) => {
    let result = combinationSum(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
