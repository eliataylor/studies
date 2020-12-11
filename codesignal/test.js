let n, i = 0;
let a = [];
let b = [];
b[i] = a[i - 1] + a[i] + a[i + 1];
b[0] = 0 + a[0] + a[1];

n = 5;
a = [4, 0, 1, -2, 3];

function keyVal(a, i) {
    return typeof a[i] === 'number' ? a[i] : 0;
}

function mutateTheArray(n, a){
    let i =0, b = [];
    while (i < n) {
        b[i] = keyVal(a, i-1)  + keyVal(a, i) + keyVal(a, i+1);
        i++;
    }
    console.log(b);
    return b;

};

// mutateTheArray(n, a); // === [4, 5, -1, 2, 1];

function alternatingSort(a) {
    let b = [];
    let pos = 0;
    while (b.length !== a.length) {
        b.push(a[pos])
        pos = (pos === b.length -1) ? a.length - 1 : b.length - 1;
        if (b.length > 1) {
            if (b[b.length-1] !== b[b.length-2] + 1) {
                console.log(b);
                // return false;
            }
        }
    }
    var test = 0;
    b.forEach((a, i) => {
        if (i > 1) {
            test = b[i-1];
            if (test <= a + 1) return false;
        }
    })
    console.log(b);
    return true;
}
//var test = alternatingSort([1, 3, 5, 6, 4, 2]);
//console.log(test);


function hashMap(queryType, query) {

    let map = {};

    function insert(x,y) {
        console.log('insert', map);
        map[x] = y;

    }

    function get(x) {
        console.log('get', map);
        return map[x] || 0;
    }

    function addToKey(x) {
        for(let i in map) {
            map[i+x] = map[i];
            delete map[i];
        }
        console.log('addToKey', map);
    }

    function addToValue(y) {
        for(let i in map) {
            map[i] += y;
        }
        console.log('addToValue', map);
    }

    if (queryType === 'get') return get(query)
    else this[queryType].call(query)

}

function makeArrayConsecutive2(statues) {
    statues.sort((a,b) => a - b);
    console.log(statues);

    let more = 0;
    statues.forEach( (val, i) => {
        if (i > 0) {
            more += Math.max(0, val - statues[i-1] - 1);
            console.log(i + ' more ' + more);
        }
    })
    return more;
}
// makeArrayConsecutive2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
