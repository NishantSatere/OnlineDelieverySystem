import React,{useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from "axios";
export const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhone] = useState('');
    const { isAuthenticated } = useSelector(state => state.user);
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Adjust the path as necessary
        }
    }, [isAuthenticated, navigate]);
    const handleLogin = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:5001/register`,
                { username, email, password, phoneNo },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log(data);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex h-screen items-center justify-center " >
      <div className="bg-white p-6 rounded-lg shadow-lg " style={{ width: '500px' }}>
        <h1 className="text-3xl font-semibold mb-4">Register!</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full py-2 px-4 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-4 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phoneNo}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full py-2 px-4 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
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