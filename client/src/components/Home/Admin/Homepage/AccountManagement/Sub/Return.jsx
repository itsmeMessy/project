import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Return({ handleClose, book }) {
    const user_id = book.user_id
    const borrow_id = book.borrow_id
    const books_id = book.books_id

  
  const onClick = () => {

    handleClose();
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_URI}/acceptReturn`, { books_id, borrow_id, user_id}, { withCredentials: true });
         if(res.data.valid){
          toast.success("Sucess")

          setTimeout(()=>{
            handleClose()
          },3000)
         }else{
          toast.error(res.data.error)
         }
    } catch (error) {
        console.log(error);
    }
};


  return (
    <>
    <ToastContainer />
      <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 shadow-md w-1/3 rounded-lg p-6">
        <h2 className="text-center text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
         {book.book}
        </h2>
        <div className="flex justify-end mr-2.5">
          <button
            className="flex items-center justify-end mr-2.5 p-2 bg-orange-500 text-white hover:opacity-25 rounded"
            onClick={onClick}
          >
            <svg
              className="h-8 w-8 text-red-500 mr-2.5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
            </svg>
            <span>Back</span>
          </button>
        </div>

        <div className='col-span-2 flex flex-col items-center justify-center'>
            <p>Image Preview</p>
            <img
            src={`data:image/jpeg;base64,${book.photo}`}
            alt={book.book}
            className="rounded-lg"
            style={{ width: '160px', height: 'auto' }}
          />
            </div>
        <form onSubmit={handleSubmit}>

         
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2">Description</label>
            <textarea
              className="border border-zinc-300 dark:border-zinc-700 rounded w-full py-2 px-4 text-zinc-700 dark:text-zinc-100 leading-tight focus:outline-none"
              placeholder="Purpose"
             value={book.purpose}
             disabled
            ></textarea>
          </div>
          <button className="w-full bg-orange-500 text-white py-2 px-4 rounded focus:outline-none">
           Accept 
          </button>
        </form>
      </div>
    </>
  );
}
