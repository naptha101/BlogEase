import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import ProfilePost from '../components/profilePost'
import { userContext } from '../userContext/userContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProfilePage = () => {
const {user}=useContext(userContext);
const {setUser}=useContext(userContext);
const [username,setuser]=useState("")
const [email,setemail]=useState("");
const [password,setpassword]=useState("");
const param=useParams()
const fetchuser=async()=>{
  try{
const res=await axios.get("http://localhost:5000/api/user/"+param.id,{withCredentials:true});
setuser(res.data.username);
setemail(res.data.email);

  }catch(err){
console.log(err);
  }
}
const updateu=async ()=>{
try{
const res=await axios.put("http://localhost:5000/api/user/"+param.id,{username:username,email:email,password:password},{withCredentials:true});
console.log(res);
}catch(err){
console.log(err);
}
}
const navigate=useNavigate();
const deleteu=async ()=>{
try{
  const res=await axios.delete("http://localhost:5000/api/user/"+param.id,{withCredentials:true});
setUser(null);
  console.log(user);
  console.log(res);
navigate('/');
}catch(err){
console.log(err);
}
}
const [p,setp]=useState([]);
const fetchpost=async ()=>{
try{
const res=await axios.get("http://localhost:5000/api/posts/userid/"+param.id,{withCredentials:true});
setp(res.data);
console.log(res.data);
}catch(err){
  console.log(err);
}
}
useEffect(()=>{
fetchuser()
fetchpost();
},[param.id])
  return (
    <>
 
    <Navbar></Navbar>
    <div className="container mt-8">
  <div className="row">
    <div className="col-md-8">
      <h1 className="text-xl font-bold mb-4">Your posts:</h1>
      {
        p.map((e)=>(
          <ProfilePost post={e} ></ProfilePost>
        ))
}
    </div>
    <div className="col-md-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <input className="form-control mb-2" onChange={(e)=>{setuser(e.target.value)}} value={username} placeholder="Your username" type="text" />
        <input className="form-control mb-2"  onChange={(e)=>{setemail(e.target.value)}}  value={email} placeholder="Your email" type="email" />
        <input className="form-control mb-2" onChange={(e)=>{setpassword(e.target.value)}} placeholder="Your password" type="password" />
      </div>
      <div className="d-flex align-items-center mt-4">
        <button className="btn btn-primary m-3" onClick={updateu}>Update</button>
        <button className="btn btn-primary m-3" onClick={deleteu}>Delete</button>
      </div>
    </div>
  </div>
</div>

    <Footer></Footer>
    </>
  )
}

export default ProfilePage