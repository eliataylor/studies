// where grid has hella periods

function sudoku4(grid) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var c = grid[i][j];
            if (c !== '.') {
                // check row
                for (var z = 0; z < 9; z++) {
                    if (j !== z && grid[i][z] === c)
                        return false;
                }
                // check column
                for (var z = 0; z < 9; z++) {
                    if (i !== z && grid[z][j] === c)
                        return false;
                }
                // check square
                var a = i - i%3,
                    b = j - j%3;
                for (var x = a; x < a+3; x++) {
                    for (var y = b; y < b+3; y++) {
                        if (x !== i && y !== j && grid[x][y] === c)
                            return false;
                    }
                }
            }
        }
    }
    return true;
}

function sudoku3(grid) {
    function isValidValue(obj, value) {

        if (value === '.') return true;
        if (obj[value]) return false;
        obj[value] = value;
        return true;
    }


    for(let row = 0; row < 9; row ++) {
        let rowValues = {};
        for(let col = 0; col < 9; col ++) {
            if (!isValidValue(rowValues, grid[row][col])) return false;


            if (row === 0) {
                let colValues = {};
                for (let i =0 ; i < 9; i++) {
                    console.log(i, col, grid[i][col])
                    if (!isValidValue(colValues, grid[i][col])) return false;
                }
            }

            if (row % 3 === 0 && col % 3 === 0) {
                let subGrid = {};
                for (let subX = 0; subX < 3; subX++) {
                    for (let subY = 0; subY < 3; subY++) {
                        if (!isValidValue(subGrid, grid[row+subX][col + subY])) return false;

                    }
                }
            }

        }
    }
    return true;
}
