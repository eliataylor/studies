function electionsWinners(votesA, k) {
    let votes = new Int32Array;
    votes = Int32Array.from(votesA);
    votes.sort();

    let max = votes[votes.length-1];
    if (k===0) {
        if (max === votes[votes.length-2]) return 0;
        else return 1;
    }

    let min = 0;
    while (votes.length > 0) {
        min = votes[0];
        if (min + k > max) {
            return votes.length;
        }
        votes = votes.slice(1);
    }
    return 1;
}

function electionsWinnersSlow(votes, k) {
    votes = votes.sort((a,b) =>  a - b)
    let max = votes[votes.length-1];
    if (k===0) {
        if (max === votes[votes.length-2]) return 0;
        else return 1;
    }

    let min = 0;
    while (votes.length > 0) {
        min = votes.splice(0,1)[0];
        if (min + k > max) {
            return votes.length + 1;
        }
    }
    return 1;
}


//已经做过
function electionsWinners2(votes, k) {
    var max=Math.max(...votes)
    var r=votes.filter(x=>x+k>max||x===max).length
    return k?r:r==1?1:0
}


const tests = [
    {
        name:'Test 6',
        arg: [[3, 1, 1, 3, 1], 2],
        expected: 2
    },{
        name:'Test 5',
        arg: [[1,1,1,1],1],
        expected: 4
    },
    {
        arg: [[2, 3, 5, 2], 3],
        expected: 2
    },
    {
        arg: [[1, 3, 3, 1, 1], 0],
        expected: 0
    },
    {
        arg: [[5, 1, 3, 4, 1], 0],
        expected: 1
    },
    {
        name:'Test 3',
        arg: [[5, 1, 3, 4, 1], 0],
        expected: 1
    }
];

tests.forEach((o, i) => {
    let result = electionsWinners(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
