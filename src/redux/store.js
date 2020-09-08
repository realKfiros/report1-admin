import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger';
import groupReducer from "./reducers/group";

const store = createStore(
    combineReducers({
        group: groupReducer
    }),
    process.env.NODE_ENV === 'production' ? undefined : applyMiddleware(logger)
);

export default store;