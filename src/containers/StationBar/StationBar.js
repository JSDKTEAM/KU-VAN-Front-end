import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-home';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions/index';
import withErrorHandlar from '../../hoc/withErrorHandler/withErrorHandler';
import Schedule from '../../components/Schedule/Schedule';
import ProcessType from '../../components/UI/Progress/Progress';
import { stat } from 'fs';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});


class Stations extends Component {
    state = {
        port_id : 0,
    }
    bookingHandler = () => {
        this.setState({
            book:true,
        })
    }
    componentDidMount() {
        let station = this.props.station;
        if(this.props.authType_user !== undefined){
            this.props.onInitialBook(this.props.authToken);
            console.log('onInitialBook');
        }
        this.props.onfetchSchedule(station);
    }

    handleChange = (event, value) => {
        this.props.onfetchSchedule(value+1);
        this.setState({port_id:value});
        this.setState({namePort:value});
        if(this.props.authType_user !== undefined){
            this.props.onInitialBook(this.props.authToken);
            console.log('onInitialBook');
        }
    };

    render() {
        const { classes } = this.props;
        let portName = "";
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
        let test = [];
        if (!this.props.loading ) {
            // test = this.props.initailBook.map((reserve) => {
            //     if(reserve.Reserves.user_id){

            //     }
            // });
            const Reserve = [...this.props.initailBook];
            console.log(Reserve);
            // const timReserve = Reserve.Reserves[time_id];
            let statusButtonBook = true;
            scheduleItem = this.props.schedule.map(schedule => {
                // if( timReserve.find(time_id => (time_id === schedule.time_id)) == true ) {
                //     statusButtonBook=false;
                // }
                // else{
                //     statusButtonBook=true
                // }
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
                        statusButton = {statusButtonBook}
                    />
            });
        }
        return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Tabs  value={this.state.port_id} onChange={this.handleChange} indicatorColor="secondary"  variant="fullWidth">
                    <Tab label="บางเขน" />
                    <Tab label="หมอชิต" />
                    <Tab label="ปิ่นเกล้า" />
                </Tabs>
            </AppBar>
            { scheduleItem }
           
            
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
    authUsername: state.auth.username,
    authType_user: state.auth.type_user,
    authToken: state.auth.token,
    initailBook: state.stations.booked,
})

const mapDispatchProps = dispacth => ({
    onInitialBook: (token) => dispacth(actionsTypes.initialBooked(token)),
    onfetchSchedule: (station) => dispacth(actionsTypes.fetchSchedule(station))
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(Stations), axios));