function isCryptSolution(crypt, solution) {
    let map = new Map(solution);
    let sums = [];
    for (let word of crypt) {
        let sum = '';
        for (let i = 0; i < word.length; i++) {
            let val = map.get(word[i]);
            if (i === 0 && val === '0' && word.length > 1) {
                return false; // INVALID with leading zero
            }
            sum += val;
        }
        console.log(word + ' ' + sum)
        sums.push(parseInt(sum));
    }
    console.log(sums);

    let result = parseInt(sums.pop());
    sums = sums.reduce((acc, v) => {
        return acc += v;
    })
    console.log(result, sums)
    return sums === result;
}

const tests = [
    {
        name: 'Test 1',
        arg: [["SEND", "MORE", "MONEY"],
            [['O', '0'],
                ['M', '1'],
                ['Y', '2'],
                ['E', '5'],
                ['N', '6'],
                ['D', '7'],
                ['R', '8'],
                ['S', '9']]],
        expected: true
    }, {
        name: 'Test 2',
        arg: [["TEN", "TWO", "ONE"],
            [["O", "1"],
                ["T", "0"],
                ["W", "9"],
                ["E", "5"],
                ["N", "4"]]],
        expected: false
    }
];

tests.forEach((o, i) => {
    let result = isCryptSolution(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
