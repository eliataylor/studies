function differentSquares(matrix) {
    let set1 = new Set();
    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = 0; j < matrix[i].length - 1; j++) {
            set1.add(matrix[i][j] + " " + matrix[i][j + 1] + " "
                + matrix[i + 1][j] + " " + matrix[i + 1][j + 1]);
        }
    }
    return set1.size;
}

function differentSquaresOld(matrix) {
    // 2 squares for every 3 cols rows across
    // 4 squares for every 3/3 cols/rows

    let rows = matrix.length;
    let cols = matrix[0].length;

    if (rows < 2 || cols < 2) return 0

    rows = rows / 2 * (rows % 3)
    cols = cols / 2 + (cols % 3)

    let val = rows + cols;
    return val;
}


const tests = [
    {
        name: 'Test 1',
        arg: [[
            [1, 2, 1],
            [2, 2, 2],
            [2, 2, 2],
            [1, 2, 3],
            [2, 2, 1]
        ]],
        expected: 6
    },
    {
        name: 'Test 2',
        arg: [[
            [9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9]
        ]],
        expected: 1
    }
];

tests.forEach((o, i) => {
    let result = differentSquares(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
