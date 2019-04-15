import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Home from './home/Home';
import Layout from '../hoc/Layout/Layout';

const theme = createMuiTheme();

const App = () => (
    <Layout>
        <Router>
            <MuiThemeProvider theme={theme}>
                <Route exact path="/" component={Home}/>
            
            </MuiThemeProvider>
        </Router>
    </Layout>
);

export default App;
