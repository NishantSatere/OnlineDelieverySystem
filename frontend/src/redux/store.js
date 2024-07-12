import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { ordersReducer } from './reducers/ordersReducer';
import Cookies from 'js-cookie';

const userCookie = Cookies.get('user');
const tokenCookie = Cookies.get('token');
const isLoggedin = Cookies.get('isLoggedin');

let user = null;
let token = null;

if (userCookie) {
    try {
        user = JSON.parse(userCookie);
    } catch (error) {
        console.error('Error parsing user cookie:', error);
    }
}

if (tokenCookie) {
    token = tokenCookie;
}

const preloadedState = {
    user: {
        user: user || null,
        token: token || null,
        isAuthenticated: !!token && isLoggedin === 'true',
        isLoggedin: isLoggedin === 'true',
    }
};

console.log('Preloaded state:', preloadedState);
const store = configureStore({
    reducer: {
        user: userReducer,
        orders: ordersReducer,
    },
    preloadedState,
});

export default store;
