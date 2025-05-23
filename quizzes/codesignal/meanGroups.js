/*

You are given an array of arrays a.
Your task is to group the arrays a[i] by their mean values,
so that arrays with equal mean values are in the same group,
and arrays with different mean values are in different groups.

Each group should contain a set of indices (i, j, etc),
such that the corresponding arrays (a[i], a[j], etc)
all have the same mean.
Return the set of groups as an array of arrays,
where the indices within each group are sorted in ascending order,
and the groups are sorted in ascending order of their minimum element.

Example For

a = [[3, 3, 4, 2],
     [4, 4],
     [4, 0, 3, 3],
     [2, 3],
     [3, 3, 3]]

the output should be

meanGroups(a) = [[0, 4],
                 [1],
                 [2, 3]]

mean(a[0]) = (3 + 3 + 4 + 2) / 4 = 3;
mean(a[1]) = (4 + 4) / 2 = 4;
mean(a[2]) = (4 + 0 + 3 + 3) / 4 = 2.5;
mean(a[3]) = (2 + 3) / 2 = 2.5;
mean(a[4]) = (3 + 3 + 3) / 3 = 3;

There are three groups of means: those with mean 2.5, 3, and 4. And they form the following groups:

Arrays with indices 0 and 4 form a group with mean 3;
Array with index 1 forms a group with mean 4;
Arrays with indices 2 and 3 form a group with mean 2.5.
Note that neither

meanGroups(a) = [[0, 4],
                 [2, 3],
                 [1]]
nor

meanGroups(a) = [[0, 4],
                 [1],
                 [3, 2]]
will be considered as a correct answer:

In the first case, the minimal element in the array at index 2 is 1, and it is less then the minimal element in the array at index 1, which is 2.
In the second case, the array at index 2 is not sorted in ascending order.
For

a = [[-5, 2, 3],
     [0, 0],
     [0],
     [-100, 100]]
the output should be

meanGroups(a) = [[0, 1, 2, 3]]
The mean values of all of the arrays are 0, so all of them are in the same group.
 */

function meanGroups(a) {
    let means = {};
    a.forEach((row, i) => {
        let sum = row.reduce((acc, v) => (acc + v), 0);
        let mean = sum / row.length;
        if (!means[mean]) means[mean] = []
        means[mean].push(i);
        // means[mean] = means[mean].sort()
    })
    let result = Object.values(means);
    result = result.sort((a, b) => (a[0] - b[0]));
    console.log(result);
    return result;

    /*
    let b = [];
    for(let i =0; i < a.length; i++) {
        let row = a[i];
        let avg = row.reduce((acc, v) => acc + v, 0) / row.length;
        if (typeof b[avg] === 'undefined') b[avg] = [];
        b[avg].push(i);
    }
    let result = Object.values(b).sort( (a,b) => {
        a = a.sort( (c,d) => c-d );
        b = b.sort( (c,d) => c-d );
        return a[0] > b[0] ? 1 : -1
    })
    return result;
     */
}

const tests = [
    {
        name: 'Test 1',
        arg: [[[3, 3, 4, 2],
            [4, 4],
            [4, 0, 3, 3],
            [2, 3],
            [3, 3, 3]]],
        expected: [[0, 4],
            [1],
            [2, 3]]
    },
    {
        name: 'Test 2',
        arg: [[[-5, 2, 3],
            [0, 0],
            [0],
            [-100, 100]]],
        expected: [[0, 1, 2, 3]]
    },
    {
        name: 'Test 3',
        arg: [[[2, 2, -3],
            [1],
            [-10],
            [7]]],
        expected: [[0],
            [1],
            [2],
            [3]]
    },

];

tests.forEach((o, i) => {
    let result = meanGroups(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
