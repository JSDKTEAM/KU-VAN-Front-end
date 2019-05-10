import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CancleIcon from '@material-ui/icons/Cancel';
import ScrollDialog from '../ScrollDialog/ScrollDialog';
import VarifyBook from '../ScrollDialog/varifyBook';


const styles = theme => ({
  root: {
    fontSize: 15,
    fontFamily: [
      'Kanit'
    ],
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

class FormDialog extends React.Component {

  componentDidMount() {
    let station = this.props.station;
  }
  render() {
    const { classes } = this.props;
    let icon;
    let fab;
    switch (this.props.icon) {
      case 'ADD':
        icon = <AddIcon />
        break;
      case 'CANCLE':
        icon = <CancleIcon />
        break;

      default:
        icon = <AddIcon />
        break;
    }
    let continueBook = false;
    if (this.props.checkAdmin == true) {
      fab = <VarifyBook
              dataBook = {this.props.dataBook}
              port_id = {this.props.port_id}
              time_out = {this.props.time_out}
              count = {this.props.count}
              time_id = {this.props.time_id}
              numberCar = {this.props.numberCar}
              provinceCar = {this.props.provinceCar}

            />
      if(this.props.walkInValidate == true){
        continueBook = true;
      }
    }
    return (
      <div>
        <Grid item xs container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Fab
              variant="extended"
              size="medium" color="primary"
              style={{ width: "140px", display: this.props.status == null ? true : this.props.status }}
              className={classes.margin}
              onClick={this.props.handleClickOpen}
              disabled={this.props.disabledBook || this.props.count >= 15 || false} >
              {icon}
              {this.props.nameOpenButton}
            </Fab>
           
          </Grid>
          <Grid item>
            {fab}
          </Grid>
        </Grid>

        
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.titlename == null ? "ข้อมูลการจอง" : this.props.titlename}</DialogTitle>
          <DialogContent>

            {this.props.children}

          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary" 
              style={{ display: this.props.status == null ? true : this.props.status }}>
              {this.props.nameCancleButton}
            </Button>
            <Button onClick={this.props.handleContinue} color="primary" 
              style={{ display: this.props.status == null ? true : this.props.status }}
              disabled={continueBook}>
              {this.props.nameContinueButton}
               
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


}


export default withStyles(styles)(FormDialog);