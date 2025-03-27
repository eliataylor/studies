function graphDistances(g, s) {
    const graph = new Graph(g.length)
    for(let v = 0; v < g.length; v++){
        for(let w = 0; w < g.length; w++){
            if(g[v][w] === -1) {
                continue;
            }
            const edge = new Edge(v, w, g[v][w])
            graph.addEdge(edge)
        }
    }

    const sp = new Djikstra(graph, s);

    return sp.distanceTo
}

function Edge(from, to, weight) {
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

        let queue = new Array(graph.V).fill(null).map((_, index) => index); // [0,1,2,...n]

        while(queue.length){
            queue.sort((v, w) => {
                return  this.distanceTo[v] - this.distanceTo[w]
            })
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



const tests = [
    {
        name: 'Test 1',
        arg: [[[-1,3,2],
            [2,-1,0],
            [-1,0,-1]], 0],
        expected: [0, 2, 2]
    },
    {
        name: 'Test 2',
        arg: [[[-1,1,2],
            [0,-1,3],
            [0,0,-1]], 1],
        expected: [0, 0, 2]
    },
    {
        name: 'Test 3',
        arg: [[[-1,0,0,0],
            [-1,-1,-1,30],
            [1,1,-1,1],
            [2,2,0,-1]], 3],
        expected: [1, 1, 0, 0]
    },
    {
        name: 'Test 4',
        arg: [[[-1,-1,2],
            [1,-1,0],
            [-1,1,-1]], 0],
        expected: [0, 3, 2]
    }
];

tests.forEach((o, i) => {
    let result = graphDistances(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})




