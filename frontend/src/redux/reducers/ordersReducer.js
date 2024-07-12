import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

export const ordersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('fetchOrders', (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase('fetchOrdersSuccess', (state, action) => {
            state.orders = action.payload;  // Assign action.payload directly to state.orders
            state.loading = false;
        })
        .addCase('fetchOrdersFail', (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        });
});
