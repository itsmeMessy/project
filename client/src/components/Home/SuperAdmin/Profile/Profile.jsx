import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Upload from './Upload'
import SuperAdminNav from '../Navbar/SPadminNavbar'

export default function Editprofile() {
    const [name, setName] = useState('')
    const [showUpload, setShowUpload] = useState(false)
    const [contrib, setContrib] = useState(null)
    const [profile, setProfile] = useState({ fullname: '', email: '', profile: '' })
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_URI}/user`, { withCredentials: true })
                if (res.data.valid) {
                    setName(res.data.name)
                } else {
                    setError(res.data.error)
                }
            } catch (error) {
                setError(error.message)
            }
        }

        const fetchprofile = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_URI}/getProfile`, { withCredentials: true })
                if (res.data.valid) {
                    setProfile(res.data.data_value)
                    setContrib(res.data.contribution_count)
                } else {
                    setError(res.data.error)
                }
            } catch (error) {
                setError(error.message)
            }
        }

        fetchData()
        fetchprofile()
    }, [])

    const handleUpdate = () => {
        setShowUpload(true)
    }

    const handleCloseUpdate = () => {
        setShowUpload(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProfile(prevProfile => ({ ...prevProfile, [name]: value }))
    }

    const handleEdit = (id)=>{
        
    }

    return (
        <>
            <div className='flex'>
                <SuperAdminNav />
                <main className='ml-60 flex-grow p-6'>
                    <div className="min-h-screen bg-zinc-100 p-4">
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    {profile.profile ? (
                                        <img
                                            src={`data:image/jpeg;base64,${profile.profile}`}
                                            className="rounded-full mb-4 w-10 h-10"
                                            alt="Your Profile"
                                        />
                                    ) : (
                                        <img
                                            src="https://placehold.co/150x150"
                                            className="rounded-full mb-4"
                                            alt="Default Profile"
                                        />
                                    )}
                                    <span>{name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex border-b border-zinc-200 mb-4">
                                <a href="#" className="text-orange-500 px-4 py-2 border-b-2 border-orange-500">Account Setting</a>
                            </div>
                            <div className="flex">
                                <div className="w-1/3 p-4">
                                    {profile.profile ? (
                                        <img
                                            src={`data:image/jpeg;base64,${profile.profile}`}
                                            className="rounded-full mb-4 w-32 h-32"
                                            alt="Your Profile"
                                        />
                                    ) : (
                                        <img
                                            src="https://placehold.co/150x150"
                                            className="rounded-full mb-4"
                                            alt="Default Profile"
                                        />
                                    )}
                                    <button className="text-blue-500" onClick={handleUpdate}>Upload new photo</button>
                                </div>
                                <div className="w-2/3 p-4">
                                    <div className="flex gap-4 mb-4">
                                        <div className="flex-1 bg-purple-100 p-4 rounded-lg text-center">
                                            <h3 className="text-2xl font-bold">{contrib}</h3>
                                            <p className="text-purple-500">Contributions</p>
                                        </div>
                                    </div>
                                    <form className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="block text-zinc-700 mb-2">Full name</label>
                                                <input
                                                    type="text"
                                                    name="fullname"
                                                    value={profile.fullname}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-zinc-300 rounded-md p-2"
                                                    placeholder="Reinhard Kenson"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-zinc-700 mb-2">Email Account</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={profile.email}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-zinc-300 rounded-md p-2"
                                                    placeholder="Kensons.official@college.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button type="button" className="bg-orange-500 text-white px-4 py-2 rounded-md">
                                                Update Profile
                                            </button>
                                            <button type="button" className="bg-zinc-300 text-zinc-700 px-4 py-2 rounded-md">
                                                Reset
                                            </button>
                                        </div>
                                    </form>
                                    {error && <p className="text-red-500">{error}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {showUpload && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <Upload handleClose={handleCloseUpdate} />
                </div>
            )}
        </>
    )
}
