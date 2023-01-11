import { createSlice } from "@reduxjs/toolkit";

const loadState = localStorage.getItem('reduxState');

export const authInitialState = {
    token      : null,
    userId     : null,
    isLoggedIn : false,
    admin   : true,
};

//login with user to check
const initialState = loadState?.auth ? loadState.auth : authInitialState;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token      = action.payload.token;
            state.userId     = action.payload.userId;
            state.isLoggedIn = true;
        },

        logout: (state) => {
            state = authInitialState;
            
        },
        toggleRemember: (state) => {
            state.remember = !state.remember;
        },
    }
});

export const { login, logout, toggleRemember } = authSlice.actions;

export default authSlice.reducer;