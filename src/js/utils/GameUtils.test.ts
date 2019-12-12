import * as GameUtils from './GameUtils';

describe('isGameWon', () => {

    test('returns undefined for undefined board', () => {
        const mockBoard: string[] = undefined;
        expect(GameUtils.isGameWon('x', mockBoard)).toBeUndefined();
    });

    test('returns a string for horizontal row winner', () => {
        const mockBoard: string[] = [
            [ 'x', 'x', 'x' ],
            [ '-', '-', '-' ],
            [ '-', '-', '-' ]
        ].reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);
        expect(GameUtils.isGameWon('x', mockBoard)).toBeDefined();
    });

    test('returns a string for vertical row winner', () => {
        const mockBoard: string[] = [
            [ '-', 'x', '-' ],
            [ '-', 'x', '-' ],
            [ '-', 'x', '-' ],
        ].reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);

        expect(GameUtils.isGameWon('x', mockBoard)).toBeDefined();
    });

    test('returns a string for diagonal combination', () => {
        const mockBoard: string[] = [
            [ 'x', 'o', '-' ],
            [ '-', 'x', '-' ],
            [ '-', 'o', 'x' ],
        ].reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);

        expect(GameUtils.isGameWon('x', mockBoard)).toBeDefined();
    });

    test('returns a string for R-to-L diagonal combination', () => {
        const mockBoard: string[] = [
            [ 'x', 'o', 'x' ],
            [ 'o', 'x', '-' ],
            [ 'x', 'o', '-' ],
        ].reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);

        expect(GameUtils.isGameWon('x', mockBoard)).toBeDefined();
    });

    test('returns undefined for blank board', () => {
        const mockBoard: string[] = [
            [ '-', '-', '-' ],
            [ '-', '-', '-' ],
            [ '-', '-', '-' ],
        ].reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);

        expect(GameUtils.isGameWon('x', mockBoard)).toBeUndefined();
    });

    test('returns undefined for full board', () => {
        const mockBoard: string[] = [
            [ 'x', 'x', 'o' ],
            [ 'o', 'x', 'x' ],
            [ 'x', 'o', 'o' ],
        ].reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);

        expect(GameUtils.isGameWon('x', mockBoard)).toBeUndefined();
    });

    test('returns undefined for bad combo', () => {
        const mockBoard: string[] = [
            [ 'x', '-', '-' ],
            [ '-', 'x', '-' ],
            [ '-', '-', 'o' ],
        ].reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);

        expect(GameUtils.isGameWon('x', mockBoard)).toBeUndefined();
    });
});