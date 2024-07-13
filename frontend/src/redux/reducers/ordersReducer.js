import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    // loading: false,
    error: null,
};

export const ordersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('fetchOrders', (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase('fetchOrdersSuccess', (state, action) => {
            state.orders = action.payload.orders;  
        })
        .addCase('fetchOrdersFail', (state, action) => {
            state.error = action.payload.message;
        });
});
