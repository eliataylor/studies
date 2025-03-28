function chessBoardCellColor(cell1, cell2) {
    const lookup = {
        'A': 2,
        'B': 1,
        'C': 2,
        'D': 1,
        'E': 2,
        'F': 1,
        'G': 2,
        'H': 1
    };
    let remainder1 = cell1.charAt(1) % 2;
    let remainder2 = cell2.charAt(1) % 2;
    if (lookup[cell1.charAt(0)] === lookup[cell2.charAt(0)]) {
        return remainder1 === remainder2;
    } else {
        return remainder1 !== remainder2;
    }

}


// others

//Get the color (0=black, 1=white) for a given cell
var color = s => (Buffer(s)[0] - s[1]) % 2

var chessBoardCellColor = (a, b) => color(a) == color(b)


function chessBoardCellColor(cell1, cell2) {
    let board = {
        "A": 1,
        "B": 2,
        "C": 3,
        "D": 4,
        "E": 5,
        "F": 6,
        "G": 7,
        "H": 8
    };

    const total1 = board[cell1[0]] + parseInt(cell1[1]);
    const total2 = board[cell2[0]] + parseInt(cell2[1]);

    return total1 % 2 === total2 % 2;

}
