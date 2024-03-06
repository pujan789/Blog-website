import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/App.css";
import "../styles/login.css";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from 'react';
import loginImage from "../photos/login.jpg"
import axios from "axios"


const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };



return (
      <div className="landing-page">
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
  
        <main className="d-flex align-items-center min-vh-100 py-md-0">
          <div className="container">
            <div className="card login-card">
              <div className="row no-gutters">
                <div className="col-md-5">
                  <img src={loginImage} alt="Login" className="login-card-img" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <p className="login-card-description">Log into your account</p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="text" name="email" id="email" className="form-control" placeholder="Enter your email" value={email} onChange={handleOnChange} />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" name="password" id="password" className="form-control" placeholder="Password" value={password} onChange={handleOnChange} />
                      </div>
                      <input name="login" id="login" className="btn btn-block login-btn" type="submit" value="Login" />
                    </form>
                    <p className="login-card-footer-text">Don't have an account? <a href="/signup" className="text-reset">Register here</a></p>
                  <nav className="login-card-footer-nav">
                    <a href="#!">Terms of use.</a>
                    <a href="#!">Privacy policy</a>
                  </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer/>
        </main>
      </div>
    );}
  
  
  export default Login;