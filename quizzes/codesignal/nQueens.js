function nQueens(n) {
    let res = [];
    let x = [0];
    let backtrack = true;

    while (x.length) {
        // - If it's backtrack - we take the last queen's
        //   position and try to increment it.
        // - Otherwise, we start looking for the first
        //   suitable position for the next queen.
        let y = backtrack ? x.pop() : 0;

        // Let's assume that it's time to go back.
        // We'll try to disapprove this further.
        backtrack = true;

        while (++y <= n) {
            // If we can't find a valid place
            // for the next queen - we move back.
            let valid = checkPartial(x, y);
            if (valid === true) {
                x.push(y);
                if (x.length === n) {
                    // We need to copy the `x`
                    // to save its "snapshot".
                    // And now it's time to backtrack.
                    res.push([...x]);
                } else {
                    // We've added a new queen's position
                    // but there are more queens to place
                    // so we move forward.
                    backtrack = false;
                }
                break; // add next queen
            } else {
                console.log('invalid: ', valid)
            }
        }
    }
    console.log(res);
    return res;
}

function checkPartial(xs, y) {
    let right = xs.length;
    for (let i = 0; i < right; i++) {
        if (xs[i] === y) {
            return ['conflict1 ', xs[i], ' with ', y, ' by ', xs];
        } else if (right - i === Math.abs(y - xs[i])) {
            return ['conflict2 ', xs[i], ' with ', Math.abs(y - xs[i]), ' by ', xs];
        }
    }
    return true;
}

const tests = [
    {
        name: 'Test 2',
        arg: [4],
        expected: [[2, 4, 1, 3], [3, 1, 4, 2]]
    },
    {
        name: 'Test 1',
        arg: [6],
        expected: [[2, 4, 6, 1, 3, 5],
            [3, 6, 2, 5, 1, 4],
            [4, 1, 5, 2, 6, 3],
            [5, 3, 1, 6, 4, 2]]
    }
];

tests.forEach((o, i) => {
    let result = nQueens(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
