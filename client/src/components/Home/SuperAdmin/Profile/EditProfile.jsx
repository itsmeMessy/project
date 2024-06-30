import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditProfile({ handleClose, id }) {
  const [adminName, setAdminName] = useState('');
  const [adminID, setAdminID] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'adminName') {
      setAdminName(value);
    } else if (name === 'adminID') {
      setAdminID(value);
    } else if (name === 'adminEmail') {
      setAdminEmail(value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_URI}/get_admin`, { id }, { withCredentials: true });
        if (res.data.valid) {
          setAdminEmail(res.data.value.email);
          setAdminID(res.data.value.stud_id);
          setAdminName(res.data.value.fullname);
        } else {
          setFeedback(res.data.error);
        }
      } catch (error) {
        console.log(error);
        setFeedback('An error occurred while fetching the data.');
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_URI}/update_admin`, {adminName,adminID,adminEmail, id}, {withCredentials:true})
      if(res.data.valid){
         handleClose(true)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-lg max-w-2xl h-150 w-1/3 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-800 mt-35 p-8 rounded-lg shadow-lg max-w-xl">
        <h2 className="text-xl font-semibold mb-6 text-center text-zinc-700 dark:text-zinc-200">
          Edit Profile {id}
        </h2>
        {feedback && <p className="text-red-500">{feedback}</p>}
        <form onSubmit={handleSubmit} method="POST">
          <div className="grid grid-cols-1 gap-3">
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Admin Name"
                name="adminName"
                value={adminName}
                onChange={handleInput}
                className="w-full p-3 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-600"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="ID"
                name="adminID"
                value={adminID}
                onChange={handleInput}
                className="w-full p-3 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-600"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Email"
                name="adminEmail"
                value={adminEmail}
                onChange={handleInput}
                className="w-full p-3 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-600"
              />
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
              onClick={() => handleClose(false)}
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
