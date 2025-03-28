function sortByHeight(a) {
    var ordered = [], treeIndexes = {};
    a.forEach((o,i)=> {
        if (o === -1) {
            treeIndexes[i] = true;
        } else {
            ordered.push(o);
        }
    })
    ordered.sort((a,b) => a -b);
    for(var i in treeIndexes) {
        ordered.splice(i, 0, -1);
    }
    return ordered;
}
