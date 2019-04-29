import * as actionTypes from '../actions/actionTypes';
import { UpdateObject } from '../utility';

const initialState = {
    status: false,
    car:[],
    timedefault:[],
    loading:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.VAN_POST:       

            // return UpdateObject(state, { loading: true});

        // case actionTypes.SETTING_POST:       

        //     return UpdateObject(state, { status: !(state.status)});

        // case actionTypes.GET_CAR_BY_PORT:       

        //     return UpdateObject(state, { car: action.result});

        // case actionTypes.GET_TIMEDEFAULT_BY_PORT:       

        //     return UpdateObject(state, { timedefault: action.result, loading: false});

        default:
            return state;
    }
}

export default reducer;