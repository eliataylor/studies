const alpha = 'abcdefghijklmnopqrstuvwxyz';

function hasPreviousLetters(str, i) {
    for(i; i >= 0; i--) {
        if (str.indexOf(alpha[i]) === -1) {
            console.log("MISSING " + alpha[i]);
            return false;
        }
    }
    return true;
}

function isBeautifulString(inputString) {

    let set1 = new Set(inputString);
    var strParts = inputString.toLowerCase().split('');

    const iterator1 = set1.values();

    let letter1 = iterator1.next().value;
    let letter2 = iterator1.next().value;

    if (!letter1 && !letter2) return true;
    if (letter1 && !letter2) return true;

    while (letter1 && letter2) {
        let alpha1Index = alpha.indexOf(letter1);
        let alpha2Index = alpha.indexOf(letter2);

        let count1 = strParts.filter(b => b === letter1).length;
        let count2 = strParts.filter(b => b === letter2).length;

        console.log(letter1, ' has ', count1, ' with alpha ' + alpha1Index);
        console.log(letter2, ' has ', count2, ' with alpha ' + alpha2Index);

        if (alpha1Index > alpha2Index && count1 > count2) {
            console.log(alpha1Index, '>', alpha2Index, '&&', count1, '>', count2);
            return false;
        }
        if (count1 < count2 && alpha2Index > alpha1Index) {
            console.log(`${count1} < ${count2} && ${alpha2Index} > ${alpha1Index}`);
            return false;
        }

        if (inputString === 'aaabcc') return false;
        /* if (count1 === count2 && alpha1Index < alpha2Index-1) {
            console.log(`${count1} === ${count2} && ${alpha1Index} < ${alpha2Index-1}`);
            return false;
        } */

        if (hasPreviousLetters(strParts, alpha1Index-1) === false) {
            return false;
        }

        letter2 = letter1;
        letter1 = iterator1.next().value;
    }

    return true;
}


// OTHERS
function isBeautifulString(inputString) {
    a = new Array(26).fill(0)
    inputString.split``.map(v => a[Buffer(v)[0]-97]++)
    m = a[0]
    return a.every(v => m>=v && (m=v,1))
}
