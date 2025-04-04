import {Logger} from '../logger';

Logger.section('Testing...')

function primePalindrome(n: number): number {
    function checkPalindrome(str: string) {
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

    if (n < 3) return 2;
    if (n < 4) return 3;

    let m = n - 1;
    let isPrime = false; // skip numbers divisible by 2 or 3
    let isPalindrome = false; // skip numbers with an even number of characters
    while (isPrime === false || isPalindrome === false) {
        m++
        while (m % 2 === 0) {
            m++
        }
        if (m.toString().length % 2 === 0) {
            m++
        }
        isPrime = checkPrime(m);
        isPalindrome = checkPalindrome(m.toString());
    }

    return m;


};

const result = primePalindrome(9989900)
console.log(result)
