function allLongestStrings(inputArray) {
    let long = [];
    inputArray.forEach(o => {
        if (long.length === 0 || long[0].length === o.length) {
            long.push(o)
        } else if (long[0].length < o.length) {
            long = [o];
        }
    })
    return long;
}

const tests = [
    {
        arg: ["aba",
            "aa",
            "ad",
            "vcd",
            "aba"],
        expected: ["aba",
            "vcd",
            "aba"]
    },
    {
        arg: ["aa"],
        expected: ["aa"]
    },

];

tests.forEach((o, i) => {
    var result = allLongestStrings(o.arg);
    console.log('TEST ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
