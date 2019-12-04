export function isGameWon(player: string, board: string[][]): boolean {
    const currPlayer = player;

    for (let row = 0; row < board.length; row++) {
        const firstRow = board[row];
        let allMatch = firstRow.filter(cell => cell !== currPlayer).length === 0;

        if (allMatch) {
            return true;
        }

        const colCount = firstRow.length;

        if (row === 0) {
            for (let colIdx = 0; colIdx < colCount; colIdx++) {

                if (firstRow[colIdx] === '-') {
                    continue;
                }

                if (firstRow[colIdx] === board[row + 1][colIdx] && board[row + 1][colIdx] === board[row + 2][colIdx]) {
                    return true;
                }
            }
        }
    }

    return false;
}