function alphabeticShift(str) {
    let alpha = 'abcdefghijklmnopqrstuvwxyz';
    let i =0;
    let newStr = '';
    while(i < str.length) {
        let index = alpha.indexOf(str.charAt(i));
        newStr += (index === alpha.length - 1) ? alpha.charAt(0) : alpha.charAt(index+1);
        i++;
    }
    return newStr;
}
pb
