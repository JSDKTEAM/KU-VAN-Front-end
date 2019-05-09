import React, {Component}from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Done from '@material-ui/icons/AddComment';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: "4vw"
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        fontSize: "4vw"
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
        fontSize: "4vw"
      },
      font:{
        fontSize: "20rem"
      },
      resize:{
        fontSize:"1vm"
      },
});


class HistoryReserve extends Component {

    state = {
        statustest: false,
        text: ''
    }
    componentDidMount(){
        this.setState({ text: ''});
    }

    render(){
        const { classes } = this.props;
        let commenttran;

        commenttran = (           

            <Grid item container direction="row" spacing={16} className={classes.formControl}  alignItems="center" justify="center">
                <Grid item sm={12} xs={12}>
                    <TextField className={classes.font}
                    value={this.props.license_plate + this.props.province}
                    id="standard-name"
                    label="ทะเบียนรถ"
                    InputProps={{
                        classes: {
                          input: classes.resize,
                        },
                      }}
                    margin="normal"
                    className={classes.formControl}
                    disableUnderline={true}
                    /> 
                </Grid>
                {/* <Grid item sm={12} xs={12}>
                    <TextField className={classes.font}
                    value={this.props.phone}
                    id="standard-name"
                    label="เบอร์โทรศัพท์ผู้ขับรถ"
                    margin="normal"
                    className={classes.formControl}
                    InputProps={{
                        classes: {
                          input: classes.resize,
                        },
                      }}
                   
                    disableUnderline={true}
                    />
                </Grid> */}
                <Grid item sm={12} xs={12}>
                    <TextField className={classes.font}
                    value={this.props.port}
                    id="standard-name"
                    label="สายรถตู้"
                    margin="normal"
                    className={classes.formControl}
                    InputProps={{
                        classes: {
                          input: classes.resize,
                        },
                      }}
                   
                    disableUnderline={true}
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField className={classes.font}
                    value={this.props.timeOut}
                    id="standard-name"
                    label="เวลารถออก"
                    margin="normal"
                    className={classes.formControl}
                    InputProps={{
                        classes: {
                          input: classes.resize,
                        },
                      }}
                   
                    disableUnderline={true}
                    />
                </Grid> 
            </Grid>
        );

        return (<div>{commenttran }<hr></hr></div>);
    }
    
};

HistoryReserve.propTypes ={
    type:PropTypes.string.isRequired,
} 

export default withStyles(styles)(HistoryReserve);