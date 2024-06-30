import React, { useEffect, useState } from 'react'
import AdminNav from '../../../Admin/Navbar/AdminNav'
import axios from 'axios';
import Swal from 'sweetalert2'



export default function Unavailable() {
  const [showAddBooks, setShowAddBooks] = useState(false);
  const [showEditBooks, setShowEditBooks] = useState(false)
  const [booksdata, setBooksData] = useState([])
  const [profile, setProfile] = useState({ fullname: '', email: '', profile: '' })
  const [error, setError] = useState('')
  const [id, setID] = useState('')

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`${process.env.REACT_APP_URI}/pending`,{withCredentials:true})
        if(res.data.valid){
          setBooksData(res.data.borrow)
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

  const handleDelete = async(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
       try{
          const res = await axios.put(`${process.env.REACT_APP_URI}/delete_books`, {id}, {withCredentials:true})
          if(res.data.valid){
            Swal.fire({
              title: "Deleted!",
              text: "Your Books has been deleted.",
              icon: "success"
            });
          }else{
            console.log(res.data.error)
          }
       }catch(error){
        console.log(error)
       }
      }
    });
  }
  const handleAccept = async(id)=>{
    alert(id)
    const res = await axios.post(`${process.env.REACT_APP_URI}/pending`,{
      data:id,
      withCredentials:true
    })
    if(res.data.valid){

    }
  }
  return (
    <>
    <div className='flex'>
   <AdminNav />
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
      <h2 class="text-lg font-semibold">Books
        </h2>
    </div>
    <table class="w-full text-left table-auto">
      <thead>
        <tr class="border-b dark:border-zinc-700">
          <th class="pb-2">Title</th>
             <th class="pb-2">Purpose</th>
              <th class="pb-2">User</th>
              <th class="pb-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {booksdata.map((book)=>(
  <tr key={book.borrow_id} class="border-b dark:border-zinc-700">
  <td class="flex items-center py-4">
  <img src={`data:image/jpeg;base64,${book.photo}`} className="w-10 h-15 mr-4" alt="Book Cover" />
    <div>
      <h3 class="font-semibold">{book.book}</h3>
    </div>
  </td>
      <td className="py-4">{book.purpose}</td>
      <td className="py-4 space-y-1">
      <span
      className={`block ${book.available ? ' text-green-500' : ' text-red-500'}`}
    >
      {book.available ? 'Available' : 'Not Available'}
    </span>
  </td>
  <td className="py-4 space-y-2">
    <button onClick={()=>handleAccept(book.books_id)} class="bg-green-200 text-green-800 p-1 rounded">
    <svg class="h-6 w-6 text-orange-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
    </button>
    <span className="inline-block w-2"></span>
    <button onClick={()=>handleDelete(book.books_id)} class="bg-green-200 text-green-800 p-1 rounded">
    <svg class="h-5 w-5 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />  <line x1="18" y1="9" x2="12" y2="15" />  <line x1="12" y1="9" x2="18" y2="15" /></svg>
    </button>
  </td>
  
</tr>        ))}
      
     
      </tbody>
    </table>
  </div>
</div>
</main>
</div>


    </>
  )
}
