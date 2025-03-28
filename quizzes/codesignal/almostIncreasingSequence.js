// https://stackoverflow.com/questions/46445743/how-to-get-almost-increasing-sequence-of-integers
function almostIncreasingSequenceCorrect(sequence) {
    let found = false;
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] <= sequence[i - 1]) {
            if (found === true) return false;
            found = true;
            if (i === 1 || i + 1 === sequence.length) {
                console.log('continue from ' + i);
                continue;
            } else if (sequence[i] > sequence[i - 2]) {
                console.log(i - 1 + ' reassigning from ' + sequence[i - 1] + ' to ' + sequence[i - 2])
                //sequence[i-1] = sequence[i-2];
                seequence.splice(i - 1, 1);
                i--;
            } else if (sequence[i - 1] >= sequence[i + 1]) {
                return false;
            }
        }
    }
    return true;
}

function almostIncreasingSequenceOld(seq) {
    if (seq.length < 2) return true;
    if (seq.length === 2) return seq[1] >= seq[0];


    var mins = [seq[0]], count = 0;
    for (let i = 1; i < seq.length; i++) {
        for (let m = 0; m < mins.length; m++) {
            if (mins[m] >= seq[i]) {
                console.log(mins.join(',') + ' >= ' + seq[i]);
                mins[0] = seq[i];
                // mins.push(seq[i]);
                count++;
                if (count > 1) return false;
            } else {
                console.log(mins[m] + ' < ' + seq[i]);
                mins[m] = seq[i];
            }
        }
        ;
    }
    return (count === 1);
}

function almostIncreasingSequence(seq) {
    if (seq.length < 2) return true;
    if (seq.length === 2) return seq[1] >= seq[0];

    let removed = [];
    for (let i = 0; i < seq.length; i++) {
        var arr = seq.slice(i, i + 3);
        let cuts = whichSideToDrop(arr);
        if (cuts === true) {
            console.log(i + ' subset is already sequential ', arr);
            continue;
        } else if (cuts === -1) {
            console.log(i + ' subset will NEVER be sequential ', arr);
            return false;
        } else {
            if (removed.length > 0) return false; // any secondary cuts are guarranted false
            if (cuts.length === 1 || seq.length < 4) {
                removed.push(seq.splice(i + cuts[0], 1)[0]); // adjust entire sequence;
                console.log(i + ' cut ' + (i + cuts[0]) + ' from ' + arr.join(',') + ' leaving ' + seq.join(','));
                i--;
            } else {
                console.log("Multiple Options " + cuts.join(','));
                while (arr.length < seq.length) {
                    arr = seq.slice(Math.max(0, i - 1), i + 4);
                    console.log('broaden scope ' + arr.join(','));
                    cuts = whichSideToDrop(arr);
                    if (cuts.length > 0) {
                        console.log(i + ' subset will NEVER be sequential2 ', arr);
                        return false;
                    }
                }
                return true;
                /* for(let c=0; c < cuts.length; c++ ){
                    let copy = [...seq];
                    var test= copy.splice(i+cuts[0], 1);
                    if (isSequential(copy) === true) {
                        removed.push(test);
                        removed.push(seq.splice(i+cuts[0], 1)[0]); // adjust entire sequence;
                        console.log(i + ' cut ' + (i+cuts[0]) + ' from ' + arr.join(',') + ' leaving ' + seq.join(','));
                        i--;
                    }
                } */
            }
        }
    }
    console.log(removed);
    return removed.length === 1;
}

function whichSideToDropFromMiddle(arr) {
    if (isSequential(arr) === true) return true;

    let arraySize = arr.length;
    let start = Math.floor(arr.length / 2);

    for (let i = 0; i < arraySize; i++) {
        let index = (start + ((i % 2 == 0) ? i / 2 : arraySize - (i + 1) / 2)) % arraySize;
        let copy = [...arr];
        console.log('cut ' + index + ' from ' + copy.join(','));
        copy.splice(index, 1);
        if (isSequential(copy) === true) return [index];
    }
    return -1;
}

function whichSideToDrop(arr) {
    if (isSequential(arr) === true) return true;
    opts = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        let copy = [...arr];
        copy.splice(i, 1);
        if (isSequential(copy) === true) {
            opts.push(i);
            console.log('cut works ' + i + ' into ' + copy.join(','));
        } else {
            console.log('cut fails ' + i + ' into ' + copy.join(','));

        }
    }
    return (opts.length > 0) ? opts : -1;
}

function isSequential(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] >= arr[i]) return false;
    }
    return true;
}

almostIncreasingSequence([1, 3, 2, 1]);
almostIncreasingSequence([0, -2, 5, 6]);
almostIncreasingSequence([1, 2, 5, 3, 5])
almostIncreasingSequence([1, 2, 5, 5, 5]);
almostIncreasingSequence([1, 2, 3, 4, 99, 5, 6])
almostIncreasingSequence([123, -17, -5, 1, 2, 3, 12, 43, 45]);
