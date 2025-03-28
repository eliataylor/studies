function lineEncoding(s) {
    let str = '', i = 0;
    while (i < s.length) {
        let l = s[i], count = 0;
        while (s[i] === l) {
            count++;
            i++;
        }
        if (count > 1) {
            str += count + l;
        } else {
            str += l;
        }
    }
    return str;
}

lineEncoding('adsssskfjjjjhadsjkkkkahdfas');

// OTHER!
lineEncoding = s =>
    s.replace(
        /(.)\1*/g,
        (e, i) => i == e ? i : e.length + i
    )
