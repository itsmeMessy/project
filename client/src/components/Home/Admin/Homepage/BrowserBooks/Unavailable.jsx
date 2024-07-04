import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Admin/Navbar/AdminNav';
import axios from 'axios';
import Swal from 'sweetalert2';
import bookess from '../../../../utils/image/book.gif'

export default function Unavailable() {
  const [booksdata, setBooksData] = useState([]);
  const [profile, setProfile] = useState({ fullname: '', email: '', profile: '' });
  const [error, setError] = useState('');
  const [expandedPurpose, setExpandedPurpose] = useState(null);
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URI}/mybooks`, { withCredentials: true });
        if (res.data.valid) {
          setBooksData(res.data.value);
        } else {
          console.log(res.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchprofile();
  }, []);

  const fetchprofile = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URI}/getProfile`, { withCredentials: true });
      if (res.data.valid) {
        setProfile(res.data.data_value);
      } else {
        setError(res.data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(`${process.env.REACT_APP_URI}/delete_books`, { id }, { withCredentials: true });
          if (res.data.valid) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your Books has been deleted.',
              icon: 'success'
            });
          } else {
            console.log(res.data.error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleAccept = async (id) => {
alert(id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Accept it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(`${process.env.REACT_APP_URI}/accept`, { id }, { withCredentials: true });
          if (res.data.valid) {
            Swal.fire({
              title: 'Accepted!',
              text: 'Your Books has been Accepted.',
              icon: 'success'
            });
          } else {
            console.log(res.data.error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
 
  };

  const togglePurpose = (id) => {
    if (expandedPurpose === id) {
      setExpandedPurpose(null);
    } else {
      setExpandedPurpose(id);
    }
  };

  return (
    <div className='flex'>
      <AdminNav />
      <main className='ml-60 flex-grow p-6 overflow-y-auto'>
        <div className='p-4 bg-zinc-100 dark:bg-zinc-900'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center space-x-2'>
              <div className='bg-white dark:bg-zinc-800 p-2 rounded-full overflow-hidden w-10 h-10'>
                {profile.profile ? (
                  <img
                    src={`data:image/jpeg;base64,${profile.profile}`}
                    className='rounded-full mb-4 w-10 h-7'
                    alt='Your Profile'
                  />
                ) : (
                  <img
                    src='https://placehold.co/150x150'
                    className='rounded-full mb-4'
                    alt='Default Profile'
                  />
                )}
              </div>
            </div>
          </div>
      {booksdata.length ===0 ?
        <div className="flex flex-col items-center min-h-screen bg-zinc-100 dark:bg-zinc-800 pt-4">
        <img src={bookess} alt="Animated Book" className="w-25 h-25 rounded-md mt-1 max-w-xs max-h-xs" />
        <div className="text-center">No pending!</div>
    </div>
    :(
      <div className='bg-white dark:bg-zinc-800 p-4 rounded-lg shadow'>
      <div className='flex justify-between pb-4'>
        <h2 className='text-lg font-semibold'>Books</h2>
      </div>
      <table className='w-full text-left table-auto'>
        <thead>
          <tr className='border-b dark:border-zinc-700'>
            <th className='pb-2'>Title</th>
            <th className='pb-2'>Purpose</th>
            <th className='pb-2'>User</th>
            <th className='pb-2'>ID</th>
            <th className='pb-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {booksdata.map((book) => (
            <tr key={book.borrow_id} className='border-b dark:border-zinc-700'>
              <td className='flex items-center py-4'>
                <img src={`data:image/jpeg;base64,${book.photo}`} className='w-10 h-15 mr-4' alt='Book Cover' />
                <div>
                  <h3 className='font-semibold'>{book.book}</h3>
                </div>
              </td>
              <td className='py-4'>
                <button onClick={() => togglePurpose(book.borrow_id)} className='text-orange-500'>
                  {expandedPurpose === book.borrow_id ? 'Hide' : 'Show'} Purpose
                </button>
                {expandedPurpose === book.borrow_id && (
                  <div className='mt-2'>
                    <p>{book.purpose}</p>
                  </div>
                )}
              </td>
              <td className='py-4 space-y-1'>
                <span>{book.fullname}</span>
              </td>
              <td>
                <span>{book.student_id}</span>
              </td>
              <td className='py-4 space-y-2'>
                <button onClick={() => handleAccept(book.borrow_id)} className='bg-green-200 text-green-800 p-1 rounded'>
                  <svg className='h-6 w-6 text-orange-400' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3' />
                  </svg>
                </button>
                <span className='inline-block w-2'></span>
                <button onClick={() => handleDelete(book.borrow_id)} className='bg-green-200 text-green-800 p-1 rounded'>
                  <svg className='h-5 w-5 text-red-500' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z' />
                    <line x1='18' y1='9' x2='12' y2='15' />
                    <line x1='12' y1='9' x2='18' y2='15' />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )} 
        </div>
      </main>
    </div>
  );
}
