import React from 'react';
import * as actionsTypes from '../../../store/actions/index';
import { connect } from 'react-redux';
import withErrorHandlar from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-home';
import { GetSessionUser } from '../../../store/utility';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EyeIcon from '@material-ui/icons/RemoveRedEye';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
var SESSION_USER = GetSessionUser();
const styles = theme => ({
  root: {
    // margin:theme.spacing.unit * 2,
    // paddingTop: theme.spacing.unit * 4,
    // paddingBottom: theme.spacing.unit * 4,
    borderRadius: "15px",
    boxShadow: `7px 4px 10px 0px rgba(0, 0, 0, 0.13)`,
    borderLeft: "10px",
    borderLeftStyle: 'solid',
    borderLeftColor: "#09a76a",
    marginLeft: 0,
    marginRight: 0,
    fontSize: '0.5rem',
    marginTop: '5px',
    marginBottom: '5px',

  },
  margin: {
    margin: 'auto',
  },
  test: {
    borderRadius: "15px",
    boxShadow: `7px 4px 10px 0px rgba(0, 0, 0, 0.13)`,
    borderLeft: "10px",
    borderLeftStyle: 'solid',
    borderLeftColor: "#09a76a",
    marginLeft: 0,
    marginRight: 0,
    fontSize: '0.5rem',
    marginTop: '5px',
    marginBottom: '5px',
  }
});
class ScrollDialog extends React.Component {
  state = {
    open: false,
    scroll: 'body',
    status: [],
    changStatus: [],
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
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
  componentDidMount() {

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
        phone = data.phoneNumberWalkIn;
      }
      else {
        name = data.nameWalkIn;
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
        return <Paper style={{ display: 'inline-flex', width: '100%' }} style={{
          borderRadius: "15px",
          boxShadow: `7px 4px 10px 0px rgba(0, 0, 0, 0.13)`,
          borderLeft: "10px",
          borderLeftStyle: 'solid',
          borderLeftColor: "#09a76a",
          marginLeft: 0,
          marginRight: 0,
          fontSize: '1rem',
          marginTop: '5px',
          marginBottom: '5px',
        }} >
          <Grid item xs container direction="row" justify="space-between" alignItems="baseline" style={{ marginLeft: '5px' }} >
            <Grid item xs container direction="column" justify="space-between" alignItems="baseline" >
              <Grid item >
                <Typography variant="subtitle1" >
                  ชื่อ : {name}
                </Typography>
              </Grid>
              <Grid item >
                <Typography variant="subtitle1" >
                  นามสกุล : {lastname}
                </Typography>
              </Grid>
              <Grid item >
                <Typography variant="subtitle1">
                  เบอร์โทร : {phone == null ? '' : phone}
                </Typography>
              </Grid>
            </Grid>
            <Grid item direction="row" style={{ marginLeft: '10px' }} justify="center" alignItems="center">
              <Switch
                checked={ch}
                onChange={this.handleSwitchChange(data.reserve_id)}
                value={data.reserve_id}
                color="primary"
              />
            </Grid>
          </Grid>
        </Paper>
      }

      // </ListItem>
    });
    countUnready = this.props.count - countReady;
    return (
      <div>
        <Fab
          variant="extended"
          size="medium" color="primary"
          style={{ width: "140px", display: this.props.status == null ? true : this.props.status }}
          className={classes.margin}
          onClick={this.handleClickOpen('paper')}
          disabled={false} >
          <EyeIcon />
          {this.props.nameOpenButton}
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          fullWidth={true}
          maxWidth={'xl'}
        >
          <DialogTitle id="scroll-dialog-title" style={{ transform: 'scale(0.99)' }}>
            จัดการผู้โดยสาร
          <Grid item xs container direction="row" justify="space-between" alignItems="center" style={{ transform: 'scale(0.99)' }} >
              <Grid item style={{ transform: 'scale(0.99)' }}>
                <Typography variant="body1">
                  เวลารถออก : {this.props.time_out} น.
                            </Typography>
              </Grid>
              <Grid item >
                <Typography >
                  จำนวนผู้จองทั้งหมด :  {this.props.count} คน
                </Typography>
              </Grid>
              <Grid item >
                <Typography>
                  จำนวนผู้จองที่มาแล้ว :  {countReady} คน
                </Typography>
              </Grid>
              <Grid item >
                <Typography >
                  จำนวนผู้จองที่ยังไม่มา :  {countUnready} คน
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="subtitle1">ข้อมูลผู้จอง</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">สถานะ</Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent  >

            {/* <Grid item xs container direction="row" justify="space-between" alignItems="center">
              
            </Grid> */}
            {reserver}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              ปิด
            </Button>
            {/* <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button> */}
          </DialogActions>
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

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar(withStyles(styles)(ScrollDialog), axios));
