// BRUTE FORCE
function factorial(n, r = 1) {
    while (n > 0) r *= n--;
    return r;
}

function calcPerms(n, r) {
    return factorial(n) / factorial(n - r);
}

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}


function isNearlySequential(a) {
    for (var i = 1; i < a.length; i++) { // loop at each consective pair
        let str1 = a[i - 1];
        let str2 = a[i];
        let count = 0;
        for (var j = 0; j < str1.length; j++) { // compare each letter between strings
            if (str1[j] !== str2[j]) {
                count++;
                if (count > 1) return false;
            }
        }
        if (count !== 1) {
            // console.log(str1 + ' vs ' + str2 + ' == ' + count)
            return false;
        }
    }
    return true;
}

function stringsRearrangement(a) {
    if (a.length < 2 || a[0].length < 1) return false;

    let perms = permute(a);
    let permCt = perms.length; // calcPerms(a.length);
    console.log("PERMS", perms);

    let p = 0;
    while (p < permCt) {
        a = perms[p];
        if (isNearlySequential(a) === true) {
            console.log(p + " PASSED: ", a)
            return true;
        }
        //var last = a.pop();
        //a.unshift(last);

        // console.log('P' + p + ': ', a);
        p++;
    }
    console.log(p + " FAILED: ", a)
    return false;

}


/// OTHER SOLUTIONS -
function stringsRearrangement(a) {
    for (let i = 0; i < a.length; i++) {
        let remaining = findNext(a[i], a);
        if (remaining.length === 0) return true;
    }
    return false;
}

function findNext(current, a) {
    if (a.length === 0) return a;
    for (let i = 0; i < a.length; i++) {
        if (differsByOneChar(current, a[i])) {
            let remaining = findNext(a[i], a.slice(0, i).concat(a.slice(i + 1)));
            if (remaining.length === 0) return remaining;
        }
    }
    return a;
}

function differsByOneChar(s1, s2) {
    let mismatches = 0;
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) mismatches++;
        if (mismatches > 1) break;
    }
    return mismatches === 1;
}


/// oTHERS PHP:
function stringsRearrangement($i) {
    foreach($i
    as
    $v
)
    {
        $o = 0;
        foreach($i
        as
        $z
    )
        $o += levenshtein($v, $z) == 1;
        if (!$o || $o > 4) return 0;
        $x += $o < 2;
    }
    return $x < 3;
}


