/*
You are given integers K, M and a non-empty array A consisting of N integers. Every element of the array is not greater than M.

You should divide this array into K blocks of consecutive elements. The size of the block is any integer between 0 and N. Every element of the array should belong to some block.

The sum of the block from X to Y equals A[X] + A[X + 1] + ... + A[Y]. The sum of empty block equals 0.

The large sum is the maximal sum of any block.

For example, you are given integers K = 3, M = 5 and array A such that:

  A[0] = 2
  A[1] = 1
  A[2] = 5
  A[3] = 1
  A[4] = 2
  A[5] = 2
  A[6] = 2
The array can be divided, for example, into the following blocks:

[2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
[2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
[2, 1, 5], [], [1, 2, 2, 2] with a large sum of 8;
[2, 1], [5, 1], [2, 2, 2] with a large sum of 6.
The goal is to minimize the large sum. In the above example, 6 is the minimal large sum.

Write a function:

class Solution { public int solution(int K, int M, int[] A); }

that, given integers K, M and a non-empty array A consisting of N integers, returns the minimal large sum.

For example, given K = 3, M = 5 and array A such that:

  A[0] = 2
  A[1] = 1
  A[2] = 5
  A[3] = 1
  A[4] = 2
  A[5] = 2
  A[6] = 2
the function should return 6, as explained above.

Write an efficient algorithm for the following assumptions:

N and K are integers within the range [1..100,000];
M is an integer within the range [0..10,000];
each element of array A is an integer within the range [0..M]

 */

/*
K = numberOfBlocks
M = maxNumber
A = array
*/

function solution(numberOfBlocks, maxNumber, array) {

    let begin = array.reduce((a, b) => (a + b), 0);  // Calculate total sum of A
    begin = Math.ceil(begin / numberOfBlocks);       // Calculate the mean of each theorethical block
    begin = Math.max(begin, Math.max(...array));     // Set begin to the highest number in array if > than the mean

    // In short: begin is now the smallest possible block sum


    // Calculate largest possible block sum
    let end = begin + maxNumber + 1;
    var result = 0;

    while (begin <= end) {

        // Calculate the midpoint, which is our result guess
        const midpoint = (begin + end) / 2;

        let currentBlockSum = 0;
        let block = 1;

        for (let number of array) {
            currentBlockSum += number;

            // If currentBlockSum > midpoint means that we are
            // in a different block...
            if (currentBlockSum > midpoint) {
                ++block;

                // ...so we reset sum with the current number
                currentBlockSum = number;

                // but if we are out of blocks, our guess (midpoint) is incorrect
                // and we will have to adjust it
                if (block > numberOfBlocks)
                    break;
            }
        }


        // If we are out of blocks
        // it means that our guess (midpoint) is bigger than we thought
        if (block > numberOfBlocks) {
            begin = midpoint + 1;
            // else, it's smaller
        } else {
            result = midpoint;
            end = midpoint - 1;
        }
    }

    return result;
}
