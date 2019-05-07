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
import Done from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: "80%",
        textAlign: "center",
        // fontWeight: '800',
    },
});


class commenttran extends Component {

    state = {
        statustest: false,
        text: ''
    }
    
    HandleChang = name => event => {
        this.setState({ text: event.target.value });
    }

    componentDidMount(){
        this.setState({ text: ''});
    }

    render(){
        const { classes } = this.props;
        let commenttran;

        commenttran = (           

            <Grid item container direction="row" spacing={16} className={classes.formControl}  alignItems="center" justify="center">
                <Grid item sm={4} xs={4}>
                    <TextField
                    value={this.props.comByPort[this.props.indexsq].Time.Car.license_plate}
                    id="standard-name"
                    label="ทะเบียนรถ"
                    margin="normal"
                    className={classes.formControl}
                    disableUnderline={true}
                    />
                     
                   
                    
                </Grid>
                <Grid item sm={6} xs={6}>
                    <TextField
                    value={this.props.comByPort[this.props.indexsq].comment}
                    id="standard-name"
                    label="ความคิดเห็น"
                    margin="normal"
                    className={classes.formControl}
                    onChange = {this.HandleChang()}
                    // disabled={true}
                    />
                </Grid>
                <Grid item sm={2} xs={2}>
                    <Done 
                        onClick = {(text,id) => this.props.comment(this.state.text,this.props.reserve_id)}
                    />
                </Grid>
            </Grid>
        );

        return (<div>{commenttran}</div>);
    }
    
};

commenttran.propTypes ={
    type:PropTypes.string.isRequired,
} 

export default withStyles(styles)(commenttran);