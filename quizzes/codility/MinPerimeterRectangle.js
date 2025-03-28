/*
An integer N is given, representing the area of some rectangle.

The area of a rectangle whose sides are of length A and B is A * B, and the perimeter is 2 * (A + B).

The goal is to find the minimal perimeter of any rectangle whose area equals N. The sides of this rectangle should be only integers.

For example, given integer N = 30, rectangles of area 30 are:

(1, 30), with a perimeter of 62,
(2, 15), with a perimeter of 34,
(3, 10), with a perimeter of 26,
(5, 6), with a perimeter of 22.
Write a function:

class Solution { public int solution(int N); }

that, given an integer N, returns the minimal perimeter of any rectangle whose area is exactly equal to N.

For example, given an integer N = 30, the function should return 22, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..1,000,000,000].

 */

function solution(N) {
    if (N <= 1) return 4;
    let sqrt = Math.floor(Math.sqrt(N));
    let divisors = [];
    if (sqrt * sqrt === N) {
        divisors.push(sqrt);
        divisors.push(N / sqrt);
    } else {
        while (sqrt > 0 && divisors.length < 2) {
            if (N % sqrt == 0) {
                divisors.push(sqrt);
                divisors.push(N / sqrt);
            }
            sqrt--;
        }
    }
    let perimeter = 2 * (divisors[0] + divisors[1]);
    return perimeter;

}


const tests = [
    {
        "name": "Test 1",
        "arg": [36],
        "expected": 24
    },
    {
        "name": "Test 1",
        "arg": [30],
        "expected": 22
    },
    {
        "name": "Test 2",
        "arg": [1],
        "expected": 2
    },
    {
        "name": "Test 3",
        "arg": [100000000],
        "expected": 40000
    }
];

tests.forEach((o, i) => {
    let result = solution(...o.arg);
    console.log((o.name || 'TEST') + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
