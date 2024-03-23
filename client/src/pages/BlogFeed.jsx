// pages/BlogFeed.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar'; // Update the import path according to your project structure
import useAuth from './components/useAuth'; // Update the import path according to your project structure

const BlogFeed = () => {
  const [posts, setPosts] = useState([]);
  // useAuth(); // for Protecting this page.

  function convertToPlain(html){
    var tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
}


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/posts`, {
          withCredentials: true
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
  <div className="row mt-5">
    {posts.map((post, index) => (
      <div key={index} className="col-md-6 mb-4 mt-2" >
        <div className="card">
        <img src={`${import.meta.env.VITE_APP_BACKEND}/${post.image}`} className="card-img-top" alt={post.postTitle} />

          <div className="card-body">  
            <h5 className="card-title fw-bold fs-5c mb-3">{post.postTitle}</h5>
            <p className="card-text" style={{fontWeight:"10", fontSize:"15px"}}>{convertToPlain(post.postBody).length >= 100 ? convertToPlain(post.postBody).slice(0,115) + "..." : convertToPlain(post.postBody)}</p>
            <a href={`/post/${post._id}`} className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>    </>
  );
};

export default BlogFeed;