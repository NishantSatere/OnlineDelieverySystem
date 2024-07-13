import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    hotels: [],
    // loading: false,
    // error: null,
};  


export const hotelsReducer = createReducer(initialState, (builder) => { 
    builder
        .addCase('fetchHotels', (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase('fetchHotelsSuccess', (state, action) => {
            state.hotels = action.payload.hotels;
        })
        .addCase('fetchHotelsFail', (state, action) => {
            state.error = action.payload.message;
        }); 
});