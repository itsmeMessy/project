import React from 'react';
import AdminNav from '../../../Admin/Navbar/AdminNav';

function Books() {
  return (
    <>
    <div className='flex'>
    <AdminNav />
    <main className='ml-60 flex-gorw p-6'>
     <div class="min-h-screen bg-zinc-50 dark:bg-zinc-900 px-6 py-4">
  <div class="flex justify-between items-center py-4">
    <div class="flex items-center gap-4">
      <button class="bg-zinc-100 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 rounded-full px-3 py-2 flex items-center">
        Kenson 
      </button>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 py-4">
    <div class="bg-gradient-to-r from-red-400 to-pink-600 p-6 rounded-lg text-white">
      <h2 class="text-xl mb-2">Today's Quote</h2>
      <p class="text-lg">
        "There is more treasure in books than in all the pirates loot on Treasure Island." - Walt
        Disney
      </p>
    </div>
    <div>
      <h2 class="text-xl bg-white p-6 rounded-t-lg dark:bg-zinc-800 dark:text-zinc-200">
        News Rack
      </h2>
      <div class="flex overflow-x-scroll py-2 bg-white border-t-4 border-r-4 border-l-4 border-zinc-200 rounded-b-lg dark:bg-zinc-800 dark:border-zinc-700">
        <div class="min-w-[120px] p-2">
          <img src="https://placehold.co/100x100" alt="The Hindu" />
        </div>
        <div class="min-w-[120px] p-2">
          <img src="https://placehold.co/100x100" alt="Times of India" />
        </div>
        <div class="min-w-[120px] p-2">
          <img src="https://placehold.co/100x100" alt="Chronicle" />
        </div>
        <div class="min-w-[120px] p-2">
          <img src="https://placehold.co/100x100" alt="Hindustan Times" />
        </div>
      </div>
    </div>
  </div>

  <div>
    <h2 class="text-2xl font-semibold mb-4">Good Morning</h2>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl">Recommended for You</h3>
      <button class="text-blue-500">Show All</button>
    </div>
    <div class="grid grid-cols-6 gap-4 mb-8">
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="Don't Make Me Think" class="w-full mb-4" />
        <h4 class="text-lg">Don't Make Me Think</h4>
        <p>By Steve Krug</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img
          src="https://placehold.co/100x150"
          alt="The Design of Everyday Things"
          class="w-full mb-4"
        />
        <h4 class="text-lg">The Design of Everyday Things</h4>
        <p>By Don Norman</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="Sprint" class="w-full mb-4" />
        <h4 class="text-lg">Sprint</h4>
        <p>By Jake Knapp</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="Lean UX" class="w-full mb-4" />
        <h4 class="text-lg">Lean UX</h4>
        <p>By Jeff Gothelf</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="React" class="w-full mb-4" />
        <h4 class="text-lg">React</h4>
        <p>By Some Author</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="Rich Dad Poor Dad" class="w-full mb-4" />
        <h4 class="text-lg">Rich Dad Poor Dad</h4>
        <p>By Robert Kiyosaki</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
    </div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl">Recent Readings</h3>
      <button class="text-blue-500">Show All</button>
    </div>
    <div class="grid grid-cols-6 gap-4">
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="Don't Make Me Think" class="w-full mb-4" />
        <h4 class="text-lg">Don't Make Me Think</h4>
        <p>By Steve Krug</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img
          src="https://placehold.co/100x150"
          alt="The Design of Everyday Things"
          class="w-full mb-4"
        />
        <h4 class="text-lg">The Design of Everyday Things</h4>
        <p>By Don Norman</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="Sprint" class="w-full mb-4" />
        <h4 class="text-lg">Sprint</h4>
        <p>By Jake Knapp</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="Lean UX" class="w-full mb-4" />
        <h4 class="text-lg">Lean UX</h4>
        <p>By Jeff Gothelf</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="React" class="w-full mb-4" />
        <h4 class="text-lg">React</h4>
        <p>By Some Author</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
        <img src="https://placehold.co/100x150" alt="Rich Dad Poor Dad" class="w-full mb-4" />
        <h4 class="text-lg">Rich Dad Poor Dad</h4>
        <p>By Robert Kiyosaki</p>
        <p class="text-sm">Updated: 01 Mar, 2023</p>
        <p>4.5/5</p>
      </div>
    </div>
  </div>
</div>
</main>
</div>
    </>
  );
}

export default Books;
