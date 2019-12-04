import * as React from 'react';
import styled from 'styled-components';
import { BoardCell } from '../Home/Home';
import * as GameUtils from '../../../utils/GameUtils';

enum GameStatus {
    NEW,
    IN_PROGRESS,
    WON,
    COMPLETED
}

const StyledGameBoard = styled.div`
    background-color: yellow;
    border: 1px solid blue;
    font-size: 1em;
    > .gameBoardContainer__row {
        display: flex;
        
        > * {
            border: 1px solid blue;
            flex-grow: 1;
            padding: 5px;
            text-align: center;
        }
    }
`;

interface GameBoardState {
    board: string[][],
    currentPlayer: 'x' | 'o',
    gameStatus: GameStatus
}

export class GameBoard extends React.Component<any, GameBoardState> {
    constructor(props: any) {
        super(props);

        this.state = {
            board: this._populateGameBoard(),
            currentPlayer: 'x',
            gameStatus: GameStatus.IN_PROGRESS
        } as GameBoardState;
    }

    _handleNewGameClick() {
        // reset board
        const newBoard = this._populateGameBoard();

        // update state
        const player = this._toggleCurrentPlayer();

        this.setState({
            board: newBoard,
            currentPlayer: player
        });
    }

    _populateGameBoard(): any[] {
        const columnCount = 3;
        const rowCount = 3;
        let board = [];

        for (let i = 0; i < rowCount; i++) {
            let row = [];
            for (let j = 0; j < columnCount; j++) {
                row.push('-');
            }
            board.push(row);
        }

        return board;
    }

    _toggleCurrentPlayer() {
        return this.state.currentPlayer === 'x' ? 'o' : 'x';
    }

    _isGameWon(player: string, board: string[][]) {
        return GameUtils.isGameWon(player, board);
    }

    _updateCellState(colIndex: number, rowIndex: number) {
        return () => {
            const currPlayer = this.state.currentPlayer;
            const cp = JSON.parse(JSON.stringify(this.state.board));
            cp[rowIndex][colIndex] = this.state.currentPlayer;
            this._toggleCurrentPlayer();
            this.setState({
                board: cp,
                currentPlayer: this._toggleCurrentPlayer()
            });

            const won = this._isGameWon(currPlayer, cp);

            if (won) {
                this.setState({
                    gameStatus: GameStatus.WON
                })
                console.log('GAME WON: ' + currPlayer);
            }
        }
    }

    _renderGameStatus(): JSX.Element {
        if (this.state.gameStatus == GameStatus.IN_PROGRESS) {
            return <div>Game in progress</div>
        }
        else if (this.state.gameStatus == GameStatus.WON) {
            return <div>Game OVER</div>
        } else {
            return <div></div>;
        }
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.gameId !== prevProps.gameId) {
            this.setState({
                board: this._populateGameBoard()
            });
        }
    }

    render() {
        console.log(this.state.board);
        return (
            <div>
                {this._renderGameStatus()}
                <StyledGameBoard>
                    {this.state.board.map((data, idx) => (
                        <div key={Math.floor(Math.random() * Math.floor(12000))} className="gameBoardContainer__row">
                            {data.map((colData, index) => (
                                <BoardCell key={Math.floor(Math.random() * Math.floor(20000))} onCellClickHandler={this._updateCellState(index, idx)} value={colData}></BoardCell>
                            ))}
                        </div>
                    ))}
                </StyledGameBoard>
            </div>
        );
    }
}