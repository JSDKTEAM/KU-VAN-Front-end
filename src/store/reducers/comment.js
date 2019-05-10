import * as actionTypes from '../actions/actionTypes';
import { UpdateObject } from '../utility';

const initialState = {
    status: false,
    reserve:[],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.GET_COMMENT_BY_PORT:       

            return UpdateObject(state, { reserve: action.result});

        default:
            return state;
    }
}

export default reducer;