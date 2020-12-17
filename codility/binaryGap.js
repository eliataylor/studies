

function solution(N) {

    let bin = Number(N).toString(2)
    while(bin.length > 0 && (bin[0] === '0' || bin[bin.length-1] === '0')) {
        if (bin[0] === '0') bin = bin.substr(1);
        if (bin[bin.length-1] === '0') bin = bin.substr(0, bin.length -2);
    }
    let parts = bin.split('1');
    let max = parts.reduce((acc, v) => {
        return Math.max(v.length, acc);
    }, 0);
    return max;
}
