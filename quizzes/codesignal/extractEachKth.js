function extractEachKth(a, k) {
    k--
    for (let i = k; i < inputArray.length; i += k) {
        inputArray.splice(i, 1)
    }
    return inputArray;

    let b = a.filter((p, i) => (i + 1) % k !== 0)
    console.log(b);
    return b;
}
