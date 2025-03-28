const product = 1 * 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9; // 362880;

function sudoku2(grid) {

    // for each row in the matrix
    // check row has 1 - 9

    // for each column in the matrix
    // check col has 1 - 9
    let total = 0;

    for (let i = 0; i < grid.length; i++) {

        let set1 = new Set(grid[i]);
        if (set1.size !== 9) return false;

        grid.forEach(v => set1.delete(v[i]));
        if (set1.size > 0) {
            return false;
        }

        if (i % 3 === 0) {
            // check all 3 - 3x3 squares using this row as the origin
            for (let p = 0; p < 3; p++) {
                let origin = p * 3;
                set1 = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                [0, 1, 2].forEach((v, index) => {
                    set1.delete(grid[i + index][origin])
                    set1.delete(grid[i + index][origin + 1])
                    set1.delete(grid[i + index][origin + 2])
                });
                if (set1.size > 0) {
                    return false;
                }
            }
        }
    }

    return true;
}


function sudoku(grid) {

    // for each row in the matrix
    // check row has 1 - 9

    // for each column in the matrix
    // check col has 1 - 9
    let total = 0, square = 1;

    for (let i = 0; i < grid.length; i++) {
        total = grid[i].reduce((accumulator, currentValue) => {
            return accumulator * currentValue
        }, 1);
        if (total !== product) {
            return false;
        }

        total = grid.reduce((accumulator, currentValue, index) => {
            return accumulator * grid[index][i]
        }, 1);
        if (total !== product) {
            return false;
        }

        if (i % 3 === 0) {
            // check all 3 - 3x3 squares using this row as the origin
            for (let p = 0; p < 3; p++) {
                let origin = p * 3;
                total = [0, 1, 2].reduce((accumulator, currentValue, index) => {
                    return accumulator * grid[i + currentValue][origin] * grid[i + currentValue][origin + 1] * grid[i + currentValue][origin + 2]
                }, 1);
                if (total !== product) {
                    return false;
                }
            }
        }
    }

    return true;
}

const sudokuCodeDog = (grid) => {
    let test = fn => fn(grid);
    return (test &&
        fn(grid.map((val, idx) => val.map((_, i) => grid[i][idx]))) &&
        fn(grid.map((val, idx) => val.map((_, i) => grid[(idx / 3 ^ 0) * 3 + i / 3 ^ 0][idx % 3 * 3 + i % 3]))))
    (arr => arr.every(val => new Set(val).size === 9 && val.every(v => [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(v))));
}


const tests = [
    {
        name: 'Test 6',
        arg: [[[1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 6, 5, 8, 7, 9, 3, 2, 1],
            [7, 9, 8, 2, 1, 3, 6, 5, 4],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 6, 5, 8, 7, 9, 3, 2, 1],
            [7, 9, 8, 2, 1, 3, 6, 5, 4],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 6, 5, 8, 7, 9, 3, 2, 1],
            [7, 9, 8, 2, 1, 3, 6, 5, 4]]],
        expected: false
    },
    {
        name: 'Test 1',
        arg: [[[1, 3, 2, 5, 4, 6, 9, 8, 7],
            [4, 6, 5, 8, 7, 9, 3, 2, 1],
            [7, 9, 8, 2, 1, 3, 6, 5, 4],
            [9, 2, 1, 4, 3, 5, 8, 7, 6],
            [3, 5, 4, 7, 6, 8, 2, 1, 9],
            [6, 8, 7, 1, 9, 2, 5, 4, 3],
            [5, 7, 6, 9, 8, 1, 4, 3, 2],
            [2, 4, 3, 6, 5, 7, 1, 9, 8],
            [8, 1, 9, 3, 2, 4, 7, 6, 5]]],
        expected: true
    },
    {
        name: 'Test 2',
        arg: [[[1, 3, 2, 5, 4, 6, 9, 2, 7],
            [4, 6, 5, 8, 7, 9, 3, 8, 1],
            [7, 9, 8, 2, 1, 3, 6, 5, 4],
            [9, 2, 1, 4, 3, 5, 8, 7, 6],
            [3, 5, 4, 7, 6, 8, 2, 1, 9],
            [6, 8, 7, 1, 9, 2, 5, 4, 3],
            [5, 7, 6, 9, 8, 1, 4, 3, 2],
            [2, 4, 3, 6, 5, 7, 1, 9, 8],
            [8, 1, 9, 3, 2, 4, 7, 6, 5]]],
        expected: false
    }
];

tests.forEach((o, i) => {
    let result = sudoku2(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
