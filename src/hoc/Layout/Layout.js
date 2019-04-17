import React, { Component } from "react";
import Aux from "../AuxHoc/Aux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Modal from "../../components/UI/Modal/Modal"
import SimpleModal from "../../components/UI/SimpleModal/SimpleModal"
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from '../../axios-home';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions/index';
import withErrorHandlar from '../../hoc/withErrorHandler/withErrorHandler';


const loginfield = { username: null, password: null };

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
  };

  loginHandler = () => {
    this.setState({ loginShow: !(this.state.loginShow) });
  };

  registerHandler = () => {
    this.setState({ registerShow: !(this.state.registerShow) });
  };

  usernameHandler = (value) => {
    loginfield.username = value.target.value;
  };

  passwordHandler = (value) => {
    loginfield.password = value.target.value;
  };

  checkAuth = () => {
    this.props.authPostCheck(loginfield);
  };

  render() {
    const { classes } = this.props;
    console.log("1111");
    console.log(this.props.username);
    console.log(this.props.type_user);
    console.log(this.props.token);
    return (
      <Aux>
        <Toolbar
          login={this.loginHandler}
          register={this.registerHandler} />
        <main>{this.props.children}</main>
        <SimpleModal open={this.state.loginShow} onClose={this.loginHandler}>
          <Typography variant="h6" id="modal-title">Login</Typography>
          <hr />
          <TextField
            label="Username"
            className={classes.textField}
            onKeyUp={(val) => { this.usernameHandler(val); }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
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
            onClick={(val) => { this.checkAuth(val); }}>
            Login</Button>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.textField + " " + classes.dense}>
            Back</Button>
        </SimpleModal>

        <SimpleModal open={this.state.registerShow} onClose={this.registerHandler}>
          <Typography variant="h6" id="modal-title">Register</Typography>
          <hr />
          <TextField
            label="Username"
            className={classes.textField}
            onKeyUp={(val) => { this.usernameHandler(val); }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
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
            className={classes.textField + " " + classes.dense}>
            Register</Button>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.textField + " " + classes.dense}>
            Back</Button>
        </SimpleModal>
      </Aux>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({  
  username: state.auth.username,
  type_user: state.auth.type_user,
  token: state.auth.token
})

const mapDispatchProps = dispacth => ({
  authPostCheck: (loginfield) => dispacth(actionsTypes.authPostCheck(loginfield))
})


export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(Layout), axios));