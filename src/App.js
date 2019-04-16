import React, { Component } from 'react';
import {
    Route, Switch
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Layout from './hoc/Layout/Layout';
import StationBar from './containers/StationBar/StationBar';

const theme = createMuiTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Kanit'
        ].join(','),
      },
});

class App extends Component {
    render() {
        return (
            <div>
               
                    <Layout> 
                        <MuiThemeProvider>
                            <Switch>
                                            <Route exact path="/" component={StationBar}/>          
                                </Switch>
                        </MuiThemeProvider>
                    </Layout>
                
            </div>
        );
    }

} 

export default App;
