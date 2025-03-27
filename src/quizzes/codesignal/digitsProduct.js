function getProductofDigits(digits) {
    let product = 1;
    digits.toString().split('').forEach(v => {
        product *= parseInt(v);
    })
    return product;
}

function digitsProduct(target) {
    if (target === 0) return 10;
    let max = Math.floor(target * target);
    let i = target;
    while(i <= max) {
        let test = getProductofDigits(i);
        if (test === target) return i;
        i++;
    }
    return -1;
}

const tests = [
    {
        name:'Test 1',
        arg: [12],
        expected: 26
    },
    {
        name:'Test 2',
        arg: [19],
        expected: -1
    },
    {
        name:'Test 3',
        arg: [450],
        expected: 2559
    }
];

tests.forEach((o, i) => {
    let result = digitsProduct(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})


// OTHERS :

function digitsProductBetter(product) {

    if(product === 0) return 10;
    if(product === 1) return 1;

    let factors = [];

    for(let factor = 9; factor > 1; factor--){
        while(product % factor === 0){
            factors.push(factor);
            product /= factor;
        }
    }

    if(product > 1){
        return -1;
    } else {
        return parseInt(factors.reverse().join(''));
    }
}
