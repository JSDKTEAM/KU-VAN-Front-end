import * as actionTypes from './actionTypes';
import axios from '../../axios-home';

export const vanPostSuccess = () => {
    return {
        type: actionTypes.VAN_POST,
    }
};


export const vanPost = (data) => {
    return dispatch => {
        // console.log("est");
        // console.log(data);
        // axios.post('/times', 
        // {            
        //     times : data,    
        // })
        // .then(res => {
        //     dispatch(settingPostSuccess());
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    }
}