function minesweeper(matrix) {
        let minemap = [];
        matrix.forEach((row, y) => {
            row.forEach((cell, x) => {

                let minY = y > 0 ? -1 : 0;
                let maxY = (y === matrix.length-1) ? 0 : 1;

                let minX = x > 0 ? -1 : 0;
                let maxX = (x === matrix[0].length-1) ? 0 : 1;

                if (!minemap[y]) minemap[y] = [];
                minemap[y][x] = 0;
                console.log("NEW ORIGIN " + y + ', ' + x);

                for(let yO=minY; yO <= maxY; yO++) {
                    for(let xO=minX; xO <= maxX; xO++) {
                         if (xO === 0 && yO === 0) continue;
                         console.log((y+yO) +','+ (x+xO) + ' > ' + matrix[(y+yO)][(x+xO)]);
                         if (matrix[(y+yO)][(x+xO)] === true) {
                            minemap[y][x]++;
                        }
                    }
                }
            })
        })
        return minemap;
    }

    function getNeighborVal(origin, offset, matrix) {

        let x = origin[0];
        let y = origin[1];

        if (dir === 'north-west') {
            return (matrix[x-1] && matrix[x-1][y-1]) ? matrix[x-1][y-1] : undefined;
        } else if (dir === 'north') {
            return (matrix[x] && matrix[x][y-1]) ? matrix[x][y-1] : undefined;
        } else if (dir === 'north-east') {
            return (matrix[x+1] && matrix[x+1][y-1]) ? matrix[x+1][y-1] : undefined;
        } else if (dir === 'east') {
            return (matrix[x-1] && matrix[x-1][y]) ? matrix[x-1][y] : undefined;
        } else if (dir === 'west') {
            return (matrix[x+1] && matrix[x+1][y]) ? matrix[x+1][y] : undefined;
        } else if (dir === 'south-west') {
            return (matrix[x-1] && matrix[x-1][y+1]) ? matrix[x-1][y+1] : undefined;
        } else if (dir === 'south') {
            return (matrix[x-1] && matrix[x-1][y+1]) ? matrix[x-1][y+1] : undefined;
        } else if (dir === 'south-east') {
            return (matrix[x-1] && matrix[x-1][y+1]) ? matrix[x-1][y+1] : undefined;
        } else { // origin
            return (matrix[x] && matrix[x][y]) ? matrix[x][y] : undefined;
        }
    }


    /* OTHER SOLUTIONS */
/**
 * The simplest way to accomplish this task is to manually check each direction for every element in the matrix.
 * We can create a `directions` array to shorten the code for doing so, having it represent the x and y deltas.
 *
 * Aside from that, it's rather self-explanatory.
 */

const directions = [
    [ 1,-1], [ 1, 0], [ 1, 1],
    [ 0,-1],          [ 0, 1],
    [-1,-1], [-1, 0], [-1, 1]
];

minesweeper = matrix => matrix.map((row, y) => row.map((col, x) => directions.reduce((count, i) => count += !!(matrix[y + i[0]] && matrix[y + i[0]][x + i[1]]), 0)));

var dirs = [ { r: -1, c: -1 },
    { r: -1, c:  0 },
    { r: -1, c:  1 },
    { r:  0, c:  1 },
    { r:  0, c: -1 },
    { r:  1, c: -1 },
    { r:  1, c:  0 },
    { r:  1, c:  1 }];

function minesweeper(matrix) {
    return matrix.map((a,r) => a.map((_,c) => dirs.reduce((p,v) => p+=(matrix[r+v.r]||[])[c+v.c]|0, 0)))
}
