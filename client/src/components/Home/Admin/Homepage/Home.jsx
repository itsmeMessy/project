import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Available from './BrowserBooks/Available';
import Unavailable from './BrowserBooks/Unavailable';
import Books from './BrowserBooks/Books';
import Editprofile from './Profile/EditProfile';
import BorrowedBooks from './AccountManagement/BorrowedBooks';
import Renewbooks from './AccountManagement/Renewbooks';
import Returnbooks from './AccountManagement/Returnbooks';

export default function Home() {
  return (
      <Routes>
        <Route path="/ad_av_books" element={<Available />} />
        <Route path="/ad_un_books" element={<Unavailable />} />
        <Route path="/ad_all_books" element={<Books />} />
        <Route path = "/ad_edit_profile" element = {<Editprofile />} />
        <Route path = "/ad_borrowed_books" element = {<BorrowedBooks />} />
        <Route path = "/ad_renew_books" element = {<Renewbooks />} />
        <Route path = "/ad_return_books" element = {<Returnbooks />} />
     
      </Routes>
  );
}
