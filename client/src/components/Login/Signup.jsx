import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {
  const navigate = useNavigate()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmpassword , setConfirmPassword] = useState('')
const [cor, setCOR] = useState('')
const [fullname, setFullName] = useState('')
const [error, setError] = useState(false)
const [loading, setLoading] = useState(false)

useEffect(()=>{
  const timer = setTimeout(()=>{
    setError(null)
  },5000)
  return ()=> clearTimeout(timer)
},[error])

const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();
  
  if (!email || !password || !confirmpassword || !cor || !fullname) {
    setLoading(false);
    return setError('Fill up all fields');
  }

  if (password !== confirmpassword) {
    setLoading(false);
    return setError('Password did not match!');
  }

  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fullname', fullname);
    formData.append('file', cor);

    const res = await axios.post(`${process.env.REACT_APP_URI}/create_account`, formData);

    if (res.data.valid) {
      setLoading(false);
      toast.success('Account Created!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/');
    } else {
      setLoading(false);
      return setError(res.data.error);
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    setError('An error occurred while creating the account');
  }
};


return(
  <>
   <ToastContainer />
     <div className="flex items-center justify-center  min-h-screen dark:bg-zinc-800 bg-white">
      <div className="bg-white dark:bg-zinc-900 border shadow-2xl border-none border-zinc-300 dark:border-zinc-700 p-9 rounded-lg max-w-md w-full">
        <div className="text-center mb-9 mt-4">
          <h1 className="text-2xl font-bold">
            E<span className="text-orange-500">Pa</span> Hiram
          </h1>
          <p className="text-zinc-600">Hi there!</p>
          <p className="text-zinc-500">Create Account in to continue to your Digital Library</p>
          {error && (
            <div className='text-red-600'>{error} </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-zinc-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="username@gmail.com"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Juan Dela Cruz"
              onChange={(e)=>setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="********"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="********"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-7">
                            <label htmlFor="fileUpload" className="block text-zinc-700 text-sm font-semibold mb-2">
                                Certificate of Registration (PDF)
                            </label>
                            <input type="file" id="fileUpload"
                                className="mb-4 w-full text-sm text-red-700 file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0 file:text-sm file:font-semibold
                      file:bg-red-100 file:text-red-700 hover:file:bg-red-200" 
                      onChange={(e)=>setCOR(e.target.files[0])}
                      accept='.pdf'
                      />
                        </div>


          <button type = "submit" className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200">
            Create Account
          </button>
        </form>
        <div className="flex justify-between mt-6">
          <a href="/create_account" className="text-zinc-500">
             <span className="text-orange-500"><a href='/'>Back to Login</a></span>
          </a>
        </div>
      </div>
    </div>
  </>
)
}