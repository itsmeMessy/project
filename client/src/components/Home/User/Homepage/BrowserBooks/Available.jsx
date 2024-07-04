import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from '../../Navbar/Navbar';
import Borrow from './Borrow/Borrow';


export default function Available() {
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [booksdata, setBooksData] = useState([])
  const [profile, setProfile] = useState({ fullname: '', email: '', profile: '' })
  const [error, setError] = useState('')
   const [id, setID] = useState(null)
   const [selectedBook, setSelectedBook] = useState(null);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`${process.env.REACT_APP_URI}/viewBooks`, {withCredentials:true})
        if(res.data.valid){
          setBooksData(res.data.avail)
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
const handleCloseBorrow = () => {
  setSelectedBook(null);
  setBorrowModalOpen(false);
};
 

  const handleEdit = async(book)=>{
    setSelectedBook(book)
    setBorrowModalOpen(true)
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
              <th class="pb-2">Actions</th>
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
  <td className="py-4 space-y-2">
    <button onClick={()=>handleEdit(book)} class="bg-green-200 text-green-800 p-1 rounded">
    <svg class="h-6 w-6 text-orange-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
</svg>

    </button>
   </td>
  
</tr>        ))}
      
     
      </tbody>
    </table>
  </div>
</div>
</main>
</div>
{borrowModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Borrow book={selectedBook} handleClose={handleCloseBorrow} />
        </div>
      )}
    </>
  )
}
