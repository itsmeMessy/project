import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import SuperAdminNav from '../Navbar/SPadminNavbar';
import Add from './Add';
import EditProfile from './EditProfile'


export default function Addadmin() {
  const [showAddBooks, setShowAddBooks] = useState(false);
  const [showEdit, setShowEdit] = useState(false)
  const [booksdata, setBooksData] = useState([])
  const [profile, setProfile] = useState({ fullname: '', email: '', profile: '' })
  const [error, setError] = useState('')
const [id, setID] = useState('')
  const handleAddBooks = () => {
    setShowAddBooks(true);
  };

  const handleCloseAddBooks = () => {
    setShowAddBooks(false);
  };

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`${process.env.REACT_APP_URI}/all_user`, {withCredentials:true})
        if(res.data.valid){
          setBooksData(res.data.getAll)
        }else{
          console.log(res.data.error)
        }

      }catch(error){
        console.log(error)
      }
    }
    fetchData()
    fetchprofile()
  },[])

  const fetchprofile = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URI}/getProfile`, { withCredentials: true })
        if (res.data.valid) {
            setProfile(res.data.data_value)
        } else {
            setError(res.data.error)
        }
    } catch (error) {
        setError(error.message)
    }
}

  const handleCloseEdit = async()=>{
    setShowEdit(false)
  }
 

  const handleEdit = async(id)=>{
    setID(id)
    setShowEdit(true)
  }
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${process.env.REACT_APP_URI}/delete_admin`, {
            data: { id },
            withCredentials: true
          });
          if (res.data.valid) {
            Swal.fire({
              title: "Deleted!",
              text: "Your User has been deleted.",
              icon: "success"
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
  

  return (
    <>
    <div className='flex'>
   <SuperAdminNav />
   <main className='ml-60 flex-grow p-6 overflow-y-auto'>

      
      <div class="p-4 bg-zinc-100 dark:bg-zinc-900">
  <div class="flex justify-between items-center mb-4">
    <div class="flex items-center space-x-2">
      <div class="bg-white dark:bg-zinc-800 p-2 rounded-full overflow-hidden w-10 h-10">
      {profile.profile ? (
                                        <img
                                            src={`data:image/jpeg;base64,${profile.profile}`}
                                            className="rounded-full mb-4 w-10 h-7"
                                            alt="Your Profile"
                                        />
                                    ) : (
                                        <img
                                            src="https://placehold.co/150x150"
                                            className="rounded-full mb-4"
                                            alt="Default Profile"
                                        />
                                    )}
      </div>
    </div>
  </div>
  <div class="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
    <div class="flex justify-between pb-4">
      <h2 class="text-lg font-semibold">Admin User
        </h2>
        <button className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center space-x-2 focus:outline-none" onClick={handleAddBooks}>
  <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
  </svg>
  <span>Add</span>
</button>


    </div>
    <table className="w-full text-left table-auto">
  <thead>
    <tr className="border-b dark:border-zinc-700">
      <th className="pb-2">Name</th>
      <th className="pb-2">Email</th>
      <th className="pb-2">ID</th>
      <th className="pb-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {booksdata.map((book) => (
      <tr key={book.id} className="border-b dark:border-zinc-700">
        <td className="flex items-center py-4">
          {book.profile ? (
            <img src={`data:image/jpeg;base64,${book.profile}`} className="w-10 h-15 mr-4" alt="Profile" />
          ) : (
            <img src="https://placehold.co/150x150" className="w-10 h-15 mr-4" alt="Default Profile" />
          )}
          <div>
            <h3 className="font-semibold">{book.fullname}</h3>
          </div>
        </td>
        <td className="py-4">{book.email}</td>
        <td className="py-4 space-y-1">
          <span>{book.stud_id}</span>
        </td>
        <td className="py-4 space-y-2">
          <button onClick={() => handleEdit(book.id)} className="bg-green-200 text-green-800 p-1 rounded">
            <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </button>
          <span className="inline-block w-2"></span>
          <button onClick={() => handleDelete(book.id)} className="bg-green-200 text-green-800 p-1 rounded">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
              <line x1="18" y1="9" x2="12" y2="15" />
              <line x1="12" y1="9" x2="18" y2="15" />
            </svg>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  </div>
</div>
</main>
</div>

{showAddBooks && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Add handleClose={handleCloseAddBooks} />
        </div>
      )}
      {showEdit && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <EditProfile id={id} handleClose={handleCloseEdit} />
        </div>
      )}

    </>
  )
}
