import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Home from './home/Home';

const theme = createMuiTheme();

const App = () => (
    <Router>
        <MuiThemeProvider theme={theme}>
            <Route exact path="/" component={Home}/>
            <Button variant="contained" color="primary" raised>+1</Button>
        </MuiThemeProvider>
    </Router>
);

export default App;
