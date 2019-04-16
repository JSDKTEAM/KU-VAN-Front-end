import * as types from '../actions/actionTypes';

export const incrementCounter = () => {
    return {
        type: types.INCREMENT_COUNTER
    };
};

export const decrementCounter = () => {
    return {
        type: types.DECREMENT_COUNTER
    };
};

export const clearCounterPending = () => {
    return {
        type: types.CLEAR_COUNTER_PENDING
    };
};

export const clearCounterSuccess = () => {
    return {
        type: types.CLEAR_COUNTER_SUCCESS
    };
};

export const clearCounterFailure = () => {
    return {
        type: types.CLEAR_COUNTER_FAILURE
    };
};

export const clearCounterAsync = () => {
    return (dispatch) => {
        dispatch(clearCounterPending());
        setTimeout(() => {
            if (0.33 < Math.random()) {
                dispatch(clearCounterSuccess());
            } else {
                dispatch(clearCounterFailure());
            }
        }, 1000);
    };
};
