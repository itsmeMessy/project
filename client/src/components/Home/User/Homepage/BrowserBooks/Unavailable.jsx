import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from '../../Navbar/Navbar';


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
        const res = await axios.get(`${process.env.REACT_APP_URI}/viewBooks`, {withCredentials:true})
        if(res.data.valid){
          setBooksData(res.data.notAvail)
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
    setShowEditBooks(false)
  }
 

  const handleEdit = async(id)=>{
    setID(id)
    setShowEditBooks(true)
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

  return (
    <>
    <div className='flex'>
   <Navbar />
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
             <th class="pb-2">Category</th>
              <th class="pb-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {booksdata.map((book)=>(
  <tr key={book.books_id} class="border-b dark:border-zinc-700">
  <td class="flex items-center py-4">
  <img src={`data:image/jpeg;base64,${book.photo}`} className="w-10 h-15 mr-4" alt="Book Cover" />
    <div>
      <h3 class="font-semibold">{book.book}</h3>
    </div>
  </td>
      <td className="py-4">{book.category}</td>
      <td className="py-4 space-y-1">
      <span
      className={`block ${book.available ? ' text-green-500' : ' text-red-500'}`}
    >
      {book.available ? 'Available' : 'Not Available'}
    </span>
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
