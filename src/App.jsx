import React from 'react'
import navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import PostDetail from './pages/postDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import EditPage from './pages/EditPage'
import ProfilePage from './pages/ProfilePage'
import { UserContextProvider } from './userContext/userContext'
import Myblogs from './pages/myblogs'

const App = () => {
  return (

   <UserContextProvider>
<Routes>
  <Route exact path='/' element={<Home></Home>}></Route>
  <Route exact path='/login' element={<Login></Login>}></Route>
  <Route exact path='/register' element={<Register></Register>}></Route>
  <Route exat path='/posts/post/:id' element={<PostDetail></PostDetail>}></Route>
  <Route exact path='/write' element={<CreatePost></CreatePost>}></Route>
  <Route exact path='/edit/:id' element={<EditPage></EditPage>}></Route>
 <Route exat path='/profile/:id' element={<ProfilePage></ProfilePage>}></Route> 
 <Route exat path='/myblogs/:id' element={<Myblogs></Myblogs>}></Route> 
</Routes> 

</UserContextProvider>  
   
  )
}

export default App