import React, { useContext, useEffect, useRef, useState } from 'react';

import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/footer';
import com from '../components/Com';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../userContext/userContext';
import Com from '../components/Com';
const PostDetail = () => {
  const {user}=useContext(userContext);
  const postid=useParams().id;
  //console.log(postid);
  const [post,setpost]=useState({});
const fetchpost=async ()=>{
  try{
    const res=await axios.get("http://localhost:5000/api/posts/"+postid)
   setpost(res.data);
setcategorie(res.data.categorie)
  }catch(err){
console.log(err);
  }
}
const [categorie,setcategorie]=useState([]);
const navigate=useNavigate();
useEffect(()=>{
  fetchcomment();
fetchpost();
//console.log(user.id+" "+post.userId);
},[postid])
const deletepost= async ()=>{
  try{
const res=await axios.delete('http://localhost:5000/api/posts/'+postid,{withCredentials:true});
console.log(res);
navigate('/');
  }catch(err){
console.log(err);
  }
}
const [coms,setcom]=useState([]);
//console.log("http://localhost:5000/images/"+post.photo+post.photo);
const fetchcomment=async ()=>{
try{
const res=await axios.get('http://localhost:5000/api/comments/post/'+postid);
setcom(res.data);
}catch(err){
console.log(err);
}
}
const myRef=useRef(null);
const [comment,setcomment]=useState("");
const create=async (e)=>{
e.preventDefault();
try{
const res=axios.post("http://localhost:5000/api/comments/create",{comment:comment,
author:user.username,postId:post._id,
userId:user.id},{withCredentials:true});
fetchcomment()
fetchcomment()
myRef.current.value="";

}catch(err){
console.log(err);
}
}

  return (
    <div>
      <Navbar />
      <div className="container mt-5 bg-dark rounded">
        <div className="row bg-dark rounded">
          <div className="col-md-8 mx-auto bg-dark rounded">
            <div className="card bg-dark">
              <div className="card-body">
                <h1 className="card-title text-2xl font-bold text-black md:text-3xl text-light text-light">
               <h1 className='text-light'>{post.title}</h1>  
                 
                 {user?.id===post?.userId&&<div className="d-flex items-center justify-content-center space-x-2">
                 
                    <p className="cursor-pointer text-light" onClick={()=>{navigate('/edit/'+postid)}}><BiEdit /></p>
                    <p className="cursor-pointer text-light" onClick={deletepost}><MdDelete /></p>
                  </div>}
                </h1>
                <div className="d-flex items-center justify-content-between mt-2 md:mt-4">
                  <p className='text-light'>@{post.username}</p>
                  <div className="d-flex space-x-2">
                  <p className='text-light'>{new Date(post.updatedAt).toString().slice(0,15)}</p>
              <p className="ml-2 text-ligth">{new Date(post.updatedAt).toString().slice(16,24)}</p>
                  </div>
                </div>
                <img
                  src={"http://localhost:5000/images/"+post.photo}
                  className="w-100 mx-auto mt-8"
                  alt="Post Image"
                />
                <p className='mx-auto mt-8 text-light'>{post.desc}</p>
                <div className="d-flex align-items-center mt-4 font-weight-bold">
  <p className="m-0 text-light">Categories:</p>
  <div className="d-flex justify-content-center align-items-center ms-2">
    {categorie.map((e)=>(
     <div className="bg-light rounded p-2 text-dark">{e}</div>
    ))}
  
    
  
  </div>
</div>
<div className="d-flex flex-column mt-4">
  <h3 className="mt-6 mb-4 font-weight-bold text-light">Comments:</h3> {/* comment */}
  {
    coms.map((c)=>(
 
      
<Com key={c._id} c={c}></Com>

    ))
}
</div>

<div className="d-flex flex-column mt-4 flex-md-row">
  <input
  onChange={(e)=>{setcomment(e.target.value)}}
    type="text"
    ref={myRef}
    placeholder="Write a comment"
    className="form-control md:w-75 outline-none py-2 px-4 mt-4 md:mt-0"
  />
  <button
  onClick={create}
  id='comment'
    className="btn btn-dark text-sm text-white px-2 py-2 md:w-25 mt-4 md:mt-0"
  >
    Add Comment
  </button>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetail;
