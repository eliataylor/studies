
//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }







function getValuesAtLevel(arr) {
    let a = [];
    for (let o of arr) {
        if (o && typeof o.value === 'number') {
            a.push(o.value);
        }
    }
    return a.sort();
}

function flattenLevel(obj) {
    let a = obj.flatMap(level => {
        if (typeof level === 'object' && level !== null) {
            return Object.values(level);
        }
        return [];

    });
    return a;
}


function traverseTreeOld(t) {
    if (!t) return [];
    let result = [t.value];

    let children = [t.left, t.right]; // root;

    while (children.length > 0) {
        let vals = getValuesAtLevel(children);
        if (vals.length > 0) {
            result = result.concat(vals);
        }
        children = flattenLevel(children);
    }
    console.log(result);
    return result;
}

// OTHERS

function traverseTree(t) {
    const output = []
    const queue = [t];
    while (queue.length > 0) {
        const node = queue.shift()

        output.push(node.value)
        if (node.left) {
            queue.push(node.left)
        }
        if (node.right) {
            queue.push(node.right)
        }
    }

    return output
}


const tests = [
    {
        name:'Test 1',
        arg:[{
            "value": 1,
            "left": {
                "value": 2,
                "left": null,
                "right": {
                    "value": 3,
                    "left": null,
                    "right": null
                }
            },
            "right": {
                "value": 4,
                "left": {
                    "value": 5,
                    "left": null,
                    "right": null
                },
                "right": null
            }
        }],
        expected: [1, 2, 4, 3, 5]
    }
];


tests.forEach((o, i) => {
    let result = traverseTree(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
