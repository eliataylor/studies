function arrayToTree(word, tree = {}) {
    let node = tree;

    for(const letter of word) {
        if(!node[letter]) node[letter] = {};
        node = node[letter];
    }

    node["$"] = word;
    return tree;
}

function wordBoggle(board, words) {
    // build a trie for all the words (for fast lookups)
    const trie = {};
    for(const word of words) {
        arrayToTree(word, trie);
    }

    // go through the board, find all possible starting points
    // (is the first letter in the trie?)
    const wordsFound = new Set();

    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            const letter = board[i][j];
            if(trie[letter]) {
                //console.log('---------------- start ' + letter + ' start --------------------')
                seek(i, j, trie[letter]);
                // console.log('---------------- end ' + letter + ' end --------------------')
            }
        }
    }

    // recursive dfs, backtrack if the letters stop matching
    function seek(x, y, node, visited = new Set()) {
        const hash = x + '' + y;
        visited.add(hash);
        // console.log('- add ' + hash, node)

        if("$" in node) {
            // console.log('---------------- finish ' + node['$'] + ' finish --------------------')
            wordsFound.add(node["$"]); // adds the whole word but we're might still be searching other words in the tree
        } else {
            for(let dx = -1; dx <= 1; dx++) {
                for(let dy = -1; dy <= 1; dy++) {
                    if(board[x + dx] && board[x + dx][y + dy]) {
                        const nextHash = (x + dx) + '' + (y + dy);
                        const letter = board[x + dx][y + dy];

                        if(node[letter] && !visited.has(nextHash)) {
                            // console.log('--- seek ' + nextHash + ' ' + letter)
                            seek(x + dx, y + dy, node[letter], visited);
                            // console.log('--- aftr ' + nextHash + ' ' + letter)
                        }
                    }
                }
            }
        }
        // console.log('- del ' + hash, node)
        visited.delete(hash);
    }

    let sorted =  [...wordsFound].sort();
    // console.log(sorted);
    return sorted;
}

const tests = [
    {
        name: 'Test 8',
        arg: [[
            ["W","E","I","R"],
            ["V","A","I","N"],
            ["T","F","C","N"],
            ["P","E","D","E"]
        ], ["CEDE", "DEFINE", "DECENNIA", "DEFACE"]],
        expected: ["CEDE", "DECENNIA", "DEFACE", "DEFINE"]
    },
    {
        name: 'Test 8',
        arg: [[
            ["O","T","T","S"],
            ["H","O","P","E"],
            ["E","R","A","R"],
            ["M","O","D","N"]], ["APTER"]],
        expected: ['APTER']
    },
    {
        name: 'Test 1',
        arg: [[
            ["R", "L", "D"],
            ["U", "O", "E"],
            ["C", "S", "O"]
        ], ["CODE",
            "SOLO",
            "RULES",
            "COOL"]],
        expected: ['CODE',
            'RULES']
    },
    {
        name: 'Test 3',
        arg: [[
            ["A", "X", "V", "W"],
            ["A", "L", "T", "I"],
            ["T", "T", "J", "R"]
        ], ["AXOLOTL",
            "TAXA",
            "ABA",
            "VITA",
            "VITTA",
            "GO",
            "AXAL",
            "LATTE",
            "TALA",
            "RJ"]],
        expected: ["AXAL",
            "RJ",
            "TALA",
            "TAXA",
            "VITTA"]
    }
];

tests.forEach((o, i) => {
    let result = wordBoggle(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
