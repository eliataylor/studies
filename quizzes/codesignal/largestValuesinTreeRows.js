//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
/*
function getHighestValue(obj, allVals) {
    if (!obj) return allVals;

    if (typeof obj === 'object' && !obj.length) {
        obj = Object.values(obj);
    }
    let max = obj.reduce((a, v, i, obj) => {
        if (typeof v === 'number') {
            if (a === false) {
                return v;
            }
            return Math.max(v, a);
        } else {
            return getHighestValue(v, allVals);
            // go deeper
        }
        return a;
    }, false);

    allVals.push(max);
    return max;
}

function largestValuesInTreeRows(t) {
    if (!t) return [];
    let result = [];
    getHighestValue(t, result);
    return result;
} */

function getMaxKeyAtLevel(arr) {
    return arr.reduce((a, v) => {
        if (typeof v === 'number') {
            return (a === false) ? v : Math.max(v, a);
        }
        return a;
    }, false);
}

function largestValuesInTreeRows(t) {
    if (!t) return [];
    let result = [];

    let children = Object.values(t);

    while (children.length > 0) {
        let max = getMaxKeyAtLevel(children);
        if (max !== false) {
            result.push(max);
        }
        children = children.reduce((a, v) => {
            if (typeof v === 'object' && v !== null) {
                let vals = Object.values(v);
                a = a.concat(vals.filter(v2 => v2 !== null));
            }
            return a;
        }, []);
    }
    return result;
}

const tests = [
    {
        name: 'Test 1',
        arg: [{
            "value": -1,
            "left": {
                "value": 5,
                "left": null,
                "right": null
            },
            "right": {
                "value": 7,
                "left": null,
                "right": {
                    "value": 1,
                    "left": null,
                    "right": null
                }
            }
        }],
        expected: [-1, 7, 1]
    }
];

tests.forEach((o, i) => {
    let result = largestValuesInTreeRows(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
