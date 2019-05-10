import * as actionTypes from '../actions/actionTypes';
import { UpdateObject } from '../utility';

const initialState = {
    status: false,
    car:[],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.VAN_POST:       

            return UpdateObject(state, { car: action.result});

        case actionTypes.VAN_GET_BY_PORT:       

            return UpdateObject(state, { car: action.result});

        case actionTypes.VAN_DELETE:       

            return UpdateObject(state, { car: action.result});

        default:
            return state;
    }
}

export default reducer;