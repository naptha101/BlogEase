import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Register = () => {
  const [username,setuser]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
 const [error,sererror]=useState("");
const navigate=useNavigate();
 const handleform = async (e) => {
  e.preventDefault(); 

  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", {
      username,
      email,
      password
    });
setuser(response.data.username);
setuser(response.data.email);
setuser(response.data.password);
navigate("/login");
    console.log(response.data); // Log the response data
    // You can add additional logic here, such as redirecting the user or showing a success message.
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
    sererror(true);
    // Log any errors, and handle them accordingly
  }
};


  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <h1 className="navbar-brand"><Link to="/" >Blog Spot</Link></h1>
        <div className="collapse navbar-collapse"></div></div>
        <Link to="/login" className="nav-link font-weight-bold">Login</Link>
        </nav>
    <div>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-xl font-bold text-left">
                  Register for an account
                </h1>
                <form onSubmit={handleform}>
                <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e)=>{setemail(e.target.value)}}
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                     onChange={(e)=>{setuser(e.target.value)}}
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
                    className="btn btn-primary w-100 py-3 text-lg font-bold"
                    type="submit"
                  >
                    Register
                  </button>
                </form>
                {error&&<h1 className='text-red-500 text-sm'>Something went wrong</h1>}
                <div>
                  <h5>Already Have a Account</h5>
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
