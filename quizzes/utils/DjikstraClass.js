/**
 * Calculate shortest distances from source vertex to all other vertices
 * @param g Adjacency matrix representation of the graph where -1 indicates no edge
 * @param s Source vertex index
 * @returns Array of shortest distances from source to each vertex
 */
function graphDistances(g: number[][], s: number): number[] {
  // Create a graph from the adjacency matrix
  const graph = new Graph(g.length);

  // Populate the graph with edges from the adjacency matrix
  for (let v = 0; v < g.length; v++) {
    for (let w = 0; w < g.length; w++) {
      // Skip if there's no edge (-1 indicates no connection)
      if (g[v][w] === -1) {
        continue;
      }
      // Create and add an edge with the specified weight
      const edge = new Edge(v, w, g[v][w]);
      graph.addEdge(edge);
    }
  }

  // Run Dijkstra's algorithm from the source vertex
  const sp = new Dijkstra(graph, s);

  // Return the array of shortest distances
  return sp.distanceTo;
}

/**
 * Edge class representing a directed edge with weight
 */
class Edge {
  from: number;
  to: number;
  weight: number;

  constructor(from: number, to: number, weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

/**
 * Graph class using adjacency lists to represent a graph
 */
class Graph {
  V: number; // Number of vertices
  adjacencies: Edge[][]; // Adjacency lists for each vertex

  constructor(V: number) {
    this.V = V;
    // Initialize adjacency lists for each vertex
    this.adjacencies = Array(V).fill(null).map(() => []);
  }

  /**
   * Add a directed edge to the graph
   * @param edge The edge to add
   */
  addEdge(edge: Edge): void {
    this.adjacencies[edge.from].push(edge);
  }
}

/**
 * Implementation of Dijkstra's algorithm for finding shortest paths
 */
class Dijkstra {
  edgeTo: (number | null)[]; // Previous vertex on shortest path to each vertex
  distanceTo: number[]; // Shortest distance to each vertex

  /**
   * Run Dijkstra's algorithm from the source vertex
   * @param graph The graph to traverse
   * @param s The source vertex
   */
  constructor(graph: Graph, s: number) {
    // Initialize arrays for tracking paths and distances
    this.edgeTo = Array(graph.V).fill(null);
    this.distanceTo = Array(graph.V).fill(Number.MAX_SAFE_INTEGER);

    // Distance to source is 0
    this.distanceTo[s] = 0;

    // Create a queue of all vertices
    // Initially, all vertices are in the queue
    let queue: number[] = Array(graph.V).fill(null).map((_, index) => index);

    // Process vertices in order of increasing distance
    while (queue.length) {
      // Sort the queue by distance (greedy selection of next vertex)
      queue.sort((v, w) => {
        return this.distanceTo[v] - this.distanceTo[w];
      });

      // Get the vertex with minimum distance
      const v = queue.shift()!;

      // Relax all edges coming from this vertex
      graph.adjacencies[v].forEach(edge => {
        this.relax(edge);
      });
    }
  }

  /**
   * Relax an edge: update the shortest path if a better one is found
   * @param edge The edge to relax
   */
  relax(edge: Edge): void {
    const to = edge.to;
    const from = edge.from;

    // If we found a shorter path to 'to', update the distance and parent
    if (this.distanceTo[from] + edge.weight < this.distanceTo[to]) {
      this.distanceTo[to] = this.distanceTo[from] + edge.weight;
      this.edgeTo[to] = from;
    }
  }
}

// Test cases
interface TestCase {
  name: string;
  arg: [number[][], number];
  expected: number[];
}

const tests: TestCase[] = [
  {
    name: 'Test 1',
    arg: [
      [
        [-1, 3, 2],
        [2, -1, 0],
        [-1, 0, -1]
      ],
      0
    ],
    expected: [0, 2, 2]
  },
  {
    name: 'Test 2',
    arg: [
      [
        [-1, 1, 2],
        [0, -1, 3],
        [0, 0, -1]
      ],
      1
    ],
    expected: [0, 0, 2]
  },
  {
    name: 'Test 3',
    arg: [
      [
        [-1, 0, 0, 0],
        [-1, -1, -1, 30],
        [1, 1, -1, 1],
        [2, 2, 0, -1]
      ],
      3
    ],
    expected: [1, 1, 0, 0]
  },
  {
    name: 'Test 4',
    arg: [
      [
        [-1, -1, 2],
        [1, -1, 0],
        [-1, 1, -1]
      ],
      0
    ],
    expected: [0, 3, 2]
  }
];

// Run all the test cases
tests.forEach((testCase, i) => {
  const result = graphDistances(...testCase.arg);
  console.log(
    `TEST ${testCase.name}: ${i} ${
      JSON.stringify(result) === JSON.stringify(testCase.expected) ? 'PASSED' : 'FAILED'
    }`
  );
  // Also print the result for debugging
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(testCase.expected)}`);
  console.log('---');
});
