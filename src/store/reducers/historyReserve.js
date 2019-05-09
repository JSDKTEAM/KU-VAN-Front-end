import * as actionTypes from '../actions/actionTypes';
import { UpdateObject } from '../utility';

const initialState = {
    status: false,
    history:[],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.GET_HISTORY:       

            return UpdateObject(state, { history: action.result});

        default:
            return state;
    }
}

export default reducer;