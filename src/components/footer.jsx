import React from "react";

const Footer = () => {
  return (
    <>
      <div className="mt-8 w-100 bg-black px-4 md:px-5 py-4 ">
        <div className="container-fluid">
          <div className="row flex-md-row flex-column">
            <div className="col-md-4">
              <div className="text-white">
                <h5>Featured Blogs</h5>
                <p>Most viewed</p>
                <p>Readers Choice</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-white">
                <h5>Forum</h5>
                <p>Support</p>
                <p>Recent Posts</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-white">
                <h5>Privacy Policy</h5>
                <p>About Us</p>
                <p>Terms & Conditions</p>
                <p>Terms of Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="py-2 pb-2 text-center text-white bg-black">
        All rights reserved @Blog Market 2023
      </p>
    </>
  );
};

export default Footer;
