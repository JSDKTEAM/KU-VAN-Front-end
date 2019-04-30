import React, { Component } from "react";
import Aux from "../AuxHoc/Aux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import FormDialog from "../../components/UI/FormDialog/FormDialog"
import SimpleModal from "../../components/UI/SimpleModal/SimpleModal"
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from '../../axios-home';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions/index';
import withErrorHandlar from '../../hoc/withErrorHandler/withErrorHandler';
import { GetSessionUser } from '../../store/utility';


const loginfield = { username: null, password: null };
const registerfield = {username: null, firstname: null, lastname: null, password: null, comfirmpassword: null, phone: null};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  textMargin: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },

})

class Layout extends Component {

  state = {
    showSideDrawer: false,
    loginShow: false,
    registerShow: false,
    logout: false,
  };

  usernameHandler = (value) => {
    loginfield.username = value.target.value;
  };

  passwordHandler = (value) => {
    loginfield.password = value.target.value;
  };

  usernameRegister = (value) => {
    registerfield.username = value.target.value;
  };

  firstnameRegister = (value) => {
    registerfield.firstname = value.target.value;
  };

  lastnameRegister = (value) => {
    registerfield.lastname = value.target.value;
  };

  passwordRegister = (value) => {
    console.log(value.target.value);
    registerfield.password = value.target.value;
  };

  comfirmpasswordRegister = (value) => {
    registerfield.comfirmpassword = value.target.value;
  };

  phoneRegister = (value) => {
    registerfield.phone = value.target.value;
  };

  checkAuth = async () => {

    let res = await axios.post('/auth/login', {
      username : loginfield.username,
      password : loginfield.password     
    });

    if(res != null)
    {
      this.props.authPostCheck(res.data);
    }

  };

  registerCheck = async () => {

    // let res = await axios.post('/auth/login', {
    //   username : loginfield.username,
    //   password : loginfield.password     
    // });

    // if(res != null)
    // {
    //   this.props.authPostCheck(res.data);
    // }

    this.props.authRegister(registerfield);

  };


  handleClickOpen = () => {
    this.setState({ loginShow: true });
  };

  handleClose = () => {
    this.setState({ loginShow: false });
  };

  handleClickOpenR = () => {
    this.setState({ registerShow: true });
  };
  
  handleCloseR = () => {
    this.setState({ registerShow: false });
  };

  handleLogout = () => {
    sessionStorage.removeItem('UserSession');
    this.setState({ loginShow: false });
    window.location.href = window.location.origin;

  };

  render() {
    const { classes } = this.props;

    let sessionUser = GetSessionUser();
    let haveLogin = "show";

    if(sessionUser != null)
    {
      haveLogin = "none";
    }
    //console.log(sessionUser);
    // if(this.props.loginStatus)
    // {
    //   this.state.loginShow = false;
    // }

    //console.log(haveLogin);
    return (
      <Aux>
        <Toolbar
          login={this.handleClickOpen}
          register={this.handleClickOpenR}
          logout={this.handleLogout}
          haveLogin={haveLogin} />
        <main>{this.props.children}</main>

        <FormDialog
          handleClickOpen = {this.handleClickOpen}
          handleClose = {this.handleClose}
          handleContinue = {this.handleClose}
          open = {this.state.loginShow}
          onClose = {this.handleClose}
          titlename = "เข้าสู่ระบบ"
          status="none"
        >
          <hr />
          <TextField
            label="บัญชี"
            className={classes.textField}
            onKeyUp={(val) => { this.usernameHandler(val); }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="รหัสผ่าน"
            type="password"
            className={classes.textField}
            onKeyUp={(val) => { this.passwordHandler(val); }}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.textField + " " + classes.dense}
            onClick={(val) => { this.checkAuth(val); this.handleClose(); }}>
            เข้าสู่ระบบ</Button>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.textField + " " + classes.dense}
            onClick={this.handleClose}>
            กลับ</Button>
        </FormDialog>

        <FormDialog
          handleClickOpen = {this.handleClickOpenR}
          handleClose = {this.handleCloseR}
          handleContinue = {this.handleCloseR}
          open = {this.state.registerShow}
          onClose = {this.handleCloseR}
          titlename = "สมัครสมาชิก"
          status="none"
        >
          <hr/>
          <TextField
            label="บัญชี"
            className={classes.textField}
            onKeyUp={(val) => { this.usernameRegister(val); }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="ชื่อ"
            className={classes.textField}
            onKeyUp={(val) => { this.firstnameRegister(val); }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="นามสกุล"
            className={classes.textField}
            onKeyUp={(val) => { this.lastnameRegister(val); }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="รหัสผ่าน"
            type="password"
            className={classes.textField}
            onKeyUp={(val) => { this.passwordRegister(val); }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="เบอร์ติดต่อ"
            className={classes.textField}
            onKeyUp={(val) => { this.phoneRegister(val); }}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.textField + " " + classes.dense}
            onClick={(val) => { this.registerCheck(val); this.handleCloseR(); }}>>      
            ลงทะเบียน</Button>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.textField + " " + classes.dense}
            onClick={this.handleCloseR}>
            กลับ</Button>
        </FormDialog>
      </Aux>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({  
  loginStatus: state.auth.loginStatus
})

const mapDispatchProps = dispacth => ({
  authPostCheck: (loginfield) => dispacth(actionsTypes.authPostCheck(loginfield)),
  authRegister: (registerfield) => dispacth(actionsTypes.authRegister(registerfield))
})


export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(Layout), axios));