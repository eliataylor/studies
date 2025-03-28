const SIDES = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function calculateBasins2(grid) {
    const basins = grid.map(row => row.map(x => -1));
    const sizes = {};

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const sink = searchForSink(i, j);
            if (!sizes[sink]) sizes[sink] = 0;
            sizes[sink]++;
        }
    }

    function searchForSink(x, y) {
        if (basins[x][y] !== -1) return basins[x][y];

        let sink = true;
        let [minX, minY] = [-1, -1];

        for (const [dx, dy] of SIDES) {
            if (x + dx in grid && y + dy in grid[0]
                && grid[x + dx][y + dy] < grid[x][y]) {
                sink = false;

                if (minX === -1 || grid[x + dx][y + dy] < grid[minX][minY]) {
                    [minX, minY] = [x + dx, y + dy]
                }
            }
        }

        const result = sink ? 200 * x + y : searchForSink(minX, minY);

        basins[x][y] = result;
        return result;
    }

    return Object.values(sizes).sort((a, b) => b - a);
}

/* Algorithm:
 * Loop through cells ordered by value:
 *  Grab lowest neighbor's basin and make our own.
 *  If no neighbors are lower, cell is a basin.
 *  Enter and/or increment this basin in basin_count.
 */
function calculateBasins(grid) {
    let queue = [];
    let results = {};

    let nGrid = grid.map((row, r) => row.map((v, c) => {
        let t = {val: v, loc: [r, c]};
        queue.push(t);
        return t;
    }));

    function lowestNeighboringCell(cell) {
        let [R, C] = cell.loc;
        let lowest = SIDES.reduce((p, [r, c]) => {
            if (!nGrid[R + r]) return p;
            let t = nGrid[R + r][C + c];
            return t && t.val < p.val ? t : p; // cell is lower than
        }, cell);

        if (lowest.loc[0] === R && lowest.loc[1] === C) {
            console.log("FOUND SINK", cell);
            // make all neighbors a basin of it.
        }
        return lowest;
    }

    // Assuming JS sort is O(NlogN). If not, use insert sort above.
    queue.sort((a, b) => a.val - b.val).forEach(cell => {
        let lowest = lowestNeighboringCell(cell);
        cell.basin = lowest.basin || lowest.loc;
        results[cell.basin] = -~results[cell.basin];
    });

    return Object.values(results).sort((a, b) => b - a);
}


const tests = [
    {
        name: 'Test 1',
        arg: [[[1, 5, 2],
            [2, 4, 7],
            [3, 6, 9]]],
        expected: [7, 2]
    }
];

tests.forEach((o, i) => {
    let result = calculateBasins(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
