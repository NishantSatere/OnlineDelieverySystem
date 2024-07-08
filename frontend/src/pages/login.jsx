import React, { useState } from "react";
import { login } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.user);
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    React.useEffect(() => {
        if (isAuthenticated) {
            setSuccess(true); // Set success state to true on successful login
            setTimeout(() => {
                setSuccess(false); // Hide success message after 2 seconds
                navigate('/home'); // Redirect to home after showing success message
            }, 1000); // Redirect after 2 seconds
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async () => {
        try {
            await dispatch(login(Username, Password)); // Dispatch login action
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'An error occurred'); // Set error message
        }
    };

    const clearError = () => {
        setError('');
    };

    const handleSuccessPopup = () => {
        window.alert('Login successful!'); // Show success message as a window alert
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative"> {/* Ensure relative positioning */}
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
                
                <Link to="/register">
                    {"Don't have an account? "}
                    Register
                </Link>

                {error && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <p className="text-red-600 mb-2">{error}</p>
                            <button onClick={clearError} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Display success message as a window popup */}
                {success && handleSuccessPopup()}
            </div>
        </div>
    );
};

