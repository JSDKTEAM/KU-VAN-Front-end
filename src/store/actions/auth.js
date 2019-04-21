import * as actionTypes from './actionTypes';
import axios from '../../axios-home';

export const authPostPass = (userSession) => {
    return {
        type: actionTypes.AUTH_POST_PASS,
        userSession: userSession
    }
};

export const authPostFail = (error) => {
    return {
        type: actionTypes.AUTH_POST_FAIL,
        error: error
    }
};

export const authPostCheck = (fieldLogin) => {
    return dispatch => {
        axios.post('/auth/login', 
        {            
            username : fieldLogin.username,
            password : fieldLogin.password       
        })
        .then(res => {
            dispatch(authPostPass(res.data))
        })
        .catch(error => {
            console.log(error);
            dispatch(authPostFail(error));
        });
    }
}