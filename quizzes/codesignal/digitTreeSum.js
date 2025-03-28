//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function digitTreeSum(t) {
    if (!t) return 0;
    let digits = [];
    let queue = [t];
    while (queue.length > 0) {
        let node = queue.shift();
        if (node.value) {
            digits.push(node.value);
        }
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    let sum = digits.reduce((acc, val) => {
        return acc += val;
    }, 0);
    console.log(sum, digits);
    return sum;
}

// OTHERS
function digitTreeSum(t) {
    var sum = 0;
    var visit = (node, n) => {
        n = n * 10 + node.value;
        if (node.left) visit(node.left, n);
        if (node.right) visit(node.right, n);
        if (!node.left && !node.right) sum += n;
    };
    if (t) visit(t, 0);
    return sum;
}


const tests = [
    {
        name: 'Test 1',
        arg: [{
            "value": 1,
            "left": {
                "value": 0,
                "left": {
                    "value": 3,
                    "left": null,
                    "right": null
                },
                "right": {
                    "value": 1,
                    "left": null,
                    "right": null
                }
            },
            "right": {
                "value": 4,
                "left": null,
                "right": null
            }
        }],
        expected: 218
    }
];

tests.forEach((o, i) => {
    let result = digitTreeSum(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
