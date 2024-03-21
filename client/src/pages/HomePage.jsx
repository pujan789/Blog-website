import React from 'react';
import image from '../photos/Blogging-Tips-removebg (1).png'; // Assuming you want to use this image
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/App.css";
import Navbar from './components/Navbar';
import { useNavigate } from "react-router-dom";




function HomePage() {

  const navigate = useNavigate();

  return (
    <div className="landing-page">
    <Navbar/>
      <header className="main-header text-center my-4 mt-5">
        <h1 className='headline'><strong>Discover, Learn, Stay Fluent</strong></h1>
        <p className="tagline">Uncover hidden gems, gain valuable knowledge, and <br/>stay connected with the evolving world through our blogs.</p>
      </header>

      <div className='text-center'>
        <button type="button" className="cta btn btn-dark mt-2 mb-3 " onClick={() => {navigate("/read");}}>Start reading</button>
      </div>

      <div className='text-center'>
        <img style={{width:550, height:375}} src={image} alt="Blogging Tips" />
      </div>
      
    </div>

  );
}

export default HomePage;
  