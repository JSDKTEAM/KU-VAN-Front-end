import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from '../../axios-home';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions/index';
import withErrorHandlar from '../../hoc/withErrorHandler/withErrorHandler';
import { GetSessionUser } from '../../store/utility';

import MainBtn from '../../components/Setting/mainBtn';
import Transection from '../../components/Setting/transection'

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import swal from 'sweetalert';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        textAlign: "center",
        fontSize: "4vw"
    },
    marginTop: {
        marginTop: 20
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

let sessionUser = GetSessionUser();
let attr = { car_id: [], time_out: [], date: null };
let port = 1;
let dateSelect;

class Setting extends Component {
    state = {
        statustest: false,
        count:["A","A","A"]
    }

    componentDidMount() {
        sessionUser = GetSessionUser();
        this.props.getCarByPort(port);
        let dates = new Date();
        let tomorrows = new Date();
        tomorrows.setDate(dates.getDate() + 1);

        let format_dates = tomorrows.getFullYear() + "-" + (tomorrows.getMonth() + 1) + "-" + tomorrows.getDate();

        dateSelect = format_dates;

        this.getTimeTo();
        console.log("estsetset");
    }

    handleTest = (type) => {
        let tempCount = this.state.count;

        if(type == "add")
        {
            tempCount.push("A");
        }

        if(type == "delete")
        {
            tempCount.splice(tempCount.length - 1,1);
        }

        this.setState({ statustest: !(this.statustest), count: tempCount});
    };

    selectDateChange = (value) => {
        dateSelect = value.target.value;
        this.setState({ statustest: !(this.statustest) });
    };


    selectChange = (value) => {
        attr.car_id = [];
        port = value.target.value;
        this.props.getCarByPort(port);
    };

    getTimeDefault = async (value) => {
        let res = await axios.get('/timesDefault/ports/' + port, {
            headers: {
                'Authorization': `Bearer ${sessionUser.token}`,
            }
        });

        let tempCount = [];
        attr.car_id = [];
        attr.time_out = [];

        res.data.TimeDefaults.map((obj, index) => {
            attr.time_out.push(obj.time_out.replace('.',':'));
            tempCount.push("A");
        });

        this.setState({ count: tempCount});
    };

    getTimeTo = async () => {
        let res = await axios.get('/times/ports/' + port + '/date/' + dateSelect, {
            headers: {
                'Authorization': `Bearer ${sessionUser.token}`,
            }
        });

        let tempCount = [];
        attr.car_id = [];
        attr.time_out = [];

        res.data.map((obj, index) => {
            attr.time_out.push(obj.time_out);
            attr.car_id.push(obj.car_id);
            tempCount.push("A");
        });

        this.setState({ count: tempCount});
    };

    saveTime = () => {
        let attrTime = [];

        if(attr.car_id.length != attr.time_out.length)
        {
            swal("Request data", "Some input has null. Please fill data.", "error");
            return;
        }

        for(let i = 0; i < attr.time_out.length; i++)
        {
            if(attr.time_out[i] == "" || attr.car_id[i] == "")
            {
                swal("Request data", "Some input has null. Please fill data.", "error");
                return;
            }

            attrTime.push({
                car_id: attr.car_id[i],
                time_out: attr.time_out[i],
                date: dateSelect + " 00:00:00"});
        }

        console.log(attrTime);

        this.props.onPostSetting(attrTime);
    };

    render() {
        const { classes } = this.props;

        let date = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(date.getDate() + 1);

        let format_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        let format_tomorrow = tomorrow.getDate() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getFullYear();

        let format_date_value = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let format_tomorrow_value = tomorrow.getFullYear() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getDate();

        console.log(dateSelect);
        console.log(attr);


        return (
            <div>
                <Typography color="inherit" className={classes.grow + " " + classes.marginTop}>จัดการตารางการเดินรถ</Typography> 

                <Grid container direction="row" className={classes.centerT}>
                    <Grid item sm={6} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple-1">วันที่</InputLabel>
                            <Select
                                value={dateSelect}
                                onChange={(val) => { this.selectDateChange(val); }}
                                inputProps={{
                                name: 'age1',
                                id: 'age-simple-1',
                                }}>
                                <MenuItem value={format_tomorrow_value}>{format_tomorrow}</MenuItem>
                                {/* <MenuItem value={format_date_value}>{format_date}</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12} className={classes.marginTop}>
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

                <Grid container xs direction="row" className={classes.marginTop}>
                    <Grid item xs={12} style={{marginLeft:"20px"}}>
                        <MainBtn
                            tr={this.handleTest}
                            timeDef={this.getTimeDefault}></MainBtn>
                    </Grid>
                </Grid>

                <Grid container xs direction="row" className={classes.centerT + " " + classes.marginTop}>
                    <Grid item xs={12}>
                        {
                            this.state.count.map((name, index) => {
                                return <Transection 
                                attr={attr} 
                                indexsq={index}
                                tr={this.handleTest}
                                carByPort={this.props.car}
                                />;
                            })
                        }
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={40} className={classes.centerT + " " + classes.marginTop}>
                    <Grid item xs={12}>
                        <Button 
                            className={classes.formControl}
                            variant="contained"
                            onClick={(val) => { this.saveTime();}}
                            color="primary">ยืนยัน</Button>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

Setting.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    status: state.setting.status,
    car: state.setting.car,
    timedefault: state.setting.timedefault,
    loading: state.setting.loading,
})

const mapDispatchProps = dispacth => ({
    onPostSetting: (attrTime) => dispacth(actionsTypes.settingPost(attrTime,sessionUser.token)),
    getCarByPort: (port) => dispacth(actionsTypes.getCarByPort(port,sessionUser.token)),
    getTimeDefaultByPort: (loginfield) => dispacth(actionsTypes.getTimeDefaultByPort(loginfield,sessionUser.token)),
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(Setting), axios));