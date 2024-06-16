import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { Get } from '../services/ThirdPartyUtilityService';
import constants from '../constants';

const initialState = {
    email : "",
    balance : -1
}

export const fetchEmail = createAsyncThunk(
    'email/fetchEmail',
    async (_, {rejectWithValue}) => {
        try{
            if(localStorage.getItem('login-token')){
                const currToken = localStorage.getItem('login-token');
                const response = await Get(constants.BASE_API_URL + constants.APIS.VERIFY_TOKEN, {
                    Authorization: `Bearer ${currToken}`,
                    Accept: 'application/json'
                })
    
                const email = response.data.username;
                return email;
            }
            else{
                rejectWithValue("Login token not found");
            }
        }
        catch(err){
            localStorage.clear();
            rejectWithValue(err.message);
        }
    }
)
const emailSlice = createSlice({
    name : 'email',
    initialState : initialState,
    reducers : {
        updateEmail(state, action){
            state.email = action.payload
        },
        updateBalance(state, action){
            state.balance = action.payload
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchEmail.fulfilled, (state, action) => {
            state.email = action.payload;
        })
        .addCase(fetchEmail.rejected, (state, action) => {
            console.log("error in fetching email api " + action.payload);
        })
    }
})

export const {updateEmail, updateBalance} = emailSlice.actions;
export default emailSlice.reducer;