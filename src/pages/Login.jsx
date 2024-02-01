

import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../userContext/userContext";

const Login = () => {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
const[error,sererror]=useState(false);
const {setUser}=useContext(userContext);
const navigate=useNavigate();
const submihandle= async (e)=>{
  e.preventDefault(); 
try{
const response=await axios.post("http://localhost:5000/api/auth/login",{email,password},{withCredentials:true});
setemail(response.data.email);
setpassword(response.data.password);
setUser(response.data);
navigate("/");
}
catch (err) {
  console.error("Error:", err.response ? err.response.data : err.message);
  sererror(true);
  // Log any errors, and handle them accordingly
}
}
return (<>
   <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
      <Link to="/" ><h1 className="navbar-brand font-bold text-danger">Blog Ease</h1></Link>
        <div className="collapse navbar-collapse"></div></div>
        <Link to="/register" className="nav-link font-weight-bold font-weight-bold text-danger">Register</Link>
        </nav>
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card bg-dark">
            <div className="card-body">
              <h1 className="card-title text-xl font-bold text-left text-danger">
                Log in to your account
              </h1>
              <form onSubmit={submihandle}>
                <div className="mb-3">
                  <input
                  onChange={(e)=>{setemail(e.target.value)}}
                    className="form-control"
                    type="text"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="mb-3">
                  <input
                  onChange={(e)=>{setpassword(e.target.value)}}
                    className="form-control"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  className="btn btn-danger w-100 py-3 text-lg font-bold text-light"
                  type="submit"
                >
                  Login
                </button>
              </form>
<div>
<h5 className="text-danger">New to this website</h5>
<Link to="/register" className="text-danger cursor-pointer">Register</Link>
</div>
            </div>
          </div>
        </div>
      </div>
      


    </div>
    </>
  );
};

export default Login;
