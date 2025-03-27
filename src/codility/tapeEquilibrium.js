/*
A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1] and A[P], A[P + 1], ..., A[N − 1].

The difference between the two parts is the value of: |(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|

In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

For example, consider array A such that:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
We can split this tape in four places:

P = 1, difference = |3 − 10| = 7
P = 2, difference = |4 − 9| = 5
P = 3, difference = |6 − 7| = 1
P = 4, difference = |10 − 3| = 7
Write a function:

function solution(A);

that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

For example, given:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
the function should return 1, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [2..100,000];
each element of array A is an integer within the range [−1,000..1,000].

 */


function practice(A) {
    // for 1 < x < a.length - 1,
    // split the array and
    //  A. sum the values on each side?
    //  B. look at edges and size of each array


    let p = 0;
    let part1 = A[p];
    let part2 = A.slice(1).reduce( (acc, v) => acc + v, 0);

    let min = Math.abs(part1 - part2);

    while(++p < A.length) {
        let shift = A[p];
        part1 += shift;
        part2 -= shift;
        min = Math.min(min, Math.abs(part1 - part2));
    }
    return min;
}

const tests = [
    {
        name: 'Test 1',
        arg: [[3,1,2,4,3]],
        expected: 1
    },
    {
        name: 'Test 2',
        arg: [[1,2]],
        expected: 1
    }
];

tests.forEach((o, i) => {
    let result = practice(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
