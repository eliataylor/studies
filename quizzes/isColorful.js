function isColorful(num) {
    const nums = num.toString().split('')
    if (nums.length !== new Set(nums).size) {
        console.log('Not colorful')
        return false;
    }
    const products = {};
    for (let n = 0; n < nums.length; n++) {
        let product = parseInt(nums[n]);
        if (typeof products[product] !== 'undefined') {
            console.log(`Not colorful given a ${product} equals this number ${nums[n]}[${n}]`, products)
            return false;
        }
        products[product] = `${nums[n]}[${n}] x 1 = ${product}`;
        for (let i = n + 1; i < nums.length; i++) {
            product *= parseInt(nums[i]);
            if (typeof products[product] !== 'undefined') {
                console.log(`Not colorful given ${product} from ${n} to ${i}`, products)
                return false;
            }
            products[product] = `${nums[n]}[${n}] x ${nums[i]}[${i}] = ${product}`;
        }
    }
    console.log('Is colorful!!', products)
    return false;
}

let test = 3245
isColorful(test);


test = 326
isColorful(test);
