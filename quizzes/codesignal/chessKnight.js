const board = {
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 4,
    "E": 5,
    "F": 6,
    "G": 7,
    "H": 8
};

function inside_board(x, y) {
    return (1 <= x && x <= 8) && (1 <= y && y <= 8);
}

function chessKnight(cell) {
    cell = cell.toUpperCase();

    let moves = 0;
    let movements = [
        -2, 1,
        -2, -1,
        -1, 2,
        -1, -2,
        1, 2,
        1, -2,
        2, 1,
        2, -1
    ];
    for (let i = 0; i < 16; i += 2) {
        moves += inside_board(board[cell[0]] + movements[i], parseInt(cell[1]) + movements[i + 1]) ? 1 : 0;
    }
    return moves;
}

function chessKnightOld(cell) {
    cell = cell.toUpperCase();

    let count = 8;
    if (parseInt(cell[1]) + 2 > 8) {
        count = count - 2;
    }
    if (parseInt(cell[1]) - 2 < 1) {
        count = count - 2;
    }
    if (board[cell[0]] + 2 > 8) {
        count = count - 2;
    }
    if (board[cell[0]] - 2 < 1) {
        count = count - 2;
    }
    if (parseInt(cell[1]) + 2 > 8 && board[cell[0]] + 2 > 8) {
        count = count - 2;
    }
    if (parseInt(cell[1]) - 2 < 1 && board[cell[0]] - 2 < 1) {
        count = count - 2;
    }
    return count;
}


// OTHERS
function chessKnightC(cell) {
    const chessBoard = [
        [2, 3, 4, 4, 4, 4, 3, 2],
        [3, 4, 6, 6, 6, 6, 4, 3],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [4, 6, 8, 8, 8, 8, 6, 4],
        [3, 4, 6, 6, 6, 6, 4, 3],
        [2, 3, 4, 4, 4, 4, 3, 2],
    ]

    const x = cell[0].charCodeAt() - 97;
    console.log(x)
    return chessBoard[cell[1] - 1][x]
}


const tests = [
    {
        name: 'Test 4',
        arg: ['A3'],
        expected: 3
    }, {
        name: 'Test 1',
        arg: ['A1'],
        expected: 2
    }, {
        name: 'Test 2',
        arg: ['c2'],
        expected: 6
    },
    {
        name: 'Test 3',
        arg: ['d4'],
        expected: 8
    }
];

tests.forEach((o, i) => {
    let result = chessKnight(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})

