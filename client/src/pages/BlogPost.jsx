import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/blogPage.css";
import DOMPurify from "dompurify";
import LikeButton from "./components/LikeButton"; // A button component for liking posts
import CommentSection from "./components/CommentSection"; // A component for displaying and submitting comments
import '@fortawesome/fontawesome-free/css/all.min.css'; // If using npm
import { useParams } from "react-router-dom";
import Navbar from './components/Navbar'; // Update the import path according to your project structure
import useAuth from './components/useAuth';


const BlogPost = () => {
  // const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);


  const user = useAuth(); // This will redirect to login if not authenticated



  const handleLike = async () => {
    const alreadyLiked = post.likes.includes(user._id);

    try {
      const { data } = await axios.get(import.meta.env.VITE_APP_BACKEND + "/profile", {
        withCredentials: true
      });
        await axios.put(
          `${import.meta.env.VITE_APP_BACKEND}/posts/${post._id}/like`,
          {},
          { withCredentials: true }
        );
        setPost((prevState) => ({
          ...prevState,
          likes: alreadyLiked
            ? prevState.likes.filter((likeUserId) => likeUserId !== user._id)
            : [...prevState.likes, user._id],
        }));

    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleCommentSubmit = async (commentText) => {
    try {
      if (!commentText || commentText === "") return;
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}/posts/${post._id}/comment`,
        { text: commentText },
        { withCredentials: true }
      );
      setPost((prevState) => ({
        ...prevState,
        comments: [...prevState.comments /* New comment data */],
      }));
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND}/posts/${postId}`
        );
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
    <Navbar/>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-9 mx-auto">
            <h1 className="display-4 mb-5 title">{post.postTitle}</h1>

            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}/>

            <hr className="my-5"/>

            <div className="d-flex justify-content-between user-interaction-section">
              <LikeButton
                isLiked={post.likes.includes(user?._id)}
                onLike={handleLike}
              />

<div>

            <div className="user-interaction-section">
              <div className="user-info">
                <img
                  src={user?.avatar}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <div className="user-name-date">
                  <div className="user-name">{post.user.name}</div>
                  <div className="post-date">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>

              <div className="like-comment-count">
                <span className="icon">
                  <i className="far fa-thumbs-up"></i>
                  <span className="icon-text">{post.likes.length}</span>
                </span>
                <span className="icon">
                  <i className="far fa-comment-alt"></i>
                  <span className="icon-text">{post.comments.length}</span>
                </span>
              </div>
            </div>
            </div>
            </div>

            <div className="mt-1">
              <CommentSection
                comments={post.comments}
                onCommentSubmit={handleCommentSubmit}
              />
                          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;