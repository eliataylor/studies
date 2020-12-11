function nQueens(n) {
    result = [];
    board = new Array(n).fill([]);
    for(i = 0; i < n; i++) {
        board[i] = Array(n).fill(0);
    }
    solveNQUtil(n, board, 0, result)
    return result;
}


function isSafe(N, board, row, col)
{
    /* Check this row on left side */
    for (let i = 0; i < col; i++)
        if (board[row][i])
            return false;
 
    /* Check upper diagonal on left side */
    for (let i=row, j=col; i>=0 && j>=0; i--, j--)
        if (board[i][j])
            return false;
 
    /* Check lower diagonal on left side */
    for (let i=row, j=col; j>=0 && i<N; i++, j--)
        if (board[i][j])
            return false;
 
    return true;
}
 
/* A recursive utility function to solve N
Queen problem */
function solveNQUtil(N, board, col, result, curr = []) {
    /* base case: If all queens are placed
    then return true */
    if (col == N)
    {
        result.push(curr.slice());
        return result;
    }
 
    for (let i = 0; i < N; i++)
    {
        /* Check if queen can be placed on
        board[i][col] */
        if ( isSafe(N, board, i, col) )
        {
            /* Place this queen in board[i][col] */
            board[i][col] = 1;
            curr.push(i+1);
 
            // Make result true if any placement
            // is possible
            solveNQUtil(N, board, col + 1, result, curr);
 
            /* If placing queen in board[i][col]
            doesn't lead to a solution, then
            remove queen from board[i][col] */
            board[i][col] = 0; // BACKTRACK
            curr.pop()
        }
    }
 
    /* If queen can not be place in any row in
        this column col then return false */
    return result;
}