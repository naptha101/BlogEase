import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const userContext = createContext({});

export function UserContextProvider({ children }){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    getuser();
  },[])
const getuser=async()=>{
  try{
const res=await axios.get("http://localhost:5000/api/auth/refetch",{withCredentials:true});
if(res){
setUser(res.data)}
//console.log(res.data);
  }catch(err){
    console.log(err);
  }
}
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
