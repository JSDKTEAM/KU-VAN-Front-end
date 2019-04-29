import * as actionTypes from '../actions/actionTypes';
import { UpdateObject } from '../utility';

const initialState = {
    loginStatus: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.AUTH_POST_PASS:       
            let base64Url = action.userSession.token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let userData = JSON.parse(window.atob(base64));
            let userSession = {
                user_id: userData.user_id,
                username: userData.username, 
                type_user: userData.type_user, 
                token: action.userSession.token
            }

            sessionStorage.setItem('UserSession', JSON.stringify(userSession));
            return UpdateObject(state, { loginStatus: true});

        case actionTypes.AUTH_POST_FAIL:
            return UpdateObject(state, { loginStatus: false });

        default:
            return state;
    }
}

export default reducer;