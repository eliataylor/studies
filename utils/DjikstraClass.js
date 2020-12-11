function graphDistances(g, s) {
    let V = g.length
    const graph = new Graph(V)
    for(let v = 0; v < V; v++){
        for(let w = 0; w < V; w++){
            if(g[v][w] === -1)continue

            const edge = new Edge(v, w, g[v][w])
            graph.addEdge(edge)
        }
    }

    const sp = new Djikstra(graph, s);

    return sp.distanceTo
}

function Edge(from, to, weight){
    this.from = from
    this.to = to
    this.weight = weight
}


class Graph {
    constructor(V){
        this.V = V
        this.adjacencies = new Array(V).fill([])
    }

    addEdge(edge){
        this.adjacencies[edge.from].push(edge)
    }
}


class Djikstra {

    constructor(graph, s) {
        this.edgeTo = new Array(graph.V).fill(null);
        this.distanceTo = new Array(graph.V).fill(Number.MAX_SAFE_INTEGER);
        this.distanceTo[s] = 0;

        const sortByDistance = ((v, w) => {
            return  this.distanceTo[v] - this.distanceTo[w]
        })

        let queue = new Array(graph.V).fill(null).map((_, index) => index)

        while(queue.length){
            queue.sort(sortByDistance)
            const v = queue.shift()

            graph.adjacencies[v].forEach(edge => {
                this.relax(edge);
            })
        }
    }

    relax(edge){
        const to = edge.to
        const from  = edge.from
        if(this.distanceTo[from] + edge.weight < this.distanceTo[to]) {
            this.distanceTo[to] = this.distanceTo[from] + edge.weight
            this.edgeTo[to] = from;
        }
    }
}



