import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Available from './BrowserBooks/Available';
import Unavailable from './BrowserBooks/Unavailable';
import Books from './BrowserBooks/Books';
import Editprofile from './Profile/EditProfile';

export default function Home() {
  return (
      <Routes>
        <Route path="/ad_av_books" element={<Available />} />
        <Route path="/ad_un_books" element={<Unavailable />} />
        <Route path="/ad_all_books" element={<Books />} />
        <Route path = "/ad_edit_profile" element = {<Editprofile />} />
      </Routes>
  );
}
