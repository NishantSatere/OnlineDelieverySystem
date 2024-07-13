import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    products: [],
//     loading: false,
//     error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('fetchProducts', (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase('fetchProductsSuccess', (state, action) => {
            state.products = action.payload.products;  
        })
        .addCase('fetchProductsFail', (state, action) => {
            state.error = action.payload.message;
        });
});
