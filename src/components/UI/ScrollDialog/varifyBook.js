import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


import * as actionsTypes from '../../../store/actions/index';
import { connect } from 'react-redux';
import withErrorHandlar from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-home';
import { GetSessionUser } from '../../../store/utility';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EyeIcon from '@material-ui/icons/RemoveRedEye';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
var SESSION_USER = GetSessionUser();

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  font_size: {
    fontSize: "4vw"
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class varifyBook extends React.Component {
  state = {
    open: false,
    status: [],
    changStatus: [],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    let test = [];
    this.props.dataBook.map((data) => {
      if (data.time_id == this.props.time_id) {
        test.push({
          reserve_id: data.reserve_id,
          status: data.isCame,
        });

      }
    });
    this.setState({ status: test });
    console.log('-----------------------------------------');
    console.log(this.state.status);
  };

  handleClose = () => {
    SESSION_USER = GetSessionUser();
    this.setState({ open: false });
    this.props.iscame(this.state.status, SESSION_USER.token)
  };

  handleSwitchChange = re_id => event => {
    let temp = [...this.state.status];
    temp.map(s => {
      if (s.reserve_id == re_id) {
        s.status = event.target.checked;
      }
    });
    this.setState({ status: temp });
  }

  render() {
    const { classes } = this.props;
    let name = '';
    let lastname = '';
    let phone = '';
    let countBook = 0;
    let countReady = 0;
    let countUnready = 0;
    const reserver = this.props.dataBook.map((data) => {
      
      if (data.nameWalkIn == null) {
        name = data.User.fname;
        lastname = data.User.lname;
        phone = data.User.phoneNumber;
      }
      else {
        name = data.nameWalkIn;
        lastname = '';
        phone = data.phoneNumberWalkIn;
       
      }
      if (this.props.time_id == data.time_id) {
        countBook++;
      }
      if (data.time_id == this.props.time_id) {
        let ch = false;
        this.state.status.map((st) => {
          if (data.reserve_id == st.reserve_id) {
            console.log('st.reserve_id' + st.reserve_id);
            console.log('st.status' + st.status);

            return ch = st.status;
          }

        });
        console.log('ch:' + ch);
        if (data.isCame == 1) {
          countReady++;
        }
        return <ListItem button>
        <Paper style={{
          display: 'inline-flex',
          width: '100%',
          borderRadius: "15px",
          boxShadow: `7px 4px 10px 0px rgba(0, 0, 0, 0.13)`,
          borderLeft: "10px",
          borderLeftStyle: 'solid',
          borderLeftColor: "#09a76a",
          marginLeft: 0,
          marginRight: 0,
          fontSize: "4vw",
          marginTop: '5px',
          marginBottom: '5px',
        }} >
          <Grid item xs container direction="row" justify="space-between" alignItems="baseline" style={{ marginLeft: '5px' }} >
            <Grid item xs container direction="column" justify="space-between" alignItems="baseline" >
              <Grid item >
                <Typography variant="subtitle1" >
                  ชื่อ : {name}  {lastname}
                </Typography>
              </Grid>
              {/* <Grid item >
                <Typography variant="subtitle1" >
                  นามสกุล :
                </Typography>
              </Grid> */}
              <Grid item >
                <Typography variant="subtitle1">
                  เบอร์โทร : {phone == null ? '' : phone}
                </Typography>
              </Grid>
            </Grid>
            <Grid item direction="column" style={{ marginLeft: '10px' }} justify="space-between" alignItems="center">
              <Switch
                checked={ch}
                onChange={this.handleSwitchChange(data.reserve_id)}
                value={data.reserve_id}
                color="primary"
              />
            </Grid>
          </Grid>
        </Paper>
       </ListItem>
      }

      // </ListItem>
    });
    countUnready = this.props.count - countReady;
    return (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open full-screen dialog
        </Button> */}
        <Fab
          variant="extended"
          size="medium" color="primary"
          style={{ width: "140px", display: this.props.status == null ? true : this.props.status }}
          className={classes.margin}
          onClick={this.handleClickOpen}
          disabled={false} >
          <EyeIcon />
          {this.props.nameOpenButton}
        </Fab>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                ยืนยันสถานะผู้จอง
              </Typography>

            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <Grid item xs container direction="row" justify="space-between" alignItems="center" >
                <Grid item >
                      <Typography variant="h6" color="textPrimary">
                        เวลารถออก : {this.props.time_out} น.
                      </Typography>
                </Grid>
                <Grid item >
                        <Typography >
                          ข้อมูลรถตู้ :  {this.props.numberCar} {this.props.provinceCar}
                        </Typography>
                </Grid>
                <Grid item >
                        <Typography >
                          ผู้จองทั้งหมด :  {this.props.count} คน
                        </Typography>
                </Grid>
              </Grid>  
            </ListItem>
            <ListItem button>
              <Grid item xs container direction="row" justify="space-between" alignItems="center" >
                  
                  <Grid item >
                    <Typography>
                      ผู้จองที่มาแล้ว :  {countReady} คน
                    </Typography>
                  </Grid>
                  <Grid item >
                    <Typography >
                      ผู้จองที่ยังไม่มา :  {countUnready} คน
                    </Typography>
                  </Grid>
                </Grid>
            </ListItem>   
            
              {reserver}
             
               
          </List>
        </Dialog>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({

})

const mapDispatchProps = dispacth => ({
  iscame: (data, token) => dispacth(actionsTypes.iscame(data, token))
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar(withStyles(styles)(varifyBook), axios));
