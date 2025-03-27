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
        return 1; // jumps the whole river
    }

    // TODO while last or first is not with fib(distance), remove it as a leaf
    let left = A.indexOf(1);
    while(left > -1 && isFibonacci(left + 1) === false) {
        A[left] = -1; // never reachable
        left = A.indexOf(1);
    }
    let reached = {};
    reached[left] = 1;

    let next = A.indexOf(1, left);
    while (next > -1) {
        if(isFibonacci(next + 1) === true) {
            A[left] = -1; // all previous are skippable;
            left = next;
        }
    }





    function canLandHome(left, right, min, jumps) {
        let distance = right - left;
        if (isFibonacci(distance) === true) {
            jumps.push(left + '-' + right);
            if (left === 0) {
                min = Math.min(min, jumps.length);
                return min;
            }
            right = left;

            let routes = [];
            while(A.indexOf(1, left) > -1) {
                let route = A.indexOf(1, left)
                A[route] = -1;
                routes.push(route);
            }
            while(routes.length > 0) {
                let hasRoute = canLandHome(routes.pop(), right, min);
                if (hasRoute === true) {
                    jumps = temp;
                    return true;
                }
            }
            return hasRoute;
        }
        return false;
    }

    let jumps = [];
    let min = canLandHome(-1, A.length, Infinity, jumps);
    if (min === Infinity) {
        return -1;
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
