import * as types from '../actions/actionTypes';
import initialState from './initialState';

const counterReducer = (state = initialState.counter, action) => {
    switch(action.type) {
        case types.INCREMENT_COUNTER:
            return {
                ...state,
                value: state.value + 1
            };
        case types.DECREMENT_COUNTER:
            return {
                ...state,
                value: state.value - 1
            };
        case types.CLEAR_COUNTER_PENDING:
            return {
                ...state,
                isClearing: true
            };
        case types.CLEAR_COUNTER_SUCCESS:
            return {
                ...state,
                isClearing: false,
                value: 0
            };
        case types.CLEAR_COUNTER_FAILURE:
            return {
                ...state,
                isClearing: false
            };
        default:
            return state;
    }
};

export default counterReducer;
