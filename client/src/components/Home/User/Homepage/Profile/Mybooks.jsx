import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function Mybooks() {
  const [book, setBooks] = useState([]);

  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URI}/userBook`, { withCredentials: true });
        if (res.data.valid) {
          setBooks(res.data.value);
    
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProfile = async () => {
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

    fetchData();
    fetchProfile();
  }, []);

  const handleCancel = async(borrowID)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(`${process.env.REACT_APP_URI}/cancel_borrow`, {borrowID} , {withCredentials:true})
          if(res.data.valid){
            Swal.fire({
              title: "Deleted!",
              text: "Successfully Cancelled.",
              icon: "success"
            });
          }
        } catch (error) {
          console.log(error)
        }
      }
    });
  }

  return (
    <>
      <div className='flex'>
        <Navbar />
        <main className='ml-60 flex-grow p-6'>
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
            <div className='bg-white dark:bg-zinc-800 p-4 rounded-lg shadow'>
              <div className='flex justify-between pb-4'>
              </div>
              <table className='w-full text-left table-auto'>
                <thead>
                  <tr className='border-b dark:border-zinc-700'>
                    <th className='pb-2'>Title</th>
                    <th className='pb-2'>Category</th>
                   

                    <th className='pb-2'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {book.map((b, index) => (
                    <tr key={index} className='border-b dark:border-zinc-700'>
                      <td className='flex items-center py-4'>
                      <img src={`data:image/jpeg;base64,${b.photo}`} className="w-10 h-15 mr-4" alt="Book Cover" />
                        <div>
                          <h3 className='font-semibold'>{b.books_name}</h3>
                        </div>
                      </td>
                
                      <td className='py-4'>{b.category}</td>
                      <td className='py-4 space-y-1'>
                        <button  onClick={()=>handleCancel(b.borrow_id)} className='bg-orange-500  p-1 rounded'>Cancel</button>
  
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
