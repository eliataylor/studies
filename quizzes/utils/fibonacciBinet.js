function listFibonacci(n) {
    // declare the array starting with the first 2 values of the fibonacci sequence
    // starting at array index 1, and push current index + previous index to the array
    for (var fibonacci = [0, 1], i = 1; i < n; i++)
        fibonacci.push(fibonacci[i] + fibonacci[i - 1])

    return fibonacci
}

function fibonacci(number) {
    var sqRootOf5 = Math.sqrt(5);

    var Phi = (1 + sqRootOf5) / 2;
    var phi = (1 - sqRootOf5) / 2

    // number + 1 // if expecting 0 based index
    return Math.round((Math.pow(Phi, number) - Math.pow(phi, number)) / sqRootOf5);
}


let f = listFibonacci(10);
console.log(f);

let index = 9;
while (index >= 0) {
    let calc = fibonacci(index);
    if (calc === f[index]) {
        console.log('correct: ' + f[index] + ' found at  ' + index + ' = ' + calc);
    } else {
        console.log('incorrect: ' + f[index] + ' found at  ' + index);
    }
    index--;
}

