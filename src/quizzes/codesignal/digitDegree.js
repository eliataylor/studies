function digitDegree(n) {
    n = n.toString();
    if (n.length < 2) return 0;
    let c = 0;
    while (n.length > 1) {
        let sum = 0, l = 0;
        while (l < n.length) {
            sum += parseInt(n[l]);
            l++;
        }
        console.log(sum)
        n = sum.toString();
        c++;
    }
    console.log(n)
    return c;
}

// others
function digitDegree(n) {
    c = 0
    while (n.toString().length>1) {
        n = n.toString().split("").reduce((x,y)=>Number(x)+Number(y))
        c++}
    return c}
