import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import BlogPost from './pages/BlogPost'; // Import your BlogPost component
import CreateBlog from './pages/CreateBlog'; 



function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:postId" element={<BlogPost />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
    </div>
  );
}

export default App;
