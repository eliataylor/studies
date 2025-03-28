function spiralNumbers(n) {
    let size = n * n;
    let matrix = [];
    let y = 0, x = 0, val = 1;
    let yDir = 0, xDir = 1, innerSize = n - 1;

    let origin = n - 1 - innerSize;

    while(val <= size) {

        if (typeof matrix[y] === 'undefined') matrix[y] = [];
        matrix[y][x] = val;
        val++;

        let test = 1;

        if (val === 43) {
            test =1
        }

        // if X is at the beginning of innerSize && Y is at the beginning innerSize
        //  >> yDir = 0, xDir = 1, innerSize--
        // if X is at the end of innerSize && Y is at the beginning of innerSize
        //  >> yDir = 1, xDir = 0
        // if X is at the end of innerSize && Y is at the end of innerSize
        //  >> yDir = 0, xDir = -1, innerSize--
        // if X is at the beginning of innerSize && Y is at the end of innerSize
        //  >> yDir = -1, xDir = 0;

        if (x === origin && y === origin + 1) {
            console.log('using x===origin && y === origin+1: ' + val)
            xDir = 1;
            yDir = 0;
            origin++;
            innerSize = n - 1 - origin * 2;
        } else if (x === origin && y === origin) {
            console.log('using x/y == origin: ' + val, origin, innerSize)
            yDir = 0;
            xDir = 1;
        } else if (x === origin + innerSize && y === origin) {
            yDir = 1;
            xDir = 0;
        } else if (x === origin + innerSize && y === origin + innerSize) {
            yDir = 0;
            xDir = -1;
        } else if (x === origin && y === origin + innerSize) {
            yDir = -1;
            xDir = 0;
        } else {
            test;
        }

        y += yDir;
        x += xDir;
    }
    console.log(matrix);
    return matrix;
}

const tests = [
    /* {
        name: 'Test 1',
        arg: [3],
        expected: [
            [[1,2,3],
            [8,9,4],
            [7,6,5]]
        ]
    },
    {
        name:'Test 2',
        arg : [6],
        expected: [[1,2,3,4,5,6],
            [20,21,22,23,24,7],
            [19,32,33,34,25,8],
            [18,31,36,35,26,9],
            [17,30,29,28,27,10],
            [16,15,14,13,12,11]]

    } */
    {   name: 'Test 4',
        arg:[7],
        expected:[[1,2,3,4,5,6,7],
            [24,25,26,27,28,29,8],
            [23,40,41,42,43,30,9],
            [22,39,48,49,44,31,10],
            [21,38,47,46,45,32,11],
            [20,37,36,35,34,33,12],
            [19,18,17,16,15,14,13]]
    }
];

tests.forEach((o, i) => {
    let result = spiralNumbers(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})


// OTHERS

function spiralNumbers(n) {
    let result = [];

    for (let i = 0; i < n; i++) {
        result.push([])
    }

    let num = 0;
    for (let c = 1; c <= n / 2; c++) {
        let x, y;
        x = c - 1;
        y = c - 1;
        let i, j;
        i = x;
        for (j = y; j < n - c; j++) {
            num++;
            result[i][j] = num;
        }

        y = n - c;
        j = y;
        for (i = x; i < n - c; i++) {
            num++;
            result[i][j] = num;
        }
        x = n - c;

        i = x;
        for (j = y; j > c - 1; j--) {
            num++;
            result[i][j] = num;
        }

        y = c - 1;
        j = y;
        for (i = x; i > c - 1; i--) {
            num++;
            result[i][j] = num;
        }
    }
    if (n % 2 != 0) {
        let half = parseInt(n / 2 + 1);
        num++;
        result[half - 1][half - 1] = num;
    }
    return result;
}

/// OTHERS
function spiralNumbers(n) {
    const mx = Array.from(Array(n), () => new Array(n))

    function getNewDirection(r, c, dy, dx, n) {
        if (c === 0 && r === 0) {
            return [dy, dx];
        } else if ((c === r) && (r >= n/2)) {
            return [0, -1];
        } else if ((r - c === 1) && (r <= n/2)) {
            return [0, +1];
        } else if ((r + c === n - 1) && c > r) {
            return [+1, 0];
        } else if ((r + c === n - 1) && c < r) {
            return [-1, 0]
        } else {
            return [dy, dx];
        }
    };

    const values = Array.from({length: n*n}, (v, i) => i+1);

    let r = 0;
    let c = 0;
    let dx = 1;
    let dy = 0;

    while (!!values.length) {
        mx[r][c] = values.shift();
        [dy, dx] = getNewDirection(r, c, dy, dx, n);
        r += dy;
        c += dx;
    }


    return mx;
}


// OTHERS
function spiralNumbers(n) {
    let result = new Array(n).fill().map(() => new Array(n).fill(""));

    let count = 1;
    let sCol = 0,
        eCol = n - 1,
        sRow = 0,
        eRow = n - 1;

    while (sCol <= eCol && sRow <= eRow) {
        for(let i = sCol; i<=eCol; i++){
            result[sRow][i] = count++;
        }
        sRow++;
        for(let i = sRow; i<=eRow; i++){
            result[i][eCol] = count++;
        }
        eCol--;
        for(let i = eCol; i >= sCol; i--){
            result[eRow][i] = count++;
        }
        eRow--;
        for(let i=eRow; i>=sRow; i--){
            result[i][sCol] = count++;
        }
        sCol++;
    }
    return result;
}

// OTHERS
function spiralNumbers(n) {
    var matrix = [...Array(n)].map(_ => []),
        x = 0,
        y = 0,
        dir = 2,
        size = n,
        c = 0;
    for (var i = 1; i <= n * n; i++) {
        matrix[y][x] = i;
        if (++c == size) {
            dir = (dir + 1) % 4;
            size -= dir % 2;
            c = 0;
        }
        if (dir % 2 == 0) x += dir > 1 ? 1 : -1;
        else y += dir > 1 ? 1 : -1;
    }
    return matrix;
}

