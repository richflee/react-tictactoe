import * as React from 'react';
import Button from '../../components/Button/Button';
import { GameBoard } from '../GameBoard/GameBoard';
import * as Utils from '../../../utils/Utils';


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
        return Utils.generateUUID();
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