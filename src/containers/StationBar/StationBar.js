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
import socketIOClient from 'socket.io-client';



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
var SESSION_USER = GetSessionUser();
class Stations extends Component {
    state = {
        //book: false,
        port_id: 1,
        initailBook: [],
        reserve: [],
        portName: ''
    }
    // bookingHandler = () => {
    //     this.setState({
    //         book: true,
    //     })
    // }
    componentDidMount() {
        this.props.onfetchSchedule(1);
        this.broadcastRes();
    }

    componentWillReceiveProps(nextProps) {
        let sessionUser = GetSessionUser();
        if (nextProps.book == true && this.props.book == false) {
            this.props.onfetchSchedule(this.state.port_id);
            this.props.onInitialBook(this.state.port_id, sessionUser.token);
        }
        if (this.props.checkLogin == false && nextProps.checkLogin == true) {
            this.props.onInitialBook(this.state.port_id, sessionUser.token);
            this.props.onfetchSchedule(this.state.port_id);
            this.broadcastRes();
        }
        if (this.props.check == false && nextProps.check == true) {
            this.props.onInitialBook(this.state.port_id, sessionUser.token);
            this.props.onfetchSchedule(this.state.port_id);
        }
    }
    handleChange = (event, value) => {
        if (this.props.checkLogin) {     // login success 
            let SESSION_USER = GetSessionUser();
            this.props.onInitialBook(value + 1, SESSION_USER.token);
        }
        this.props.onfetchSchedule(value + 1);
        this.setState({ port_id: value + 1 });
        this.broadcastRes();

    };
    broadcastRes = () => {
        const socket = socketIOClient("localhost:9000");
        socket.on('broadcast', (time) => {
            this.props.onUpdateTimeId(time);
        })
    }
    render() {
        SESSION_USER = GetSessionUser();
        let portName = "";
        const { classes } = this.props;
        switch (this.state.port_id) {
            case 1:
                portName = "บางเขน"
                break;
            case 2:
                portName = "หมอชิต"
                break;
            case 3:
                portName = "ปิ่นเกล้า"
                break;

            default:
                break;
        }
        if (SESSION_USER == null) {
            SESSION_USER = {
                token: null,
                type_user: null,
                user_id: null,
                username: null,
            }
        }

        let scheduleItem = <ProcessType
            typeProcess='line' />;
        if (!this.props.loading) {
            var time = new Date();
            time = time.toLocaleString('en-US', {timeZone: "Asia/Bangkok"});
            let dataTimeC = new Date(time); //time current
            //console.log(this.props.schedule);
            scheduleItem = this.props.schedule.map(schedule => {
                let bookedSchedule = {//initial book
                    'time_id': null,
                    'reserve_id': null,
                    'destination': portName,
                };
                let sess = GetSessionUser();
                let timeDB = new Date(schedule.data.date);

                let spliteTime = schedule.data.time_out.split(':'); // splite Timeout
                timeDB.setHours(spliteTime[0],spliteTime[1],0);//Set Date & Time
                if (timeDB >= dataTimeC) {//Check ( time now:time Database )
                    if (this.props.booked == '') {
                        console.log('empty');
                    }
                    else {
                        this.props.booked.map((data, index) => {
                            if (data.time_id == schedule.data.time_id && data.user_id == sess.user_id) {
                                return (bookedSchedule = {
                                    'time_id': data.time_id,
                                    'reserve_id': data.reserve_id,
                                    'destination': data.destination,
                                    'nameWalkIn' : data.nameWalkIn,
                                    'phoneNumberWalkIn' : data.phoneNumberWalkIn,
                                });
                            }
                        });
                    }
                    return <Schedule
                        key={schedule.data.time_id}
                        nameCustomer={SESSION_USER != null ? SESSION_USER.username : null}
                        portName={portName}
                        car_id={schedule.data.Car.car_id}
                        license_plate={schedule.data.Car.license_plate}
                        port_id={schedule.data.Car.port_id}
                        province={schedule.data.Car.province}
                        count_seat={schedule.data.count_seat}
                        date={schedule.data.date}
                        time_id={schedule.data.time_id}
                        token={SESSION_USER != null ? SESSION_USER.token : null}
                        time_out={schedule.data.time_out}
                        number_of_seats={schedule.data.Car.number_of_seats}

                        checkLogin={this.props.checkLogin}
                        checkBooked={bookedSchedule}
                        session={sess}
                        dataBook={this.props.booked}
                    />
                }




            });
        }

        return (
            <div className={classes.root}>
                <AppBar position="static" >
                    <Tabs value={this.state.port_id - 1} onChange={this.handleChange} indicatorColor="secondary" variant="fullWidth">
                        <Tab label="บางเขน" />
                        <Tab label="หมอชิต" />
                        <Tab label="ปิ่นเกล้า" />
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
    booked: state.stations.booked,
    checkLogin: state.auth.loginStatus,
    station: state.stations.stations,
    check: state.stations.check,
})

const mapDispatchProps = dispacth => ({
    onfetchSchedule: (station) => dispacth(actionsTypes.fetchSchedule(station)),
    onUpdateTimeId: (time) => dispacth(actionsTypes.updateTimeId(time)),
    onInitialBook: (port_id, token) => dispacth(actionsTypes.initialBooked(port_id, token)),
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(Stations), axios));