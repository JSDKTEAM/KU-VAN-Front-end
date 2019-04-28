import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actionsTypes from '../../store/actions/index';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import withErrorHandlar from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-home';
import { GetSessionUser } from '../../store/utility';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EyeIcon from '@material-ui/icons/RemoveRedEye'
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule'


import ListItem from '@material-ui/core/ListItem';

import Media from 'react-media';
import Grid from '@material-ui/core/Grid';

import Fab from '@material-ui/core/Fab';

import FormDialog from '../UI/FormDialog/FormDialog';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin:theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    borderRadius: "15px",
    boxShadow: `7px 4px 10px 0px rgba(0, 0, 0, 0.13)`,
    borderLeft: "10px",
    borderLeftStyle: 'solid',
    borderLeftColor: "#09a76a",
  },
  margin: {
    margin: theme.spacing.unit,
  },
  icon: {
    fontSize: 20,
  },
  iconLG: {
    fontSize: 60,
  },
  text: {
    paddingTop: "15px",
    fontSize: 15,
    fontFamily: [
      'Kanit'
    ],
  }
});

var dataBook = { "time_id": null, "destination": null, "token": null }; // will be state may be good better 
class Schedule extends  Component {
  state = {
    open: false,
  };
  componentDidMount() {
    // let station = this.props.station;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleContinue = (time_id,reserve_id) => {
    const SESSION_USER = GetSessionUser();
    if(reserve_id == null){
      dataBook.time_id = time_id;
      dataBook.token = SESSION_USER.token;
      this.props.dataBookSchedule(dataBook);
    }
    else{
       this.props.cancleBookSchedule(time_id,reserve_id,SESSION_USER.token); 
    }
    this.setState({ open: false });
  };
  handleDestination = (value) => {
    dataBook.destination = value.target.value;
  }

  render() { 
    const { classes } = this.props;
    const checkObject = this.props.checkBooked;
    const dialogChildren = (
        <div>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs >
                  <Typography>สถานีต้นสาย : {this.props.portName}</Typography> 
                </Grid>
              <Grid item xs >
                  <Typography>เวลารถออก : {this.props.time_out} น.</Typography> 
              </Grid>
              <Grid item xs>
                  <Typography> ชื่อผู้จอง : {this.props.nameCustomer}</Typography>
              </Grid>
            </Grid>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={checkObject.destination ==null? "ระบุปลายทางของท่าน":checkObject.destination}
              fullWidth
              onKeyUp={(val) => { this.handleDestination(val); }}
              disabled = {checkObject.time_id==null? false:true}
            />
        </div>

    );
    

    return (
      <div className={classes.card}>
        <ListItem alignItems="flex-start">
          <Paper style={{ display: 'inline-flex', width: '100%' }}
            className={classes.root}>
            <Grid container>
              <Media query="(max-width: 599px)" className={classes.grid}>
                {matches =>
                  matches ? (
                    <>
                      <Grid item xs={2}>
                        <Grid item xs container direction="column" justify="center" alignItems="center">
                          <Grid item xs>
                            <ScheduleIcon style={{ color: "#09a76a", fontSize: 40 }} />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={10}>
                        <Grid item xs container direction="column" justify="center" alignItems="center">
                          <Grid item xs>
                            <Typography gutterBottom variant="h6">
                              เวลารถออก : {this.props.time_out} น.
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">ป้ายทะเบียนรถ : {this.props.license_plate + ' ' + this.props.province}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} >
                        <Grid item xs container direction="row" justify="center" alignItems="center">
                          <Grid item>
                            <PersonIcon className={classes.iconLG} style={{ color: "#09a76a" }} />
                          </Grid>
                          <Grid item >
                            <Typography variant="subtitle1">{this.props.count_seat} / {this.props.number_of_seats} คน</Typography>
                          </Grid>
                          <Grid item >
                            
                            <FormDialog
                              handleClickOpen={this.handleClickOpen}
                              handleClose={this.handleClose}
                              handleContinue={(time_id,reserve_id) => this.handleContinue(this.props.time_id,checkObject.reserve_id)}
                              open={this.state.open}
                              onClose={this.handleClose}
                              nameOpenButton={checkObject.time_id==null? 'จอง':'ยกเลิกการจอง'}
                              nameContinueButton= {checkObject.time_id==null? "ยืนยัน":"ยกเลิกการจอง"}
                              nameCancleButton="ปิด"
                              disabledBook = {!this.props.checkLogin}
                              icon = {checkObject.time_id==null? 'ADD':'CANCLE'}
                            >
                              {dialogChildren}
                            </FormDialog>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>

                  ) : (
                      <>
                        <Grid item xs={1}>
                          <Grid item xs container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <ScheduleIcon className={classes.iconLG} style={{ color: "#09a76a" }} />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid item xs container direction="column" >
                            <Grid item xs>
                              <Typography gutterBottom variant="h4">
                                เวลารถออก : {this.props.time_out} น.
                            </Typography>
                              <Typography gutterBottom variant="subtitle1">ป้ายทะเบียนรถ : {this.props.license_plate + ' ' + this.props.province}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={2} style={{ borderLeft: "2px", borderLeftStyle: 'solid', borderLeftColor: '#000' }}>
                          <Grid item xs container direction="row" justify="center" alignItems="center">
                            <Grid item>
                              <PersonIcon className={classes.iconLG} style={{ color: "#09a76a" }} />
                            </Grid>
                            <Grid item >
                              <Typography variant="subtitle1">{this.props.count_seat} / {this.props.number_of_seats} คน</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}  >
                          <Grid item xs container direction="column" justify="center" alignItems="center" spacing={24}>
                            <Grid item xs >
                              <FormDialog
                                handleClickOpen={this.handleClickOpen}
                                handleClose={this.handleClose}
                                handleContinue={(time_id,reserve_id) => this.handleContinue(checkObject.time_id,checkObject.reserve_id)}
                                open={this.state.open}
                                onClose={this.handleClose}
                                nameOpenButton={checkObject.time_id==null? 'จอง':'ยกเลิกการจอง'}
                                nameContinueButton= {checkObject.time_id==null? "ยืนยัน":"ยกเลิกการจอง"}
                                nameCancleButton="ปิด"
                                disabledBook = {!this.props.checkLogin}
                                icon = {checkObject.time_id==null? 'ADD':'CANCLE'}
                              >
                              {dialogChildren}
                              </FormDialog>
                              <Fab variant="contained" size="large" color="secondary" className={classes.margin}><EyeIcon /></Fab>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    )
                }
              </Media>
            </Grid>
          </Paper>
        </ListItem>
      </div>
    )
  }

}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  booking: state.stations.booked,
  authUsername: state.auth.username,
  authType_user: state.auth.type_user,
  authToken: state.auth.token,
})

const mapDispatchProps = dispacth => ({
  dataBookSchedule: (dataBook) => dispacth(actionsTypes.book(dataBook)),
  cancleBookSchedule: (time_id,resever_id,token) => dispacth(actionsTypes.cancleBook(time_id,resever_id,token))
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(Schedule), axios));

