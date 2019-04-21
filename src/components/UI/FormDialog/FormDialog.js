import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

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

class FormDialog extends React.Component  {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab 
          variant="extended" 
          size="large" color="primary" 
          style={{width:"150px", display:this.props.status == null ? true : this.props.status}} 
          className={classes.margin} 
          onClick={this.props.handleClickOpen}
            >
          <AddIcon/> 
          {this.props.nameButton}
        </Fab>
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
            <Button onClick={this.props.handleClose} color="primary" style={{display:this.props.status == null ? true : this.props.status}}>
              {this.props.nameCancleButton}
            </Button>
            <Button onClick={this.props.handleContinue} color="primary" style={{display:this.props.status == null ? true : this.props.status}}>
              {this.props.nameContinueButton}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
    
  
}


export default withStyles(styles)(FormDialog);