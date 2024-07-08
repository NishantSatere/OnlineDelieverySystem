import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userAction';

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, isAuthenticated } = useSelector(state => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <h1>Hello From Home!!</h1>
            <h1>{token}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
