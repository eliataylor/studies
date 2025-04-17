const _ = require('lodash');

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");

_.times(4, () => console.log(greeter.greet()));


// Your previous Plain Text content is preserved below:

// Welcome to Meta!

// This is just a simple shared plaintext pad, with no execution capabilities.

// When you know what language you would like to use for your interview,
// simply choose it from the dropdown in the left bar.

// Enjoy your interview!


// Given the root of a binary tree containing integers, print its columns from left to right, and within each column print the values from top to bottom.


// Input:
//       6(0)
//      / \
//     3(-1)   4
//    /   / \
//   5(-2)   1   0
//    \     /
//     2(-1)   8
//    / \
//   9(-2)   7

// Output:
// 5 9 3 2 6 1 7 4 8 0


function test(root): number[] {
  const result = [];
  const columns = {}

  const queue = [(root, 0, 0)]
  const min_col = 0
  const max_col = 0

  while(queue) {
     const [node, col, row] = queue.pop()
     columns[col] = []
     columns[col].append([row, node.value])

     min_col = Math.min(min_col, col)
     max_col = Math.max(max_col, col)


     if (node.left) {
        queue.append([node.left, col-1, row+1])
     }

     if (node.right) {
      queue.append([node.right, col+1, row+1])
     }

  }

  for(let i=0; i< columns.length; i++) {
     const vals = columns[i].map(c => c[1])
     result.push(...vals)
  }

  return result;


}


// Utopia is a collection of tropical islands connected with bridges. Utopia mayor want to renew bridges, but firstly all bridges must be destructed using a bulldozer. A bulldozer destroys a bridge once it passes over it, hence you have to plan your path carefully. Can you find a path given all bridges?

// You are given a list of bridges (i,j) where a bridge connects island i with island j. Expected output is true if a path is possible, otherwise false.

// Examples
// Note that in this example if you start from 2 you can not destruct all bridges.
// Input: [(0,1),(1,2),(1,2)]                [0]----[1]====[2]
// Output: true
// In example below, you can not destruct all bridges regardless where you start.
// Input: [(0,1),(1,2),(1,2),(2,3)]          [0]----[1]====[2]----[3]
// Output: false


function shortest_path(bridges) {

    const graph = {}

    for(let k=0; k< bridges.length; k++) {
        const bridge = bridges[k];

        const i = bridge[0];
        const j = bridge[1];
        if (typeof graph[i] === 'undefined') {
          graph[i] = []
        }

        if (typeof graph[j] === 'undefined') {
          graph[j] = []
        }

        graph[j].push(i)
        graph[i].push(j)

    }

    const connections = 0
    for (let m in graph) {
      if (graph[m].length % 2 === 1) {
            connections += 1
      }
    }
    return connections === 0 || connections === 2

}
