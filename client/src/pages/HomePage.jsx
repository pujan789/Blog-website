import React from 'react';
import image from '../Blogging-Tips-removebg (1).png'; // Assuming you want to use this image
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/App.css";


function HomePage() {
  return (
    <div className="landing-page">
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand head-title" href="/">BlogFluent</a>
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

      <header className="main-header text-center my-4 mt-5">
        <h1 className='headline'><strong>Discover, Learn, Stay Fluent</strong></h1>
        <p className="tagline">Uncover hidden gems, gain valuable knowledge, and <br/>stay connected with the evolving world through our blogs.</p>
      </header>

      <div className='text-center'>
        <button type="button" className="cta btn btn-dark mt-2 mb-3 ">Start reading</button>
      </div>

      <div className='text-center'>
        <img style={{width:550, height:375}} src={image} alt="Blogging Tips" />
      </div>
      
    </div>

  );
}

export default HomePage;
  