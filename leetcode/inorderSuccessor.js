function inorderSuccessor(root, p) {
    // the successor is somewhere lower in the right subtree
    // successor: one step right and then left till you can
    if (p.right != null) {
        p = p.right;
        while (p.left != null) p = p.left;
        return p;
    }

// the successor is somewhere upper in the tree
    let stack = [];
    let inorder = -Infinity;

// inorder traversal : left -> node -> right
    while (stack.length > 0 || root != null) {
        // 1. go left till you can
        while (root != null) {
            stack.push(root);
            root = root.left;
        }

        // 2. all logic around the node
        root = stack.pop();
        // if the previous node was equal to p
        // then the current node is its successor
        if (inorder == p.val) return root;
        inorder = root.val;

        // 3. go one step right
        root = root.right;
    }

    // there is no successor
    return null;
}
