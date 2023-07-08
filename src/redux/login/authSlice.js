import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import Cookies from "universal-cookie";
    const cookies = new Cookies();
let initialState = {
    verifyCodeSuccess : "",
    Success : false,
    Error : false,
    loading : false
}
export let adminAuth = createAsyncThunk('admin' , async(body) => {
    const res = await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:7Gs2Dnx1/auth/login" , body)
    return {
        verifyCodeSuccess : res.data?.authToken
    }
})
let authSlice = createSlice({
    name : "admin",
    initialState,
    reducers:{
        addToken:(state , action) =>{
            state.verifyCodeSuccess = cookies.get("token")
        },
    },
    extraReducers:{
        [adminAuth.pending]:(state , action) =>{
            state.loading = true
        },
        [adminAuth.fulfilled]:(state , action) =>{
            state.loading = false;
            state.Success = true
            state.verifyCodeSuccess = cookies.set("token", action.payload.verifyCodeSuccess)
        },       
         [adminAuth.rejected]:(state , action) =>{
            state.loading = true
            state.Error = true
        }
    }
})

export const {addToken} = authSlice.actions;
export default authSlice.reducer;