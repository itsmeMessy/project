import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SuperAdminNav from '../Navbar/SPadminNavbar';

function Books() {
  const [booksdata, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomBooks, setRandomBooks] = useState([]); 
  const [quote, setQuote] = useState('');
  const [name ,setName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URI}/view_all_books`, { withCredentials: true });
        if (res.data.valid) {
          setBooksData(res.data.data_value);
          if (res.data.data_value.length > 0) {
            const randomIndices = getRandomIndices(res.data.data_value, 10);
            const selectedBooks = randomIndices.map(index => res.data.data_value[index]);
            setRandomBooks(selectedBooks);
          }
        } else {
          setError('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchQuote()
    fetchName()
  }, []);

  const fetchName = async()=>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_URI}/user`, {withCredentials:true})
      if(res.data.valid){
        setName(res.data.name)
      }else{
        console.log(res.data.error)
      }
    }catch(error){
      console.log(error)
    }
  }
 
  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      if (response.status === 200) {
        setQuote(response.data.content);
      } else {
        console.error('Failed to fetch quote');
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };
  

  const getRandomIndices = (array, count) => {
    const shuffled = array.map((a, index) => ({ index, value: Math.random() }));
    shuffled.sort((a, b) => a.value - b.value);
    return shuffled.slice(0, count).map(item => item.index);
  };

  return (
    <>
      <div className='flex'>
    <SuperAdminNav />
        <main className='ml-60 flex-grow p-6'>
          <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 px-6 py-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <button className="bg-zinc-100 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 rounded-full px-3 py-2 flex items-center">
               {name}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="bg-gradient-to-r from-red-400 to-pink-600 p-6 rounded-lg text-white">
                <h2 className="text-xl mb-2">Today's Quote</h2>
                <p className="text-lg">
                  {quote}
                </p>
              </div>
              <div>
                <h2 className="text-xl bg-white p-6 rounded-t-lg dark:bg-zinc-800 dark:text-zinc-200">
                  News Rack
                </h2>
                <div className="flex overflow-x-scroll py-2 bg-white border-t-4 border-r-4 border-l-4 border-zinc-200 rounded-b-lg dark:bg-zinc-800 dark:border-zinc-700">
                  {randomBooks.map(book => (
                    <div key={book.books_id} className="min-w-[120px] p-2">
                      <img
                        src={`data:image/jpeg;base64,${book.photo}`}
                        alt={book.book}
                        style={{ width: '120px', height: 'auto' }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
             
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl">Recommended for You</h3>
                <button className="text-blue-500"></button>
              </div>
              <div className="grid grid-cols-6 gap-4 mb-8">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : (
                  booksdata.map(book => (
                    <div key={book.books_id} className="bg-white p-4 rounded-lg shadow dark:bg-zinc-800 dark:text-zinc-200">
                      <img src={`data:image/jpeg;base64,${book.photo}`} alt={book.book} className="w-full mb-4" />
                      <h4 className="text-lg">{book.book}</h4>
                      <p style={{ color: book.available ? 'green' : 'red' }}>
                        {book.available ? 'Available' : 'Not Available'}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Books;
