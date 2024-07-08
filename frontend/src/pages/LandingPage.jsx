import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold mb-4">Welcome to the Landing Page!</h1>
                <button
                    onClick={() => navigate('/login')}
                    className="w-full mb-5 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/register')}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Register
                </button>
            </div>
        </div>
    );
}