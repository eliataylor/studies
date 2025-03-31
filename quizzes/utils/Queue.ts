class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  // Add element to the queue
  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
    return item;
  }

  // Remove element from the queue
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }

  // Get the front element
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.frontIndex];
  }

  // Check if queue is empty
  isEmpty() {
    return this.backIndex - this.frontIndex === 0;
  }

  // Get the size of the queue
  size() {
    return this.backIndex - this.frontIndex;
  }
}
