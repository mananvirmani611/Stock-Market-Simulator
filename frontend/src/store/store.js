import {configureStore} from '@reduxjs/toolkit';
import emailSlice from '../slices/emailSlice';

const store = configureStore({
    reducer : {
        email : emailSlice,
    }
})

export default store;