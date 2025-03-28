function avoidObstacles(a) {
    if (a.length < 2) return 1;
    jump = 2,
        i = 0,
        found = false,
        max = 0;
    // console.log(a.sort((a,b)=> a-b));
    while (i < a.length) {
        // console.log(i + ' jumps ' + jump + ' around ' + a[i] + ' % ' + (a[i] % jump));
        max = Math.max(max, a[i]);
        if (a[i] % jump === 0) {
            jump++;
            i = 0;
            found = true;
        } else {
            i++; // check next obstaical
            found = false;
        }
    }
    if (found === true) {
        console.log('using max', max);
        return (max + 1)
    }
    return jump;
}
