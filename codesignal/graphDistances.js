// https://en.wikipedia.org/wiki/Dijkstra's_algorithm
graphDistances3 = (g, s) => {
    d = Array(g.length).fill(31)
    q = [...g.keys()]
    for (d[s] = 0; q.length; )
        for (e in g[n = q.sort((a, b) => d[b] - d[a]).pop()]) {
            if (g[n][e] < 0)
                continue
            d[e] = Math.min(g[n][e] + d[n], d[e])
        }
    return d
}


//********************** DIJKSTRA ALGORITHMN *******************************
function graphDistances(g, s) {
    //Dijkstra Algorithmn

    console.time('time')
    const n = g.length
    let treeMap = new BinaryMinHeapMap(),
        distance = []
    for(let vertex = 0;vertex < n;vertex++) {
        g[vertex][vertex] = 0
        treeMap.add(vertex, Infinity)
    }
    treeMap.set(s, 0)
    while(treeMap.getSize()) {
        let currentNode = treeMap.extractMin(),
            currentVertex = currentNode.vertex,
            currentDistance = currentNode.data
        distance[currentVertex] = currentDistance
        for(let nextVertex = 0;nextVertex < n;nextVertex++) {
            if(g[currentVertex][nextVertex] !== -1 && treeMap.has(nextVertex)) {
                const newDistance = currentDistance + g[currentVertex][nextVertex],
                    nextNode = treeMap.get(nextVertex)
                if(newDistance < nextNode.data) {
                    treeMap.set(nextVertex, newDistance)
                }
            }
        }
    }
    console.timeEnd('time')
    return distance
}
//******************** BELLMAN-FORD *************************************
function graphDistances1(g, s) {
    console.time('time')
    //Bellman-Ford Algorithmn
    const n = g.length;
    //A path to j stores the vertex i that it connects to j
    //And the path from start vertex to i is shortest
    //So if we want to know exactly what that path is we can transverse
    let distance = new Array(n).fill(Infinity),
        path = new Array(n)
    distance[s] = 0
    path[s] = s
    //A random order to visit every conected nodes
    let visit = []
    g.forEach((v, i) => v.forEach((q, j) => q !== -1 ? visit.push([i, j]) : ``))
    //Run n - 1 times
    for(let times = 1;times < n;times++) {
        visit.forEach(v => {
            const [i, j] = v;
            //min distance from start vertex to vertex j
            //will equal min distance from start vertex to vertex i + weight(vertex i -> j)
            if(distance[j] > distance[i] +g[i][j]) {
                distance[j] = distance[i] + g[i][j]
                path[j] = i
            }
        })
    }
    console.timeEnd('time')
    return distance
}
//******************** FLOYED WHARSHALL **********************
function graphDistances2(g, s) {
    //Floyd Warshall algorithmn
    console.time('time')
    const n = g.length
    let distance = g.map((v, i) => v.map((q, j) => i == j ? 0 : q == -1 ? Infinity : q )),
        path = g.map((v, i) => v.map(q => q === -1 ? null : i))

    //Notice the order to loop is important we CANNOT change it
    for(let k = 0;k < n;k++) {
        for(let i = 0;i < n;i++) {
            for(let j = 0;j < n;j++) {
                if(distance[i][k] === Infinity || distance[k][j] === Infinity) continue
                if(distance[i][j] > distance[i][k] + distance[k][j]) {
                    distance[i][j] = distance[i][k] + distance[k][j]
                    path[i][j] = path[k][j]
                }
            }
        }
    }
    console.timeEnd('time')
    return distance[s]
}
/******************* BINARY HEAP + MAP ****************************/
function BinaryMinHeapMap() {
    let heap = [],
        map = new Map()
    function Node(vertex, data) {
        this.vertex = vertex
        this.data = data
    }
    //swap to position in the heap, update vertex position
    //Update the position of two vertex in 2 two positions
    function swap(pos1, pos2) {
        const vertex1 = heap[pos1].vertex,
            vertex2 = heap[pos2].vertex,
            tmp = heap[pos1]
        map.set(vertex1, pos2)
        map.set(vertex2, pos1)
        heap[pos1] = heap[pos2]
        heap[pos2] = tmp
    }
    //Arrange heap from child to it's parent
    function fix(pos) {
        //If it's not the root
        if(pos) {
            const parent = (pos - 1) >> 1
            if(heap[pos].data < heap[parent].data) {
                swap(pos, parent)
                fix(parent)
            }
        }
    }
    //arrange heap from parent to it's children
    function arrangeHeap(parent) {
        const left = parent * 2 + 1,
            right = left + 1
        //Stop when that node has less than 2 children
        //None child
        if(heap[left] === undefined && heap[right] === undefined) return
        //One child
        if(heap[left] === undefined || heap[right] === undefined) {
            if(heap[left] === undefined) {
                heap[right].data < heap[parent].data && swap(right, parent)
            } else heap[left].data < heap[parent].data && swap(left, parent)
            return
        }
        //Continue sorting heap
        if(heap[parent].data > Math.min(heap[left].data, heap[right].data)) {
            if(heap[left].data < heap[right].data) {
                swap(left, parent)
                arrangeHeap(left)
            } else {
                swap(right, parent)
                arrangeHeap(right)
            }
        }
    }
    this.getHeap = function() {
        return heap
    }
    this.getMap = function() {
        return map
    }
    this.getSize = function() {
        return heap.length
    }
    this.get = function(vertex) {
        return heap[map.get(vertex)]
    }
    this.has = function(vertex) {
        return map.has(vertex)
    }
    this.add = function(vertex, data) {
        const pos = heap.length,
            node = new Node(vertex, data)
        //Add node to the heap, add position of the vertex to map
        heap.push(node)
        map.set(vertex, pos)
        //Fix the heap(From child to parent in case current data is smaller than parent)
        fix(pos)
        return node
    }
    this.min = function() {
        return heap[0]
    }
    //Remove a node at position `pos` in the heap
    this.removeAt = function(pos) {
        //Do nothing is the position is invalid
        if(pos >= heap.length) return null;
        let node = heap[pos]
        //swap the current position with the last position
        swap(pos, heap.length - 1)
        //Get rid of the node that we need to remove
        heap.pop()
        //Remove vertex of that node in map
        map.delete(node.vertex)
        arrangeHeap(pos)
        return node
    }
    //Remove a vertex
    this.removeVertex = function(vertex) {
        return this.removeAt(map.get(vertex))
    }
    //extract the min node in the heap
    this.extractMin = function() {
        return this.removeAt(0)
    }
    //Set value of a vertex to a new value
    this.set = function(vertex, data) {
        const pos = map.get(vertex),
            node = heap[pos]
        node.data = data
        //After updating
        //Fix if current is smaller than child(from child to parent)
        fix(pos)
        //Arrange if current is bigger than child(from parent to child)
        arrangeHeap(pos)
        return node
    }
}
//*********************************
