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
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule'


import ListItem from '@material-ui/core/ListItem';

import Media from 'react-media';
import Grid from '@material-ui/core/Grid';


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

var dataBook = { "time_id": null, "destination": null, "token": null,"nameWalkIn": '',"phoneNumberWalkIn": '' }; // will be state may be good better 
class Schedule extends  Component {
  state = {
    open: false,
    walkInValidate : true,
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
    if(dataBook.destination == null)
    {
      dataBook.destination = this.props.portName;
      //console.log(this.props.portName);
    }
    if(reserve_id == null || SESSION_USER.type_user == 'ADMIN'){
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
  handleName = (value) => {
    dataBook.nameWalkIn = value.target.value;
    
    if(value.target.value == '' ){
      this.setState({walkInValidate: true});
    }
    else if(dataBook.nameWalkIn != '' && dataBook.phoneNumberWalkIn != ''){
      this.setState({walkInValidate: false});
    }
  }
  handleMobile = (value) => {
    dataBook.phoneNumberWalkIn = value.target.value;
    
    if(value.target.value == '' ){
      this.setState({walkInValidate: true});
    }
    else if(dataBook.nameWalkIn != '' && dataBook.phoneNumberWalkIn != ''){
      this.setState({walkInValidate: false});
    }
  }

  render() { 
    const { classes } = this.props;
    const checkObject = this.props.checkBooked;
    
    var admin;
    if(this.props.checkLogin){
      //console.log(this.props.session.type_user)
      if(  this.props.session.type_user == 'ADMIN' ){
        admin = <div>
               <TextField
                             autoFocus
                             margin="dense"
                             id="destination"
                            //  label={checkObject.destination ==null? "ระบุปลายทางของท่าน":checkObject.destination}
                              label={"ระบุปลายทางของท่าน"}
                             fullWidth
                             onKeyUp={(val) => { this.handleDestination(val); }}
                             disabled = {checkObject.time_id==null||this.props.session.type_user == 'ADMIN'? false:true}
               />  
               <TextField
                             autoFocus
                             margin="dense"
                             id="name"
                            //  label={checkObject.nameWalkIn ==null? "โปรดระบุชื่อ":checkObject.nameWalkIn}
                            label={"โปรดระบุชื่อ"}
                             fullWidth
                             onKeyUp={(val) => { this.handleName(val); }}
                             disabled = {checkObject.time_id==null||this.props.session.type_user == 'ADMIN'? false:true}
                             required={true}
               />   
               <TextField
                             autoFocus
                             margin="dense"
                             id="phone"
                            //  label={checkObject.phoneNumberWalkIn ==null? "โปรดระบุหมายเลขมือถือ":checkObject.phoneNumberWalkIn}
                              label={"โปรดระบุหมายเลขมือถือ"}
                             fullWidth
                             onKeyUp={(val) => { this.handleMobile(val); }}
                             disabled = {checkObject.time_id==null||this.props.session.type_user == 'ADMIN'? false:true}
                             required={true}
               />   
           </div>      
     }
     else{
        admin =  <div>
          <Typography> ชื่อผู้จอง : {this.props.nameCustomer}</Typography>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label={"ระบุปลายทางของท่าน"}
              fullWidth
              onKeyUp={(val) => { this.handleDestination(val); }}
              disabled = {checkObject.time_id==null? false:true}
            />
          </div>
     }
    }
    
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
                  {admin}
              </Grid>
            </Grid> 
        </div>
    
    );
    let typeUser = false;
    if(this.props.session != null){
      if(this.props.session.type_user == 'ADMIN'){
        typeUser = true;
      }
    }

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
                              nameOpenButton={checkObject.time_id==null||this.props.session.type_user == 'ADMIN'? 'จอง':'ยกเลิกจอง'}
                              nameContinueButton= {checkObject.time_id==null||this.props.session.type_user == 'ADMIN'? "ยืนยัน":"ยกเลิกจอง"}
                              nameCancleButton="ปิด"
                              disabledBook = {!this.props.checkLogin||this.props.count_seat>15}
                              icon = {checkObject.time_id==null||this.props.session.type_user == 'ADMIN'? 'ADD':'CANCLE'}
                              checkAdmin = {typeUser}

                              dataBook = {this.props.booking}
                              port_id = {this.props.port_id}
                              time_out = {this.props.time_out}
                              count = {this.props.count_seat}
                              time_id = {this.props.time_id}
                              numberCar = {this.props.license_plate}
                              provinceCar = {this.props.province}
                              walkInValidate = {this.state.walkInValidate }
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
                                handleContinue={(time_id,reserve_id) => this.handleContinue(this.props.time_id,checkObject.reserve_id)}
                                open={this.state.open}
                                onClose={this.handleClose}
                                nameOpenButton={checkObject.time_id==null||this.props.session.type_user == 'ADMIN'? 'จอง':'ยกเลิกการจอง'}
                                nameContinueButton= {checkObject.time_id==null||this.props.session.type_user == 'ADMIN'? "ยืนยัน":"ยกเลิกจอง"}
                                nameCancleButton="ปิด"
                                disabledBook = {!this.props.checkLogin||this.props.count_seat>15}
                                icon = {checkObject.time_id==null||this.props.session.type_user == 'ADMIN'? 'ADD':'CANCLE'}
                                checkAdmin = {typeUser}

                                dataBook = {this.props.booking}
                                port_id = {this.props.port_id}
                                time_out = {this.props.time_out}
                                count = {this.props.count_seat}
                                time_id = {this.props.time_id}
                                numberCar = {this.props.license_plate}
                                provinceCar = {this.props.province}
                                walkInValidate = {this.state.walkInValidate  }
                              >
                              {dialogChildren}
                              </FormDialog>
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

