function bishopAndPawn(bishop, pawn) {
    bishop = bishop.toUpperCase();
    pawn = pawn.toUpperCase();
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
    const total1 = Math.abs(board[bishop[0]] - board[pawn[0]])
    const total2 = Math.abs(parseInt(bishop[1]) - parseInt(pawn[1]))
    if (total1 === total2) return true;
    return false;
}
