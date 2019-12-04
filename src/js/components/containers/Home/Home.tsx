import * as React from 'react';
import Button from '../../components/Button/Button';
import { GameBoard } from '../GameBoard/GameBoard';

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
        this.props.onCellClickHandler();
    }

    render() {
        return (
            <button onClick={() => this._onClickHandler()}>{this.state.value}</button>
        );
    }
}


interface HomeComponentState {
    revealExplanatoryInfo: boolean,
    gameId: string
}

export default class Home extends React.Component<any, HomeComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            revealExplanatoryInfo: false,
            gameId: this._generateGameId()
        } as HomeComponentState;

        this._onToggleTextDisplay = this._onToggleTextDisplay.bind(this);
    }

    _generateGameId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    _onToggleTextDisplay() {
        const reveal = !this.state.revealExplanatoryInfo;
        this.setState({
            revealExplanatoryInfo: reveal,
            gameId: this._generateGameId()
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
                <GameBoard gameId={this.state.gameId} ></GameBoard>
            </div>
        );
    }
}