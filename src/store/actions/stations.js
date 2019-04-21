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
    return dispatch => {
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
    return dispatch => { 
        dispatch(bookStart());
        axios.post('', bookData)
            .then(res => {
                dispatch(bookSuccess(res.data.name, bookData))
            })
            .catch(err => {
                dispatch(bookError(err));
            });
    }
}