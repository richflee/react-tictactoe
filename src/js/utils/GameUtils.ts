export function isGameWon(player: string, board: string[][]): boolean {
    const currPlayer = player;

    if (!board) {
        return false;
    }

    for (let row = 0; row < board.length; row++) {
        const firstRow = board[row];
        let allMatch = firstRow.filter(cell => cell !== currPlayer).length === 0;

        if (allMatch) {
            return true;
        }

        if (row === 0 && isVerticalCombination(player, board)) {
            return true;
        }
    }

    if (isDiagonalCombination(player, board)) {
        return true;
    }

    return false;
}

function isVerticalCombination(player: string, board: string[][]): boolean {

    const row = 0;
    const firstRow = board[0];
    const rowMax = board.length - 1;
    const colCount = firstRow.length;

    for (let colIdx = 0; colIdx < colCount; colIdx++) {

        if (firstRow[colIdx] === '-') {
            continue;
        }

        if (firstRow[colIdx] === board[rowMax][colIdx] && board[rowMax][colIdx] === board[row + 1][colIdx]) {
            return true;
        }
    }
}

function iterateDiagonally(startingXPoint: number, colShiftValue: number, board: string[][]): boolean {

    let colIdx = startingXPoint;
    let prevValue = undefined;
    let isCombination = true;
    let iterations = 0;
    let rowIdx = 0;

    while (iterations < board.length) {
        if (board[rowIdx][colIdx] === '-') {
            return false;
        }

        if (iterations === 0) {
            isCombination = true;
        } else {
            isCombination = board[rowIdx][colIdx] === prevValue;
        }

        if (!isCombination) {
            break;
        }
        
        prevValue = board[rowIdx][colIdx];
        colIdx += colShiftValue;
        rowIdx++;
        iterations++;
    }

    return isCombination;
}

function isDiagonalCombination(player: string, board: string[][]): boolean {
    let leftToRightResult = iterateDiagonally(0, 1, board);
    return leftToRightResult ? leftToRightResult : iterateDiagonally(board[0].length - 1, -1, board);
}