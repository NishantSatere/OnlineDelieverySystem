import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userAction";
export const Profile = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoggedin } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="grid grid-cols-2 gap-5">
            <a href="/" className="flex flex-col items-center justify-center bg-blue-300 sm:w-72 h-56 rounded-md hover:bg-blue-400 transition duration-400">
                <span><ManageAccountsIcon fontSize="large"/></span>
                <span className=" font-bold">Manage Account</span>
            </a>

            <a href="/orders" className="flex flex-col items-center justify-center bg-blue-300 sm:w-72 h-56 rounded-md hover:bg-blue-400 transition duration-400">
                <span><DeliveryDiningIcon fontSize="large"/></span>
                <span className=" font-bold">Your Orders</span>
            </a>

            <div className="flex flex-col items-center justify-center bg-blue-300 sm:w-72 h-56 rounded-md hover:bg-blue-400 transition duration-400">
                <span><SettingsIcon fontSize="large"/></span>
                <span className="font-bold">Settings</span>
            </div>

            {isAuthenticated && isLoggedin ? (
            <button onClick={handleLogout} className="flex flex-col items-center justify-center bg-blue-300 sm:w-72 h-56 rounded-md hover:bg-blue-400 transition duration-400">
                <span><LogoutIcon fontSize="large"/></span>
                <span className="font-bold">LogOut</span>
            </button>) : (<div></div>)}
            </div>
        </div>
    );
}
