function isLucky(n) {
    part1 = n.toString().split('');
    part2 = part1.splice(part1.length / 2);
    console.log(part1 + ' vs ' + part2);
    var sum1 = 0;
    var sum2 = 0;
    part1.map(o => sum1 = parseInt(o) + sum1);
    part2.map(o => sum2 = parseInt(o) + sum2);
    console.log(sum1 + ' vs ' + sum2);
    return sum1 === sum2;
}
