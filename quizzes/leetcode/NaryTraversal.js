const NaryTree = require('./NaryTree');
let codec = new NaryTree();
let test = null;
let tests = [];

let hard = [1, null, 2, 3, 4, 5, null, null, 6, 7, null, 8, null, 9, 10, null, null, 11, null, 12, null, 13, null, null, 14];
let easy = [1, null, 3, 2, 4, null, 5, 6];

/**** PRE ORDER TRAVERSAL - N-ARY *****/
const preOrderRecursive = (root, result = []) => {
    if (!root) {
        return result
    }

    result.push(root.val)

    if (root.children) {
        root.children.forEach((child) => {
            preOrderRecursive(child, result)
        })
    }

    return result
}

const preOrderIteractive = function (root) {
    const res = [], stack = [root];
    while (stack.length > 0) {
        const curr = stack.pop();
        if (!curr) continue;
        res.push(curr.val);
        let next = curr.children.reverse();
        stack.push(...next)
    }
    return res;
};

tests = [
    {
        name: 'preOrderEasy',
        arg: [codec.deserialize([...easy])],
        expected: [1, 3, 5, 6, 2, 4]
    },
    {
        name: 'preOrderHard',
        arg: [codec.deserialize([...hard])],
        expected: [1, 2, 3, 6, 7, 11, 14, 4, 8, 12, 5, 9, 13, 10]
    }
];
tests.forEach((o, i) => {
    test = preOrderIteractive(...o.arg);
    console.log('IT ' + o.name + ' >> ' + ((JSON.stringify(test) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
    test = preOrderRecursive(...o.arg);
    console.log('RE ' + o.name + ' >> ' + ((JSON.stringify(test) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})

/**** POST ORDER TRAVERSAL - N-ARY *****/
var postorderRecursive = function (root) {
    let res = [];

    function dfsTraversal(root) {
        if (!root) return;
        for (let child of root.children) {
            dfsTraversal(child);
        }
        res.push(root.val);
    }

    dfsTraversal(root);
    return res;
    // Time Complexity: O(N)
    // Space Complexity: O(H)
};
var postOrderIterative = function (root) {
    if (!root) return [];
    let res = [], stack = [root];
    while (stack.length > 0) {
        let node = stack[stack.length - 1];
        if (node.children.length > 0) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                if (node.children[i]) {
                    stack.push(node.children[i]);
                }
            }
            node.children = [];
        } else {
            res.push(stack.pop().val);
        }
    }
    return res;
    // Time Complexity: O(N)
    // Space Complexity: O(H)
}

tests = [
    {
        name: 'postOrderEasy',
        arg: [codec.deserialize([...easy])],
        expected: [5, 6, 3, 2, 4, 1]
    },
    {
        name: 'postOrderHard',
        arg: [codec.deserialize([...hard])],
        expected: [2, 6, 14, 11, 7, 3, 12, 8, 4, 13, 9, 10, 5, 1]
    }
];

tests.forEach((o, i) => {
    test = postOrderIterative(...o.arg);
    console.log('IT ' + o.name + ' >> ' + ((JSON.stringify(test) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
    test = postorderRecursive(...o.arg);
    console.log('RE ' + o.name + ' >> ' + ((JSON.stringify(test) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})


/**** LEVEL ORDER TRAVERSAL - N-ARY *****/
var levelOrder = function (root) {
    const res = [], queue = [];
    let depth = 0, num = 0;
    if (root) queue.push(root);
    while (queue.length) {
        res.push([]);
        num = queue.length;
        for (let i = 0; i < num; i++) {
            const curr = queue.shift();
            if (!curr) continue;
            res[depth].push(curr.val);
            queue.push(...curr.children);
        }
        depth++;
    }
    return res;
};
var levelOrderRecursive = function (root) {
    const res = [];
    BFS(root, 0);
    return res;

    function BFS(node, depth) {
        if (!node) return;
        if (depth === res.length) {
            res.push([]);
        }
        if (!res[depth]) res[depth] = [];
        res[depth].push(node.val);
        for (let child of node.children) {
            BFS(child, depth + 1);
        }
    }
};

tests = [
    {
        name: 'levelOrderEasy',
        arg: [codec.deserialize([...easy])],
        expected: [[1], [3, 2, 4], [5, 6]]
    },
    {
        name: 'levelOrderHard',
        arg: [codec.deserialize([...hard])],
        expected: [[1], [2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13], [14]]
    }
];

tests.forEach((o, i) => {
    test = levelOrder(...o.arg);
    console.log('IT: ' + o.name + ' >> ' + ((JSON.stringify(test) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
    test = levelOrderRecursive(...o.arg);
    console.log('RE: ' + o.name + ' >> ' + ((JSON.stringify(test) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})


