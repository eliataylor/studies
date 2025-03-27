/*
Given an array of integers a, your task is to count the number of pairs i and j (where 0 ≤ i < j < a.length), such that a[i] and a[j] are digit anagrams.

Two integers are considered to be digit anagrams if they contain the same digits. In other words, one can be obtained from the other by rearranging the digits (or trivially, if the numbers are equal). For example, 54275 and 45572 are digit anagrams, but 321 and 782 are not (since they don't contain the same digits). 220 and 22 are also not considered as digit anagrams, since they don't even have the same number of digits.

Example

For a = [25, 35, 872, 228, 53, 278, 872], the output should be digitAnagrams(a) = 4.

There are 4 pairs of digit anagrams:

a[1] = 35 and a[4] = 53 (i = 1 and j = 4),
a[2] = 872 and a[5] = 278 (i = 2 and j = 5),
a[2] = 872 and a[6] = 872 (i = 2 and j = 6),
a[5] = 278 and a[6] = 872 (i = 5 and j = 6).
 */
function digitAnagramsOld(a) {
    let sum = 0;

    for(let i1 = a.length-1; i1 >= 0; i1--) {
        for(let i2 = a.length-1; i2 >= 0; i2--) {
            if (i1 !== i2) {
                if (a[i1] === a[i2]) {
                    sum++;
                    // a.splice(i1, 1);
                } else {
                    let s1 = new Uint8Array(a[i1].toString().split(''));
                    let s2 = new Uint8Array(a[i2].toString().split(''));
                    if (s1.sort().join('') === s2.sort().join(''))  {
                        sum++;
                        // a.splice(i1, 1);
                    }
                }
            } else {
                a.splice(i1, 1);
                // a.splice(i2, 1);
            }
        }
    }
    console.log(sum);
    return sum;
}

function digitAnagrams(a) {
    let sum = 0;
    for(let i1 = 0; i1 < a.length; i1++) {
        for(let i2 = 0; i2 < a.length; i2++) {
            if (i1 !== i2) {
                if (a[i1] === a[i2]) {
                    sum++;
                } else {
                    let s1 = new Uint8Array(a[i1].toString().split(''));
                    let s2 = new Uint8Array(a[i2].toString().split(''));
                    if (s1.sort().join('') === s2.sort().join(''))  {
                        sum++;
                    }
                }
            }
        }
    }
    console.log(sum);
    return sum/2;
}

const tests = [
    {
        name: 'Test 1',
        arg: [[25, 35, 872, 228, 53, 278, 872]],
        expected: 4
    },
    {
        name: 'Test 2',
        arg: [[30, 72, 3, 227]],
        expected: 0
    }
];

tests.forEach((o, i) => {
    let result = digitAnagrams(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
