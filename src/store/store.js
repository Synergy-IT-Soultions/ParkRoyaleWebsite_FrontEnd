import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import countReducer from '../reducer/countReducer'

const CustomMiddleware = store => next => action => {
    console.log("Middleware triggered:", action);
    next(action);
}

const store = configureStore({
    reducer: countReducer,
    middleware:[logger, CustomMiddleware]
});

export default store;