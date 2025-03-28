/*

You are given an array of integers a. A new array b is generated by rearranging the elements of a in the following way:

b[0] is equal to a[0];
b[1] is equal to the last element of a;
b[2] is equal to a[1];
b[3] is equal to the second-last element of a;
b[4] is equal to a[2];
b[5] is equal to the third-last element of a;
and so on.
Here is how this process works:



Your task is to determine whether the new array b is sorted in strictly ascending order or not.

Example

For a = [1, 3, 5, 6, 4, 2], the output should be alternatingSort(a) = true.

The new array b will look like [1, 2, 3, 4, 5, 6], which is in strictly ascending order, so the answer is true.

For a = [1, 4, 5, 6, 3], the output should be alternatingSort(a) = false.

The new array b will look like [1, 3, 4, 6, 5], which is not in strictly ascending order, so the answer is false.


 */

function alternatingSort(a) {
    let b = new Array();
    while (a.length > 0) {
        b.push(b.length % 2 === 0 ? a.shift() : a.pop());
        if (b.length > 1) {
            if (b[b.length - 2] >= b[b.length - 1]) {
                return false;
            }
        }
    }
    return true;
}


const tests = [
    {
        name: 'Test 1',
        arg: [[-89, -47, -38, 39, 82, 87, 40, -9, -41, -68]],
        expected: true
    },
    {
        name: 'Test 2',
        arg: [[1, 3, 5, 6, 4, 2]],
        expected: true
    },
    {
        name: 'Test 3',
        arg: [[1, 4, 5, 6, 3]],
        expected: false
    }
    ,
    {
        name: 'Test 6',
        arg: [[-92, -17, 71, 76, 54, -35]],
        expected: true
    }
    ,
    {
        name: 'Test 11',
        arg: [[-37, -31, -8, 88, -10, -33]],
        expected: true
    }

];

tests.forEach((o, i) => {
    let result = alternatingSort(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
