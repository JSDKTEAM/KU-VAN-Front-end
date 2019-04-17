import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import EyeIcon from '@material-ui/icons/RemoveRedEye'
import Icon from '@material-ui/core/Icon';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import iconBook from '../../assets/iconBook.png';
import SvgIcon from '@material-ui/core/SvgIcon';
import Media from 'react-media';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import FormDialog from '../UI/FormDialog/FormDialog';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    borderRadius: "15px",
    boxShadow: `0 5px 10px 0 rgba(0, 0, 0, 0.13)`,
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

class Schedule extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const dialogChildren = (
      <div>
          <DialogContentText>
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs >
                    สถานีต้นสาย : บางเขน
                </Grid>
                <Grid item xs >
                   เวลารถ : 8.30-9.00 น.
                </Grid>
                <Grid item xs>
                    ชื่อ : มาดีนะฮ์  หวังแจ่ม
                  </Grid>
                <Grid item xs>
                    เพิ่มจำนวนที่นั่ง : 
                    <AddIcon />
                </Grid>
              </Grid>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="ระบุปลายทางของท่าน"
              fullWidth
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
                            handleClickOpen = {this.handleClickOpen}
                            handleClose = {this.handleClose}
                            open = {this.state.open}
                            onClose = {this.handleClose}
                            nameOpenButton = "จอง"
                            nameOkButton = "ยืนยัน"
                            nameCancleButton = "ยกเลิก"
                          >
                          {dialogChildren}
                          </FormDialog>
                            {/* <Fab variant="extended" size="large" color="primary" style={{width:"150px"}} className={classes.margin}><AddIcon/> จอง</Fab> */}
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
                              <Fab variant="extended" size="large" color="primary" style={{ width: "150px" }} className={classes.margin}><AddIcon /> จอง</Fab>
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

export default withStyles(styles)(Schedule);