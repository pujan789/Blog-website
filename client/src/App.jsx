import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';



function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
