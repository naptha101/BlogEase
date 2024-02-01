import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
const ProfilePost = ({post}) => {
  console.log(post);
  return (
    <div className="container mt-5" style={{ marginLeft: "5%", marginRight: "5%" }}>
      <div className="card mb-4">
        <img
          src={"http://localhost:5000/images/"+post.photo}
        
          className="card-img-top"
          alt="Post Image"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title text-xl font-bold mb-2">
       {post.title}
          </h5>
          <div className="d-flex justify-content-between mb-2">
            <p>{"@"+post.username}</p>
            <div className="d-flex">
              <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
              <p className="ml-2">{new Date(post.updatedAt).toString().slice(16,24)}</p>
            </div>
          </div>
          <p className="text-sm">
           {post.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePost