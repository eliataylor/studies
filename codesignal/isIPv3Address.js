function isIPv4Address(str) {
    let a = str.split(".");
    if (a.length !== 4) return false;
    for(let i=0; i < a.length; i++) {
        if (Number(a[i]+1) > 0 && parseInt(a[i]) >= 0 && parseInt(a[i]) <= 255) {
            if (a[i].length > 1 && Number(a[i]) < 9) return false;
            continue;
        } else {
            return false;
        }
    }
    return true;
}
