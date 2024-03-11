import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include the Quill CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your API endpoint for creating a post is /api/posts
      await axios.post('http://localhost:4000/api/posts', { title, content }, { withCredentials: true });
      navigate('/'); // Redirect to home or blog list page after posting
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titleInput" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contentInput" className="form-label">Content</label>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
