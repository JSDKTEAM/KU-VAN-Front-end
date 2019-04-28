import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Modal from '../../UI/Modal/Modal'
import { GetSessionUser } from '../../../store/utility'

import NavigetionItem from '../NavigationItems/NavigationItem/NavigetionItem';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

// // export const test = (tt) =>
// // {
// //   console.log(tt);
// // }

// function test(linkPath)
// {
//   // let currentPath = window.location.pathname;
//   // currentPath =  window.location.linkPath;
//   // window.location.href = window.location.origin + "/login";

// }

function ButtonAppBar(props) {
  const { classes } = props;
  let sessionuser = GetSessionUser();

  if(sessionuser != null)
  {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              KU-VAN
            </Typography>
            <Typography color="inherit">{sessionuser != null ? sessionuser.username : ""}</Typography>
            <Button color="inherit" onClick={props.logout}>ออกจากระบบ</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  else
  {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              KU-VAN
            </Typography>
            <Button color="inherit" onClick={props.register} style={{display: props.haveLogin}}>สมัครสมาชิก</Button>
            <Button color="inherit" onClick={props.login} style={{display: props.haveLogin}}>เข้าสู่ระบบ</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);