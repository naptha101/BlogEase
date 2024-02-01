
import  { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../userContext/userContext';
const EditPage = () => {

    const addCategory = () => {
        console.log(cat);
        let updatedCats = [...cats];
        if(cat=="")return
        updatedCats.push(cat);
        setcat("");
        setcats(updatedCats); // Fix the assignment here
      }
      
    const deleteTag=(i)=>{
      let updatedCats = [...cats];
      updatedCats.splice(i);
      setcats(updatedCats);
    
    }
    const postId=useParams().id;
    const [cat,setcat]=useState("");
    const [cats,setcats]=useState([]);
    const[title,setitle]=useState("");
const[desc,setdisc]=useState("");
const[file,setfile]=useState(null);

const { user } = useContext(userContext);
const fetchpost=async ()=>{
  try{
    
const res=await axios.get('http://localhost:5000/api/posts/'+postId);
setitle(res.data.title);
setdisc(res.data.desc);
setcats(res.data.categorie);
setfile(res.data.photo);
}catch(err){
  console.log(err);
}

}
useEffect(()=>{
fetchpost();

},[postId])
const editt=async (e)=>{
  e.preventDefault();

const post={title,desc,username:user.username,userId:user.id,categorie:cats}
if(file){
  const data=new FormData();
  const filename=Date.now()+file.name;
  data.append("img",filename);
  data.append("file",file);
  console.log(file.img);
  post.photo=filename;
  try{
const res=await axios.post("http://localhost:5000/api/upload",data,{withCredentials:true});
console.log(res.data);
  }catch(err){
console.log(err);
  }
}
try{
  //console.log(user);
const res=await axios.put("http://localhost:5000/api/posts/"+postId,post,{withCredentials:true})
console.log(res);
}
catch(err){
  console.log(err);
}
}


  return (
    <>
 <Navbar></Navbar>

<div className='container px-6 md:px-8 mt-8'>
<h1 className='font-bold md:text-2xl text-xl text-light'>Edit this Post</h1>
<form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
<input type="text" onChange={(e)=>{setitle(e.target.value)}} value={title} placeholder="Enter post title" className='form-control px-4 py-2' />
<input type="file" onChange={(e)=>{setfile(e.target.files[0])}} className='form-control px-4' />
<div className='flex flex-col'>
  <div className='flex items-center space-x-4 md:space-x-8'>
    <input onChange={(e)=>{setcat(e.target.value)}} className='form-control px-4' placeholder='Enter post category' type="text" />
    
<button type="button" onClick={addCategory}>Add</button>

  </div>
  {/* categories */}


  {cats?.map((c, i) => (
<div className='flex px-4 mt-3' key={i}>
<div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
  <p >{c}</p>
  <p onClick={() => deleteTag(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'>X</p>
</div>
</div>
))}

  
</div>
<textarea rows={15} cols={30} className='form-control px-4 py-2'onChange={(e)=>{setdisc(e.target.value)}} value={desc} placeholder="Enter post description"></textarea>
<button onClick={editt} className='btn btn-black border-5 ' type="submit">Edit</button>
</form>
</div>


<Footer></Footer>
</>
  )
}

export default EditPage