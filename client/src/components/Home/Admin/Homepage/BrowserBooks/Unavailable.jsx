import React, { useEffect, useState } from 'react'
import AdminNav from '../../Navbar/AdminNav'
import axios from 'axios'


export default function Unavailable() {
  const [profile, setProfile] = useState({ fullname: '', email: '', profile: '' })
  const [error, setError] = useState('')

useEffect(()=>{
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
fetchprofile()
}, [])
  return (
    <>
    <div className='flex'>
       <AdminNav />
        <main className='ml-60 flex-grow p-6'>
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
      <h2 class="text-lg font-semibold">Browse</h2>
      <button class="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 focus:outline-none">Browse</button>
    </div>
    <table class="w-full text-left table-auto">
      <thead>
        <tr class="border-b dark:border-zinc-700">
          <th class="pb-2">Title</th>
          <th class="pb-2">Ratings</th>
          <th class="pb-2">Category</th>
          <th class="pb-2">Availability</th>
          <th class="pb-2">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b dark:border-zinc-700">
          <td class="flex items-center py-4">
            <img src="https://placehold.co/40x60" class="w-10 h-15 mr-4" alt="Book Cover" />
            <div>
              <h3 class="font-semibold">Don't Make Me Think</h3>
              <p class="text-sm text-zinc-500">Steve Krug, 2000</p>
              <p class="text-xs text-zinc-400">2 locations</p>
            </div>
          </td>
          <td class="py-4">4.5/5</td>
          <td class="py-4">Computer Science<br />UX Design</td>
          <td class="py-4 space-y-1">
            <div class="flex items-center space-x-2">
              <div class="bg-green-500 rounded-full w-3 h-3"></div>
              <span>Hard Copy</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="bg-zinc-500 rounded-full w-3 h-3"></div>
              <span>E-Book</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="bg-zinc-500 rounded-full w-3 h-3"></div>
              <span>Audio Book</span>
            </div>
          </td>
          <td class="py-4 space-y-1">
          <button class="bg-red-200 text-red-800 p-1 rounded">Not available</button>
            <span class="block text-zinc-500">CS A-15</span>
          </td>
        </tr>
        <tr class="border-b dark:border-zinc-700">
          <td class="flex items-center py-4">
            <img src="https://placehold.co/40x60" class="w-10 h-15 mr-4" alt="Book Cover" />
            <div>
              <h3 class="font-semibold">The Design of Everyday Things</h3>
              <p class="text-sm text-zinc-500">Don Norman, 1988</p>
            </div>
          </td>
          <td class="py-4">4.5/5</td>
          <td class="py-4">Computer Science<br />UX Design</td>
          <td class="py-4 space-y-1">
            <div class="flex items-center space-x-2">
              <div class="bg-zinc-500 rounded-full w-3 h-3"></div>
              <span>Hard Copy</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="bg-zinc-500 rounded-full w-3 h-3"></div>
              <span>E-Book</span>
            </div>
          </td>
          <td class="py-4">
          <button class="bg-red-200 text-red-800 p-1 rounded">Not available</button>
            <span class="block text-zinc-500">Sriram</span>
          </td>
        </tr>
        <tr class="border-b dark:border-zinc-700">
          <td class="flex items-center py-4">
            <img src="https://placehold.co/40x60" class="w-10 h-15 mr-4" alt="Book Cover" />
            <div>
              <h3 class="font-semibold">Rich Dad Poor Dad</h3>
              <p class="text-sm text-zinc-500">Robert T.Kiyosaki, 1997</p>
            </div>
          </td>
          <td class="py-4">4.5/5</td>
          <td class="py-4">Financial MGMT</td>
          <td class="py-4 space-y-1">
            <div class="flex items-center space-x-2">
              <div class="bg-zinc-500 rounded-full w-3 h-3"></div>
              <span>Hard Copy</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="bg-zinc-500 rounded-full w-3 h-3"></div>
              <span>E-Book</span>
            </div>
          </td>
          <td class="py-4">
          <button class="bg-red-200 text-red-800 p-1 rounded">Not available</button>
            <span class="block text-zinc-500">CS A-15</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</main>
</div>
    </>
  )
}
