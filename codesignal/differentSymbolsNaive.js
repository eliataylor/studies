//太简单，不要
function differentSymbolsNaive(s) {
    return new Set(s).size
}

function differentSymbolsNaive(str) {
    let dups ={};
    while (str.length >0) dups[str.splice(0,1)] = true;
    return Object.keys(dups).length;
}
