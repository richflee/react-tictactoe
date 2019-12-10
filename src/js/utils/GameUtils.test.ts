import * as GameUtils from './GameUtils';

describe('isGameWon', () => {

    test('returns false for undefined board', () => {
        const mockBoard: string[][] = undefined;
        expect(GameUtils.isGameWon('x', mockBoard)).toBe(false);
    });

    test('returns true for horizontal row winner', () => {
        const mockBoard: string[][] = [
            [ 'x', 'x', 'x' ],
            [ '-', '-', '-' ],
            [ '-', '-', '-' ],
        ];

        expect(GameUtils.isGameWon('x', mockBoard)).toBe(true);
    });

    test('returns true for vertical row winner', () => {
        const mockBoard: string[][] = [
            [ '-', 'x', '-' ],
            [ '-', 'x', '-' ],
            [ '-', 'x', '-' ],
        ];

        expect(GameUtils.isGameWon('x', mockBoard)).toBe(true);
    });

    test('returns true for diagonal combination', () => {
        const mockBoard: string[][] = [
            [ 'x', 'o', '-' ],
            [ '-', 'x', '-' ],
            [ '-', 'o', 'x' ],
        ];

        expect(GameUtils.isGameWon('x', mockBoard)).toBe(true);
    });

    test('returns true for R-to-L diagonal combination', () => {
        const mockBoard: string[][] = [
            [ 'o', 'o', 'x' ],
            [ '-', 'x', '-' ],
            [ 'x', 'o', '-' ],
        ];

        expect(GameUtils.isGameWon('x', mockBoard)).toBe(true);
    });

    test('returns false for blank board', () => {
        const mockBoard: string[][] = [
            [ '-', '-', '-' ],
            [ '-', '-', '-' ],
            [ '-', '-', '-' ],
        ];

        expect(GameUtils.isGameWon('x', mockBoard)).toBe(false);
    });

    test('returns false for full board', () => {
        const mockBoard: string[][] = [
            [ 'x', 'x', 'o' ],
            [ 'o', 'x', 'x' ],
            [ 'x', 'o', 'o' ],
        ];

        expect(GameUtils.isGameWon('x', mockBoard)).toBe(false);
    });

    test('returns false for bad combo', () => {
        const mockBoard: string[][] = [
            [ 'x', '-', '-' ],
            [ '-', 'x', '-' ],
            [ '-', '-', 'o' ],
        ];

        expect(GameUtils.isGameWon('x', mockBoard)).toBe(false);
    });
});