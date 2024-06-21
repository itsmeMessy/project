import React, { useState } from 'react';
import axios from 'axios';

export default function AddBooks({ handleClose }) {
  const [book, setBook] = useState('');
  const [img, setIMG] = useState(null);
  const [category, setCategory] = useState('');
  const [imgPreview, setImgPreview] = useState(null);

  const handleInput = (e) => {
    const { name, value, files } = e.target;

    if (name === 'book') {
      setBook(value);
    } else if (name === 'img') {
      const selectedImg = files[0];
      setIMG(selectedImg);
      if (selectedImg) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImgPreview(reader.result);
          }
        };
        reader.readAsDataURL(selectedImg);
      }
    } else if (name === 'category') {
      setCategory(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('book', book);
    formData.append('file', img);
    formData.append('category', category);

    try {
      const res = await axios.post(`${process.env.REACT_APP_URI}/addbooks`, formData, { withCredentials: true });
      if (res.data.valid) {
        setBook('')
        setCategory('')
        setIMG(null)
        handleClose(true)
      } else {
        console.log(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-8  rounded-lg shadow-lg max-w-2xl h-150 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-800 mt-35 p-8 rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-xl font-semibold mb-6 text-center text-zinc-700 dark:text-zinc-200">
          Fill up Book Details
        </h2>
        <form onSubmit={handleSubmit} method='POST'>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Book name"
                name='book'
                value={book}
                onChange={handleInput}
                className="w-full p-3 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-600"
              />
            </div>

            <div className="col-span-2 flex items-center space-x-3">
              <label htmlFor="importImage" className="block text-zinc-700 text-sm font-semibold mb-2">Import Image:</label>
              <input
                type="file"
                name='img'
                accept=".jpg,.png,.jpeg"
                onChange={handleInput}
                id="importImage"
                className="mb-4 w-full text-sm text-red-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200"
              />
            </div>


            <div className="col-span-2">
              <div className="relative">
                <select
                  name='category'
                  value={category}
                  onChange={handleInput}
                  className="w-full p-3 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-600"
                >
                      <option value="">Category</option>
                <option value="journal">Journal</option>
                <option value="textbook">Textbook</option>
                <option value="literature">Literature</option>
                <option value="philosophy">Philosophy</option>
                <option value="engineering">Engineering</option>
                <option value="medicine">Medicine</option>
                <option value="computer_science">Computer Science</option>
                <option value="management">Management</option>
                <option value="finance">Finance</option>
                <option value="programming">Programming</option>
                <option value="linguistics">Linguistics</option>
                </select>
              </div>
            </div>

            <div className='col-span-2 flex flex-col items-center justify-center'>
            <p>Image Preview</p>
            {imgPreview && (
            <div className="col-span-2 flex items-center space-x-3">
    
              <img src={imgPreview} alt="Preview"   style={{ width: '160px', height: 'auto' }}  />
            </div>
          )}
            </div>
               
          </div>
          <div className="mt-12">
            <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-md">
              Submit
            </button>
          </div>
          <div className="mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="w-full bg-orange-500 text-white p-3 rounded-md"
              >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
