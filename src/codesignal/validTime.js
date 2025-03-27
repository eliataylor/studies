function validTime(time) {
    if (time.length !== 5) return false;

    let t = time[0] + time[1];
    if (isNaN(t) === true || parseInt(t) >= 24) return false;

    if (time[2] !== ':') return false;

    t = time[3] + time[4];
    if (isNaN(t) === true || parseInt(t) >= 60) return false;

    return true;
}


// return t.split(":")[0]<24&&t.split(":")[1]<60}
// validTime = t => /^([0-1]\d|2[0-3]):[0-5]\d$/.test(t);
