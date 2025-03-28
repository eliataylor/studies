function squaresUnderQueenAttack(n, queens, queries) {
    // A: build map of not attackable spaces
    // B. loop queries and calculate intersection

    function diagonalIntersection(a, b) {
        let test1 = Math.abs(a[0] - b[0]);
        let test2 = Math.abs(a[1] - b[1]);
        return test1 === test2;
    }

    function canAttack(a, b) {
        if (a[0] === b[0]) {
            return true;
        }
        if (a[1] === b[1]) {
            return true;
        }
        return diagonalIntersection(a, b);
    }

    outter : for (let q = 0; q < queries.length; q++) {
        for (let queen of queens) {
            if (canAttack(queries[q], queen) === true) {
                queries[q] = true;
                continue outter;
            }
        }
        queries[q] = false;
    }
    console.log(queries);
    return queries;

}


const tests = [
    {
        name: 'Test 4',
        arg: [5,
            [
                [1, 1],
                [3, 2]
            ],
            [
                [1, 1],
                [0, 3],
                [0, 4],
                [3, 4],
                [2, 0],
                [4, 3],
                [4, 0]
            ]
        ],
        expected: [true, false, false, true, true, true, false]
    }
    /* ,{
        name:'Test 1',
        arg: [1, [], [[0,0]]],
        expected: [false]
    },{
        name:'Test 2',
        arg: [],
        expected: 6
    },
    {
        name:'Test 3',
        arg: [],
        expected: 8
    } */
];

tests.forEach((o, i) => {
    let result = squaresUnderQueenAttack(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})

