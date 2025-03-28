/**
 * heap.js
 * JS heap implementation
 *
 */

var Heap = function (sort) {
    this._array = [];
    this._sort = sort;

    Object.defineProperty(this, 'length', {
        enumerable: true,
        get: function () {
            return this._array.length
        },
    });

    if (typeof this._sort !== 'function') {
        this._sort = function (a, b) {
            return a - b;
        }
    }
};

Heap.prototype.push = function (node) {
    node = node || {};
    this._array.push(node);
    this._bubble();
};

Heap.prototype.pop = function () {
    if (this.isEmpty()) {
        return null;
    }
    var top = this.peek();
    var last = this._array.pop();
    if (this.length > 0) {
        this._array[0] = last;
        this._sink();
    }
    return top;
};

Heap.prototype.peek = function () {
    return this._array[0];
};

Heap.prototype.isEmpty = function () {
    return this.length === 0;
};

Heap.prototype._compare = function (i, j) {
    return this._sort(this._array[i], this._array[j]) > 0;
};

Heap.prototype._bubble = function () {
    var i = this.length - 1;
    var j = this._parent(i);

    while (j !== null && this._compare(i, j)) {
        this._swap(i, j);
        i = j;
        j = this._parent(i);
    }
};

Heap.prototype._heapify = function (index) {

    var extr = index;
    var left = 2 * index + 1;
    var right = 2 * index + 2;
    var temp;

    if (left < this._array.length &&
        this._compare(left, index) > 0) {
        extr = left;
    }

    if (right < this._array.length &&
        this._compare(right, index) > 0 &&
        this._compare(right, left) > 0) {
        extr = right;
    }

    if (index !== extr) {
        temp = this._array[index];
        this._array[index] = this._array[extr];
        this._array[extr] = temp;
        this._heapify(extr);
    }

};

Heap.prototype._sink = function () {
    var i = 0;
    var lc = this._left(i);
    var rc = this._right(i);
    var next;

    while (lc !== null) {
        next = lc;
        if (rc !== null && this._compare(rc, lc)) {
            next = rc;
        }
        if (this._compare(next, i)) {
            this._swap(i, next);
            i = next;
            lc = this._left(i);
            rc = this._right(i);
        } else {
            return;
        }
    }
};

Heap.prototype.changeKey = function (index, value) {

    this._array[index] = value;
    var elem = this._array[index];
    var parent = Math.floor(index / 2);
    var temp;

    if (elem !== undefined) {
        while (parent >= 0 && this._compare(index, parent) > 0) {

            temp = this._array[parent];
            this._array[parent] = elem;
            this._array[index] = temp;
            index = parent;
            parent = Math.floor(parent / 2);
        }

        this._heapify(index);

    }

    return parent;

};

Heap.prototype.update = function (node) {
    var idx = this._array.map(function (e) {
        return e.index;
    }).indexOf(node.index);
    if (idx >= 0) {
        this.changeKey(idx, node);
    }
};

Heap.prototype._parent = function (i) {
    var pi = (i - 1) / 2 >> 0;
    return pi >= 0 ? pi : null;
};

Heap.prototype._left = function (i) {
    var li = i * 2 + 1;
    return li < this.length ? li : null;
};

Heap.prototype._right = function (i) {
    var ri = i * 2 + 2;
    return ri < this.length ? ri : null;
};

Heap.prototype._swap = function (i, j) {
    var a = this._array;
    var v = a[i];
    a[i] = a[j];
    a[j] = v;
};

function Vertex(i, d) {
    this.index = i;
    this.distance = d;
}

function graphDistances(g, s) {

    const getDistance = (src, dest) => {
        let distance = [];
        let visited = [];
        let queue = new Heap((a, b) => {
            return b.distance - a.distance;
        });

        for (let i = 0; i < g.length; i++) {
            let vert = new Vertex(i, Infinity);

            if (src === i) {
                vert.distance = 0;
            }

            visited[i] = false;
            distance[i] = vert;

            queue.push(vert);
        }
        let current = new Vertex(src, 0);
        while (current.index !== dest && isFinite(current.distance)) {
            for (let i = 0; i < g.length; i++) {
                if (current.index !== i && !visited[i] && g[i][current.index] !== -1) {

                    let dist = current.distance + g[i][current.index];
                    if (dist < distance[i].distance) {
                        distance[i].distance = dist;
                        queue.update(distance[i]);
                    }
                }
            }

            visited[current.index] = true;
            current = queue.pop();
        }


        if (distance[dest]) {
            return distance[dest].distance;
        }

        return -1;
    }

    let output = [];
    for (let i = 0; i < g.length; i++) {
        let d = getDistance(i, s);
        output.push(d);
    }

    return output;
}

const tests = [
    {
        name: 'Test 1',
        arg: [[[-1, 3, 2],
            [2, -1, 0],
            [-1, 0, -1]], 0],
        expected: [0, 2, 2]
    },
    {
        name: 'Test 2',
        arg: [[[-1, 1, 2],
            [0, -1, 3],
            [0, 0, -1]], 1],
        expected: [0, 0, 2]
    },
    {
        name: 'Test 3',
        arg: [[[-1, 0, 0, 0],
            [-1, -1, -1, 30],
            [1, 1, -1, 1],
            [2, 2, 0, -1]], 3],
        expected: [1, 1, 0, 0]
    },
    {
        name: 'Test 4',
        arg: [[[-1, -1, 2],
            [1, -1, 0],
            [-1, 1, -1]], 0],
        expected: [0, 3, 2]
    }
];

tests.forEach((o, i) => {
    let result = graphDistances(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
