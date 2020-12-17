/*
The Fibonacci sequence is defined using the following recursive formula:

    F(0) = 0
    F(1) = 1
    F(M) = F(M - 1) + F(M - 2) if M >= 2
A small frog wants to get to the other side of a river. The frog is initially located at one bank of the river (position −1) and wants to get to the other bank (position N). The frog can jump over any distance F(K), where F(K) is the K-th Fibonacci number. Luckily, there are many leaves on the river, and the frog can jump between the leaves, but only in the direction of the bank at position N.

The leaves on the river are represented in an array A consisting of N integers. Consecutive elements of array A represent consecutive positions from 0 to N − 1 on the river. Array A contains only 0s and/or 1s:

0 represents a position without a leaf;
1 represents a position containing a leaf.
The goal is to count the minimum number of jumps in which the frog can get to the other side of the river (from position −1 to position N). The frog can jump between positions −1 and N (the banks of the river) and every position containing a leaf.

For example, consider array A such that:

    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
The frog can make three jumps of length F(5) = 5, F(3) = 2 and F(5) = 5.

Write a function:

class Solution { public int solution(int[] A); }

that, given an array A consisting of N integers, returns the minimum number of jumps by which the frog can get to the other side of the river. If the frog cannot reach the other side of the river, the function should return −1.

For example, given:

    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
the function should return 3, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..100,000];
each element of array A is an integer that can have one of the following values: 0, 1.
 */

import has = Reflect.has;

function solution(A) {

    function isFibonacci(num) {
        // has upper bound of F(~70) === ~190392490709135
        let sq5 = num * num * 5;
        function isPerfectSquare(n) {
            let sq = Math.floor(Math.sqrt(n));
            return n === sq * sq;
        }
        if ( isPerfectSquare(sq5-4) || isPerfectSquare(sq5+4)) {
            return true;
        }
        return false;
    }

    if (isFibonacci(A.length + 1) === true) {
        return 1;
    }

    // TODO while last or first is not with fib(distance), remove it as a leaf

    function canLandHome(left, right) {
        let distance = right - left;
        if (isFibonacci(distance) === true) {
            if (left === 0) {
                return true;
            }
            right = left;

            let routes = [];
            while(A.indexOf(1, left) > -1) {
                let route = A.indexOf(1, left)
                A[route] = -1;
                routes.push(route);
            }
            let hasRoute = false;
            while(routes.length > 0 && hasRoute === false) {
                hasRoute = canLandHome(routes.pop(), right);
            }
            return hasRoute;
        }
        return false;
    }

    let tracker = new Set(); // jump order + ':' + index of origin left + '-' + index of destination leaf
    let jumps = [];
    let total = 0;
    let right = A.length;
    let first = -1;
    while(first < right && total <= A.length) { // until we've jumped the whole river
        let left = first;
        while (left < right) { // attempt largest jumps first
            let distance = right - left;
            let key = jumps.length + ':' + left + '-' + right;
            if (isFibonacci(distance) === true && tracker.has(key) === false) {
                tracker.add(key);
                jumps.push(right);
                right = left; // next destination leaf will be this right endpoint
                total += distance;
            } else {
                left = A.indexOf(1, Math.max(0,left)); // try shorter distance jump
            }
        }
        if (left === right) {
            // back track:
                // erase earlier jumps until
                    // there is an tracker.has() === false
            tracker.forEach(v => {
                let last = jumps.pop();
                if (v.indexOf(jumps.length - 1 + ':') === 0) {
                    let ends = v.substring(v.indexOf(':') + 1).split('-');
                    left = parseInt(ends[0]);
                    right = parseInt(ends[1]);
                    //
                    // right = A.indexOf(1, right);
                    tracker.delete(v);
                }
            });
        }
    }
    console.log(jumps);
    if (jumps.length > 0) {
        return jumps.length;
    }
    return -1;

}


const tests = [
    {
        "name": "Test 1",
        "arg": [[0,0,0,1,1,0,1,0,0,0,0]],
        "expected":3
    }
];

tests.forEach((o, i) => {
    let result = solution(...o.arg);
    console.log((o.name || 'TEST')  + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
