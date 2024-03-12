import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include the Quill CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/AuthNavbar';

const CreateBlog = () => {
  const [postTitle, setTitle] = useState('');
  const [postBody, setContent] = useState('');
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],

      
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
  
      ['link', 'image', 'video']                         // link and image, video
    ],
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background', 'align', 'direction', 'code-block'
  ];
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your API endpoint for creating a post is /api/posts
      await axios.post('http://localhost:4000/blog', { postTitle, postBody }, { withCredentials: true });
      navigate('/profile');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titleInput" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            value={postTitle}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contentInput" className="form-label">Content</label>
          <ReactQuill
  theme="snow"
  value={postBody}
  onChange={setContent}
  modules={modules}
  formats={formats}
/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  );
};

export default CreateBlog;
