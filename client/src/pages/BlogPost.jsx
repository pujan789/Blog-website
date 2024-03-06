import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/blogPage.css"
import DOMPurify from 'dompurify';
import LikeButton from './components/LikeButton'; // A button component for liking posts
import CommentSection from './components/CommentSection'; // A component for displaying and submitting comments




const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:4000/posts/${post._id}/like`, {}, { withCredentials: true });
      setPost(prevState => ({
        ...prevState,
        likes: [...prevState.likes, /* New like data */]
      }));
      
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleCommentSubmit = async (commentText) => {

    try {
      if  (!commentText || commentText === "") return;
      const response = await axios.post(`http://localhost:4000/posts/${post._id}/comment`, { text: commentText }, { withCredentials: true });
      setPost(prevState => ({
        ...prevState,
        comments: [...prevState.comments, /* New comment data */]
      }));

    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };


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

  const sanitizedContent = DOMPurify.sanitize(post.postBody);


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
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
      <LikeButton isLiked={post.likes.includes(post.user._id)} onLike={handleLike} />
      <CommentSection comments={post.comments} onCommentSubmit={handleCommentSubmit} />
          </>
  );
};

export default BlogPost;
