import * as React from 'react';
import styled from 'styled-components';

interface BoardCellState {
    value: 'x' | 'o' | '-',
    disableClick: boolean,
    highlight: boolean
}

const StyledBoardCell = styled.button`
    background: transparent;
    border: 1px solid #e9ea77;
    color: #e9ea77;
    font-size: 5em;
    &.highlight {
        background-color: #e9ea77;
        color: #46185f;
    }
    &:active {
        background-color: #e9ea77;
    }
    &:disabled {
        color: rgba(255, 255, 255, 0.33);
        &.highlight {
            background-color: #e9ea77;
            border: 1px solid #46185f;
            color: #46185f;
        }
    }
`;

export class BoardCell extends React.Component<any, BoardCellState> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: props.value,
            disableClick: props.disableClick,
            highlight: props.highlight
        }

        this._onClickHandler = this._onClickHandler.bind(this);
    }

    _onClickHandler() {
        this.props.onCellClickHandler();
    }

    render() {
        return (
            <StyledBoardCell className={ this.state.highlight ? 'highlight' : '' } disabled={this.state.disableClick} onClick={() => this._onClickHandler()}>{this.state.value}</StyledBoardCell>
        );
    }
}