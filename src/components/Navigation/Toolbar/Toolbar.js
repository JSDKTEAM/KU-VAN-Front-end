import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/DateRange';
import VanIcon from '@material-ui/icons/AirportShuttle';
import Modal from '../../UI/Modal/Modal'
import { GetSessionUser } from '../../../store/utility'
import { NavLink } from 'react-router-dom';
import NavigetionItem from '../NavigationItems/NavigationItem/NavigetionItem';
import Drawers from '../../Drawers/Drawers';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textAlign: "center"
  },
  Tcenter:{
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
    let status = "none";
    let drawer ='';
    if(sessionuser.type_user == "ADMIN")
    {
      drawer = <Drawers type="ADMIN"/>
    }
    else if(sessionuser.type_user == "CUSTOMER")
    {
      drawer = <Drawers type="CUSTOMER"/>
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            { drawer }

            <NavLink className={classes.grow} style={{textDecoration:"none", color:"white"}} to="/" exact >
              <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
                KU-VAN
              </Typography>
            </NavLink>
            <Typography color="inherit">{sessionuser != null ? sessionuser.username : ""}</Typography>
            <Button color="inherit" onClick={props.logout}><Typography color="inherit" noWrap>ออกจากระบบ</Typography></Button>
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