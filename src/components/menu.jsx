import React, { useContext } from 'react'
import { userContext } from '../userContext/userContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const menu= () => {
  // Replace with your actual user authentication logic
const {user}=useContext(userContext)
const {setUser}=useContext(userContext);
const navigate=useNavigate();
const handleLogout=async ()=>{
  try{
const res=await axios.get("http://localhost:5000/api/auth/logout",{withCredentials:true});
setUser(null);
console.log(user);
navigate('/login')

  }catch(err){
    console.log(err);
  }
}
console.log(user.id);
    return (
      <div className="z-10 bg-dark w-200px flex flex-col items-start absolute top-12 right-6 rounded-md p-4 space-y-2">
        {user && (
          <>
            <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={'/profile/'+user.id}>Profile</Link></h3>
            <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to='/write'>write</Link></h3>
            <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={'/myblogs/'+user.id}>myblogs</Link></h3>
            <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>
          </>
        )}
        {!user && (
          <>
            <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to='/login'>Login</Link></h3>
            <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to='/register'>Register</Link></h3>
          </>
        )}
      </div>
    );
    
}

export default menu;