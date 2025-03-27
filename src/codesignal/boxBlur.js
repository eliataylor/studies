function boxBlur(matrix) {
    let blurred = [];    
    
    let colStart = 1;
    let rowStart = 1;
    
    let rowAvgs = [];
    while (rowStart < matrix.length-1) {
        
        avg = matrix[rowStart-1][colStart-1];
        avg += matrix[rowStart-1][colStart]
        avg += matrix[rowStart-1][colStart+1];
        
        avg += matrix[rowStart][colStart-1];
        avg += matrix[rowStart][colStart]
        avg += matrix[rowStart][colStart+1];
        
        avg += matrix[rowStart+1][colStart-1];
        avg += matrix[rowStart+1][colStart]
        avg += matrix[rowStart+1][colStart+1];
        
        rowAvgs.push(Math.floor(avg/9));
        
        if (colStart < matrix[0].length - 2) {
            colStart++;
        } else {
            colStart = 1;
            rowStart++;
            blurred.push(rowAvgs);
            rowAvgs = [];
        }
        
    }
    
    return blurred;
}
