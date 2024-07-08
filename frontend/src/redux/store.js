import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import Cookies from 'js-cookie';

const userCookie = Cookies.get('user');
const tokenCookie = Cookies.get('token');

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
        isAuthenticated: !!token,
    }
};

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState,
});

export default store;
