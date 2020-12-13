
function nextLarger(a) {
    if (a.length < 1) return a;

    let b = [];
    for(let i=0; i < a.length; i++) {
        let val = a[i];
        let i2 = i+1;
        while(val > a[i2] && i2 < a.length) {
            i2++;
        }
        if (i2 === a.length) {
            b.push(-1);
        } else {
            b.push(a[i2]);
        }

    }
    console.log(b);
    return b;
}


function nextLargerStacked(a) {
    let result = new Array(a.length);

    let stack = new Array();
    for (let i = a.length-1; i >= 0; i--) {
        while (stack.length > 0 && a[i] >= stack[stack.length - 1]) {
            stack.pop();
        }
        result[i] = stack.length === 0 ? -1 :  stack[stack.length - 1];
        stack.push(a[i]); //  might require sorting
    }
    return result;
}

const tests = [
    {
        name: 'Test 1',
        arg: [[6, 7, 3, 8]],
        expected: [7, 8, 8, -1]
    },
    {
        name: 'Test 1',
        arg: [[10, 3, 12, 4, 2, 9, 13, 0, 8, 11, 1, 7, 5, 6]],
        expected: [12, 12, 13, 9, 9, 13, -1, 8, 11, -1, 7, -1, 6, -1]
    }
];

tests.forEach((o, i) => {
    let result = nextLarger(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
