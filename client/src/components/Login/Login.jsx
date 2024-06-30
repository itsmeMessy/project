import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [cor, setCOR] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const failedAttempts = localStorage.getItem('failedAttempts');
    const lockTime = localStorage.getItem('lockTime');
    if (failedAttempts >= 5 && lockTime) {
      const lockDuration = 60000;
      const remainingLockTime = lockDuration - (Date.now() - lockTime);
      if (remainingLockTime > 0) {
        setIsLocked(true);
        setLockTime(remainingLockTime);
      } else {
        localStorage.removeItem('failedAttempts');
        localStorage.removeItem('lockTime');
      }
    }
  }, []);

  useEffect(() => {
    if (isLocked && lockTime > 0) {
      const timer = setTimeout(() => {
        setLockTime(lockTime - 1000);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockTime <= 0) {
      setIsLocked(false);
      localStorage.removeItem('failedAttempts');
      localStorage.removeItem('lockTime');
    }
  }, [isLocked, lockTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) {
      toast.error('You are locked out due to too many failed attempts. Please try again later.');
      return;
    }
    setLoading(true);
  
    const formData = new FormData();
    formData.append('password', password);
    formData.append('file', cor);
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_URI}/login`, formData, { withCredentials: true });
      if (res.data.valid) {
        if (res.data.rrrr === 'user') {
          setLoading(false);
          setError(false);
          toast.success('Logged In!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate('/allbooks');

        } 
        else if (res.data.rrrr === 'xxxx'){
           navigate('/sp/allbooks')
        }
        else if(res.data.rrrr==='admin') {
          navigate('/admin/ad_av_books');
        }
        else{
          navigate('/')
        }
      } else {
        setError(res.data.error);
        setLoading(false);
        incrementFailedAttempts();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      incrementFailedAttempts();
    }
  };

  const incrementFailedAttempts = () => {
    let failedAttempts = parseInt(localStorage.getItem('failedAttempts')) || 0;
    failedAttempts += 1;
    localStorage.setItem('failedAttempts', failedAttempts);
    if (failedAttempts >= 5) {
      const lockTime = Date.now();
      localStorage.setItem('lockTime', lockTime);
      setIsLocked(true);
      setLockTime(60000);
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
            <p className="text-zinc-500">Sign in to continue to your Digital Library</p>
            {error && (
              <div className='text-red-500'>{error}</div>
            )}
            {isLocked && (
              <div className='text-red-500'>Too many failed attempts. Please try again in {Math.ceil(lockTime / 1000)} seconds.</div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label htmlFor="fileUpload" className="block text-zinc-700 text-sm font-semibold mb-2">
                Certificate of Registration (PDF)
              </label>
              <input
                type="file"
                id="fileUpload"
                className="mb-4 w-full text-sm text-red-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200"
                onChange={(e) => setCOR(e.target.files[0])}
                accept='.pdf'
                disabled={isLocked}
              />
            </div>
            <div className="mb-2">
              <label className="block text-zinc-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked}
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <a href="/reset_pass" className="text-orange-500">
                Forgot password?
              </a>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200" type="submit" disabled={isLocked}>
              {loading ? 'Logging in' : 'Login'}
            </button>
          </form>
          <div className="flex justify-between mt-6">
            <a href="/create_account" className="text-zinc-500">
              New User? <span className="text-orange-500">Register Here</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
