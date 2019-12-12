import * as React from 'react';
import styled from 'styled-components';
import { BoardCell } from '../../components/BoardCell/BoardCell';
import * as GameUtils from '../../../utils/GameUtils';

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
    border: 1px solid #e9ea77;
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
        // reset board
        const newBoard = this._populateGameBoard();

        // update state
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

    _isGameWon(player: string, board: string[][]): string[][] {

        const flatBoard = board.reduce((prev, curr) => {
            return prev.concat(curr);
        }, [])

        const resultCombination = GameUtils.isGameWon(player, flatBoard);
        const resultBoard: string[][] = [];

        if (resultCombination !== undefined) {
            const chars = resultCombination.split("");
            const colCount = 3;

            const segmentCount = Math.floor(chars.length / colCount);
            let startingX = 0;

            for (let index = 0; index < segmentCount; index++) {
                const sliced = chars.slice(startingX, startingX + colCount);
                resultBoard.push(sliced);
                startingX += colCount;
            }
        }
        return resultBoard;
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
                <h4>Game OVER</h4>
                <p>'{this.state.winner}' WINS</p>
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
                        <div key={Math.floor(Math.random() * Math.floor(12000))} className="gameBoardContainer__row">
                            {data.map((colData, index) => (
                                <BoardCell highlight={this.state.gameStatus === GameStatus.WON && this.state.winningState[idx][index] === "1" } key={Math.floor(Math.random() * Math.floor(20000))} disableClick={this.state.gameStatus !== (GameStatus.IN_PROGRESS || GameStatus.NEW)} onCellClickHandler={this._updateCellState(index, idx)} value={colData}></BoardCell>
                            ))}
                        </div>
                    ))}
                </StyledGameBoard>
            </StyledGameBoardWrapper>
        );
    }
}