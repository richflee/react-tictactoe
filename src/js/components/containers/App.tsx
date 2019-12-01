import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
require('./App.css')


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
                <div>
                    <h1>{this.state.title}</h1>
                    <Route exact path="/" component={Home} />
                </div>
            </Router>
        );
    }
}


export default App;