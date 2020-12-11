function arrayMaxConsecutiveSum(a, k) {
    var max = 0;
    for(let i=k-1; i < a.length; i++) {
        let next = 0;
        for (let n=0; n < k; n++) {
            next += a[i-n];
        }
        max = Math.max(next, max);
    }
    return max;
}

// OTHERS
function arrayMaxConsecutiveSum(arr, k) {
    sum = arr.slice(0,k).reduce((a,b) => a+b)
    max = sum;
    for (let i=k; i<arr.length; i++) {
        sum = sum + arr[i] - arr[i-k]
        max = Math.max(max, sum)
    }
    return max
}
