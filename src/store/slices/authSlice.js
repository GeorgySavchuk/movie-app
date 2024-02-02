import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuth: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state = initialState, action) => {
            state.isAuth = action.payload.isAuth
            state.user = action.payload.user
        }
    }
})
export default authSlice.reducer
export const { setAuth } = authSlice.actions;