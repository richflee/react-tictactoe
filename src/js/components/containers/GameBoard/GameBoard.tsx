import * as React from 'react';
import styled from 'styled-components';
import { BoardCell } from '../../components/BoardCell/BoardCell';
import * as GameUtils from '../../../utils/GameUtils';
import * as Utils from '../../../utils/Utils';

enum GameStatus {
    NEW,
    IN_PROGRESS,
    WON,
    COMPLETED
}

const StyledGameBoardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledGameBoard = styled.div`
    border: 1px solid purple;
    font-size: 1em;
    max-width: 600px;
    > .gameBoardContainer__row {
        display: flex;
        
        > * {
            flex-grow: 1;
            min-width: 2em;
            min-height: 2em;
            padding: 5px;
            text-align: center;
        }
    }
`;

interface GameBoardState {
    board: string[][],
    currentPlayer: 'x' | 'o',
    gameStatus: GameStatus,
    winner: string,
    winningState: string[][]
}

export class GameBoard extends React.Component<any, GameBoardState> {
    constructor(props: any) {
        super(props);

        this.state = {
            board: this._populateGameBoard(),
            currentPlayer: 'x',
            gameStatus: GameStatus.IN_PROGRESS,
            winningState: undefined
        } as GameBoardState;
    }

    _handleNewGameClick() {
        const newBoard = this._populateGameBoard();
        const player = this._toggleCurrentPlayer();

        this.setState({
            board: newBoard,
            currentPlayer: player,
            winner: undefined,
            gameStatus: GameStatus.IN_PROGRESS,
            winningState: undefined
        });
    }

    _populateGameBoard(): any[] {
        const columnCount = 3;
        const rowCount = 3;
        let board = [];

        for (let i = 0; i < rowCount; i++) {
            board.push(new Array(columnCount).fill('-'));
        }

        return board;
    }

    _toggleCurrentPlayer() {
        return this.state.currentPlayer === 'x' ? 'o' : 'x';
    }

    _isGameWon(player: string, board: string[][]): string[][] {

        const flatBoard = board.reduce((prev, curr) => {
            return prev.concat(curr);
        }, [])

        const winningBinaryCombination = GameUtils.isGameWon(player, flatBoard);
        let winningBinaryBoard: string[][] = [];

        if (winningBinaryCombination !== undefined) {
            const chars = winningBinaryCombination.split("");
            const colCount = 3;
            const segmentCount = Math.floor(chars.length / colCount);
            winningBinaryBoard = new Array(segmentCount).fill(undefined).map((el, idx) => {
                return chars.slice(idx * segmentCount, (idx * segmentCount) + colCount);
            });
        }

        return winningBinaryBoard;
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

            if (won !== undefined && won.length > 0) {
                this.setState({
                    gameStatus: GameStatus.WON,
                    winner: won ? currPlayer : undefined,
                    winningState: won
                })
            }
        }
    }

    _renderGameStatus(): JSX.Element {
        if (this.state.gameStatus == GameStatus.IN_PROGRESS || this.state.gameStatus == GameStatus.NEW) {
            return <div><h4>Next move: '{this.state.currentPlayer}'</h4></div>
        }
        else if (this.state.gameStatus == GameStatus.WON) {
            return <div>
                <h4>Game over</h4>
                <p>🎉'{this.state.winner}' wins 🎉</p>
            </div>
        } else {
            return <div></div>;
        }
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.gameId !== prevProps.gameId) {
            this._handleNewGameClick();
        }
    }

    render() {
        return (
            <StyledGameBoardWrapper>
                {this._renderGameStatus()}
                <StyledGameBoard>
                    {this.state.board.map((data, idx) => (
                        <div key={Utils.generateElementKey(20000)} className="gameBoardContainer__row">
                            {data.map((colData, index) => (
                                <BoardCell highlight={this.state.gameStatus === GameStatus.WON && this.state.winningState[idx][index] === "1" } key={Utils.generateElementKey(12000)} disableClick={this.state.gameStatus !== (GameStatus.IN_PROGRESS || GameStatus.NEW)} onCellClickHandler={this._updateCellState(index, idx)} value={colData}></BoardCell>
                            ))}
                        </div>
                    ))}
                </StyledGameBoard>
            </StyledGameBoardWrapper>
        );
    }
}