function digitAnagrams(a) {
    let count = 0;
    while (a.length > 0) {
        let left = a.pop().toString();
        let b = [...a];
        if (b.length === 0) {
            return count;
        }
        let right = b.pop().toString();
        while (left.length === right.length) {
            if (left.split('').sort().join('') === right.split('').sort().join('')) {
                count++;
            }
            if (b.length === 0) {
                return count;
            }
            right = b.pop().toString();
        }
    }
    return count;
}

const tests = [
    {
        name: 'Test 1',
        arg: [[25, 35, 872, 228, 53, 278, 872]],
        expected: 4
    }
];

tests.forEach((o, i) => {
    let result = digitAnagrams(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
