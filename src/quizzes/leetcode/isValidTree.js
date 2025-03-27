/**
 *     5
 *    / \
 *   3   8
 *  / \ / \
 * 1  4 7  9
 * Here's how the traversal works:
 *
 * Initially, we push nodes [5, 3, 1] onto the stack while moving left
 * Pop 1, check it against -Infinity (passes), set inorder = 1, move right (there is no right)
 * Pop 3, check it against 1 (passes), set inorder = 3, move right to 4
 * Push 4 onto stack
 * Pop 4, check it against 3 (passes), set inorder = 4, move right (there is no right)
 * Pop 5, check it against 4 (passes), set inorder = 5, move right to 8
 * Push nodes [8, 7] onto stack while moving left
 * Continue similarly...
 *
 * The algorithm visits nodes in order: 1, 3, 4, 5, 7, 8, 9 - which is ascending order.
 * The key insight is that we're not just following the left side down - we're using the stack to perform a
 * complete in-order traversal of the entire tree, which visits all nodes in sorted order if it's a valid BST.
 *
 */
// inorder traversal
function isValidBST(root) {
    let stack = [];
    let inorder = -Infinity;

    while (stack.length > 0 || root != null) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        // If next element in inorder traversal
        // is smaller than the previous one
        // that's not BST.
        if (root.val <= inorder) return false;
        inorder = root.val;
        root = root.right;
    }
    return true;
}

/*

Time Complexity: O(n)

Each node in the tree is visited exactly once
At each node, we perform constant-time operations (value comparisons)

Space Complexity: O(h)

Where h is the height of the tree
This space is used by the recursive call stack
In the worst case (completely unbalanced tree), h can be n, making it O(n)
In a balanced tree, h would be log(n), making it O(log n)
 */
function inOrderRecursive(root) {
    let prev = -Infinity;

    function inorder(node) {
        if (node === null) return true;

        if (!inorder(node.left)) return false;

        if (node.val <= prev) return false;
        prev = node.val;

        return inorder(node.right);
    }

    return inorder(root);
}


/*

Range validation approach (sometimes called "min-max approach"):
Checks if the current node's value falls within a valid range
Recursively validates subtrees with updated range boundaries
Doesn't rely on visiting nodes in a specific order

 */
function helper(node, lower, upper) {
    if (node == null) return true;

    let val = node.val;
    if (lower != null && val <= lower) return false;
    if (upper != null && val >= upper) return false;

    if (!helper(node.right, val, upper)) return false;
    if (!helper(node.left, lower, val)) return false;
    return true;
}

function isValidBST(root) {
    return helper(root, null, null);
}


/***
The Morris traversal achieves O(1) extra space complexity by temporarily modifying the tree structure during traversal.
 **/
 function isValidBST(root) {
    let prev = -Infinity;
    let current = root;

    while (current !== null) {
        if (current.left === null) {
            // Process current node
            if (current.val <= prev) return false;
            prev = current.val;
            current = current.right;
        } else {
            // Find the inorder predecessor
            let predecessor = current.left;
            while (predecessor.right !== null && predecessor.right !== current) {
                predecessor = predecessor.right;
            }

            if (predecessor.right === null) {
                // Create a link from predecessor to current
                predecessor.right = current;
                current = current.left;
            } else {
                // Restore the tree structure
                predecessor.right = null;

                // Process current node
                if (current.val <= prev) return false;
                prev = current.val;
                current = current.right;
            }
        }
    }

    return true;
}
