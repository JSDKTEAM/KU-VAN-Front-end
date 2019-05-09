import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import stationsReducer from './store/reducers/stations';
import authReducer from './store/reducers/auth';
import settingReducer from './store/reducers/setting';
import vanManageReducer from './store/reducers/vanManage';
import commentReducer from './store/reducers/comment';
import historyReserveReducer from './store/reducers/historyReserve';

import './index.css';
import App from './App';
import registerServiceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    stations: stationsReducer,
    auth: authReducer,
    setting: settingReducer,
    vanManage: vanManageReducer,
    comment: commentReducer,
    historyReserve: historyReserveReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
            
        </BrowserRouter>
    </Provider>

);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
