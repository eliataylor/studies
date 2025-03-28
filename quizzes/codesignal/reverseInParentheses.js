function handlePortion(arr) {
    let left = arr.lastIndexOf('(');
    let right = arr.indexOf(')', left);
    if (left < right) {
        let inner = arr.slice(left + 1, right).reverse();
        arr.splice(left, inner.length + 2, ...inner);
        console.log('cut ' + inner.join('') + ' into ', arr)
    }
    return arr.join('');
}

function reverseInParentheses(str) {
    // while (str.indexOf('(') > -1 && str.indexOf(')') > 0) {
    console.log('TESTING ', str);
    str = handlePortion(str.split(''));
    // }
    return str;
}


const tests = [
    {
        arg: "(bar)",
        expected: "rab"
    },
    {
        arg: "foo(bar)baz(blim)",
        expected: "foorabbazmilb"
    },
    {
        arg: "foo(bar(baz))blim",
        expected: "foobazrabblim"
    },
    {
        arg: "()",
        expected: ""
    }

];

tests.forEach((o, i) => {
    var result = reverseInParentheses(o.arg);
    console.log('TEST ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
