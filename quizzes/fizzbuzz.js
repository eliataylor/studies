/*

# FizzBuzz

- Please write a program which outputs each number from 1 to 100.
- For multiples of 3, output "Fizz" instead of the number.
- For multiples of 5, output "Buzz" instead of the number.
- For multiples of both 3 and 5, output "FizzBuzz" instead of the number.

 */

function FizzBuzz(arr) {
    arr.forEach(a => {
        if (a % 3 === 0) {
            console.log('Fizz')
        }
        if (a % 5 === 0) {
            console.log('Buzz')
        }
        if (a % 3 === 0 &&  a % 5 === 0) {
            console.log('FizzBuzz')
        }
    })
}

// TODO: make array of 1-100
const tests = Array.from({ length: 100 }, (_, i) => i + 1);

FizzBuzz(tests)
