import axios from 'axios';
import Cookies from 'js-cookie';

const server = 'http://localhost:5001';

export const login = (email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            `${server}/login`,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        // Store user info and token in cookies
        Cookies.set('user', JSON.stringify(data.user));
        Cookies.set('token', data.token);
        Cookies.set('isLoggedin', true);

        dispatch({ type: 'login', payload: { user: data.user, token: data.token } });
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch({ type: 'loginfail', payload: { message: error.response.data.msg || 'An error occurred' } });
    }
};

export const logout = () => async (dispatch) => {
    try {
        const token = Cookies.get('token'); // Retrieve token from cookies
        console.log('Token:', token); // Debugging
        await axios.get(`${server}/logout`, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
            withCredentials: true,
        });
        
        Cookies.remove('isLoggedin');
        Cookies.remove('user');
        Cookies.remove('token');
        dispatch({ type: 'logout' });
    } catch (error) {
        console.log(error);
    }
};

