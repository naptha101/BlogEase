import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdDelete } from 'react-icons/md';
import { userContext } from '../userContext/userContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const Com = (c) => {
  //console.log(c.c);
  const {user}=useContext(userContext);
  const delcom=async ()=>{
try{
const res=axios.delete('http://localhost:5000/api/comments/'+c.c._id,{withCredentials:true});

window.location.reload(true)
}catch(err){
console.log(err);
}
  }
  return (
    <>
    <div>
    <div className="p-2 rounded-lg m-2" style={{backgroundColor:"rgb(54, 58, 61)"}}>
    <div className="d-flex justify-content-between align-items-center">
      <h3 className="font-weight-bold text-light">@{c.c.author}</h3>
      <div className="d-flex justify-content-center align-items-center space-x-4">
      <p className='text-light'>{new Date(c.c.updatedAt).toString().slice(0,15)}</p>
              <p className="ml-2 text-light">{new Date(c.c.updatedAt).toString().slice(16,24)}</p>
            {c.c.userId===user.id&& <p className="cursor-pointer" onClick={delcom}><MdDelete style={{color:"white"}} /></p>}
      </div>
    </div>
    <p className='text-light'>{c.c.comment}</p>
  </div>
  
  </div>
  </>
  );
};

export default Com