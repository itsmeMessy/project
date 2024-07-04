import React, { useEffect, useState } from 'react'
import axios from 'axios'
import animated_book from '../../../../utils/image/science-book.gif'
import Renew from './Sub/Renew'
import AdminNav from '../../Navbar/AdminNav'


export default function Renewbooks() {
  const [book, setBook] = useState([])
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)
  
const handleSubmit= (book)=>{
  setOpen(true)
  setSelected(book)
}
const handleClose = ()=>{
  setOpen(false)
  setSelected(null)
}
 console.log(book)
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await axios.get(`${process.env.REACT_APP_URI}/renewBooks`, {withCredentials:true})
        if(res.data.valid){
         const formattedBooks = res.data.value.map(book=>({
          ...book,
          accepted: new Date(book.accepted).toLocaleDateString(),
          return_date: new Date (book.return_date).toLocaleDateString()
         }))
         setBook(formattedBooks)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])
  return (
    <>
    <div className='flex'>
<AdminNav />
        <main className='ml-60 flex-grow p-6'>
   
      <div class="min-h-screen bg-zinc-100 dark:bg-zinc-800 p-4">

  <div class="mb-4">
    <h2 class="text-xl font-semibold">Your Shelf</h2>
    <div class="flex space-x-4 text-zinc-500 dark:text-zinc-400">
      <a href="#" class="hover:underline">All Books</a>
    </div>
  </div>
  {book.length ===0 ? 
 <div className="flex flex-col items-center min-h-screen bg-zinc-100 dark:bg-zinc-800 pt-4">
 <img src={animated_book} alt="Animated Book" className="w-25 h-25 rounded-md mt-1 max-w-xs max-h-xs" />
 <div className="text-center">Borrow books first to be shown here!</div>
</div>
   : (
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {book.map((book, index)=>(
        <div key={index} class="p-4 bg-white dark:bg-zinc-700 rounded shadow">
        <img src={`data:image/jpeg;base64, ${book.photo}`} alt="Book Cover" class="mb-4 mx-auto" />
        <p class="font-semibold">{book.book}</p>
        <div class="my-2 text-sm text-zinc-500 dark:text-zinc-400">
        <p>Accepted on <span className='text-orange-500'>{book.accepted}</span></p>
        <p>Submission Due <span className='text-red-600'>{book.return_date}</span></p>
        </div>
        <div class="flex justify-between items-center">
          <button class="p-2 bg-zinc-200 dark:bg-zinc-600 rounded">Borrowed</button>
          <button
  onClick={() => handleSubmit(book)}
  disabled={book.renew}
  className={`p-2 bg-red-500 text-white rounded ${book.renew ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  Accept Renew
</button>

        </div>
      </div>
      ))}
      </div>
  )}
  
</div>
         
</main>
    </div>
    {open && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Renew book={selected} handleClose={handleClose} />
        </div>
      )}
    </>
  )
}
