import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/App.css";
import "../styles/register.css";
import registerImage from "../photos/register.jpg";
import Navbar from "./components/Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
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
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}/signup`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
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
      username: "",
    });
  };

  return (
    <>
      <div className="landing-page">
        <Navbar />
        <main className="d-flex align-items-center min-vh-100 py-md-0">
          <div className="container">
            <div className="card login-card">
              <div className="row no-gutters">
                <div className="col-md-5">
                  <img
                    src={registerImage}
                    alt="Register"
                    className="login-card-img"
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <p className="login-card-description">
                      Register new account
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={handleOnChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="username" className="sr-only">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="form-control"
                          placeholder="Username"
                          value={username}
                          onChange={handleOnChange}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                          placeholder="***********"
                          value={password}
                          onChange={handleOnChange}
                        />
                      </div>
                      <input
                        name="register"
                        id="register"
                        className="btn btn-block login-btn "
                        type="submit"
                        value="Register"
                      />
                    </form>
                    <p className="login-card-footer-text">
                      Already have an account?{" "}
                      <a href="/login" className="text-reset">
                        Login here
                      </a>
                    </p>
                    <nav className="login-card-footer-nav">
                      <a href="#!">Terms of use.</a>
                      <a href="#!">Privacy policy</a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </main>
      </div>
    </>
  );
};

export default Signup;