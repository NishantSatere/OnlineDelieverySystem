import React from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/actions/userAction";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
export const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoggedin } = useSelector(state => state.user);

    // const handleLogout = () => {
    //     dispatch(logout());
    // };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-semibold">Navbar</h1>
                <ul className="flex space-x-4">
                    {isAuthenticated && isLoggedin ? (
                        <>
                            <li>
                                <a href="/home" className="text-white"><HomeIcon/></a>
                            </li>
                            <li>
                                <a href='/profile' className="text-white"><AccountCircleIcon/></a>
                            </li>
                            {/* <li>
                                <a href="/" className="text-white" onClick={handleLogout}>Logout</a>
                            </li> */}
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
