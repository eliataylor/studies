function primality(n) {
    let i = 2
    while (i * i <= n) {
        if (n % i == 0) return false;
        i += 1
    }

    return true
}

/*
Based on one divisor, we can find
the symmetric divisor. More precisely, if number a is a divisor of n, then n
a is also a divisor.
One of these two divisors is less than or equal to √n. (If that were not the case, n would be
a product of two numbers greater than √n, which is impossible.)
 */
function countNumberofDivisors(n) {
    let i = 1
    let result = 0
    while (i * i < n) {
        if (n % i == 0) {
            result += 2
        }
        i += 1
        if (i * i == n) {
            result += 1
        }
        return result
    }
}


function median(values) {
    if (values.length === 0) return 0;

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}

function practice(A) {
    if (A.length === 0) return 0;
    if (A.length === 1) return 1;

    let distances = [];
    let peaks = [];
    for (let i = 0; i < A.length; i++) {
        if (A[i] > Math.max(A[i - 1], A[i + 1])) {
            peaks.push(i);
            if (peaks.length > 1) {
                distances.push(Math.abs(peaks[peaks.length - 2] - peaks[peaks.length - 1]));
            }
            i++; // next cannot be a peak by definition
        }
    }

    if (peaks.length < 3) return peaks.length;

    distances = distances.sort((a, b) => a - b);

    let flags = peaks.length;
    while (flags > 0 && flags > distances[0]) {
        flags--;
        distances.shift();
    }
    return flags;

}


function textbookSolution(A) {
    let N = A.length;

    function create_peaks(A) {
        let peaks = [];
        for (let i = 0; i < A.length; i++) {
            if (A[i] > Math.max(A[i - 1], A[i + 1])) {
                peaks.push(i);
                i++; // next cannot be a peak by definition
            }
        }
        return peaks;
    }

    function next_peak(A) {
        let next = [0] * N
        next[N - 1] = -1;
        for (let i = 0; i < N - 2; i++) { // in xrange(N - 2, -1, -1)
            if (peaks[i]) {
                next[i] = i
            } else {
                next[i] = next[i + 1]
            }
        }
        return next
    }

    let peaks = create_peaks(A)
    let next = next_peak(A)
    let i = 1
    let result = 0
    while ((i - 1) * i <= N) {
        let pos = 0
        let num = 0
        while (pos < N && num < i) {
            pos = next[pos]
            if (pos == -1) {
                break;
            }
            num += 1
            pos += i
        }
        result = Math.max(result, num)
        i++
    }
    return result

}

const tests = [
    {
        name: 'Test 1',
        arg: [[1, 5, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2]],
        expected: 3
    },
    {
        name: 'Test 2',
        arg: [[1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]],
        expected: 2
    },
    ,
    {
        name: 'Test 3',
        arg: [[1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5]],
        expected: 2
    },
    ,
    {
        name: 'Test 4',
        arg: [[1, 1, 1, 5, 1, 1, 1, 5, 1, 1, 1, 5]],
        expected: 3
    },
    {
        name: 'Test 5',
        arg: [[1, 2, 3, 12, 5, 6, 9]],
        expected: 1
    },
    {
        name: 'Test base',
        arg: [[5]],
        expected: 1
    },
    {
        name: 'Test base',
        arg: [[]],
        expected: 0
    },
    {
        name: 'Test base',
        arg: [[1, 2, 3, 4, 5, 6, 9]],
        expected: 0
    },
];

tests.forEach((o, i) => {
    let result = textbookSolution(...o.arg);
    console.log((o.name || 'TEST') + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
