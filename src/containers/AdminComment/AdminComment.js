import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from '../../axios-home';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions/index';
import withErrorHandlar from '../../hoc/withErrorHandler/withErrorHandler';
import { GetSessionUser } from '../../store/utility';

import CommentTran from '../../components/CommentTran/commenttran'

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import swal from 'sweetalert';

const carfield = { card: null, province: null };

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        textAlign: "center",
        fontSize: "4vw"
    },
    growLeft: {
        textAlign: "left",
        fontSize: "4vw"
    },
    marginTop: {
        marginTop: 20
    },
    marginLeft: {
        marginLeft: 20
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: "80%",
        textAlign: "center",
    },
    centerT:{
        textAlign: "center",
    }
});

let attr = { car_id: [], time_out: [], date: null };
let port = 1;
let dateSelect;
let sessionUser = GetSessionUser();

class AdminComment extends Component {
    state = {
        statustest: false,
        count:["A","A","A"]
    }

    componentDidMount() {
        sessionUser = GetSessionUser();
        this.props.commentByPort(port);
    }

    // cardHandler = (value) => {
    //     carfield.card = value.target.value;
    // };
    
    // provinceHandler = (value) => {
    //     carfield.province = value.target.value;
    // };

    // handleTest = (car_id) => {
    //     this.props.vanDelete(car_id, port);
    // };

    selectChange = (value) => {
        port = value.target.value;
        this.props.commentByPort(port);
    };

    render() {
        const { classes } = this.props;


        return (
            <div>
                <Typography color="inherit" className={classes.grow + " " + classes.marginTop}>ความคิดเห็นจากผู้ใช้</Typography>

                <Grid item container direction="row" spacing={40} className={classes.centerT}>
                    <Grid item sm={12} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple-2">ท่ารถ</InputLabel>
                            <Select
                                value={port}
                                onChange={(val) => { this.selectChange(val); }}
                                inputProps={{
                                name: 'age2',
                                id: 'age-simple-2',
                                }}>
                                <MenuItem value="1">ม.เกษตรกำแพงแสน - ม.เกษตรบางเขน</MenuItem>
                                <MenuItem value="2">กำแพงแสน - หมอชิต 2</MenuItem>
                                <MenuItem value="3">กำแพงแสน - ปิ่นเกล้า</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <hr/>
                <Grid item xs container direction="row" spacing={40} className={classes.centerT}>
                    <Grid item xs={12}>
                        {
                            this.props.reserve.map((name, index) => {
                                return <CommentTran 
                                indexsq={index}
                                comByPort={this.props.reserve}
                                />;
                            })
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

AdminComment.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    status: state.comment.status,
    reserve: state.comment.reserve,
})

const mapDispatchProps = dispacth => ({
    commentByPort: (port) => dispacth(actionsTypes.commentByPort(port, sessionUser.token)),
    // vanPost: (carfield, port) => dispacth(actionsTypes.vanPost(carfield, port, sessionUser.token)),
    // vanDelete: (car_id, port) => dispacth(actionsTypes.vanDelete(car_id, port, sessionUser.token)),
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(AdminComment), axios));