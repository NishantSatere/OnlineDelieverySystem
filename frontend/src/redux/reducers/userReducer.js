import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoggedin: false,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('login', (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoggedin = true;
        })
        .addCase('logout', (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoggedin = false;
        })
        .addCase('loginfail', (state, action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoggedin = false;
            state.error = action.payload.message;
        })
});
