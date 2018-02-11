import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './Reducers/index';
import thunk from 'redux-thunk';

const middleware = [thunk];
let store = createStore(combineReducers(reducers),applyMiddleware(...middleware));

export default store;