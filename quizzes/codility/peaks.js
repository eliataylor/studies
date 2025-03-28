/*
A non-empty array A consisting of N integers is given.

A peak is an array element which is larger than its neighbors. More precisely, it is an index P such that 0 < P < N − 1,  A[P − 1] < A[P] and A[P] > A[P + 1].

For example, the following array A:

    A[0] = 1
    A[1] = 2
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
has exactly three peaks: 3, 5, 10.

We want to divide this array into blocks containing the same number of elements. More precisely, we want to choose a number K that will yield the following blocks:

A[0], A[1], ..., A[K − 1],
A[K], A[K + 1], ..., A[2K − 1],
...
A[N − K], A[N − K + 1], ..., A[N − 1].
What's more, every block should contain at least one peak. Notice that extreme elements of the blocks (for example A[K − 1] or A[K]) can also be peaks, but only if they have both neighbors (including one in an adjacent blocks).

The goal is to find the maximum number of blocks into which the array A can be divided.

Array A can be divided into blocks as follows:

one block (1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2). This block contains three peaks.
two blocks (1, 2, 3, 4, 3, 4) and (1, 2, 3, 4, 6, 2). Every block has a peak.
three blocks (1, 2, 3, 4), (3, 4, 1, 2), (3, 4, 6, 2). Every block has a peak. Notice in particular that the first block (1, 2, 3, 4) has a peak at A[3], because A[2] < A[3] > A[4], even though A[4] is in the adjacent block.
However, array A cannot be divided into four blocks, (1, 2, 3), (4, 3, 4), (1, 2, 3) and (4, 6, 2), because the (1, 2, 3) blocks do not contain a peak. Notice in particular that the (4, 3, 4) block contains two peaks: A[3] and A[5].

The maximum number of blocks that array A can be divided into is three.

Write a function:

sub solution { my (@A)=@_; ... }

that, given a non-empty array A consisting of N integers, returns the maximum number of blocks into which A can be divided.

If A cannot be divided into some number of blocks, the function should return 0.

For example, given:

    A[0] = 1
    A[1] = 2
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
the function should return 3, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [0..1,000,000,000].

https://app.codility.com/c/run/trainingXQGZG2-CUA/
 */
function peaks(A) {

    function getDivisors(N) {
        let divisors = [];

        let sqrt = Math.sqrt(N);
        let i = 2; // skip 1 and N
        for (i; i < sqrt; i++) {
            if (N % i == 0) {
                divisors.push(i);
                divisors.push(N / i);
            }
        }
        if (i * i === N) {
            divisors.push(i);
        }

        return divisors.sort();
    }

    function map_peaks(A) {
        let peaks = [];
        for (let i = 0; i < A.length; i++) {
            if (A[i] > Math.max(A[i - 1], A[i + 1])) {
                peaks.push(i);
                i++; // next cannot be a peak by definition
            }
        }
        return peaks;
    }

    let peaks = map_peaks(A);
    if (peaks.length < 3) return peaks.length;

    /*
        let divisors = getDivisors(A.length);
        // result will be at least 1 at this point

        while(divisors.length > 0) {
            let maxblocks = divisors.pop();
            let blocksize = A.length / maxblocks;
            let bIndex = 0;
            for(bIndex=0; bIndex < maxblocks; bIndex++) {
                let left = bIndex * blocksize;
                let right = left + blocksize - 1;
                // peaks.find(...) ANY peaks in this range
                if (peaks[bIndex] >= left && peaks[bIndex] <= right) {
                    //
                    console.log(bIndex + ' of ' + blocksize + ' has peak ' + peaks[bIndex])
                } else {
                    console.log(bIndex + ' of ' + blocksize + ' missing peak ' + peaks[bIndex])
                    break;
                }
            }
            if (bIndex === maxblocks - 1) {
                console.log(' found ' + maxblocks);
                return maxblocks;
            }
        }

        return 0;
    */

    console.log("PEAKS", peaks)
    let maxblocks = Math.min(peaks.length, Math.ceil(Math.sqrt(A.length)));
    let blocksize = A.length / maxblocks;
    while (A.length % maxblocks !== 0) {
        maxblocks--;
        blocksize = A.length / maxblocks;
    }

    while (blocksize > 0) {
        let hasPeak = false;

        for (let bIndex = 0; bIndex < maxblocks; bIndex++) {
            let left = bIndex * blocksize;
            let right = left + blocksize - 1;
            let minP = 0;
            hasPeak = false;
            for (minP; minP < peaks.length; minP++) {
                if (peaks[minP] >= left && peaks[minP] <= right) {
                    console.log(bIndex + ' of ' + blocksize + ' has peak ' + peaks[bIndex])
                    hasPeak = true;
                } else {
                    console.log(bIndex + ' of ' + blocksize + ' missing peak ' + peaks[bIndex])
                }
            }
            if (hasPeak === false) {
                blocksize--;
                break;
            }
        }
        if (hasPeak === true) {
            return maxblocks;
        }
    }

    console.log(maxblocks);

    return maxblocks;
}

const tests = [
    {
        "name": "Test 1",
        "arg": [[1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2]],
        "expected": 3
    },
    {
        "name": "Test 2",
        "arg": [[5]],
        "expected": 0
    }
];

tests.forEach((o, i) => {
    let result = peaks(...o.arg);
    console.log((o.name || 'TEST') + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
