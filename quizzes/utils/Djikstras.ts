// TypeScript implementation of Dijkstra's algorithm

// Graph representation using adjacency list
type Edge = {
  to: number;
  weight: number;
};

type Graph = {
  vertices: number;
  adjacencyList: Edge[][];
};

// Create a new graph with 'n' vertices
function createGraph(n: number): Graph {
  const adjacencyList: Edge[][] = Array(n).fill(null).map(() => []);
  return {
    vertices: n,
    adjacencyList
  };
}

// Add an edge from vertex 'from' to vertex 'to' with weight 'weight'
function addEdge(graph: Graph, from: number, to: number, weight: number): void {
  graph.adjacencyList[from].push({ to, weight });
}

// Implementation of Dijkstra's algorithm
function dijkstra(graph: Graph, source: number): {
  distances: number[],
  previousVertices: (number | null)[]
} {
  const { vertices, adjacencyList } = graph;

  // Initialize distances and previous vertices arrays
  const distances: number[] = Array(vertices).fill(Infinity);
  const previousVertices: (number | null)[] = Array(vertices).fill(null);

  // Distance from source to itself is 0
  distances[source] = 0;

  // Set of unvisited vertices
  const unvisited: Set<number> = new Set();
  for (let i = 0; i < vertices; i++) {
    unvisited.add(i);
  }

  // Main loop
  while (unvisited.size > 0) {
    // Find vertex with minimum distance
    let minDistance = Infinity;
    let currentVertex = -1;

    for (const vertex of unvisited) {
      if (distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        currentVertex = vertex;
      }
    }

    // If we can't find a vertex with finite distance,
    // it means remaining vertices are not reachable from source
    if (currentVertex === -1) break;

    // Remove current vertex from unvisited set
    unvisited.delete(currentVertex);

    // Update distances to neighbors
    for (const edge of adjacencyList[currentVertex]) {
      if (unvisited.has(edge.to)) {
        const newDistance = distances[currentVertex] + edge.weight;
        if (newDistance < distances[edge.to]) {
          distances[edge.to] = newDistance;
          previousVertices[edge.to] = currentVertex;
        }
      }
    }
  }

  return { distances, previousVertices };
}

// Reconstruct the shortest path from source to destination
function getPath(previousVertices: (number | null)[], destination: number): number[] {
  const path: number[] = [];
  let current = destination;

  while (current !== null) {
    path.unshift(current);
    current = previousVertices[current];
  }

  return path;
}

// Test case
function testDijkstra(): void {
  // Create a sample graph
  //    0
  //   / \
  //  1---2
  //  |\ /|
  //  | 4 |
  //  |/ \|
  //  3---5
  const graph = createGraph(6);

  // Add edges (bidirectional)
  addEdge(graph, 0, 1, 2);
  addEdge(graph, 0, 2, 4);
  addEdge(graph, 1, 0, 2);
  addEdge(graph, 1, 2, 1);
  addEdge(graph, 1, 3, 7);
  addEdge(graph, 1, 4, 3);
  addEdge(graph, 2, 0, 4);
  addEdge(graph, 2, 1, 1);
  addEdge(graph, 2, 4, 5);
  addEdge(graph, 2, 5, 6);
  addEdge(graph, 3, 1, 7);
  addEdge(graph, 3, 4, 1);
  addEdge(graph, 3, 5, 3);
  addEdge(graph, 4, 1, 3);
  addEdge(graph, 4, 2, 5);
  addEdge(graph, 4, 3, 1);
  addEdge(graph, 4, 5, 2);
  addEdge(graph, 5, 2, 6);
  addEdge(graph, 5, 3, 3);
  addEdge(graph, 5, 4, 2);

  // Run Dijkstra's algorithm from vertex 0
  const sourceVertex = 0;
  const { distances, previousVertices } = dijkstra(graph, sourceVertex);

  // Print distances from source to all vertices
  console.log(`Shortest distances from vertex ${sourceVertex}:`);
  distances.forEach((distance, vertex) => {
    console.log(`To vertex ${vertex}: ${distance === Infinity ? 'Not reachable' : distance}`);
  });

  // Print shortest paths from source to all vertices
  console.log("\nShortest paths:");
  for (let vertex = 0; vertex < graph.vertices; vertex++) {
    if (vertex === sourceVertex) continue;

    const path = getPath(previousVertices, vertex);
    if (path.length > 0 && path[0] === sourceVertex) {
      console.log(`To vertex ${vertex}: ${path.join(' → ')}`);
    } else {
      console.log(`To vertex ${vertex}: Not reachable`);
    }
  }

  // Test disconnected graph
  console.log("\nTesting disconnected graph:");
  const disconnectedGraph = createGraph(8);
  // Component 1
  addEdge(disconnectedGraph, 0, 1, 2);
  addEdge(disconnectedGraph, 1, 0, 2);
  addEdge(disconnectedGraph, 1, 2, 3);
  addEdge(disconnectedGraph, 2, 1, 3);
  // Component 2 (disconnected from component 1)
  addEdge(disconnectedGraph, 4, 5, 1);
  addEdge(disconnectedGraph, 5, 4, 1);
  addEdge(disconnectedGraph, 5, 6, 2);
  addEdge(disconnectedGraph, 6, 5, 2);
  addEdge(disconnectedGraph, 6, 7, 4);
  addEdge(disconnectedGraph, 7, 6, 4);

  const { distances: disconnectedDistances } = dijkstra(disconnectedGraph, 0);
  console.log("Distances from vertex 0 in disconnected graph:");
  disconnectedDistances.forEach((distance, vertex) => {
    console.log(`To vertex ${vertex}: ${distance === Infinity ? 'Not reachable' : distance}`);
  });
}

// Run the test
testDijkstra();
