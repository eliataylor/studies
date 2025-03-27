function circleOfNumbers(n, firstNumber) {
    let mid = n/2;
    if (firstNumber >= mid) return firstNumber - mid;
    return firstNumber + mid;
}


function circleOfNumbers(n, firstNumber) {
    return (n/2+firstNumber)%n
}
