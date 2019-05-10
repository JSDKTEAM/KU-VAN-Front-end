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

export const authRegisterSuccess = () => {
    return {
        type: actionTypes.AUTH_REGISTER,
    }
};

export const authPostCheck = (res) => {
    return dispatch => {
        // axios.post('/auth/login', 
        // {            
        //     username : fieldLogin.username,
        //     password : fieldLogin.password       
        // })
        // .then(res => {
        //     dispatch(authPostPass(res.data))
        // })
        // .catch(error => {
        //     console.log(error);
        //     dispatch(authPostFail(error));
        // });
        dispatch(authPostPass(res));

    }
}

export const authRegister = (fielddata) => {
    return dispatch => {
        axios.post('/users/registers', 
        {            
            username : fielddata.username,
            fname : fielddata.firstname,
            lname : fielddata.lastname,
            password : fielddata.password,
            phoneNumber: fielddata.phone,
        })
        .then(res => { 
            dispatch(authRegisterSuccess());
        })
        .catch(error => {

        });

    }
}