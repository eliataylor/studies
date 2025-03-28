/**
 * Binary Search Tree Implementation in TypeScript
 *
 * This file contains various BST implementations and operations commonly asked
 * in coding interviews, including:
 * - BST Iterator (two approaches)
 * - Basic BST operations (search, insert, delete)
 * - Finding kth largest element
 * - Finding lowest common ancestor
 * - A bucket-based approach for finding nearby almost duplicates
 */

// TreeNode interface and factory function
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    cnt: number; // Counts the size of the subtree rooted at this node
}

/**
 * Creates a new TreeNode with the given value
 */
function TreeNode(val: number = 0): TreeNode {
    return {
        val: val,
        left: null,
        right: null,
        cnt: 1 // Initialize count to 1 (the node itself)
    };
}

/**
 * Approach 1: BST Iterator using Flattened Tree
 *
 * This approach pre-processes the tree by performing an in-order traversal
 * and storing all values in a sorted array. This makes operations very fast
 * but uses O(n) extra space.
 */
class BSTIteratorFlattened {
    private nodesSorted: number[] = [];
    private index: number = -1;

    /**
     * Initializes the iterator with the root node of the BST
     */
    constructor(root: TreeNode | null) {
        this._inorder(root);
    }

    /**
     * Returns the next smallest number in the BST
     * Time Complexity: O(1)
     */
    next(): number {
        return this.nodesSorted[++this.index];
    }

    /**
     * Returns whether we have a next smallest number
     * Time Complexity: O(1)
     */
    hasNext(): boolean {
        return this.index + 1 < this.nodesSorted.length;
    }

    /**
     * Performs an in-order traversal to collect all values in sorted order
     */
    private _inorder(root: TreeNode | null): void {
        if (root === null) {
            return;
        }

        this._inorder(root.left);
        this.nodesSorted.push(root.val);
        this._inorder(root.right);
    }
}

/**
 * Approach 2: BST Iterator using Controlled Recursion
 *
 * This approach simulates the recursion stack of an in-order traversal,
 * allowing us to pause and resume the traversal as needed.
 * It uses O(h) space where h is the height of the tree.
 */
class BSTIterator {
    private stack: TreeNode[] = [];

    /**
     * Initializes the iterator with the root node of the BST
     */
    constructor(root: TreeNode | null) {
        this._leftmostInorder(root);
    }

    /**
     * Returns the next smallest number in the BST
     * Time Complexity: Amortized O(1)
     */
    next(): number {
        // Node at the top of the stack is the next smallest element
        const topmostNode = this.stack.pop()!;

        // If the node has a right child, process its left branch
        if (topmostNode.right !== null) {
            this._leftmostInorder(topmostNode.right);
        }

        return topmostNode.val;
    }

    /**
     * Returns whether we have a next smallest number
     * Time Complexity: O(1)
     */
    hasNext(): boolean {
        return this.stack.length > 0;
    }

    /**
     * Searches for a value in the BST
     * Time Complexity: O(h) where h is the height of the tree
     */
    searchBST(root: TreeNode | null, val: number): TreeNode | null {
        while (root !== null && val !== root.val) {
            root = val < root.val ? root.left : root.right;
        }
        return root;
    }

    /**
     * Inserts a value into the BST (recursive approach)
     * Updates the subtree size count for each affected node
     * Time Complexity: O(h) where h is the height of the tree
     */
    insertIntoBSTRecursive(root: TreeNode | null, val: number): TreeNode {
        if (root === null) {
            return TreeNode(val);
        }

        if (root.val < val) {
            // Insert to the right subtree if val > root.val
            root.right = this.insertIntoBSTRecursive(root.right, val);
        } else {
            // Insert to the left subtree if val <= root.val
            root.left = this.insertIntoBSTRecursive(root.left, val);
        }

        // Update the subtree size
        root.cnt++;
        return root;
    }

    /**
     * Inserts a value into the BST (iterative approach)
     * Time Complexity: O(h) where h is the height of the tree
     */
    insertIntoBST(root: TreeNode | null, val: number): TreeNode {
        if (root === null) {
            return TreeNode(val);
        }

        let node: TreeNode = root;
        while (node !== null) {
            // Insert into the right subtree
            if (val > node.val) {
                if (node.right === null) {
                    node.right = TreeNode(val);
                    return root;
                } else {
                    node = node.right;
                }
            }
            // Insert into the left subtree
            else {
                if (node.left === null) {
                    node.left = TreeNode(val);
                    return root;
                } else {
                    node = node.left;
                }
            }
        }

        return root; // This line is technically unreachable
    }

    /**
     * Finds the successor (smallest value in the right subtree)
     * Used in deleteNode operation
     */
    findSuccessor(root: TreeNode): TreeNode | null {
        let cur = root.right;
        while (cur !== null && cur.left !== null) {
            cur = cur.left;
        }
        return cur;
    }

    /**
     * Deletes a node with the given key from the BST
     * Time Complexity: O(h) where h is the height of the tree
     */
    deleteNode(root: TreeNode | null, key: number): TreeNode | null {
        // Return null if root is null
        if (root === null) {
            return root;
        }

        // Delete current node if root is the target node
        if (root.val === key) {
            // Case 1: Node has no left child, replace with right child
            if (root.left === null) {
                return root.right;
            }

            // Case 2: Node has no right child, replace with left child
            if (root.right === null) {
                return root.left;
            }

            // Case 3: Node has two children, replace with its successor
            const successor = this.findSuccessor(root)!;
            root.val = successor.val;
            root.right = this.deleteNode(root.right, successor.val);
            return root;
        }

        // Recursively search for the node to delete
        if (root.val < key) {
            // Search in right subtree if root.val < key
            root.right = this.deleteNode(root.right, key);
        } else {
            // Search in left subtree if root.val > key
            root.left = this.deleteNode(root.left, key);
        }

        return root;
    }

    /**
     // https://leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/142/conclusion/1026/
     * Finds the kth largest element in the BST
     * Leverages the count property to efficiently find the kth element
     * Time Complexity: O(h) where h is the height of the tree
     */
    searchKth(root: TreeNode | null, k: number): number | null {
        if (root === null) {
            return null;
        }

        // m = the size of the right subtree
        const m = root.right !== null ? root.right.cnt : 0;

        // Root is the (m+1)th largest node in the BST
        if (k === m + 1) {
            return root.val;
        }

        if (k <= m) {
            // Find kth largest in the right subtree
            return this.searchKth(root.right, k);
        } else {
            // Find (k-m-1)th largest in the left subtree
            return this.searchKth(root.left, k - m - 1);
        }
    }

    /**
     // https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/solution/
     * Finds the lowest common ancestor of two nodes (recursive approach)
     * Time Complexity: O(h) where h is the height of the tree
     */
    lowestCommonAncestorRecursive(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
        if (root === null) {
            return null;
        }

        // Value of current node or parent node
        const parentVal = root.val;

        // Values of p and q
        const pVal = p.val;
        const qVal = q.val;

        if (pVal > parentVal && qVal > parentVal) {
            // If both p and q are greater than parent, LCA is in right subtree
            return this.lowestCommonAncestorRecursive(root.right, p, q);
        } else if (pVal < parentVal && qVal < parentVal) {
            // If both p and q are lesser than parent, LCA is in left subtree
            return this.lowestCommonAncestorRecursive(root.left, p, q);
        } else {
            // We have found the split point, i.e., the LCA node
            return root;
        }
    }

    /**
     * Finds the lowest common ancestor of two nodes (iterative approach)
     * Time Complexity: O(h) where h is the height of the tree
     */
    lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
        if (root === null) {
            return null;
        }

        // Values of p and q
        const pVal = p.val;
        const qVal = q.val;

        // Start from the root node of the tree
        let node: TreeNode | null = root;

        // Traverse the tree
        while (node !== null) {
            // Value of ancestor/parent node
            const parentVal = node.val;

            if (pVal > parentVal && qVal > parentVal) {
                // If both p and q are greater than parent, LCA is in right subtree
                node = node.right;
            } else if (pVal < parentVal && qVal < parentVal) {
                // If both p and q are lesser than parent, LCA is in left subtree
                node = node.left;
            } else {
                // We have found the split point, i.e., the LCA node
                return node;
            }
        }

        return null;
    }

    /**
     *    // https://leetcode.com/problems/contains-duplicate-iii/solution/
     *         Bucket sort is a sorting algorithm that works by distributing the elements of an array into a number of buckets.
     *         Each bucket is then sorted individually, using a different sorting algorithm. Here is an illustration of buckets.
     * Determines if the array contains nearby almost duplicates
     * Uses bucket sort approach
     *
     * Time Complexity: O(n) where n is the length of the array
     *
     * @param nums The input array
     * @param k The maximum distance between indices
     * @param t The maximum difference between values
     * @returns true if there are nearby almost duplicates, false otherwise
     */
    containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
        if (t < 0) return false;

        // Map from bucket ID to value
        const buckets: Map<number, number> = new Map();
        const bucketSize: number = t + 1; // Bucket size to ensure |nums[i] - nums[j]| <= t

        for (let i = 0; i < nums.length; ++i) {
            const bucketId: number = this.getID(nums[i], bucketSize);

            // Check if bucket exists (direct duplicate within range t)
            if (buckets.has(bucketId)) {
                return true;
            }

            // Check adjacent buckets for values within range t
            if (buckets.has(bucketId - 1) && Math.abs(nums[i] - buckets.get(bucketId - 1)!) < bucketSize) {
                return true;
            }

            if (buckets.has(bucketId + 1) && Math.abs(nums[i] - buckets.get(bucketId + 1)!) < bucketSize) {
                return true;
            }

            // Add current value to its bucket
            buckets.set(bucketId, nums[i]);

            // Remove old values outside the window of size k
            if (i >= k) {
                buckets.delete(this.getID(nums[i - k], bucketSize));
            }
        }

        return false;
    }

    /**
     * Adds all nodes in the leftmost branch of the tree to the stack
     */
    private _leftmostInorder(root: TreeNode | null): void {
        while (root !== null) {
            this.stack.push(root);
            root = root.left;
        }
    }

    /**
     * Helper function for containsNearbyAlmostDuplicate
     * Maps a value to its bucket ID
     */
    private getID(x: number, w: number): number {
        // Handle negative numbers properly
        return x < 0 ? Math.floor((x + 1) / w) - 1 : Math.floor(x / w);
    }
}

export {TreeNode, BSTIteratorFlattened, BSTIterator};
