import axios from "axios";
import Footer from "../components/footer";
import HomePosts from "../components/homepage";
import Navbar from "../components/navbar";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { userContext } from "../userContext/userContext";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
const [load,setload]=useState(true);
const { user } = useContext(userContext);
  console.log(search);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts/" + search,
        { withCredentials: true }
      ).then(setload(false));
      // console.log(res.data);
      setPosts(res.data);
    } catch (err) {
        setload(false)
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Navbar className="fixed-top" />

      <div style={{ paddingTop: "56px", paddingBottom: "56px" }}>
        {load&&<div style={{marginBottom:"20%"}}>
          <img src=""></img>
          </div>}
        {posts.length !== 0 ? (
          posts.map((e) => (
            <>
           <Link to={user?'/posts/post/'+e._id:"http://localhost:5173/login"}>
            <HomePosts key={e._id} post={e}></HomePosts> 
            </Link>
            </>
          ))
        ) : (
          <div style={{marginBottom:"20%"}}>
            <h3 className="text-center">NO Post to Show</h3>
          </div>
        )}
       
      </div>

      <Footer className="fixed-bottom" />
    </div>
  );
};

export default Home;
