import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DateIcon from '@material-ui/icons/DateRange';
import VanIcon from '@material-ui/icons/AirportShuttle';
import CommentIcon from '@material-ui/icons/Forum';
import Book from '@material-ui/icons/Book';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    let drawer = '';

    if(this.props.type == "ADMIN")
    {
      drawer =            
            <List>
              <NavLink style={{color:"white"}} to="/setting" exact onClick={this.handleDrawerClose}>
                <ListItem button key="Schedule">
                  <ListItemIcon><DateIcon/></ListItemIcon>
                  <ListItemText primary="Schedule" />
                </ListItem>
              </NavLink>
              <NavLink style={{color:"white"}} to="/vanManage" exact onClick={this.handleDrawerClose}>
                <ListItem button key="Van">
                  <ListItemIcon><VanIcon/></ListItemIcon>
                  <ListItemText primary="Van" />
                </ListItem>
              </NavLink>
              <NavLink style={{color:"white"}} to="/admincomment" exact onClick={this.handleDrawerClose}>
                <ListItem button key="Comment">
                  <ListItemIcon><CommentIcon/></ListItemIcon>
                  <ListItemText primary="Comment" />
                </ListItem>
              </NavLink>
            </List>
    }
    else if(this.props.type == "CUSTOMER")
    {
      drawer =            
          <List>
              <NavLink style={{color:"white"}} to="/" exact onClick={this.handleDrawerClose}>
                <ListItem button key="จอง">
                  <ListItemIcon><Book/></ListItemIcon>
                  <ListItemText primary="จอง" />
                </ListItem>
              </NavLink>
              <NavLink style={{color:"white"}} to="/customercomment" exact onClick={this.handleDrawerClose}>
                <ListItem button key="แสดงความคิดเห็น">
                  <ListItemIcon><CommentIcon/></ListItemIcon>
                  <ListItemText primary="แสดงความคิดเห็น" />
                </ListItem>
              </NavLink>
            
          </List>
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
    
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />

          { drawer }

        </Drawer>
        
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
