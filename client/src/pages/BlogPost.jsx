import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/blogPage.css"


const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/${postId}`);
        setPost(response.data.post);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
            <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
          <div className="container-fluid">
            <a className="navbar-brand head-title" href="/#">BlogFluent</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/login">Write</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#">About us</a>
                </li>
                <li className="nav-item">
                  <button type="button" className="get-started btn btn-outline-dark">Read Blogs</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      <div className="blog-post-container">
        <h1>{post.postTitle}</h1>
        <p>{post.postBody}</p>
      </div>
    </>
  );
};

export default BlogPost;
