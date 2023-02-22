import { configureStore } from '@reduxjs/toolkit'
import countReducer from '../reducer/countReducer'


const store = configureStore({
    reducer: countReducer
});

export default store;