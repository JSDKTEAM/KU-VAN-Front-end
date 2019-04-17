import * as actionTypes from '../actions/actionTypes';
import { UpdateObject } from '../utility';

const initialState = {
    username: null,
    type_user: null,
    token: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.AUTH_POST_PASS:       
            let base64Url = action.userSession.token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let userData = JSON.parse(window.atob(base64));

            return UpdateObject(state, { username: userData.username, type_user: userData.type_user, token: action.userSession.token });

        case actionTypes.AUTH_POST_FAIL:
            return UpdateObject(state, { userId: null });

        default:
            return state;
    }
}

export default reducer;