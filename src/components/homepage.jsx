import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePosts = ({ post }) => {
  return (
    <div className="container mt-5 p-0 bg-dark rounded"  style={{ marginLeft: "5%", marginRight: "5%" }}>
      <div className="card mb-4 bg-dark" >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={"http://localhost:5000/images/" + post.photo}
              className="card-img rounded p-1"
              alt="Post Image"
              style={{ height: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-xl font-bold mb-2 text-light">
                {post.title}
              </h5>
              <div className="d-flex justify-content-between mb-2">
                <p className="text-light">{"@" + post.username}</p>
                <div className="d-flex">
                  <p className="text-light">{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                  <p className="ml-2 text-light">{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                </div>
              </div>
              <p className="text-sm text-light">
                {post.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePosts;
