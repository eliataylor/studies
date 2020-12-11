function simplifyPathMine(path) {
    path = path.replace(/\/\.\//g, '/');
    path = path.replace(/\/\//g, '/');
    console.log(path);
    let parts = path.split('/');
    console.log(path);
    for(let i=0; i < parts.length; i++) {
        if (parts[i] === '' || parts[i] === '.') {
            parts.splice(i, 1);
            i--;
        } else if (parts[i] === '..') {
            if (i > 0) {
                parts.splice(i-1, 2);
                i = i - 2;
            } else {
                parts.splice(i, 1);
                i = i - 1;
            }
        }
    }
    console.log(parts);
    return '/'+parts.join('/');
}



function simplifyPath(path) {
    let result = path.split(/\//).filter(elm => elm && elm !== '.')
    let t, x;

    while((t=result.indexOf('..')) !== -1) {
        x = t === 0 ? 1 : 2
        t = t > 0 ? t-1 : 0
        result.splice(t, x)
    }

    return '/'+ result.join`/`
}



function simplifyPathStack(path) {
    var stack = [];
    for(var dir of path.split`/`) {
        if(dir == '..')
            stack.pop();
        else if(dir && dir != '.')
            stack.push(dir);
    }
    return '/' + stack.join`/`;
}


simplifyPath = require('path').resolve
