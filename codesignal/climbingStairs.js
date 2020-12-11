// dynamic
function CombinationsUtil(n, k, comb, ans) {
    if (n===0) {
        ans.push(Object.assign([],comb));
        return comb;
    } else if (n<0) {
        return comb;
    }
    for(let i=1; i<=k; i++) {
        comb.push(i);
        let test = CombinationsUtil(n-i, k ,comb, ans);
        comb.pop();
    }
    return comb;
}
function climbingStaircase6(n, k) {
    let ans = [];
    let comb = [];
    CombinationsUtil(n, k, comb, ans);
    return ans;
}

function climbingStaircase(n, k) {
    const dp = [[[]]];

    for(let i = 1; i <= n; i++) {
        let next = [];
        for(let jump = 1; jump <= Math.min(i, k); jump++) {
            let ordered = dp[i - jump];
            ordered = ordered.map(arr => {
               return [jump, ...arr]
            });
            next.push(...ordered);
        }
        dp.push(next);
    }
    console.log(dp)
    return dp.pop();
}

// with memoization
function climbingStaircase2(n, k, memo = {}) {
    if(n === 0) return [[]];
    if(n in memo) return memo[n];

    let total = [];

    for(let jump = 1; jump <= Math.min(n, k); jump++) {
        total.push(...climbingStaircase(n - jump, k, memo).map(arr => [jump, ...arr]))
    }

    memo[n] = total;
    return total;
}

function climbingStaircase1(n, k) {
    if(n === 0) return [[]];

    let total = [];

    for(let jump = 1; jump <= Math.min(n, k); jump++) {
        total.push(...climbingStaircase(n - jump, k).map(arr => [jump, ...arr]))
    }

    return total;
}


function climbingStaircaseOld(n, k) {

    function permute(permutation, min) {
        let length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

        while (i < length) {
            if (c[i] < i) {
                k = i % 2 && c[i];
                p = permutation[i];
                permutation[i] = permutation[k];
                permutation[k] = p;
                ++c[i];
                i = 1;
                let order = permutation.slice();
                let sum = getPermSum(order);
                if (sum >= min) {
                    result.push(order);
                }
            } else {
                c[i] = 0;
                ++i;
            }
        }
        return result;
    }

    function getPermSum(order) {
        return order.reduce((acc, val) => acc + val);
    }

    if (k < 2) return [new Array(n).fill(1)]; // 1-by-1

    let results = [];
    let allSteps = new Uint8Array(k).map((item, i) => i + 1);
    let map = new Map();
    allSteps.forEach(v => {
        map.set(v, {num:Math.floor(n/v), diff:n%v, step:v});
    })
    console.log(map);
    map.forEach((obj, step) => {
        let options = new Array(obj.num).fill(step);
        if (obj.diff > 0) {
            options.push(diff);
            let orders = permute(options, n);
            results = results.concat(orders);
            // TODO: loop over
        } else {
            results.push(options); // all the same
        }
    })

    console.log(results);
    return results;
}



const tests = [
    /* {
        name:'Test 1',
        arg: [4,2],
        expected:[[1,1,1,1],
            [1,1,2],
            [1,2,1],
            [2,1,1],
            [2,2]]
    }, */
    {
        name:'Test 2',
        arg: [7,3],
        expected: [
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            [
                1,
                1,
                1,
                1,
                1,
                2
            ],
            [
                1,
                1,
                1,
                1,
                2,
                1
            ],
            [
                1,
                1,
                1,
                1,
                3
            ],
            [
                1,
                1,
                1,
                2,
                1,
                1
            ],
            [
                1,
                1,
                1,
                2,
                2
            ],
            [
                1,
                1,
                1,
                3,
                1
            ],
            [
                1,
                1,
                2,
                1,
                1,
                1
            ],
            [
                1,
                1,
                2,
                1,
                2
            ],
            [
                1,
                1,
                2,
                2,
                1
            ],
            [
                1,
                1,
                2,
                3
            ],
            [
                1,
                1,
                3,
                1,
                1
            ],
            [
                1,
                1,
                3,
                2
            ],
            [
                1,
                2,
                1,
                1,
                1,
                1
            ],
            [
                1,
                2,
                1,
                1,
                2
            ],
            [
                1,
                2,
                1,
                2,
                1
            ],
            [
                1,
                2,
                1,
                3
            ],
            [
                1,
                2,
                2,
                1,
                1
            ],
            [
                1,
                2,
                2,
                2
            ],
            [
                1,
                2,
                3,
                1
            ],
            [
                1,
                3,
                1,
                1,
                1
            ],
            [
                1,
                3,
                1,
                2
            ],
            [
                1,
                3,
                2,
                1
            ],
            [
                1,
                3,
                3
            ],
            [
                2,
                1,
                1,
                1,
                1,
                1
            ],
            [
                2,
                1,
                1,
                1,
                2
            ],
            [
                2,
                1,
                1,
                2,
                1
            ],
            [
                2,
                1,
                1,
                3
            ],
            [
                2,
                1,
                2,
                1,
                1
            ],
            [
                2,
                1,
                2,
                2
            ],
            [
                2,
                1,
                3,
                1
            ],
            [
                2,
                2,
                1,
                1,
                1
            ],
            [
                2,
                2,
                1,
                2
            ],
            [
                2,
                2,
                2,
                1
            ],
            [
                2,
                2,
                3
            ],
            [
                2,
                3,
                1,
                1
            ],
            [
                2,
                3,
                2
            ],
            [
                3,
                1,
                1,
                1,
                1
            ],
            [
                3,
                1,
                1,
                2
            ],
            [
                3,
                1,
                2,
                1
            ],
            [
                3,
                1,
                3
            ],
            [
                3,
                2,
                1,
                1
            ],
            [
                3,
                2,
                2
            ],
            [
                3,
                3,
                1
            ]
        ]
    }
];

tests.forEach((o, i) => {
    let result = climbingStaircase(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
