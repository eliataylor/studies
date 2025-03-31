/*

Given an integer n, return the smallest prime palindrome greater than or equal to n.

An integer is prime if it has exactly two divisors: 1 and itself. Note that 1 is not a prime number.

For example, 2, 3, 5, 7, 11, and 13 are all primes.
An integer is a palindrome if it reads the same from left to right as it does from right to left.

For example, 101 and 12321 are palindromes.
The test cases are generated so that the answer always exists and is in the range [2, 2 * 108].



Example 1:

Input: n = 6
Output: 7
Example 2:

Input: n = 8
Output: 11
Example 3:

Input: n = 13
Output: 101


Constraints:

1 <= n <= 108

 */

function primePalindrome(n: number): number {
    function checkPalindrome(str:string) {
        return str === str.split('').reverse().join('')
    }

    function checkPrime(num: number): boolean {
        // Handle edge cases
        if (num <= 1) return false; // Numbers less than or equal to 1 are not prime
        if (num <= 3) return true;  // 2 and 3 are prime
        if (num % 2 === 0 || num % 3 === 0) return false; // Numbers divisible by 2 or 3 are not prime

        // Check divisibility by all numbers of the form 6k ± 1 up to sqrt(num)
        // This optimization works because all primes greater than 3 can be expressed as 6k ± 1
        const sqrtNum = Math.sqrt(num);
        for (let i = 5; i <= sqrtNum; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }

        return true;
    }

    let m = n - 1;
    let isPrime = false;
    let isPalindrome = false;
    while(isPrime === false && isPalindrome === false) {
        m++
        while (m % 2 === 0 || m % 3 === 0) {
            m++
        }
        isPrime = checkPrime(m);
        isPalindrome = checkPalindrome(m.toString());
    }

    return m;



};
