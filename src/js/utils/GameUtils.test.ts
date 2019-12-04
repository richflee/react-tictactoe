import * as GameUtils from './GameUtils';

fdescribe('isGameWon', () => {

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

    test('returns false for blank board', () => {
        const mockBoard: string[][] = [
            [ '-', '-', '-' ],
            [ '-', '-', '-' ],
            [ '-', '-', '-' ],
        ];

        expect(GameUtils.isGameWon('x', mockBoard)).toBe(false);
    });
});