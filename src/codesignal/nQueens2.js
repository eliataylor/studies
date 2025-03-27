function nQueens(n) {
    const solutions = [];

    let solution = [];
    let safetyMatrix = getSafetyMatrix(n, solution);

    let column = 0;
    let row = 0;

    while (column >= 0) {
        if (solution.length === n) { // found solution
            solutions.push(solution.slice()) // copy the solution

            // reset and start checking for next row in column 1
            column--;
            row = solution.pop(); // 1-indexed solution means this is already row + 1

            safetyMatrix = getSafetyMatrix(n, solution);
        } else {
            // check if we need to backtrack
            if (row === n || safetyMatrix[column].filter(Boolean).length === 0) {
                column--;
                row = solution.pop();  // 1-indexed solution means this is already row + 1

                safetyMatrix = getSafetyMatrix(n, solution);
            } else if (safetyMatrix[column][row]) { // the space is safe
                solution.push(row + 1) // solution is 1-indexed
                column++;
                row = 0;

                safetyMatrix = getSafetyMatrix(n, solution);
            } else { // the space isn't safe
                row++;
            }
        }
    }

    return solutions;
}

function getSafetyMatrix(n, solution) {
    const safetyMatrix = Array.from({ length: n }, _ => new Array(n).fill(true));

    // row 1-indexed, column 0-indexed
    solution.forEach((row, column) => {
        for (let i = column + 1; i < n; i++) {
            safetyMatrix[i][row - 1] = false; // horizontal
            const diag = i - column;
            if (row - 1 - diag >= 0) safetyMatrix[i][row - 1 - diag] = false;// diagonal up
            if (row - 1 + diag < n) safetyMatrix[i][row - 1 + diag] = false;// diagonal down
        }
    });
    console.log(safetyMatrix);
    return safetyMatrix;
}

// getSafetyMatrix(4, [1,2,3,4]);
// nQueens(10)
