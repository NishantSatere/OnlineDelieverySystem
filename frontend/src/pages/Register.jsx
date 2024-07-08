import React,{useState} from "react";
import {login} from "../redux/actions/userAction"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const { isAuthenticated } = useSelector(state => state.user);
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Adjust the path as necessary
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = () => {
        dispatch(login(Username,Password));
        console.log('Username:',Username);
        console.log('Password:',Password)
    }
    return (
        <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Register!</h1>
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
        <Link to="/login">
                {"Don't have an account? "}
                        Register
                </Link>
      </div>
    </div>
    );
}