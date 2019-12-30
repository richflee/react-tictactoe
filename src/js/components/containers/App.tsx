import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import styled from 'styled-components';
require('./App.css');


const StyledAppContainer = styled.div`
    color: #297ca0;
    font-size: 1em;
    padding: 0.8em;
    text-align: center;
`;


interface AppComponentState {
    title: string
}
class App extends React.Component<any, AppComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: "Noughts and crosses"
        };
    }
    render() {
        return (
            <Router>
                <StyledAppContainer>
                    <h1>{this.state.title}</h1>
                    <Route exact path="/" component={Home} />
                </StyledAppContainer>
            </Router>
        );
    }
}


export default App;