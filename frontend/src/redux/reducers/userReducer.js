import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('login', (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        })
        .addCase('logout', (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        })
        .addCase('loginfail', (state,action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = action.payload.message;
        });
});
