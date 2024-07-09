import React, { useState } from "react";
import { login } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import store  from '../redux/store';
export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.user);
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success , setSuccess] = useState('');

    const loginfailmsg = useSelector(state => state.user.error);
    
    React.useEffect(() => {
        if (isAuthenticated) {
            setSuccess('Login Successful');
            window.alert(success);
            navigate('/home');
        }else if(loginfailmsg){
            setError(loginfailmsg);
        }
    }, [isAuthenticated, navigate, loginfailmsg]);

    const handleLogin = async () => {
        await dispatch(login(Username, Password)); // Dispatch login action
        // console.log('loginfailmsg:',loginfailmsg);
    };

  

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative " style={{ width: '500px' }}> {/* Ensure relative positioning */}
                <h1 className="text-3xl font-semibold mb-4">Login!</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full py-2 px-4 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 px-4 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleLogin}
                    className="w-full mb-5 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                
                <Link to="/register">
                    {"Don't have an account? "}
                    Register
                </Link>

            </div>
        </div>
    );
};

