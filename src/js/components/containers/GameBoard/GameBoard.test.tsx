// Link.react.test.js
import * as React from 'react';
import * as renderer from 'react-test-renderer';
// import GameBoard from './GameBoard';
jest.mock('./GameBoard'); // SoundPlayer is now a mock constructor


// beforeEach(() => {
//     // Clear all instances and calls to constructor and all methods:
//     GameBoard.mockClear();
//   });

test('Home changes the class when hovered', () => {
    expect(true).toBe(true);
    // const component = renderer.create(
    //     <GameBoard></GameBoard>,
    // );

    // test('_toggleCurrentPlayer - changes currentPlayer to o', () => {
    //     component._toggleCurrentPlayer();
    // });
});