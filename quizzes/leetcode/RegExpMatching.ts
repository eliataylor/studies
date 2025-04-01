/*
Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".

 */

function isMatchMemoized(s: string, p: string): boolean {
    const memo: Record<string, boolean> = {};

    function dp(i: number, j: number): boolean {
        const key = `${i},${j}`;
        if (key in memo) return memo[key];

        // Base case: if pattern is empty, string must also be empty
        if (j === p.length) return i === s.length;

        // Check if the first characters match
        const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');

        let result: boolean;
        if (j + 1 < p.length && p[j + 1] === '*') {
            result = dp(i, j + 2) || (firstMatch && dp(i + 1, j));
        } else {
            result = firstMatch && dp(i + 1, j + 1);
        }

        memo[key] = result;
        return result;
    }

    return dp(0, 0);
}

/**
 * Regular Expression Matching
 *
 * Solution 1: Recursive approach
 * Time complexity: O(2^(m+n)) where m is the length of string and n is the length of pattern
 * Space complexity: O(m+n) for the recursion stack
 */
function isMatchRecursive(s: string, p: string): boolean {
    // Base case: if pattern is empty, string must also be empty
    if (p.length === 0) return s.length === 0;

    // Check if the first characters match (handles '.' case)
    const firstMatch = s.length > 0 && (p[0] === s[0] || p[0] === '.');

    // If pattern has '*', we have two options:
    // 1. Skip the pattern with '*' (use zero occurrences)
    // 2. Use the pattern with '*' if first characters match, and continue with the rest of the string
    if (p.length >= 2 && p[1] === '*') {
        return isMatchRecursive(s, p.substring(2)) ||
               (firstMatch && isMatchRecursive(s.substring(1), p));
    }
    // If no '*', check if first characters match and recursively check the rest
    else {
        return firstMatch && isMatchRecursive(s.substring(1), p.substring(1));
    }
}

/**
 * Regular Expression Matching
 *
 * Solution 2: Dynamic Programming approach
 * Time complexity: O(m*n) where m is the length of string and n is the length of pattern
 * Space complexity: O(m*n) for the DP table
 */
function isMatchDP(s: string, p: string): boolean {
    const rows = s.length + 1; // +1 for empty string case
    const cols = p.length + 1; // +1 for empty pattern case

    // Create DP table, dp[i][j] represents if s[0...i-1] matches p[0...j-1]
    const dp: boolean[][] = Array(rows).fill(0).map(() => Array(cols).fill(false));
    console.log(dp);

    // Base case: empty pattern matches empty string
    dp[0][0] = true;

    // Handle patterns like a*, a*b*, a*b*c*, etc. matching empty string
    for (let j = 1; j < cols; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2]; // Skip the pattern with '*'
            console.log(dp);
        }
    }

    // Fill the DP table
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            // If current characters match or pattern has '.'
            if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            // If pattern has '*'
            else if (p[j - 1] === '*') {
                // Skip the pattern with '*' (use zero occurrences)
                dp[i][j] = dp[i][j - 2];

                // If the character before '*' matches current character in s or is '.'
                if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                    // dp[i-1][j]: Use the current character and continue with the same pattern
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }

    console.log(dp);

    return dp[rows - 1][cols - 1];
}

// Test cases
const testCases = [
//    { s: "aa", p: "a", expected: false },
    { s: "aa", p: "a*", expected: true },
//    { s: "ab", p: ".*", expected: true },
//    { s: "aab", p: "c*a*b", expected: true },
//    { s: "mississippi", p: "mis*is*p*.", expected: false }
];

/*
console.log("Recursive approach:");

testCases.forEach(test => {
    const result = isMatchRecursive(test.s, test.p);
    console.log(`s="${test.s}", p="${test.p}" => ${result} (Expected: ${test.expected})`);
});
 */

console.log("\nDynamic Programming approach:");
testCases.forEach(test => {
    const result = isMatchDP(test.s, test.p);
    console.log(`s="${test.s}", p="${test.p}" => ${result} (Expected: ${test.expected})`);
});
