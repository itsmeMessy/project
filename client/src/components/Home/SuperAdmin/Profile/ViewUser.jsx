import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SuperAdminNav from '../Navbar/SPadminNavbar';



export default function ViewUser() {

  const [booksdata, setBooksData] = useState([])
  const [profile, setProfile] = useState({ fullname: '', email: '', profile: '' })
  const [error, setError] = useState('')
 


  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`${process.env.REACT_APP_URI}/all_user`, {withCredentials:true})
        if(res.data.valid){
          setBooksData(res.data.getUser)
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
  return (
    <>
    <div className='flex'>
   <SuperAdminNav />
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
      <h2 class="text-lg font-semibold"> User
        </h2>
    </div>
    <table className="w-full text-left table-auto">
  <thead>
    <tr className="border-b dark:border-zinc-700">
      <th className="pb-2">Name</th>
      <th className="pb-2">Email</th>
      <th className="pb-2">Student ID</th>
     
    </tr>
  </thead>
  <tbody>
    {booksdata.map((book) => (
      <tr key={book.id} className="border-b dark:border-zinc-700">
        <td className="flex items-center py-4">
          {book.profile ? (
            <img src={`data:image/jpeg;base64,${book.profile}`} className="w-10 h-15 mr-4" alt="Profile" />
          ) : (
            <img src="https://placehold.co/150x150" className="w-10 h-15 mr-4" alt="Default Profile" />
          )}
          <div>
            <h3 className="font-semibold">{book.fullname}</h3>
          </div>
        </td>
        <td className="py-4">{book.email}</td>
        <td className="py-4 space-y-1">
        <td className='py-4'>{book.stud_id}</td>
        </td>
      
      </tr>
    ))}
  </tbody>
</table>

  </div>
</div>
</main>
</div>
    </>
  )
}
