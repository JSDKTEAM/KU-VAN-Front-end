import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Counter from './counter/Counter';
import Home from './home/Home';

const theme = createMuiTheme();

const App = () => (
    <Router>
        <MuiThemeProvider theme={theme}>
            <Route exact path="/" component={Home}/>
            <Route path="/counter" component={Counter}/>
        </MuiThemeProvider>
    </Router>
);

export default App;
