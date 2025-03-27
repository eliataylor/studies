function sumUpNumbers(text) {
    text = text.replace(/[^\d]/g, ' ').split(' ');
    let sum = 0;
    text.forEach(v => {
        if (isNaN(v) === false && v !== '') {
            sum += parseInt(v);
        }
    })
    return sum;
}


const tests = [
    {
        name:'Test 1',
        arg: ["2 apples, 12 oranges"],
        expected: 14
    },
    {
        name:'Test 3',
        arg: ["123450"],
        expected: 123450
    }
];

tests.forEach((o, i) => {
    let result = sumUpNumbers(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
