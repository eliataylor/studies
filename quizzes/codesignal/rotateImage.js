function rotateImage(a) {
    a.map((row, rowIndex) => {
        let inner = a.map((val, rowIndex2) => { // create new row from Column of rowIndex in a
            return val[rowIndex];
        }).reverse(); // reverse it
        return inner; // return it as new row
    })
}

const tests = [
    {
        name: 'Test 1',
        arg: [[[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]]],
        expected: [[7, 4, 1],
            [8, 5, 2],
            [9, 6, 3]]
    },
    {
        name: 'Test 3',
        arg: [[[10, 9, 6, 3, 7],
            [6, 10, 2, 9, 7],
            [7, 6, 3, 8, 2],
            [8, 9, 7, 9, 9],
            [6, 8, 6, 8, 2]]],
        expected:
            [[6, 8, 7, 6, 10],
                [8, 9, 6, 10, 9],
                [6, 7, 3, 2, 6],
                [8, 9, 8, 9, 3],
                [2, 9, 2, 7, 7]]
    }
];

tests.forEach((o, i) => {
    let result = rotateImage(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
