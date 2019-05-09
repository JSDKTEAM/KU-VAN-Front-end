import * as actionTypes from './actionTypes';
import axios from '../../axios-home';

export const getHistorySuccess = (result) => {
    return {
        type: actionTypes.GET_HISTORY,
        result: result
    }
};

export const getHistory = (token) => {
    return dispatch => {

        let url = "/reserves/users";

        axios.get(url,{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            dispatch(getHistorySuccess(res.data));
        })
        .catch(error => {
        });

    }
}

