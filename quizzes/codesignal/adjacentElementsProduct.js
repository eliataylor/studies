/*
Given an array of integers, find the pair of adjacent elements that has the largest product and return that product.
 */

function adjacentElementsProduct(inputArray) {
    let max = -100000;
    inputArray.forEach((val, i) => {
        if (i > 0) {
            max = Math.max(max, val * inputArray[i - 1]);
            console.log(max);
        }

    });
    return max;
}
