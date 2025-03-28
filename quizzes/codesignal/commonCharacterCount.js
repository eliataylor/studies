function commonCharacterCount(s1, s2) {
    let toloop = s1.split('');
    let tocheck = s2.split('');
    if (s1.length > s2.length) {
        toloop = s2.split('');
        tocheck = s1.split('');
    }
    common = [];
    toloop.forEach(l => {
        let i = tocheck.indexOf(l);
        console.log(l + ' check index is ' + i)
        if (i > -1) {
            common.push(tocheck[i]);
            tocheck.splice(i,1);
        }
    })
    console.log("COMMONS ARE " + common.join(','));
    return common.length;
}
