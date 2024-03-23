import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Navbar from './components/Navbar'; // Update the import path according to your project structure
import { useNavigate } from "react-router-dom";
import useAuth from './components/useAuth';

const CreateBlog = () => {
  const [postTitle, setTitle] = useState('');
  const [postBody, setContent] = useState('');
  const [postImage, setPostImage] = useState(null); // New state for image
  const [imagePreview, setImagePreview] = useState(''); // New state for image preview
  const navigate = useNavigate();
  useAuth();

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


  // Image selection handler
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPostImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData and append data
    const formData = new FormData();
    formData.append('postTitle', postTitle);
    formData.append('postBody', postBody);
    if (postImage) {
      formData.append('image', postImage); // Append image file
    }

    try {
      // Submit FormData
      await axios.post(import.meta.env.VITE_APP_BACKEND +'/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      navigate('/profile');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="container mt-5">
        <h2 className=' fw-bold mb-4'>Create a New Blog Post</h2>
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
          <div className="mb-3">
            <label htmlFor="imageInput" className="form-label">Preview Image</label>
            <input
              type="file"
              className="form-control"
              id="imageInput"
              onChange={handleImageChange}
              accept="image/*"
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" style={{ maxWidth: '200px' }} />}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
