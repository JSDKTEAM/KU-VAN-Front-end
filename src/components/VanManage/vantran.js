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
import AddIcon from '@material-ui/icons/HighlightOff';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: "80%",
        textAlign: "center",
    },
});


class vantran extends Component {

    state = {
        statustest: false,
    }

    // timeType = (value) => {
    //     this.props.attr.time_out[this.props.indexsq] = value.target.value;
    //     console.log(this.props.carByPort);
    // };

    // selectChange = (value) => {
    //     this.props.attr.car_id[this.props.indexsq] = value.target.value;
    //     this.setState({ statustest: !(this.statustest) });
    // };

    // deleteHandler = (value) => {
    //     this.props.attr.time_out.splice(value, 1);
    //     this.props.attr.car_id.splice(value, 1);
    // };
    
    render(){
        const { classes } = this.props;
        let vantran;

        vantran = (           

            <Grid item container direction="row" spacing={40} className={classes.formControl}  alignItems="center" justify="center">
                <Grid item sm={7} xs={6}>
                    <TextField
                    value={this.props.carByPort[this.props.indexsq].license_plate}
                    id="standard-name"
                    label="ทะเบียนรถ"
                    margin="normal"
                    // onChange={(val) => { this.timeType(val); this.props.tr("input"); }}
                    className={classes.formControl}
                    disabled={true}
                    />
                </Grid>
                <Grid item sm={3} xs={6}>
                    <TextField
                    value={this.props.carByPort[this.props.indexsq].province}
                    id="standard-name"
                    label="จังหวัด"
                    margin="normal"
                    // onChange={(val) => { this.timeType(val); this.props.tr("input"); }}
                    className={classes.formControl}
                    disabled={true}
                    />
                </Grid>
                <Grid item sm={1} xs={12}>
                    <Button 
                        variant="outlined" 
                        size="large" 
                        color="error"
                        onClick={(val) => { this.props.tr(this.props.carByPort[this.props.indexsq].car_id);}}><AddIcon/></Button>
                </Grid>
            </Grid>
        );

        return (<div>{vantran}</div>);
    }
    
};

vantran.propTypes ={
    type:PropTypes.string.isRequired,
} 

export default withStyles(styles)(vantran);