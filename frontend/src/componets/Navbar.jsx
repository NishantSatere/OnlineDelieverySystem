import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userAction";

export const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoggedin, user } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-semibold">Navbar</h1>
                <ul className="flex space-x-4">
                    {isAuthenticated && isLoggedin ? (
                        <>
                            <li>
                                <a href="/home" className="text-white">Home</a>
                            </li>
                            <li>
                                <span className="text-white">{user.username}</span>
                            </li>
                            <li>
                                <a href="/" className="text-white" onClick={handleLogout}>Logout</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <a href="/login" className="text-white">Login</a>
                            </li>
                            <li>
                                <a href="/register" className="text-white">Register</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};
