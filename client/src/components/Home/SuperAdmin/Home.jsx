import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Books from './BrowseBooks/Books'
import Editprofile from './Profile/Profile'
import Addadmin from './Profile/Addadmin'
import ViewUser from './Profile/ViewUser'

export default function Home() {
  return (
    <Routes>
      <Route path = '/allbooks' element = {<Books />} />
      <Route path = '/ad_edit_profile' element = {<Editprofile />} />
      <Route path = '/add_admin' element = {<Addadmin />} />
      <Route path = '/view_user' element = {<ViewUser />} />
    </Routes>
  )
}
