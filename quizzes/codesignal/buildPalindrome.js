function checkPalindrome(inputString) {
    if (inputString === inputString.split('').reverse().join('')) {
        console.log("IS");
        return true;
    }
    return false;
}

function buildPalindrome(st) {
    let original = st;
    i=0;
    while(checkPalindrome(st) === false) {
        let char = original.substring(0, i).split('').reverse().join('');
        st = original + char;
        i++;
        console.log(st, char);
    }
    return st;
}


buildPalindrome('asfda');
