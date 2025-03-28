/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

// Breadth first (level order)
var preorderTraversal = function (root) {
    if (!root || !root.val || root.length === 0) return [];
    let digits = [];
    let queue = [root];
    while (queue.length > 0) {
        let node = queue.shift();
        if (typeof node.val === 'number') {
            digits.push(node.val);
        }
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return digits;
};

// (level order include nulls)
var levelOrder = function (root) {
    let result = [];
    if (root == null) return result;

    let queue = [];
    let levelQueue = [];

    queue.push(root);
    levelQueue.push(1); //start from 1

    while (queue.length > 0) {
        let node = queue.shift();
        let level = levelQueue.shift();

        let l = null;
        if (result.length < level) {
            l = [];
            result.push(l); // start new layer
        } else {
            l = result[level - 1]; // concat to layer
        }

        l.push(node.val); // by reference

        if (node.left) {
            queue.push(node.left);
            levelQueue.push(level + 1);
        }

        if (node.right) {
            queue.push(node.right);
            levelQueue.push(level + 1);
        }
    }
    console.log(result);
    return result;
};


const preOrder = (root, nodes) => {
    nodes.push(root.val);
    if (root.left) preOrder(root.left, nodes)
    if (root.right) preOrder(root.right, nodes);
    return nodes;
}

const inOrder = (root, nodes) => {
    if (root.left) inOrder(root.left, nodes)
    nodes.push(root.val);
    if (root.right) inOrder(root.right, nodes);
    return nodes;
}

const postOrder = (root, nodes) => {
    if (root.left) postOrder(root.left, nodes)
    if (root.right) postOrder(root.right, nodes);
    nodes.push(root.val);
    return nodes;
}


// Depth first
var preorderTraversalDFS = function (root) {
    if (!root || !root.val) return [];
    let vals = [];
    vals = inOrder(root, vals);
    console.log(vals);
    return vals;
};


const tests = [
    /* {
        name:'Test 1',
        arg: [{
            "val": 2,
            "left": {
                "val": 3,
                "left": {
                    "val": 1,
                    "left": null,
                    "right": null
                },
                "right": null
            },
            "right": null
        }],
        expected: [2,3,1]
    }, */
    {
        name: 'levelOrder',
        arg: [{
            "val": 3,
            "left": {
                "val": 9,
                "left": null,
                "right": null
            },
            "right": {
                "val": 20,
                "left": {
                    "val": 15,
                    "left": null,
                    "right": null
                },
                "right": {
                    "val": 7,
                    "left": null,
                    "right": null
                }
            }
        }],
        expected: [
            [3],
            [9, 20],
            [15, 7]
        ]
    }
];

tests.forEach((o, i) => {
    let result = levelOrder(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
