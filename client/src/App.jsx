import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import BlogPost from "./pages/BlogPost"; // Import your BlogPost component
import CreateBlog from "./pages/CreateBlog";
import BlogFeed from "./pages/BlogFeed"; // Update the import path according to your project structure
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:postId" element={<BlogPost />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/read" element={<BlogFeed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
