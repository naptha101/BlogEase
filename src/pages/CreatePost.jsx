import  { useContext, useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { userContext } from '../userContext/userContext';
import axios from 'axios';
const CreatePost = () => {

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
const { user } = useContext(userContext);
const [cat,setcat]=useState("");
const [cats,setcats]=useState([]);
const[title,setitle]=useState("");
const[desc,setdisc]=useState("");
const[file,setfile]=useState(null);
//.console.log(user)
//console.log(Date.now());
const submithandle=async (e)=>{
 e.preventDefault();

const post={title,desc,username:user.username,userId:user.id,categorie:cats}
console.log(post);
if(file){
  const data=new FormData();
  const filename=Date.now()+file.name;
  data.append("img",filename);
  data.append("file",file);
  
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
const res=await axios.post("http://localhost:5000/api/posts/create",post,{withCredentials:true})
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
  <h1 className='font-bold md:text-2xl text-xl text-light'>Create a post</h1>
  <form  onSubmit={submithandle} className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
    <input type="text" onChange={(e)=>{setitle(e.target.value)}} placeholder="Enter post title" className='form-control px-4 py-2' />
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
      <p>{c}</p>
      <p onClick={() => deleteTag(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'>X</p>
    </div>
  </div>
))}

      
    </div>
    <textarea rows={15} cols={30} onChange={(e)=>{setdisc(e.target.value)}} className='form-control px-4 py-2' placeholder="Enter post description"></textarea>
<input type='submit' value="submit" className='border-5 black'></input>
  </form>
</div>

    
    <Footer></Footer>
    </>
  )
}

export default CreatePost