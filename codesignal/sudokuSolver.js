// brute force: https://gist.github.com/getaaron/b77f4935737a685c7ec2

const directions = [
    [ 1,-1], [ 1, 0], [ 1, 1],
    [ 0,-1], [ 0, 0], [ 0, 1],
    [-1,-1], [-1, 0], [-1, 1]
];


function flattenCube(r,c,solution) {
    let set1 = new Set();
    directions.forEach(([R, C]) => {
        if (solution[R+r] && solution[R+r][C+c]) {
            set1.add(solution[R+r][C+c]);
        }
    });
    return set1;
}

function isValidSet(r, c, solution) {
    let set1 = new Set();
    if (!c) {
        set1 = new Set(solution[r]);
    } else {
        solution.forEach( r => set1.add(r[c]) );
    }
    if (set1.has('.')) return 0;
    return set1.size === 9;
}

function isValidCube(r, c, solution) {
    if (r < 1 || r > solution.length - 2) return 0;
    if (c < 1 || c > solution.length - 2) return 0;
    let set1 = flattenCube(r,c,solution);
    if (set1.has('.')) return 0;
    return set1.size === 9;
}

function solveSudoku(board) {
    const solution = board.map(r => r.map(c => parseInt(c) > 0 ? parseInt(c) : '.'));
    let safety = new Array() //  memoization can only fill available spaces
    let backtrack = [];

    board.forEach((r,rI) => {
        r.forEach((c,cI) => {
           let set1 = new Set();
           if (parseInt(c) > 0) {
               set1.add(parseInt(c));
               // set to all others in row / column / cube
           }
           if (!safety[r]) safety[r] = new Array();
           safety[r][c].push(set1);
        });
    })

    placeAttempt(r,c,solution) {

    }

    pickAttempt(r,c,solution) {

    }

    let attempt = 1;
    for (let r=0; r < safety.length; r++) {
        for (let c=0; c < r.length; c++) {

            if (parseInt(board[r][c]) > 0) {
                continue; // pre-defined value, skip
            }

            while (safety[r][c].has(attempt) === true && attempt <= 9) {
                attempt++;
            }
            if (attempt > 9) {
                console.log('THIS BOARD IS NOT SOLVABLE?', solution);
                return false;
            }

            // TODO set attempt on all competitive cells (but how do we backtrack this)
            safety[r][c].add(attempt);
            safety[r].forEach(r2 => r2.add(attempt));
            safety.forEach((r2, rI) => safety[rI][c].add(attempt));
            directions.forEach(([R, C]) => {
                safety[R+r][C+c].add(attempt);
            });
            solution[r][c] = attempt;

            backtrack.push(p);
            attempt = (attempt === 9) ? 1 : attempt++;

            let isValid = isValidSet(r, false, solution); // row
            if (isValid === false) {
                while (backtrack.length > 0) {
                    let unset = backtrack.pop();
                    safety[unset].pop();
                    p--;
                }
                attempt = 1;
                continue;
            } else if (isValid === 0) {
                continue;
            }

            isValid = isValidCube(r, c, solution); // cube!
            if (isValid === false) {
                while (backtrack.length > 0) {
                    let unset = backtrack.pop();
                    safety[unset].pop();
                    p--;
                }
                attempt = 1;
                continue;
            } else if (isValid === 0) {
                continue;
            }

            isValid = isValidSet(false, c, solution); // column
            if (isValid === false) {
                while (backtrack.length > 0) {
                    let unset = backtrack.pop();
                    safety[unset].pop();
                    p--;
                }
                attempt = 1;
                continue;
            }
        }
    }
    console.log(solution)
    return solution;
}

const tests = [
    {
        name: 'Test 1',
        arg: [[
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"]]],
        expected: [["5", "3", "4", "6", "7", "8", "9", "1", "2"], ["6", "7", "2", "1", "9", "5", "3", "4", "8"], ["1", "9", "8", "3", "4", "2", "5", "6", "7"], ["8", "5", "9", "7", "6", "1", "4", "2", "3"], ["4", "2", "6", "8", "5", "3", "7", "9", "1"], ["7", "1", "3", "9", "2", "4", "8", "5", "6"], ["9", "6", "1", "5", "3", "7", "2", "8", "4"], ["2", "8", "7", "4", "1", "9", "6", "3", "5"], ["3", "4", "5", "2", "8", "6", "1", "7", "9"]]
    }
];

tests.forEach((o, i) => {
    let result = solveSudoku(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
