import React from 'react'
import Navbar from '../../Navbar/Navbar'

export default function Editprofile() {
  return (
    <>
    <div className='flex'>
        <Navbar />
        <main className='ml-60 flex-grow p-6'>
      <div class="min-h-screen bg-zinc-100 p-4">
  <div class="bg-white rounded-lg shadow-lg p-6 mb-4">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-4">
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <img src="https://placehold.co/40x40" class="rounded-full" alt="Profile" />
          <span>Kenson</span>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex border-b border-zinc-200 mb-4">
      <a href="#" class="text-orange-500 px-4 py-2 border-b-2 border-orange-500">Account Setting</a>
    </div>
    <div class="flex">
      <div class="w-1/3 p-4">
        <img src="https://placehold.co/100" class="rounded-full mb-2" alt="Your Profile Picture" />
        <button class="text-blue-500">Upload new photo</button>
      </div>
      <div class="w-2/3 p-4">
        <div class="flex gap-4 mb-4">
          <div class="flex-1 bg-orange-100 p-4 rounded-lg text-center">
            <h3 class="text-2xl font-bold">120</h3>
            <p class="text-orange-500">Readings</p>
          </div>
          <div class="flex-1 bg-purple-100 p-4 rounded-lg text-center">
            <h3 class="text-2xl font-bold">10</h3>
            <p class="text-purple-500">Contributions</p>
          </div>
        </div>
        <form class="space-y-4">
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-zinc-700 mb-2">Full name</label>
              <input
                type="text"
                class="w-full border border-zinc-300 rounded-md p-2"
                placeholder="Reinhard Kenson"
              />
            </div>
            <div class="flex-1">
              <label class="block text-zinc-700 mb-2">College Email ID</label>
              <input
                type="email"
                class="w-full border border-zinc-300 rounded-md p-2"
                placeholder="Kensons.official@college.com"
              />
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-zinc-700 mb-2">Register Number</label>
              <input
                type="text"
                class="w-full border border-zinc-300 rounded-md p-2"
                placeholder="6202020"
              />
            </div>
            <div class="flex-1">
              <label class="block text-zinc-700 mb-2">Phone Number</label>
              <input
                type="text"
                class="w-full border border-zinc-300 rounded-md p-2"
                placeholder="+91 8952508995"
              />
            </div>
          </div>
          <div>
            <label class="block text-zinc-700 mb-2">Bio</label>
            <input
              type="text"
              class="w-full border border-zinc-300 rounded-md p-2"
              placeholder="I'm a Student"
            />
          </div>
          <div class="flex gap-4">
            <button type="button" class="bg-orange-500 text-white px-4 py-2 rounded-md">
              Update Profile
            </button>
            <button type="button" class="bg-zinc-300 text-zinc-700 px-4 py-2 rounded-md">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
            
</main>
    </div>
    </>
  )
}
