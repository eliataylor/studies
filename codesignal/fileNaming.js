function fileNaming(names) {
    let dups = {};
    let result = names.map((v, i) => {
        if (typeof dups[v] === 'undefined') {
            dups[v] = 0;
            return v;
        } else {
            let k = 1;
            let target = v + '(' + k + ')';
            while (typeof dups[target] === 'number') {
                // while (tar.indexOf(target) > -1) {
                k++;
                target = v + '(' + k + ')';
            }
            dups[target] = 1;
            return target;
        }
    })
    return result;
}

const tests = [
    {
        name: 'Test 2',
        arg: [["a(1)",
            "a(6)",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a"]],
        expected: ["a(1)",
            "a(6)",
            "a",
            "a(2)",
            "a(3)",
            "a(4)",
            "a(5)",
            "a(7)",
            "a(8)",
            "a(9)",
            "a(10)",
            "a(11)"]
    },
    {
        name: 'Test 1',
        arg: [["doc",
            "doc",
            "image",
            "doc(1)",
            "doc"]],
        expected: ["doc",
            "doc(1)",
            "image",
            "doc(1)(1)",
            "doc(2)"]
    },
    {
        name: 'Test 2',
        arg: [["a(1)",
            "a(6)",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a",
            "a"]],
        expected: ["a(1)",
            "a(6)",
            "a",
            "a(2)",
            "a(3)",
            "a(4)",
            "a(5)",
            "a(7)",
            "a(8)",
            "a(9)",
            "a(10)",
            "a(11)"]
    },
    {
        name: 'Test 3',
        arg: [["dd",
            "dd(1)",
            "dd(2)",
            "dd",
            "dd(1)",
            "dd(1)(2)",
            "dd(1)(1)",
            "dd",
            "dd(1)"]],
        expected: ["dd",
            "dd(1)",
            "dd(2)",
            "dd(3)",
            "dd(1)(1)",
            "dd(1)(2)",
            "dd(1)(1)(1)",
            "dd(4)",
            "dd(1)(3)"]
    }
];

tests.forEach((o, i) => {
    let result = fileNaming(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
