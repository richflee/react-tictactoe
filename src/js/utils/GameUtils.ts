const winningCombinations = [
    "111000000",
    "000111000",
    "000000111",
    "100100100",
    "010010010",
    "001001001",
    "100010001",
    "001010100"
];

/**
 * 
 * @param player string describing current player
 * @param board flat array of board state
 * @returns Returns a binary combination if the board argument contains a winning combination
 */
export function isGameWon(player: string, board: string[]): string {

    if (!board) {
        return undefined;
    }

    const binaryBoardState = board.map(val => val === player ? '1' : '0').join("");
    const playerStateMask = parseInt(binaryBoardState, 2);
    const matchingIndexes = findMaskMatches(winningCombinations, playerStateMask);
    return winningCombinations[matchingIndexes[0]];
}

function findMaskMatches(winningCombinations: string[], mask: number): number[] {
    const filteredCombos = winningCombinations.reduce((acc, combo, idx) => {
        const comboMask = parseInt(combo, 2);
        const result = (mask & comboMask) === comboMask ? idx : undefined;
        acc.push(result);
        return acc;
    }, []).filter(result => result !== undefined);
    return filteredCombos;
}
