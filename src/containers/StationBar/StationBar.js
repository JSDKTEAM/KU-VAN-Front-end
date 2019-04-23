import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import axios from '../../axios-home';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions/index';
import withErrorHandlar from '../../hoc/withErrorHandler/withErrorHandler';
import Schedule from '../../components/Schedule/Schedule';
import ProcessType from '../../components/UI/Progress/Progress';
import { stat } from 'fs';
import socketIOClient from 'socket.io-client'

import { GetSessionUser } from '../../store/utility';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
    },

});
let sessionUser = GetSessionUser();
var reserve= [];
class Stations extends Component {
    state = {
        book: false,
        port_id: 1,
        bottomPage : 1,
    }
    bookingHandler = () => {
        this.setState({
            book: true,
        })
    }
    componentDidMount() {
        if(sessionUser !== null){
            this.props.onInitialBook(this.state.port_id+1,sessionUser.token);
        }
        this.props.onfetchSchedule(1);
        this.broadcastRes()
    }
    componentWillUpdate(nextProps, nextState) {
        reserve = [...nextProps.initailBook];
    }
    shouldComponentUpdate(nextProps,nextState) {
        if (this.props.initailBook != nextProps.initailBook){
            return true;
        }
        else
        {
            return false;
        }
    }
    handleChange = (event, value) => {
        if(sessionUser !== null){
            this.props.onInitialBook(value+1,sessionUser.token);
        }
        this.props.onfetchSchedule(value + 1);
        this.setState({ port_id: value+1 });
        this.setState({namePort:value});
       
    };
    broadcastRes = () => {
        const socket = socketIOClient("localhost:9000");
        socket.on('broadcast', (time) => {
            this.props.onUpdateTimeId(time);
        })
    }


    render() {
        let portName = "";
        const { classes } = this.props;  
        switch (this.state.port_id) {
            case 0:
                portName = "บางเขน"
                break;
            case 1:
                portName = "หมอชิต"
                break;
            case 2:
                portName = "ปิ่นเกล้า"
                break;
        
            default:
                break;
        }

        let scheduleItem = <ProcessType 
            typeProcess='line'/>;
        if (!this.props.loading ) {
           
            let statusButtonBook = false;
            let statusButtonInitail = false;
            sessionUser === null ?  statusButtonBook=true : statusButtonBook=false;
            let check = [];
            if(reserve != '') {
                let getReserev = reserve[0];
                console.log(sessionUser.user_id);
                for (let key in getReserev) {
                    check.push({
                        time: getReserev[key].time_id,
                        userID: getReserev[key].user_id
                    })
                }      
            }
            scheduleItem = this.props.schedule.map(schedule => {
                statusButtonInitail = false;
                console.log('sessID: '+sessionUser.user_id);
                check.map((data,index) => {
                    console.log('schedule.time_id: '+schedule.time_id);
                    console.log('data.time_id: '+data.time);
                    console.log('data.userID: '+data.userID);
                    if((schedule.time_id == data.time) && (sessionUser.user_id == data.userID)){
                        statusButtonInitail = true;
                    } 
                });
                return <Schedule 
                            key={ schedule.time_id }
                            portName = {portName}
                            car_id={ schedule.Car.car_id }
                            license_plate={ schedule.Car.license_plate } 
                            port_id={ schedule.Car.port_id } 
                            province={ schedule.Car.province } 
                            count_seat= { schedule.count_seat } 
                            date= { schedule.date } 
                            time_id= { schedule.time_id } 
                            time_out= { schedule.time_out } 
                            number_of_seats = {schedule.Car.number_of_seats}
                            checkLogin ={false}
                            booking = {this.bookingHandler}
                            statusButton = {statusButtonBook || statusButtonInitail}
                    />
            });
        }

        return (
            <div className={classes.root}>
                <AppBar position="static" >
                    <Tabs value={this.state.port_id-1}  onChange={this.handleChange} indicatorColor="secondary" variant="fullWidth">
                        <Tab  label="บางเขน" />
                        <Tab  label="หมอชิต" />
                        <Tab  label="ปิ่นเกล้า" />
                    </Tabs>
                </AppBar>
                {scheduleItem}
            </div>

        );
    }
}

Stations.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    schedule: state.stations.schedule,
    loading: state.stations.loading,
    book: state.stations.book,
    initailBook: state.stations.booked,
})

const mapDispatchProps = dispacth => ({
    onfetchSchedule: (station) => dispacth(actionsTypes.fetchSchedule(station)),
    onUpdateTimeId: (time) => dispacth(actionsTypes.updateTimeId(time)),
    onInitialBook: (port_id,token) => dispacth(actionsTypes.initialBooked(port_id,token)),
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(Stations), axios));