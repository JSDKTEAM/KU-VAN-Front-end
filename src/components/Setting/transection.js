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

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: "80%",
        textAlign: "center",
    },
});


class transection extends Component {

    state = {
        statustest: false,
    }

    timeType = (value) => {
        this.props.attr.time_out[this.props.indexsq] = value.target.value;
        console.log(this.props.carByPort);
    };

    selectChange = (value) => {
        this.props.attr.car_id[this.props.indexsq] = value.target.value;
        this.setState({ statustest: !(this.statustest) });
    };

    deleteHandler = (value) => {
        this.props.attr.time_out.splice(value, 1);
        this.props.attr.car_id.splice(value, 1);
    };
    
    render(){
        const { classes } = this.props;
        let transection;

        transection = (           

            <Grid item container direction="row" spacing={40} className={classes.formControl}  alignItems="center" justify="center">
                <Grid item sm={7} xs={6}>
                    <TextField
                    value={this.props.attr.time_out[this.props.indexsq] == null ? "" : this.props.attr.time_out[this.props.indexsq]}
                    id="standard-name"
                    label="เวลาออกรถ"
                    margin="normal"
                    onChange={(val) => { this.timeType(val); this.props.tr("input"); }}
                    className={classes.formControl}
                    />
                </Grid>
                <Grid item sm={3} xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">รถ</InputLabel>
                        <Select
                            value={this.props.attr.car_id[this.props.indexsq]}
                            onChange={(val) => { this.selectChange(val);  this.props.tr("select");}}
                            inputProps={{
                            name: 'age',
                            id: 'age-simple',
                            }}>
                            {
                                this.props.carByPort.map((key, index) => {
                                    return <MenuItem 
                                    value={key.car_id}
                                    >{key.license_plate}</MenuItem>;
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={1} xs={12}>
                    <Button 
                        variant="outlined" 
                        size="large" 
                        color="error"
                        disabled={this.props.indexsq == 0 ? true : false}
                        onClick={(val) => { this.deleteHandler(this.props.indexsq); this.props.tr("delete");}}><AddIcon/></Button>
                </Grid>
            </Grid>
        );

        return (<div>{transection}</div>);
    }
    
};

transection.propTypes ={
    type:PropTypes.string.isRequired,
} 

export default withStyles(styles)(transection);