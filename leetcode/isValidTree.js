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
