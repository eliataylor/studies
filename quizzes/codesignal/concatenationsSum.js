/*
Given an array of positive integers a, your task is to calculate the sum of every possible a[i] ∘ a[j], where a[i] ∘ a[j] is the concatenation of the string representations of a[i] and a[j] respectively.

Example

For a = [10, 2], the output should be concatenationsSum(a) = 1344.

a[0] ∘ a[0] = 10 ∘ 10 = 1010,
a[0] ∘ a[1] = 10 ∘ 2 = 102,
a[1] ∘ a[0] = 2 ∘ 10 = 210,
a[1] ∘ a[1] = 2 ∘ 2 = 22.
So the sum is equal to 1010 + 102 + 210 + 22 = 1344.

For a = [8], the output should be concatenationsSum(a) = 88.

There is only one number in a, and a[0] ∘ a[0] = 8 ∘ 8 = 88, so the answer is 88.

For a = [1, 2, 3], the output should be concatenationsSum(a) = 198.

a[0] ∘ a[0] = 1 ∘ 1 = 11,
a[0] ∘ a[1] = 1 ∘ 2 = 12,
a[0] ∘ a[2] = 1 ∘ 3 = 13,
a[1] ∘ a[0] = 2 ∘ 1 = 21,
a[1] ∘ a[1] = 2 ∘ 2 = 22,
a[1] ∘ a[2] = 2 ∘ 3 = 23,
a[2] ∘ a[0] = 3 ∘ 1 = 31,
a[2] ∘ a[1] = 3 ∘ 2 = 32,
a[2] ∘ a[2] = 3 ∘ 3 = 33.
The total result is 11 + 12 + 13 + 21 + 22 + 23 + 31 + 32 + 33 = 198.

1 ≤ a.length ≤ 105,
1 ≤ a[i] ≤ 106.
 */
function practice(a) {
    let sum = a.reduce((acc1, v1) => {
        // acc1 += parseInt(v1.toString() + v1.toString());
        acc1 += a.reduce((acc2, v2) => {
            let next = parseInt(v1.toString() + v2.toString());
            return acc2 + next;
        }, 0)

        return acc1;
    }, 0)
    console.log(sum);
    return sum;
}

function concatenationsSum2(a) {
    let sum = 0;
    a.forEach(v1 => {
//    return a.reduce((acc1, v1) => {
        a.forEach(v2 => {
            sum += parseInt(v1 + '' + v2)
        })
//        return acc1;
//    }, 0)
    })
    return sum;
}

function concatenationsSum(arr) {
    let lowSum = 0; // The low part is the sum of the elements times the number of elements.
    let highSum = 0; // The high part is the sum of (the "offset" for each element times the sum of the elements).
    // The offset is the digit base raised to the number of digits
    // (expressed generally, but this problem always uses base 10).
    // So for a two digit number (11 or 22) the offset is 100.
    arr.forEach(el => {
        lowSum += el;

        let offset = Math.pow(10, el.toString().length);
        highSum += offset;
        console.log([el, lowSum, highSum].join(' --- '));
    });

    return lowSum * arr.length + lowSum * highSum;
}


const tests = [
    {
        name: 'Test 1',
        arg: [[10, 2]],
        expected: 1344
    },
    {
        name: 'Test 1',
        arg: [[987153, 239178, 389649, 469261, 130806]],
        expected: 11080246080235
    },
    {
        name: 'Test 1',
        arg: [[393496, 920577, 155905, 238986, 131066, 785660, 359269, 545445]],
        expected: 28243260243232
    }
];

tests.forEach((o, i) => {
    let result = concatenationsSum(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
