/*
" add up all the numbers from 1 to 100 "
if you pair the numbers from opposite ends (1+100, 2+99, 3+98, etc.),
each pair sums to 101, and there are 50 such pairs. So the total would be 50 × 101 = 5,050.
 */

// Function to calculate the sum of first n natural numbers
function sumOfNaturalNumbers(n) {
  // Using the formula n(n+1)/2
  return (n * (n + 1)) / 2;
}

// Let's verify with a few examples by comparing with direct calculation
function directSum(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Test cases
const testCases = [50, 100, 100000, 10000000000];

for (const n of testCases) {
  const formulaResult = sumOfNaturalNumbers(n);
  const directResult = directSum(n);

  console.log(`For n = ${n}:`);
  console.log(`  Formula result: ${formulaResult}`);
  console.log(`  Direct calculation: ${directResult}`);
  console.log(`  Are they equal? ${formulaResult === directResult}`);
  console.log('---');
}
