function areSimilar(a, b) {
    if (a.length !== b.length) return false;
    opts = [];
    for (let i=0; i < a.length; i++) {
        if (b[i] != a[i]) {
            opts.push(i);
        }
        if (opts.length > 2) return false;
    };

    if (opts.length === 0) return true;
    if (opts.length !== 2) return false;

    let copy = [...a]
    copy.splice(opts[0], 1, a[opts[1]]);
    copy.splice(opts[1], 1, a[opts[0]]);
    if (JSON.stringify(a) === JSON.stringify(b)) return true;

    console.log(opts, copy, b);
    return false;
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
