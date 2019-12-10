const winningCombinations = [
    parseInt("111000000", 2),
    parseInt("000111000", 2),
    parseInt("000000111", 2),
    parseInt("100100100", 2),
    parseInt("010010010", 2),
    parseInt("001001001", 2),
    parseInt("100010001", 2),
    parseInt("001010100", 2)
 ];

export function isGameWon(player: string, board: string[]): boolean {

    if (!board) {
        return false;
    }

    const binaryBoardState = board.map(val => val === player ? '1' : '0').join("");
    const playerState = parseInt(binaryBoardState, 2);

    return winningCombinations.filter(mask => (playerState & mask) === mask).length > 0;
}
