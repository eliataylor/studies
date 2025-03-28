const SIDES = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, 0],
    [1, -1]
];
const used = new Map();
const VALID = new Set();

function wordBoggle(board, words) {
    // for each word
    // find starting point
    // for each letter check
    // if next Letter is  1 of 8 neighboring cells that has not been seen
    // continue to next letter
    // else
    // check another starting point of previous letter

    function findCells(word, i) {
        return board.reduce((acc, row, r) => {
            row.forEach((v, c) => {
                if (v === word[i]) {
                    acc.push(new Cell(c, r, i, word[i], null))
                }
            })
            return acc;
        }, [])
    }

    function getLastAlternative(cell) {
        let toremove = [];
        // if (cell.alternatives && cell.alternatives.length > 0) return cell.alternatives.pop();
        while (cell.parent) {
            toremove.push(cell.getId());
            cell = cell.parent;
            toremove.push(cell.getId());
            if (cell.alternatives && cell.alternatives.length > 0) {

                toremove.forEach(id => {
                    used.delete(id);
                })
                return cell.alternatives.pop();
            }
        }
        return null;
    }

    function Cell(x, y, i, l, p = null) {
        this.y = y;
        this.x = x;
        this.wordIndex = i;
        this.letter = l;
        this.parent = p;
        this.children = 0;
        this.alternatives = [];

        this.getId = function () {
            return this.y.toString() + ',' + this.x.toString();
        }

        this.debug = function (pre = '') {
            let msg = pre + ' ' + this.getId() + ': ' + this.letter;
            if (this.parent) {
                msg += ' parent: ' + this.parent.getId() + ': ' + this.parent.letter;
                if (this.parent.children) {
                    msg += ' has ' + this.parent.children + ' children';
                }
            }
            if (this.alternatives.length > 0) {
                msg += ' - ' + this.alternatives.length + ' alt routes ';
            }
            console.log(msg);
        }
    }


    function searchWord(word, current) {

        used.set(current.getId(), current);
        let l = current.wordIndex + 1;

        while (current && l < word.length - 1) {
            if (VALID.has(word)) {
                console.log('short-circut ' + word);
                return true;
            }

            l = current.wordIndex + 1;
            let target = word[l];
            // console.log("target " + target)
            let cells = SIDES.reduce((acc, dir) => {
                let t = [dir[0] + current.y, dir[1] + current.x];
                if (board[t[0]] && board[t[0]][t[1]] === target) {
                    let cell = new Cell(t[1], t[0], l, target, current);
                    if (used.has(t.join(',')) === false) {
                        acc.push(cell);
                    } else {
                        cell.debug('skip seen. ')
                    }
                }
                return acc;
            }, []);

            current.children = cells.length;

            if (cells.length > 0) {
                let next = cells.shift();
                if (cells.length > 0) {
                    current.alternatives = current.alternatives.concat(cells); // save for later in case it fails
                }
                current = next;
                used.set(current.getId(), current);
                current.debug('next ');
                continue;
            } else {
                let alt = false;
                while (alt === false) {
                    alt = getLastAlternative(current);
                    if (alt) {
                        // rollback: remove used children of current, so current's siblings can check it's own unique children
                        alt = searchWord(word, alt);
                        if (alt === true) {
                            return true;
                        }
                    }
                }
                return false;
            }
        }
        return true;
    }


    for (let w = words.length - 1; w >= 0; w--) {
        let word = words[w];

        if (word.length < 1) continue;

        let found = false;
        let roots = findCells(word, 0);
        while (found === false && roots.length > 0) {
            used.clear();
            found = searchWord(word, roots.pop());
        }

        if (found === false) {
            console.log("invalid word " + words[w]);
            words.splice(w, 1);
        } else {
            VALID.add(words[w]);
            console.log(words[w] + ' found')
        }
    }

    words.sort();
    console.log(words);
    return words;
}

const tests = [
    {
        name: 'Test 8',
        arg: [[
            ["W", "E", "I", "R"],
            ["V", "A", "I", "N"],
            ["T", "F", "C", "N"],
            ["P", "E", "D", "E"]
        ], ["DEFINE", "CEDE", "DECENNIA", "DEFACE"]],
        expected: ["DEFINE", "CEDE", "DECENNIA", "DEFACE"]
    },
    {
        name: 'Test 8',
        arg: [[
            ["O", "T", "T", "S"],
            ["H", "O", "P", "E"],
            ["E", "R", "A", "R"],
            ["M", "O", "D", "N"]], ["APTER"]],
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
