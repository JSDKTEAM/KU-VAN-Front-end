import * as actionTypes from './actionTypes';
import axios from '../../axios-home';
import swal from 'sweetalert';

export const commentByPortSuccess = (result) => {
    return {
        type: actionTypes.GET_COMMENT_BY_PORT,
        result: result
    }
};

export const commentByPort = (port_id, token) => {
    return dispatch => {

        let url = "/reserves/ports/" + port_id;

        axios.get(url,{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            dispatch(commentByPortSuccess(res.data));
        })
        .catch(error => {
        });

    }
}
