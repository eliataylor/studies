function kthLargestElementOld(nums, k) {
    let sorted = new Int16Array(nums);
    sorted = sorted.sort();
    let val = sorted.slice((k) * -1);
    console.log(sorted, val);
    return val[0];
}

kthLargestElementSimple = (n, k) => n.sort((a, b) => b - a)[k - 1]


function kthLargestElementClosures(nums, k) {
    const heap = [];

    function add(n) {
        let index = heap.push(n) - 1;
        let parentIndex = Math.floor((index - 1) / 2);

        //compare to parent, swap with parent until order is restored
        while (index > 0 && heap[index] > heap[parentIndex]) {
            [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
            [index, parentIndex] = [parentIndex, Math.floor((parentIndex - 1) / 2)];
        }
    }

    function remove() {
        const value = heap[0];
        heap[0] = heap.pop();

        let index = 0;

        while (index < heap.length) {
            const element = heap[index];
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            const [left, right] = heap.slice(leftIndex, rightIndex + 1);
            const nextIndex = right && right > left ? rightIndex : leftIndex;

            if (!left || (element >= left && (!right || element >= right))) break;

            [heap[index], heap[nextIndex]] = [heap[nextIndex], heap[index]];
            index = nextIndex;
        }

        return value;
    }

    for (const num of nums) add(num);

    let value;
    for (let i = 0; i < k; i++) value = remove();
    return value;
}


//Best idea:
// - Use a heap to store all values
// - Heap insertion is, on average, O(1)
// - Heap removal is, on average, O(log n)
// - Therefore, the total time is O(n + k log n)

//We can use a min heap if k~n.

var min = false;

function Heap() {
    this.heap = [];
}

//Stopping condition for swapping elements
Heap.prototype.brake = function (a, b) {
    return typeof b == "undefined" ||
        (min ? a < b : a > b);
}

//Insert and, as long as the parent is greater,
// pivot the value with its parent
Heap.prototype.insert = function (value) {
    var vIx = this.heap.push(value) - 1;
    for (; vIx;) {
        var pIx = (vIx + 1 >> 1) - 1,
            v = this.heap[vIx],
            p = this.heap[pIx];
        if (this.brake(p, v))
            break;
        this.heap[vIx] = p;
        this.heap[pIx] = v;
        vIx = pIx;
    }
}

//Pop, swap the bottom into the top,
// and pivot it down the tree
Heap.prototype.pop = function () {
    var out = this.heap[0],
        pIx = 0,
        len = this.heap.length;

    if (len == 1)
        return this.heap.pop();

    this.heap[0] = this.heap.pop();
    len--;

    //We have to compare both children
    for (; pIx < len;) {
        var c2Ix = 2 * (pIx + 1),
            c1Ix = c2Ix - 1,
            c1 = this.heap[c1Ix],
            c2 = this.heap[c2Ix],
            c, cIx,
            p = this.heap[pIx];
        if (this.brake(c1, c2)) {
            c = c1;
            cIx = c1Ix;
        } else {
            c = c2;
            cIx = c2Ix;
        }
        if (this.brake(p, c))
            break;
        this.heap[pIx] = c;
        this.heap[cIx] = p;
        pIx = cIx;
    }

    return out;
}

function kthLargestElement(nums, k) {
    var heap = new Heap(),
        out = 0;

    //Should we use a min or a max heap?
    if (min = k > nums.length / 2)
        k = 1 + nums.length - k;

    //Insert all values into the heap
    for (var v of nums)
        heap.insert(v);

    //Pop the first k values
    for (; k--;)
        out = heap.pop();

    //Return the last value popped
    return out;
}


const tests = [
    {
        name: 'Test 1',
        arg: [[7, 6, 5, 4, 3, 2, 1], 2],
        expected: 6
    },
    {
        name: 'Test 2',
        arg: [[99, 99], 1],
        expected: 99
    },
    {
        name: 'Test 3',
        arg: [[-1, 2, 0], 2],
        expected: 0
    },
    {
        name: 'Test 4',
        arg: [[3, 1, 2, 4], 2],
        expected: 3
    }
];

tests.forEach((o, i) => {
    let result = kthLargestElement(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
