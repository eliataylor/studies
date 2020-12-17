/*
A positive integer D is a factor of a positive integer N if there exists an integer M such that N = D * M.

For example, 6 is a factor of 24, because M = 4 satisfies the above condition (24 = 6 * 4).

Write a function:

class Solution { public int solution(int N); }

that, given a positive integer N, returns the number of its factors.

For example, given N = 24, the function should return 8, because 24 has 8 factors, namely 1, 2, 3, 4, 6, 8, 12, 24. There are no other factors of 24.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..2,147,483,647].

 */


function solution(N) {
    if (N < 3) return N;

    let total = [];
    let sqrt = Math.floor(Math.sqrt(N));
    while(sqrt > 0) {
        if (N % sqrt === 0) {
            total.push(sqrt);
            if (N/sqrt !== sqrt) {
                total.push(N/sqrt);
            }
        }
        sqrt--;
    }
    console.log(total)
    return total.length;


}


const tests = [
    {
        "name": "Test 1",
        "arg": [24],
        "expected":8
    },
    {
        "name": "Test 1",
        "arg": [16],
        "expected":5
    },
    {
        "name": "Test 1",
        "arg": [36],
        "expected":9
    },
    {
        "name": "Test 1",
        "arg": [3],
        "expected":2
    },
    {
        "name": "Test 1",
        "arg": [8],
        "expected":4
    }
    ,
    {
        "name": "Test 1",
        "arg": [9],
        "expected":3
    },
    {
        "name": "Test 1",
        "arg": [4999696],
        "expected":45
    }
];

tests.forEach((o, i) => {
    let result = solution(...o.arg);
    console.log((o.name || 'TEST')  + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
