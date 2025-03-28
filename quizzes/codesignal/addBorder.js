function addBorder(matrix) {
    // let area = rows * matrix.length;
    matrix.forEach((row, i) => {
        matrix[i] = '*' + row + '*';
    });
    console.log(matrix);
    let rows = matrix[0].length;
    matrix.splice(0, 0, '*'.repeat(rows)); // add to top;
    matrix.splice(matrix.length, 0, '*'.repeat(rows)); // add to bottom;

    console.log(matrix);
    return matrix;
}

const tests = [
    {
        arg: ["abc",
            "ded"],
        expected: ["*****",
            "*abc*",
            "*ded*",
            "*****"],
    },
    {
        arg: ["a"],
        expected: ["***",
            "*a*",
            "***"]
    },
    {
        arg: ["aa",
            "**",
            "zz"],
        expected: ["****",
            "*aa*",
            "****",
            "*zz*",
            "****"]
    },

];

tests.forEach((o, i) => {
    let result = addBorder(o.arg);
    if (JSON.stringify(result) === JSON.stringify(o.expected)) {
        console.log("TEST PASSED!");
    } else {
        console.log("GOT ", JSON.stringify(result), " EXPECTED ",  JSON.stringify(o.expected));
    }
})
