import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../Store/UserSlice';
import Swal from 'sweetalert2';
import Alert from '@mui/material/Alert';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/user/login`, { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      Swal.fire({
        title: "Successfully Logged In",
        icon: "success",
        draggable: true
      });
      navigate("/");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className='flex flex-col justify-center items-center mt-20'>
      <div>
        <h1 className='text-3xl font-bold mb-3 ml-19'>Cost Tracker</h1>
        <div className='border-2 px-8 pt-6 pb-10 border-gray-300 shadow-lg shadow-gray-300 rounded-lg'>

          <h1 className='flex justify-center text-2xl font-bold mb-2'>Login</h1>

          {errorMessage && (
            <Alert severity="error" className="mb-4">{errorMessage}</Alert>
          )}

          <div className='flex flex-col'>
            <label className='text-xl font-medium mb-2'>Email Id</label>
            <input type="text" placeholder='Email Id' value={emailId} onChange={(e) => setEmail(e.target.value)} className='bg-blue-200 p-2 rounded mb-2' />
          </div>
          <div className='flex flex-col'>
            <label className='text-xl font-medium mb-2'>Password</label>
            <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='bg-blue-200 p-2 rounded mb-4' />
          </div>
          <button className='flex justify-center p-2 font-bold w-full bg-blue-400 mb-4 rounded' onClick={handleLogin}>Login</button>
          <h1>Don't have an Account?<span className='text-blue-800 underline hover:cursor-pointer' onClick={() => navigate("/signup")}> Sign In</span></h1>
        </div>
      </div>
    </div>
  )
}
export default Login;