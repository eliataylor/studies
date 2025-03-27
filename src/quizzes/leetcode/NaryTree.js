/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
function Node(val, children) {
    this.val = val;
    this.children = children;
};

class NaryTree {
    constructor() {

    }

    /**
     * @param {Node} root
     * @return {string}
     */
        // Encodes a tree to a single string.
    serialize = function(root) {
        if(root == null) return  null
        let queue = [root, null]
        let finalArray = []
        while(queue.length) {
            const front = queue.shift()
            if(!front) {
                finalArray.push(front)
                continue
            }
            finalArray.push(front.val)
            while(front.children.length) {
                queue.push(front.children.shift())
            }
            queue.push(null)
        }
        console.log(finalArray)
        return finalArray
    };

    /**
     * @param {string} data
     * @return {Node}
     */
        // Decodes your encoded data to tree.
    deserialize = function(data) {
        if(data == null) return null
        let root = new Node(data.shift(), [])
        let queue = [root]
        let topQueue = null
        while(data.length) {
            const top = data.shift()
            if(top == null) {
                topQueue = queue.shift()
                continue
            }
            let node = new Node(top, [])
            queue.push(node)
            topQueue.children.push(node)
        }
        // console.log(root)
        return root;
    };
}

// Your Codec object will be instantiated and called as such:
// phplet codec = new NaryTree();
// let tree = codec.deserialize([1,null,3,2,4,null,5,6]);
// let tree = codec.deserialize([1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]);


module.exports = NaryTree;
