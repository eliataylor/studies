const allowed = '0123456789ABCDEF';

// let test = /^([\dA-F]{2}\-){6}$/.test(inputString);
// isMAC48Address = s => /^([0-9A-F]{2}-){5}[0-9A-F]{2}$/.test(s)
// isMAC48Address = s => /([0-9A-F]{2}[-]){6}$/.test(s + "-")
// isMAC48Address = s => /^([A-F0-9]{2}-){5}[A-F0-9]{2}$/i.test(s);

function isMAC48Address(inputString) {
    if (inputString[0] === '-' || inputString[inputString.length - 1] === '-' || inputString.indexOf('--') > -1) return false;
    let parts = inputString.split('-');
    parts = parts.filter(e => {
        if (e.length === 2 && allowed.indexOf(e[0]) > -1 && allowed.indexOf(e[1]) > -1) {
            return e;
        }
    });
    if (parts.length !== 6) return false;
    return true;
}


const tests = [
    {
        name: 'Test 1',
        arg: ["00-1B-63-84-45-E6"],
        expected: true
    }, {
        name: 'Test 2',
        arg: ["Z1-1B-63-84-45-E6"],
        expected: false
    }
];

tests.forEach((o, i) => {
    let result = isMAC48Address(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
