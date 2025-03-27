function longestWord(text) {
    text = text.replace(/[^A-Za-z ]/gi, ' ');
    let parts = text.split(' ');
    let min = parts[0];
    parts.forEach(v => {
        min = (min.length < v.length) ? v : min;
    });
    console.log(parts);
    return min;
}

//     return text.match(/[A-Za-z]+/g).sort((a,b)=>{return b.length > a.length})[0];
// }



const tests = [
    {
        name:'Test 1',
        arg: ["Ready, steady, go! _bla, and 1and, 2nand1, and don't stop."],
        expected: "steady"
    }
];

tests.forEach((o, i) => {
    let result = longestWord(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
