function alternatingSums(a) {
    let teams = [0,0];
    a.forEach((weight, i) => {
        if (i%2 > 0) {
            teams[1] += weight;
        } else {
            teams[0] += weight;
        }
        // console.log(i%2, teams);
    })
    console.log(teams);
    return teams;
}


const tests = [
    {arg : [50, 60, 60, 45, 70],
        expected : [180, 105],
        },
    {arg : [100, 50],
        expected : [100, 50]},

];

tests.forEach((o, i) => {
    var result = alternatingSums(o.arg);
    console.log('TEST ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
