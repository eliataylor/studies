longestPath = f => f.split("\f").reduce((m, i) => {
    let t = i.split("\t");
    let name = t.pop();
    m.a[t.length] = name;
    let value =  m.a.slice(0, t.length + 1).join("/");
    m.value = m.value.length < value.length && name.indexOf(".") >= 0 ? value : m.value;
    return m;
}, { a: [], value: ""}).value.length;


// OTHERS
// type TreeNode = {
//  value: string,
//  type: 'dir' | 'file',
//  children: Set<TreeNode>,
// }

class TreeNode {
    constructor(name, type, level) {
        this.name = name;
        this.type = type;
        this.level = level;
        this.children = new Set();
    }

    addChild(treeNode) {
        this.children.add(treeNode);
    }
}

function longestPath(fileSystem) {
    const trees = makeTreesFromString(fileSystem); // Array<TreeNode>
    if (!trees.length) return 0;
    let longest = 0;
    const stack = [];
    trees.forEach(node => stack.push({ node, pathLength: node.name.length}));
    while (stack.length) {
        const { node, pathLength } = stack.pop();
        if (node.type === 'file' && pathLength > longest) {
            longest = pathLength;
        }
        node.children.forEach(childNode => stack.push({
            node: childNode,
            pathLength: pathLength + childNode.name.length + 1,
        }));
    }
//     const helper = (node, pathLength) => {
//         if (node.type === 'file' && pathLength > longest) {
//             longest = pathLength;
//         }

//         node.children.forEach(childNode => {
//             helper(childNode, pathLength + childNode.name.length + 1);
//         });
//     }
//     trees.forEach(t => helper(t, t.name.length));
    return longest;
}

function makeTreesFromString(string) {
    const strArr = string.split(/\f|\r|\n/);
    const nodeArr = strArr.map(substr => generateNode(substr));
    const output = [];

    const findParent = (index) => {
        const level = nodeArr[index].level;
        const parentLevel = level - 1;
        for (let i = index; i >= 0; i--) {
            if (nodeArr[i].level === parentLevel) return nodeArr[i];
        }
    }

    nodeArr.forEach((current, i) => {
        if (current.level === 0) {
            output.push(current);
        } else {
            const parent = findParent(i);
            parent.addChild(current);
        }
    });

    return output;
}

function generateNode(substr) { // '\t\tphoto.png'
    const splitByTab = substr.split(/\t| {4}/);
    const level = splitByTab.length - 1;
    const type = substr.indexOf('.') !== -1 ? 'file' : 'dir';
    const name = splitByTab[splitByTab.length - 1];
    return new TreeNode(name, type, level);
}
