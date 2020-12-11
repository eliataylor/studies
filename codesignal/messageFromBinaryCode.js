var Util = {
    toBinary: function(input) {
        var result = "";
        for (var i = 0; i < input.length; i++) {
            var bin = input[i].charCodeAt().toString(2);
            result += Array(8 - bin.length + 1).join("0") + bin;
        }
        return result;
    },

    toAscii: function(input) {
        var result = "";
        var arr = input.match(/.{1,8}/g);
        for (var i = 0; i < arr.length; i++) {
            result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
        }
        return result;
    }
}

function messageFromBinaryCode(message) {
    return Util.toAscii(message);
}

//可以，注意重复
function messageFromBinaryCodeOther(code) {
    return code.match(/.{8}/g).reduce((a,b)=>a+String.fromCharCode(parseInt(b,2)),"")
}


const tests = [
    {
        name: 'Test 1',
        arg: [],
        expected: []
    }
];

tests.forEach((o, i) => {
    let result = messageFromBinaryCode(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
