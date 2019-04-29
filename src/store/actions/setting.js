import * as actionTypes from './actionTypes';
import axios from '../../axios-home';

export const startWaitSetting = () => {
    return {
        type: actionTypes.START_WAIT_SETTING,
    }
};

export const settingPostSuccess = () => {
    return {
        type: actionTypes.SETTING_POST,
    }
};

export const getCarByPortSuccess = (result) => {
    return {
        type: actionTypes.GET_CAR_BY_PORT,
        result: result
    }
};

export const getTimeDefaultByPortSuccess = (result) => {
    return {
        type: actionTypes.GET_TIMEDEFAULT_BY_PORT,
        result: result
    }
};


export const settingPost = (dataT, token) => {
    return dispatch => {
        let postData  = {
            "times": dataT,
        }

        let axiosConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        axios.post('/times', postData, axiosConfig)
        .then(res => {
            dispatch(settingPostSuccess());
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export const getCarByPort = (port_id, token) => {
    return dispatch => {
        let url = "/cars/ports/" + port_id;

        axios.get(url,{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            dispatch(getCarByPortSuccess(res.data));
        })
        .catch(error => {
        });
    }
}

//NOT USE
export const getTimeDefaultByPort = (port_id, token) => {
    return dispatch => {
        let url = "/timesDefault/ports/" + port_id;

        dispatch(startWaitSetting());

        axios.get(url)
        .then(res => {
            dispatch(getTimeDefaultByPortSuccess(res.data));
        })
        .catch(error => {
        });
    }
}