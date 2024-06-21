import React from 'react'
import Navbar from '../../Navbar/Navbar'

export default function Renewbooks() {
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
    <div class="p-4 bg-white dark:bg-zinc-700 rounded shadow">
      <img src="https://placehold.co/100x150" alt="Book Cover" class="mb-4 mx-auto" />
      <p class="font-semibold">Refactoring</p>
      <p class="text-zinc-500 dark:text-zinc-400">Martin Fowler, 1999</p>
      <div class="my-2 text-sm text-zinc-500 dark:text-zinc-400">
        <p>Borrowed on 05-Mar-2023</p>
        <p>Submission Due</p>
      </div>
      <div class="flex justify-between items-center">
        <button class="p-2 bg-zinc-200 dark:bg-zinc-600 rounded">Borrowed</button>
        <button class="p-2 bg-red-500 text-white rounded">Renew</button>
      </div>
    </div>
  </div>
  
</div>
         
</main>
    </div>
    </>
  )
}
