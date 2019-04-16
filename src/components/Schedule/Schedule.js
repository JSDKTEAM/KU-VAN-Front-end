import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import iconBook from '../../assets/iconBook.png';
import SvgIcon from '@material-ui/core/SvgIcon';
import Media from 'react-media';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    paddingTop: "15px",
    fontSize: 15,

  }
});

const Schedule = (props) => {
  const { classes } = props;
  return (
    <div className={classes.card}>
      <ListItem alignItems="flex-start">
        <Paper style={{ display: 'inline-flex', width: '100%' }}
          className={classes.root}>
          <Media query="(max-width: 599px)" className={classes.grid}>
            {matches =>
              matches ? (
                <div>
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>
                      เวลารถออก: {props.time_out}
                          </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>
                      จำนวนผู้จองที่นั่ง : {props.count_seat}
                          </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>
                      <SvgIcon {...props}
                        onClick={props.booking}>
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />
                      </SvgIcon>
                          </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        ทะเบียน : {props.license_plate + ':' + props.province}
                          </Paper>
                  </Grid>
                  {/* <Typography variant="fullWidth" p={2} color="primary"
                    className={classes.text}>
                    Time out: {props.time_out}, Count : {props.count_seat} ทะเบียน : {props.license_plate + ':' + props.province}
                  </Typography>
                  <SvgIcon {...props}
                    onClick={props.booking}>
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />
                  </SvgIcon> */}
                </div>

              ) : (
                  <div>
                    <Typography variant="fullWidth" p={2} color="primary"
                      className={classes.text}>
                      Time out: {props.time_out}, Count : {props.count_seat} ทะเบียน : {props.license_plate + ':' + props.province}
                    </Typography>
                    <SvgIcon {...props}
                      onClick={props.booking}>
                      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />
                    </SvgIcon>
                  </div>
                )
            }
          </Media>

        </Paper>
      </ListItem>
    </div>
  )
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Schedule);