import * as actionTypes from './actionTypes';
import axios from '../../axios-home';
import swal from 'sweetalert';

export const vanPostSuccess = (result) => {
    return {
        type: actionTypes.VAN_POST,
        result: result
    }
};

export const vanGetByPortSuccess = (result) => {
    return {
        type: actionTypes.VAN_GET_BY_PORT,
        result: result
    }
};

export const vanDeleteSuccess = (result) => {
    return {
        type: actionTypes.VAN_DELETE,
        result: result
    }
};



export const vanPost = (datafield, port, token) => {
    return dispatch => {

        let postData  = {
            "license_plate": datafield.card,
            "province": datafield.province,
            "port_id": port,
        }

        let axiosConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        axios.post('/cars', postData, axiosConfig)
        .then(res2 => {

            let url = "/cars/ports/" + port;

            axios.get(url,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(res => {
                swal("Good job!", "You clicked the button!", "success");
                dispatch(vanPostSuccess(res.data));
            })
            .catch(error => {
            });
        })
        .catch(error => {
            console.log(error);
        });

    }
}

export const vanGetByPort = (port_id, token) => {
    return dispatch => {
        console.log(token);
        let url = "/cars/ports/" + port_id;

        axios.get(url,{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            dispatch(vanGetByPortSuccess(res.data));
        })
        .catch(error => {
        });

    }
}

export const vanDelete = (car_id, port, token) => {
    return dispatch => {
     
        let postData  = {
            "car_id": car_id,
        }

        let axiosConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                "car_id": car_id,
            }
        };

        axios.delete('/cars/', axiosConfig)
        .then(res2 => {

            let url = "/cars/ports/" + port;

            axios.get(url,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(res => {
                swal("Good job!", "You clicked the button!", "success");
                dispatch(vanDeleteSuccess(res.data));
            })
            .catch(error => {
            });
        })
        .catch(error => {
            console.log(error);
        });


    }
}
