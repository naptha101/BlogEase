import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { MdKeyboardVoice } from "react-icons/md";
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./menu.jsx";
import { userContext } from "../userContext/userContext.jsx";

const Navbar = () => {GFS
  const path = useLocation().pathname;
  const { user } = useContext(userContext);
  const [menu1, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const showMenu = () => {
    setMenu(!menu1);
  };

  const search1 = () => {
    navigate(prompt ? `?search=${prompt}` : '/');
  };
const [sear,setser]=useState("red")
const [visiblity,setvis]=useState("hidden")
  const handleVoiceSearch = () => {
setser("white")
setvis("visible");
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

      recognition.lang = 'en-US';

      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript); // Update the search prompt with recognized text
        setser("red")
        setvis("hidden");
        //search1(); // Call the search function after setting the prompt
      };

      recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
      };

      recognition.onstart = function() {
        console.log('Listening...');
      };

      recognition.onend = function() {
        console.log('Speech recognition ended.');
      };

      recognition.start(); // Start speech recognition
    } else {
      console.error('Speech recognition not supported in this browser.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-between px-3 py-4 bg-dark">
      <h1 className="text-lg md:text-xl font-extrabold text-danger"><Link to="/">Blog Ease</Link></h1>
      {path === "/" && (
        <div className="d-flex justify-content-center align-items-center space-x-2">
          <p onClick={handleVoiceSearch}><MdKeyboardVoice className="cursor-pointer" style={{ color: sear }} /></p>
          <p onClick={search1}><BsSearch className="cursor-pointer" style={{ color: 'red' }} /></p>
          <input className="outline-none px-2 cursor-pointer rounded" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Search a post" type="text" />
       <h2 style={{visibility:visiblity,color:"red"}}>Listening....</h2>
        </div>
      )}
      <div className="d-none d-md-flex align-items-center justify-content-between space-x-2 md:space-x-4">
        {user ? (
          <>
            <Link to="/write" className="text-decoration-none text-dark"><h3 className="text-danger m-2 font-weight-bold" >Write</h3></Link>
            <h3 onClick={showMenu}><FaBars style={{ color: 'red' }}></FaBars></h3>
            {menu1 && <Menu />}
          </>
        ) : (
          <div className="d-flex  justify-content-between ">
            <Link to="/login" className="text-decoration-none text-dark relative "><h3 className="text-danger m-2 font-weight-bold" >Login</h3></Link>
            <Link to="/register" className="text-decoration-none text-dark "> <h3 className="text-danger m-2 font-weight-bold" >Register</h3></Link>
          </div>
        )}
      </div>
      <div onClick={showMenu} className="d-md-none relative">
        <p><FaBars /></p>
        {menu1 && <Menu />}
      </div>
    </div>
  );
}

export default Navbar;
