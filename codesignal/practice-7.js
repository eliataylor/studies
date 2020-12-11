
function practice(a) {
    return a;
}

const tests = [
    {
        name: 'Test 1',
        arg: [],
        expected: 1
    }
];

tests.forEach((o, i) => {
    let result = practice(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
