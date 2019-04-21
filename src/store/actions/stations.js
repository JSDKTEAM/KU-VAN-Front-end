import * as actionTypes from './actionTypes';
import axios from '../../axios-home';
// import axios from 'axios';

export const fetchScheduleSuccess = (fetchedSchedule) => {
    return {
        type: actionTypes.FETCH_SCHEDULE_SUCCESS,
        fetchedSchedule: fetchedSchedule
    }
};
export const fetchScheduleError = (error) => {
    return {
        type: actionTypes.FETCH_SCHEDULE_ERROR,
        error: error
    }
};
export const fetchScheduleStart = () => {
    return {
        type: actionTypes.FETCH_SCHEDULE_START
    };
}
export const fetchSchedule = (station) => {
    console.log("ACTION [fetchSchedule]"+station);
    return dispatch => {
        dispatch(fetchScheduleStart());
        axios.get('/times/ports/'+station,{
           data: ""
        },{
            headers: {
                'Contenr-type': 'aoolication/json'
            }
        })
            .then(res => {
                let fetchedSchedule = [];
                for (let key in res.data) {
                    fetchedSchedule.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchScheduleSuccess(fetchedSchedule))
            })
            .catch(err => {
                dispatch(fetchScheduleError(err));
            });
    }
}
export const initialBookedSuccess = (booked) => {
    return {
        type: actionTypes.INITIALBOOKED_SUCCESS,
        initailbooked: booked
    }
};
export const initialBookedError = (error) => {
    return {
        type: actionTypes.INITIALBOOKED_ERROR,
        error: error
    }
};
export const initialBookedStart = () => {
    return {
        type: actionTypes.INITIALBOOKED_START
    };
}
export const initialBooked= (token) => {
    console.log('[actiond] initialBooked'+token)
    // let data = {
    //     time_id: 1
    // }
    return dispatch => {
        dispatch(initialBookedStart());
        const AuthStr = 'Bearer '.concat(token);
        axios.get('/reserves/times',{ headers: { Authorization: AuthStr },data: "",params: {
            time_id: 1
          } } )
            .then(response => {
            // If request is good...
            console.log('response.data');
            })
            .catch((error) => {
                console.log('error 3 ' + error);
            });
    }
}

export const updateTimeId = (time) => {
    return {
        type : actionTypes.UPDATE_TIME_ID,
        time : time,
    }
}

export const bookStart = () => {
    return {
        type:actionTypes.BOOK_START,
    }
}
export const bookSuccess = (id, bookData) => {
    return {
        type: actionTypes.BOOK_SUCCESS,
        bookId: id,
        bookData:bookData
    }
}
export const bookError = (error) => {
    return {
        type: actionTypes.BOOK_ERROR,
        error: error
    }
}
export const book = (bookData) => {
    const data = {
        "time_id": bookData.time_id,
        "destination": bookData.destination || "empty"
    }
    const token = bookData.token;
    return dispatch => { 
        dispatch(bookStart());
        axios.post('/reserves/',{ headers: {"Authorization" : `Bearer ${token}`} },data)
        .then(res => {
            console.log(res.data);
            //dispatch(bookSuccess(res.data.name, bookData))
        })
        .catch(err => {
            dispatch(bookError(err));
        });
    }
}
