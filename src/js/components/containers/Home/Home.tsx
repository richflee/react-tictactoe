import * as React from 'react';
import Button from '../../components/Button/Button';
import styled from 'styled-components';

interface BoardCellState {
    value: 'x' | 'o' | '-'
}

export class BoardCell extends React.Component<any, BoardCellState> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: props.value
        }

        this._onClickHandler = this._onClickHandler.bind(this);
    }

    _onClickHandler() {
        console.log('blarry');
        this.props.onCellClickHandler();
    }

    render() {
        return (
            <button onClick={() => this._onClickHandler()}>{this.state.value}</button>
        );
    }
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
    board: number[][],
    currentPlayer: 'x' | 'o'
}

export class GameBoard extends React.Component<any, GameBoardState> {
    constructor(props: any) {
        super(props);

        this.state = {
            board: this._populateGameBoard(),
            currentPlayer: 'x'
        } as GameBoardState;
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
        this.setState({
            currentPlayer: this.state.currentPlayer === 'x' ? 'o' : 'x'
        });
    }

    _updateCellState(colIndex: number, rowIndex: number) {
        return () => {
            const cp = JSON.parse(JSON.stringify(this.state.board));
            cp[rowIndex][colIndex] = this.state.currentPlayer;
            this._toggleCurrentPlayer();
            this.setState({
                board: cp
            });
        }
    }

    render() {
        console.log(this.state.board);
        return (
            <div>
                <div>Game here</div>
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


interface HomeComponentState {
    revealExplanatoryInfo: boolean
}

export default class Home extends React.Component<any, HomeComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            revealExplanatoryInfo: false
        } as HomeComponentState;

        this._onToggleTextDisplay = this._onToggleTextDisplay.bind(this);
    }

    _onToggleTextDisplay() {
        const reveal = !this.state.revealExplanatoryInfo;
        this.setState({
            revealExplanatoryInfo: reveal
        });
    }

    _renderExplanatoryText() {
        let explanatoryText = ``;
        return <p>{explanatoryText}</p>;
    }

    _toggleMessageButtonText() {
        return `New game`;
    }

    render() {
        return (
            <div>
                <Button onclick={this._onToggleTextDisplay}>{this._toggleMessageButtonText()}</Button>
                {this._renderExplanatoryText()}
                <GameBoard></GameBoard>
            </div>
        );
    }
}