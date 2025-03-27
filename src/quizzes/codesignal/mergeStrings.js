/*
You are implementing your own programming language and you've decided to add support for merging strings.
A typical merge function would take two strings s1 and s2,
and return the lexicographically smallest result that can be obtained by placing the symbols of s2 between the symbols of s1 in such a way that maintains the relative order of the characters in each string.

For example, if s1 = "super" and s2 = "tower", the result should be merge(s1, s2) = "stouperwer".

You'd like to make your language more unique, so for your merge function, instead of comparing the characters in the usual lexicographical order, you'll compare them based on how many times they occur in their respective initial strings (fewer occurrences means the character is considered smaller). If the number of occurrences are equal, then the characters should be compared in the usual lexicographical way. If both number of occurences and characters are equal, you should take the characters from the first string to the result. Note that occurrences in the initial strings are compared - they do not change over the merge process.

Given two strings s1 and s2, return the result of the special merge function you are implementing.

Example, For
s1  = "dce" and
s2  = "cccbd",
the output should be
mergeStrings(s1, s2)
    = "dcecccbd".
All symbols from s1 goes first,
because all of them have only 1 occurrence in s1
and c has 3 occurrences in s2.

For s1 = "super" and s2 = "tower", the output should be
mergeStrings(s1, s2) = "stouperwer".
Because in both strings all symbols occur only 1 time, strings are merged as usual. You can find explanation for this example on the image in the description.


A way of sorting strings, similar to alphabetical order but generalized to all kinds of characters.

When comparing two strings, s and t, we compare each pair of characters with equal indices (s[i] and t[i]), starting with i = 0:

if s[i] < t[i] or if s[i] is undefined, then we conclude that s < t,
if s[i] > t[i] or if t[i] is undefined, then we conclude that s > t,
if s[i] = t[i] then we repeat the process by comparing s[i + 1] to t[i + 1].
If the two strings have equal length and s[i] = t[i] for every character, then we conclude that s = t

Examples:

"snow" > "snoring" because the first string contains a greater character at index i = 2
"cat" < "caterpillar" because the first string is undefined at index i

*/

function mergeStrings(s1, s2) {

    let result = '';
    s1 = s1.split('');
    s2 = s2.split('');
    let sums = {};
    let its = 0;
    while(s1.length > 0 && s2.length > 0) {
        let l1 = s1[0];
        let l2 = s2[0];

        if (!sums[s1]) {
            sums[s1] = s1.reduce((acc, v)=> { if (v === l1) {acc++;} return acc; }, 0);
        }
        if (!sums[s2]) {
            sums[s2] = s2.reduce((acc, v)=> { if (v === l2) {acc++;} return acc; }, 0)
        }

        if (sums[s1] < sums[s2]) {
            result += s1.splice(0,1);
        } else if (sums[s1] > sums[s2]) {
            result += s2.splice(0, 1);
        } else if (s1[0] > s2[0]) {
            result += s2.splice(0, 1);
        } else {
            result += s1.splice(0, 1);
        }
        its++;
    }
    if (s1.length > 0) {
        result += s1.join('');
    }
    if (s2.length > 0) {
        result += s2.join('');
    }
    console.log(" its: " + its)
    console.log(result);
    return result;
}

const tests = [
    {
        name: 'Test 1',
        arg: ["dce", "cccbd"],
        expected: "dcecccbd"
    },
    {
        name: 'Test 2',
        arg: ["kkihj", "jbsmfoftph"],
        expected: "jbsmfoftphkkihj"
    },
    {
        name: 'Test 3',
        arg: ["super", "tower"],
        expected: "stouperwer"
    }
];

tests.forEach((o, i) => {
    let result = mergeStrings(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
