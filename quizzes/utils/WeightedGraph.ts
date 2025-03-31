// Define types for vertices and edges
type VertexId = string | number;

interface Vertex<T = any> {
  id: VertexId;
  data?: T; // Optional data associated with the vertex
}

interface Edge<W = number> {
  source: VertexId;
  target: VertexId;
  weight: W;
  directed?: boolean; // Whether this is a directed edge
}

// Define the graph structure
class WeightedGraph<VertexData = any, EdgeWeight = number> {
  private vertices: Map<VertexId, Vertex<VertexData>> = new Map();
  private edges: Edge<EdgeWeight>[] = [];

  // Add a vertex to the graph
  addVertex(id: VertexId, data?: VertexData): void {
    if (!this.vertices.has(id)) {
      this.vertices.set(id, { id, data });
    }
  }

  // Add an edge between vertices
  addEdge(source: VertexId, target: VertexId, weight: EdgeWeight, directed: boolean = false): void {
    // Ensure vertices exist
    if (!this.vertices.has(source)) {
      this.addVertex(source);
    }
    if (!this.vertices.has(target)) {
      this.addVertex(target);
    }

    // Add the edge
    this.edges.push({ source, target, weight, directed });

    // If undirected, add the reverse edge as well
    if (!directed) {
      this.edges.push({ source: target, target: source, weight, directed });
    }
  }

  // Get all edges from a vertex
  getEdgesFrom(vertexId: VertexId): Edge<EdgeWeight>[] {
    return this.edges.filter(edge => edge.source === vertexId);
  }

  // Get vertex by ID
  getVertex(id: VertexId): Vertex<VertexData> | undefined {
    return this.vertices.get(id);
  }

  // Other useful methods would go here
  // ...
}
