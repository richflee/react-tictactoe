import * as React from 'react';
import styled from 'styled-components';

interface BoardCellState {
    value: 'x' | 'o' | '-',
    disableClick: boolean,
    highlight: boolean
}

interface BoardCellProps {
    value: string,
    disableClick: boolean,
    highlight: boolean,
    onCellClickHandler: () => any
}

const StyledBoardCell = styled.button`
    background: transparent;
    border: 1px solid purple;
    color: #12cad6;
    font-size: 5em;
    &.highlight {
        background-color: purple;
        color: #e9ea77;
    }
    &:active {
        background-color: #e9ea77;
    }
    &:disabled {
        color: rgba(18, 201, 214, 0.35);
        &.highlight {
            background-color: #e9ea77;
            border: 1px solid #46185f;
            color: #46185f;
        }
    }
`;

export class BoardCell extends React.Component<BoardCellProps, BoardCellState> {
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