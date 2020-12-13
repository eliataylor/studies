interface TreeNode {
    val: string;
    left: TreeNode;
    right: TreeNode;
    cnt: number
}

function TreeNode(val = null) {
    return {
        val: val,
        left: null,
        right: null,
        cnt: 0 // the size of the subtree rooted at the node
    }
};

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode(int x) { val = x; }
 * }
 */

//  the reason we had to resort to such an approach was because we can control the iteration over the array.
//  We can't really pause a recursion in between and then start it off sometime later.
class BSTIteratorFlattened {

    nodesSorted: Array<TreeNode> = [];
    index: number = -1;

    constructor(root) {

        // Array containing all the nodes in the sorted order
        this.nodesSorted = [];

        // Pointer to the next smallest element in the BST
        this.index = -1;

        // Call to flatten the input binary search tree
        this._inorder(root);
    }

    _inorder(root) {

        if (root == null) {
            return;
        }

        this._inorder(root.left);
        this.nodesSorted.push(root.val);
        this._inorder(root.right);
    }

    /**
     * @return the next smallest number
     */
    next() {
        return this.nodesSorted[++this.index];
    }

    /**
     * @return whether we have a next smallest number
     */
    hasNext() {
        return this.index + 1 < this.nodesSorted.length
    }
}

// Approach 2: Controlled Recursion
/*
However, if we could simulate a controlled recursion for an inorder traversal, we wouldn't really need to use any additional space other than the space used by the stack for our recursion simulation.
AND we can pause recursion
 */

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode(int x) { val = x; }
 * }
 */
class BSTIterator {

    stack: Array<TreeNode> = [];

    constructor(root) {

        // Stack for the recursion simulation
        this.stack = [];

        // Remember that the algorithm starts with a call to the helper function
        // with the root node as the input
        this._leftmostInorder(root);
    }

    _leftmostInorder(root) {

        // For a given node, add all the elements in the leftmost branch of the tree
        // under it to the stack.
        while (root != null) {
            this.stack.push(root);
            root = root.left;
        }
    }

    /**
     * @return the next smallest number
     */
    next() {
        // Node at the top of the stack is the next smallest element
        let topmostNode = this.stack.pop();

        // Need to maintain the invariant. If the node has a right child, call the
        // helper function for the right child
        if (topmostNode.right != null) {
            this._leftmostInorder(topmostNode.right);
        }

        return topmostNode.val;
    }

    /**
     * @return whether we have a next smallest number
     */
    hasNext() {
        return this.stack.length > 0;
    }

    searchBST(root, val) {
        while (root != null && val != root.val) {
            root = val < root.val ? root.left : root.right;
        }
        return root;
    }

    insertIntoBSTRecursive(root, val) {
        if (root == null) {
            return new TreeNode(val);
        }
        if (root.val < val) {           // insert to the right subtree if val > root->val
            root.right = this.insertIntoBSTRecursive(root.right, val);
        } else {                        // insert to the left subtree if val <= root->val
            root.left = this.insertIntoBSTRecursive(root.left, val);
        }
        root.cnt++;
        return root;

    }

    insertIntoBST(root, val) {
        let node = root; // will this work as reference?
        while (node != null) {
            // insert into the right subtree
            if (val > node.val) {
                // insert right now
                if (node.right == null) {
                    node.right = new TreeNode(val);
                    return root;
                } else node = node.right;
            }
            // insert into the left subtree
            else {
                // insert right now
                if (node.left == null) {
                    node.left = new TreeNode(val);
                    return root;
                } else node = node.left;
            }
        }
        return new TreeNode(val);
    }

    findSuccessor(root): TreeNode {
        let cur = root.right;
        while (cur != null && cur.left != null) {
            cur = cur.left;
        }
        return cur;
    }

    deleteNode(root, key): TreeNode {
        // return null if root is null
        if (root == null) {
            return root;
        }

        // delete current node if root is the target node
        if (root.val == key) {
            // replace root with root->right if root->left is null
            if (root.left == null) {
                return root.right;
            }

            // replace root with root->left if root->right is null
            if (root.right == null) {
                return root.left;
            }

            // replace root with its successor if root has two children
            let p = this.findSuccessor(root); // TreeNode
            root.val = p.val;
            root.right = this.deleteNode(root.right, p.val);
            return root;
        }
        if (root.val < key) {
            // find target in right subtree if root->val < key
            root.right = this.deleteNode(root.right, key);
        } else {
            // find target in left subtree if root->val > key
            root.left = this.deleteNode(root.left, key);
        }
        return root;
    }

    // https://leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/142/conclusion/1026/
    searchKth(root, k): number {
        // m = the size of right subtree
        let m = root.right != null ? root.right.cnt : 0;
        // root is the m+1 largest node in the BST
        if (k == m + 1) {
            return root.val;
        }
        if (k <= m) {
            // find kth largest in the right subtree
            return this.searchKth(root.right, k);
        } else {
            // find (k-m-1)th largest in the left subtree
            return this.searchKth(root.left, k - m - 1);
        }
    }

    // https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/solution/
    lowestCommonAncestorRecursive(root, p, q): TreeNode {

        // Value of current node or parent node.
        let parentVal = root.val;

        // Value of p
        let pVal = p.val;

        // Value of q;
        let qVal = q.val;

        if (pVal > parentVal && qVal > parentVal) {
            // If both p and q are greater than parent
            return this.lowestCommonAncestor(root.right, p, q);
        } else if (pVal < parentVal && qVal < parentVal) {
            // If both p and q are lesser than parent
            return this.lowestCommonAncestor(root.left, p, q);
        } else {
            // We have found the split point, i.e. the LCA node.
            return root;
        }
    }

    lowestCommonAncestor(root, p, q): TreeNode {

        // Value of p
        let pVal = p.val;

        // Value of q;
        let qVal = q.val;

        // Start from the root node of the tree
        let node = root;

        // Traverse the tree
        while (node != null) {

            // Value of ancestor/parent node.
            let parentVal = node.val;

            if (pVal > parentVal && qVal > parentVal) {
                // If both p and q are greater than parent
                node = node.right;
            } else if (pVal < parentVal && qVal < parentVal) {
                // If both p and q are lesser than parent
                node = node.left;
            } else {
                // We have found the split point, i.e. the LCA node.
                return node;
            }
        }
        return null;
    }

    // https://leetcode.com/problems/contains-duplicate-iii/solution/
    /*
    Bucket sort is a sorting algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, using a different sorting algorithm. Here is an illustration of buckets.
     */
    getID(x:number , w:number ) :number {
        return x < 0 ? (x + 1) / w - 1 : x / w;
    }
    containsNearbyAlmostDuplicate(nums: Array<number>, k: number, t: number): boolean {
        if (t < 0) return false;
        let d: Map<number, number> = new Map();
        let w: number = t + 1;
        for (let i = 0; i < nums.length; ++i) {
            let m: number = this.getID(nums[i], w);
            // check if bucket m is empty, each bucket may contain at most one element
            if (d.has(m))
                return true;
            // check the neighbor buckets for almost duplicate
            if (d.has(m - 1) && Math.abs(nums[i] - d.get(m - 1)) < w)
                return true;
            if (d.has(m + 1) && Math.abs(nums[i] - d.get(m + 1)) < w)
                return true;
            // now bucket m is empty and no almost duplicate in neighbor buckets
            d.set(m, nums[i]);
            if (i >= k) d.delete(this.getID(nums[i - k], w));
        }
        return false;
    }
}
