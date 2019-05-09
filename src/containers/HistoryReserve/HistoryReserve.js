import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from '../../axios-home';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions/index';
import withErrorHandlar from '../../hoc/withErrorHandler/withErrorHandler';
import { GetSessionUser } from '../../store/utility';

import CommentCus from '../../components/CommentCus/commentCus'

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ListItem from '@material-ui/core/ListItem';
import HistoryReserveComponent from '../../components/HistoryReserve/HistoryReserve'

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
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});
let port = 1;
let sessionUser = GetSessionUser();
let hhh = [];
class HistoryReserve extends Component {
    state = {
        statustest: false,
        time: '',
        name: 'hai',
        labelWidth: 0,
        dataMap : [],
        dateTemp: [],
        dateHis : [],
        datePick : false,
      };

    componentDidMount() { 
        sessionUser = GetSessionUser();
        this.getHistory2(); 
    }

    getHistory2 = async () => {
        let arrDate = [];
        let arrOption = [];
        let res = await axios.get('/reserves/users', {
            headers: {
                'Authorization': `Bearer ${sessionUser.token}`,
            }
        });

        res.data.map( (data)=>{
            let dateHistory = data.Time.date;
            if(arrDate.length == 0){
                arrDate.push(dateHistory);
            }
            else{
                let lenth = arrDate.length;
                console.log('len'+lenth);
                arrOption = arrDate.map( (data2,index) => {

                    console.log(data2);
                    console.log(dateHistory);
                    console.log('index'+index)
                    if(data2 == dateHistory){
                        console.log('return 0');
                        return;
                    }
                    else if(index == lenth-1 && data2 != dateHistory && index!=1){
                        console.log('return data');
                        arrDate.push(dateHistory);
                        return  <option value={dateHistory}>{data.Time.date}</option>
                    }
                   
                });
            }
            
        });
        console.log(arrDate);
        if(this.state.dateHis.length == 0){
            this.setState({dateHis:arrDate});
            this.setState({dateTemp: arrOption});
            this.setState({dataMap: res.data});
        }
    };

    handleChange = (data) => event => {
        this.setState({ datePick: event.target.value });
        this.setState({ time: event.target.value });
    };
    
    render() {
        const { classes } = this.props;
        sessionUser = GetSessionUser();

        let dateHis = [...this.state.dateHis];
        return (
            <div>
                <Typography color="inherit" className={classes.grow + " " + classes.marginTop}>ประวัติการเดินทาง</Typography>
                <ListItem button>
                    <Grid item xs container direction="row" justify="flex-start" alignItems="center" >
                        <Grid item >
                                <Typography color="inherit" >โปรดเลือกวันที่ต้องการค้นหา</Typography>
                        </Grid>     
                        <Grid item >
                              
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel
                                        ref={ref => {
                                        this.InputLabelRef = ref;
                                        }}
                                        htmlFor="outlined-age-native-simple"
                                    >
                                        วัน-เดือน-ปี
                                    </InputLabel>
                                    <Select
                                        native
                                        value={this.state.time}
                                        onChange={this.handleChange()}
                                        input={
                                        <OutlinedInput
                                            name="age"
                                            labelWidth={this.state.labelWidth}
                                            id="outlined-age-native-simple"
                                        />
                                        }
                                    >
                                        <option value="" />
                                        {
                                            dateHis.map( (data,index)=>{
                                                let dataDate = new Date(data);
                                                return <option value={data}>{dataDate.getDate()}-{dataDate.getMonth()}-{dataDate.getFullYear()}</option>
                                            })
                                        }
                                    </Select>
                            </FormControl>
                        </Grid>
                    </Grid>  
                </ListItem>
                
                {
                    <ListItem button>
                        <Grid item xs container direction="row" spacing={40} className={classes.centerT}>
                            <Grid item xs={12}>
                                {
                                    this.state.dataMap.map((data, index) => {
                                        if(this.state.datePick != false){
                                            if(this.state.datePick == data.Time.date){
                                                console.log(data);
                                                return <HistoryReserveComponent 
                                                    license_plate={data.Time.Car.license_plate}
                                                    province={data.Time.Car.province}
                                                    port={data.destination}
                                                    phone={'0830531790'}
                                                    timeOut ={data.Time.time_out}
                                                />;
                                               
                                            }   
                                        } 
                                    })
                                }
                            </Grid>
                        </Grid> 
                    </ListItem>
                   
                }
                
            </div>
        );
    }
}

HistoryReserve.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    history: state.historyReserve.history,
})

const mapDispatchProps = dispacth => ({
    getHistory: (token) => dispacth(actionsTypes.getHistory(sessionUser.token)),
})

export default connect(mapStateToProps, mapDispatchProps)(withErrorHandlar((withStyles(styles))(HistoryReserve), axios));