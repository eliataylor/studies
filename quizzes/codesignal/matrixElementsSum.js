https://app.codesignal.com/arcade/intro/level-2/xskq4ZxLyqQMCLshr
    function matrixElementsSum(matrix) {
        let sum = 0;
        let exclude = {};
        matrix.forEach((row, ri) => {
            row.forEach((room, ci) => {
                if (exclude[ci] === true) return true;
                if (room === 0) {
                    exclude[ci] = true;
                }
                sum += room;
            })
        })
        return sum;
    }


const tests = [
    {
        arg: [[0, 1, 1, 2],
            [0, 5, 0, 0],
            [2, 0, 3, 3]],
        expected: 9
    },
    {
        arg: [[1, 1, 1, 0],
            [0, 5, 0, 1],
            [2, 1, 3, 10]],
        expected: 9
    },

];

tests.forEach((o, i) => {
    var result = matrixElementsSum(o.arg);
    console.log('TEST ' + i + ((result === o.expected) ? ' PASSED' : ' FAILED'));
})
