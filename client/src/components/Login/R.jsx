import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';


export default function R() {
  const {token} = useParams()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null)

 useEffect(()=>{
  const timer = setTimeout(()=>{
    setError(null)
  })
  return ()=>clearTimeout(timer)
 },[error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_URI}/reset_password`, { token, newPassword }, {withCredentials:true});
       if(res.data.valid){
        toast.success("Password has been reset");
        setTimeout(()=>{
          navigate('/')
        },3000)
        setNewPassword('')
       }else{
        setError(res.data.error)
       }
    } catch (err) {
      setError('Error resetting password');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen dark:bg-zinc-800 bg-white">
        <div className="bg-white dark:bg-zinc-900 border border-none p-9 rounded-lg shadow-2xl max-w-md w-full">
          <div className="text-center mb-9 mt-4">
            <h1 className="text-2xl font-bold">
              E<span className="text-orange-500">Pa</span> Hiram
            </h1>
            <p className="text-zinc-600">Welcome Back!</p>
            <p className="text-zinc-500">Create a new password!</p>
            <p>{error}</p>
                    </div>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-2">
              <label className="block text-zinc-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your newPassword"
                value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
               
              />
            </div>
        
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200" type="submit">
              Change Password
            </button>
          </form>
       
        </div>
      </div>
    </>
  );
}
