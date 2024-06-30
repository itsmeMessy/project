import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import axios from 'axios'


export default function BorrowedBooks() {
  const [book, setBook] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await axios.get(`${process.env.REACT_APP_URI}/borrowed_books`, {withCredentials:true})
        if(res.data.valid){
          setBook(res.data.value)
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
        <Navbar />
        <main className='ml-60 flex-grow p-6'>
   
      <div class="min-h-screen bg-zinc-100 dark:bg-zinc-800 p-4">

  <div class="mb-4">
    <h2 class="text-xl font-semibold">Your Shelf</h2>
    <div class="flex space-x-4 text-zinc-500 dark:text-zinc-400">
      <a href="#" class="hover:underline">All Books</a>
    </div>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
   {book.map((book, index)=>(
     <div key={index} class="p-4 bg-white dark:bg-zinc-700 rounded shadow">
     <img src={`data:image/jpeg;base64,${book.photo}`} className="mb-4 mx-auto" alt="Book Cover" />

     <p class="font-semibold">{book.book}</p>
     <div class="my-2 text-sm text-zinc-500 dark:text-zinc-400">
       <p>Accepted on {book.accepted}</p>
       <p>Submission Due</p>
     </div>
     <div class="flex justify-between items-center">
       <button class="p-2 bg-zinc-200 dark:bg-zinc-600 rounded">Borrowed</button>
     </div>
   </div>
   ))}
  </div>
  
</div>
         
</main>
    </div>
    </>
  )
}
