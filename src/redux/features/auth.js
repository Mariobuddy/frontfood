import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:"auth",
    initialState:{
        loginData:{}
    },

    reducers:{
        getLoginData(state,action){
         state.loginData=action.payload;
        }
    }
});

export const {getLoginData}=authSlice.actions;

export default authSlice.reducer;