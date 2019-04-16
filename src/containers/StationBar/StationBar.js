import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-home';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions/index';
import withErrorHandlar from '../../hoc/withErrorHandler/withErrorHandler';
import Schedule from '../../components/Schedule/Schedule';

import Modal from '../../components/UI/Modal/Modal';

// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});


class Stations extends Component {
    state = {
        book:false,
    }
    bookingHandler = () => {
        this.setState({
            book:true,
        })
    }
    componentDidMount() {
        let station = this.props.station;
        this.props.onfetchSchedule(station);
        console.log('componentDidMount()');
        console.log(station);
    }

    handleChange = (event, value) => {
        this.props.onfetchSchedule(value+1);
    };

    render() {
        const { classes } = this.props;
        console.log(this.props.schedule);
        let scheduleItem = <Spinner />;
        if (!this.props.loading) {
            scheduleItem = this.props.schedule.map(schedule => (
                <Schedule 
                key={ schedule.time_id }
                car_id={ schedule.Car.car_id }
                license_plate={ schedule.Car.license_plate } 
                port_id={ schedule.Car.port_id } 
                province={ schedule.Car.province } 
                count_seat= { schedule.count_seat } 
                date= { schedule.date } 
                time_id= { schedule.time_id } 
                time_out= { schedule.time_out } 
                checkLogin ={false}
                booking = {this.bookingHandler}/>
                
            ))
        }
        return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs  onChange={this.handleChange}  variant="fullWidth">
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

// export default withStyles(styles)(SimpleTabs);


const mapStateToProps = (state) => ({
    
    schedule: state.stations.schedule,
    loading: state.stations.loading,
    booked: state.stations.booked,
    station: state.stations.stations

})

const mapDispatchProps = dispacth => ({
    onfetchSchedule: (station) => dispacth(actionsTypes.fetchSchedule(station))
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(Stations), axios));