import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addUser } from '../Store/UserSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import Alert from '@mui/material/Alert';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Signup() {
    const [emailId,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handlesignup=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${backendUrl}/user/signup`,{emailId,password},{withCredentials:true});
            dispatch(addUser(res.data));
            Swal.fire({
                title: "Successfully Signed In",
                icon: "success",
                draggable: true
                });
            navigate("/")

        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div className='flex flex-col justify-center items-center mt-20'>
    <div>
    <h1  className='text-3xl font-bold mb-8 ml-19'>Cost Tracker </h1>
    <form onSubmit={handlesignup} className='border-2 px-8 pt-6 pb-10 rounded-lg border-gray-300 shadow-lg shadow-gray-300'>
  <h1 className='flex justify-center text-2xl font-bold mb-2'>SignUp</h1>

  <div className='flex flex-col'>
    <label className='text-xl font-medium mb-2'>Email Id</label>
    <input
      type="email"
      placeholder='Email Id'
      className='bg-blue-200 p-2 rounded mb-2'
      value={emailId}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div className='flex flex-col'>
    <label className='text-xl font-medium mb-2'>Password</label>
    <input
      type="password"
      placeholder='Password'
      className='bg-blue-200 p-2 rounded mb-4'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>

  <button type="submit" className='flex justify-center p-2 font-bold w-full bg-blue-400 mb-4 rounded'>
    Sign Up
  </button>

  <h1>
    Have an Account?
    <span className='text-blue-800 underline hover:cursor-pointer' onClick={() => navigate("/login")}>
      Log In
    </span>
  </h1>
</form>

    </div>
</div>
  )
}

export default Signup