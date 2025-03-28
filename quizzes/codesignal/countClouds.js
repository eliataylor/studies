function countClouds2(skyMap) {

    var visited = [];

    if (skyMap.length === 0 || skyMap[0].length === 0) {
        return 0;
    }

    var lenY = skyMap.length;
    var lenX = skyMap[0].length;

    // Increment this count everytime we come across a node
    // that has not already been visited already
    var cloudCount = 0;

    for (var i = 0; i < lenY; i++) {
        visited.push([]);
    }

    for (var x = 0; x < lenX; x++) {
        for (var y = 0; y < lenY; y++) {

            var isCloud = skyMap[y][x] === '1';

            if (isCloud) {
                var isVisited = visited[y][x];

                if (!isVisited) {
                    // Once we find a node we haven't visited, increment
                    // CloudCount and then recursively visit all nodes adjacent
                    cloudCount++;
                    visitAdjascentNodes(skyMap, visited, x, y);
                }
            }
        }
    }

    return cloudCount;
}

function visitAdjascentNodes(skyMap, visited, x, y) {

    var xyOutOfRange = y < 0 || x < 0 || y >= skyMap.length || x >= skyMap[0].length;

    if (xyOutOfRange) {
        return;
    }

    var isVisited = visited[y][x];
    if (skyMap[y][x] !== '1' || isVisited) {
        return;
    }

    visited[y][x] = true;

    visitAdjascentNodes(skyMap, visited, x - 1, y);
    visitAdjascentNodes(skyMap, visited, x + 1, y);
    visitAdjascentNodes(skyMap, visited, x, y + 1);
    visitAdjascentNodes(skyMap, visited, x, y - 1);
}


const tests = [
    {
        name: 'Test 1',
        arg: [[["0", "1", "1", "0", "1"],
            ["0", "1", "1", "1", "1"],
            ["0", "0", "0", "0", "1"],
            ["1", "0", "0", "1", "1"]]],
        expected: 2
    }
];

tests.forEach((o, i) => {
    let result = countClouds(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
