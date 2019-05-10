import * as actionTypes from './actionTypes';
import axios from '../../axios-home';
//Refesh
export const refeshStation = () => {
    return {
        type: actionTypes.REFESH_STATION
    }
};
//FetSchedule
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
        dispatch(fetchScheduleStart());
        axios.get('/times/ports/' + station, {
            data: ""
        }, {
                headers: {
                    'Contenr-type': 'aoolication/json'
                }
            })
            .then(res => {
                let fetchedSchedule = [];
                for (let key in res.data) {
                    fetchedSchedule.push({
                        data: {...res.data[key]},
                        id: res.data[key].time_id
                    })
                }
                dispatch(fetchScheduleSuccess(fetchedSchedule))
            })
            .catch(err => {
                dispatch(fetchScheduleError(err));
            });
    }
}
//InitialBook
export const initialBookedSuccess = (booked,port) => {
    return {
        type: actionTypes.INITIALBOOKED_SUCCESS,
        initailbooked: booked,
        port: port,
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
export const initialBooked = (port_id,token) => {
    return dispatch => {
        dispatch(initialBookedStart());
        const AuthStr = `Bearer ${token}`;
        axios.get(`/reserves/ports/`+port_id, {
            headers: {
                'Authorization': AuthStr
            }
        })
        .then(res => {
            
            let booked =[];  
                booked.push(
                    ...res.data
                )
                //console.log(res.data);
            dispatch(initialBookedSuccess(booked,port_id));
        })
        .catch((error) => {
            dispatch(initialBookedError(error));
        });
    }
}
//Time
export const updateTimeId = (time) => {
    return {
        type: actionTypes.UPDATE_TIME_ID,
        time: time,
    }
}
//Book
export const bookStart = () => {
    return {
        type: actionTypes.BOOK_START,
    }
}
export const bookSuccess = () => {
    return {
        type: actionTypes.BOOK_SUCCESS,
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
        var config = {
            headers: {'Authorization': "bearer " + bookData.token}
        };
        var bodyParameters = {
            time_id: bookData.time_id,
            destination: bookData.destination || null,
            nameWalkIn: bookData.nameWalkIn,
            phoneNumberWalkIn: bookData.phoneNumberWalkIn,
        }
        axios.post('/reserves/',
            bodyParameters,
            config
        ).then(res => {
               //window.location.href = window.location.origin;
                dispatch(bookSuccess())
            })
            .catch((error) => {
                dispatch(bookError(error));
            });
    }
}
//cancleBook
export const cancleBookStart = () => {
    return {
        type: actionTypes.CANCLEBOOK_START,
    }
}
export const cancleBookSuccess = () => {
    return {
        type: actionTypes.CANCLEBOOK_SUCCESS,
    }
}
export const cancleBookError = (error) => {
    return {
        type: actionTypes.CANCLEBOOK_ERROR,
        error: error
    }
}
export const cancleBook = (time_id,resever_id,token) => {
    return dispatch => {
        dispatch(cancleBookStart());
        const AuthStr = `Bearer ${token}`;
        axios.delete('/reserves/',{
            headers: {
                'Authorization': AuthStr
            },
            data: {
                time_id : time_id,
                reserve_id : resever_id
            }
        }
        
        ).then(res => {
               //window.location.href = window.location.origin;
               dispatch(cancleBookSuccess())
            })
            .catch((error) => {
                dispatch(cancleBookError(error));
            });
    }
}

//ISCAME
export const iscameStart = () => {
    return {
        type: actionTypes.ISCAME_START,
    }
}
export const iscameSuccess = () => {
    return {
        type: actionTypes.ISCAME_SUCCESS,
    }
}
export const iscameError = () => {
    return {
        type: actionTypes.ISCAME_ERROR,
    }
}
export const iscame = (data,token) => {
    return dispatch => {
        // dispatch(iscameStart());
        const AuthStr = `Bearer ${token}`;
        data.map( (data) => {
            let resever_id = data.reserve_id;
            let status = data.status;
            axios.put('/reserves/isCame',{
                "reserve_id": resever_id,
                "isCame" : status
            },
            {
                headers: {
                    'Authorization': AuthStr
                } 
            }
            ).then(res => {
                dispatch(iscameSuccess());
            }).catch((error) => {
                    dispatch(iscameError(error));
            });
        });
        
    }
}
