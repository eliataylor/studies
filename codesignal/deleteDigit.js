function deleteDigit(n) {
    if (n.toString().length === 1) return n;
    n = n.toString().split('');
    let min = parseInt(n[0]);
    for(let i=1; i < n.length; i++) {
        if (parseInt(n[i]) > min) {
            n.splice(i-1, 1);
            return parseInt(n.join(''));
        }
    }


    n.forEach((v, i) => {
        if (parseInt(v) === 0 && n.length > 2 && i === n.length-1) {
        } else {
            min = Math.min(min, parseInt(v));
        }
    });
    let i = n.indexOf(min.toString());
    n.splice(i, 1);

    n =  n.join('');
    return parseInt(n);
}


const tests = [
    {
        name:'Test 6',
        arg: [222250],
        expected: 22250
    },
    {
        name:'Test 1',
        arg: [152],
        expected: 52
    },
    {
        name:'Test 2',
        arg: [1001],
        expected: 101
    }
];

tests.forEach((o, i) => {
    let result = deleteDigit(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
