import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./Pages/HomePage";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                    </Routes>
                </Router>
            </Fragment>
        )
    }
}

export default App;
