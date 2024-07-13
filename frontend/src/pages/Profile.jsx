import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userAction";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const Profile = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoggedin } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className=" min-h-screen">
            <div className="flex justify-between items-center mx-36 mt-5">
                <a href="/home" className=" text-white hover:bg-gray-200 hover:text-black transition duration-300 cursor-pointer active:bg-gray-300 "><ArrowBackIcon fontSize="large"/></a>
                <h1 className="text-white text-3xl font-semibold text-center flex-grow">Your Profile</h1>
                <div className="w-16"></div> {/* Empty div to balance the flexbox */}
            </div>
        
        <div className="flex items-center justify-center mt-16 ">
            
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
        </div>
    );
}
