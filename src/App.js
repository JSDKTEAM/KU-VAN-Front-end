import React, { Component } from 'react';
import {
  Route, Switch
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Layout from './hoc/Layout/Layout';
import StationBar from './containers/StationBar/StationBar';
import Setting from './containers/Setting/Setting';
import VanManage from './containers/VanManage/VanManage';
import AdminComment from './containers/AdminComment/AdminComment';
import CustomerComment from './containers/CustomerComment/CustomerComment';
import HistoryReserve from './containers/HistoryReserve/HistoryReserve';

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Kanit'
    ],
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#00bc67',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#fff',
    },
    secondary: {
      light: '#0066ff',
      main: '#fff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#000',
    },

    // error: will use the default color
  },
});

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Layout>

            <Switch>
              <Route exact path="/" component={StationBar} />
              <Route exact path="/setting" component={Setting} />
              <Route exact path="/vanManage" component={VanManage} />
              <Route exact path="/admincomment" component={AdminComment} />
              <Route exact path="/customercomment" component={CustomerComment} />
              <Route exact path="/historyReserve" component={HistoryReserve} />
            </Switch>

          </Layout>
        </MuiThemeProvider>


      </div>
    );
  }

}

export default App;
