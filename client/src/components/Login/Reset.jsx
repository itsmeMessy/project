import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Reset() {   
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null)

useEffect(()=>{
  const timer = setTimeout(()=>{
    setError(null)
  },2000)
  return ()=>clearTimeout(timer)
},[error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_URI}/req_reset`, { email },{withCredentials:true});
      if(res.data.valid){
        toast.success("Reset Link is sent to email");
        setEmail('')
        setTimeout(()=>{
          navigate('/')
        },3000)
      }else{
        setError(res.data.error)
      }
    } catch (err) {
      toast.error('Error sending reset password email');
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
            <p className="text-zinc-500">Reset password will be sent to your valid email!</p>
             <p className='text-red-500'>{error}</p>
                    </div>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-2">
              <label className="block text-zinc-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your email"
                value={email}
          onChange={(e) => setEmail(e.target.value)}
               
              />
            </div>
        
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200" type="submit">
              Reset Password
            </button>
          </form>
       
        </div>
      </div>
    </>
  );
}
