function longestDigitsPrefix(inputString) {
    return inputString.match(/^\d*/)[0]
    return inputString.split(/[\D]/)[0];

    let str = inputString.replace(/[^0-9]/g, '_');
    console.log(str);
    str = str.split('_');
    if (str.length === 0) return '';
    str = str.splice(0,1)[0];
    return (parseInt(str) > -1) ? str : '';
}
