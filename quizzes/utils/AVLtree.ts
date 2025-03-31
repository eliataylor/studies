// avlTree.test.ts
class AVLNode {
  value: number;
  left: AVLNode | null = null;
  right: AVLNode | null = null;
  height: number = 1;

  constructor(value: number) {
    this.value = value;
  }
}

class AVLTree {
  root: AVLNode | null = null;

  private height(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  private getBalance(node: AVLNode | null): number {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }

  private updateHeight(node: AVLNode): void {
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  private rotateRight(y: AVLNode): AVLNode {
    const x = y.left!;
    const T2 = x.right;

    // Rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  private rotateLeft(x: AVLNode): AVLNode {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  private insertNode(node: AVLNode | null, value: number): AVLNode {
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node; // no duplicates
    }

    this.updateHeight(node);

    const balance = this.getBalance(node);

    // LL Case
    if (balance > 1 && value < (node.left?.value ?? 0)) {
      return this.rotateRight(node);
    }

    // RR Case
    if (balance < -1 && value > (node.right?.value ?? 0)) {
      return this.rotateLeft(node);
    }

    // LR and RL cases could be added as needed

    return node;
  }

  insert(value: number): void {
    this.root = this.insertNode(this.root, value);
  }

  // Traverse for test validation
  inOrder(node: AVLNode | null = this.root): number[] {
    if (!node) return [];
    return [...this.inOrder(node.left), node.value, ...this.inOrder(node.right)];
  }
}

/** --- TEST ---
describe('AVL Tree Insertion and Rotation', () => {
  it('performs right rotation (LL case) when inserting 3 into 30→20→10→5 tree', () => {
    const tree = new AVLTree();

    // Build the unbalanced tree manually
    [30, 20, 40, 10, 25, 5, 50, 60].forEach((v) => tree.insert(v));
    tree.insert(3); // Triggers LL rotation at node 10

    // Validate in-order traversal stays sorted
    expect(tree.inOrder()).toEqual([3, 5, 10, 20, 25, 30, 40, 50, 60]);

    // Spot check structure
    const root = tree.root!;
    expect(root.value).toBe(30);
    expect(root.left?.left?.value).toBe(5); // Left child of 20 is now 5
    expect(root.left?.left?.left?.value).toBe(3);
    expect(root.left?.left?.right?.value).toBe(10);
  });
});

 **/
