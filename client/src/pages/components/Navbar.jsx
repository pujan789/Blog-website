import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';



const Navbar = ({isAuthenticated}) => {
  const navigate = useNavigate();
  const [cookies, setCookie ,removeCookie] = useCookies(["token"]);
  const [isAuth, setAuth] = useState(false)
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const verifyCookie = async () => {
      console.log(cookies.token)
      if (!cookies.token) {
        {}
      } else {
        try {
          axios.defaults.withCredentials = true
          const { data } = await axios.get(import.meta.env.VITE_APP_BACKEND +  "/profile", {
              headers: {
                'Access-Control-Allow-Origin': 'https://blog-website-backend-gc3f.onrender.com', 
                'Content-Type': 'application/json'
            },
            withCredentials:true
          });
          if (data.user) {
            setAuth(true);}
        } catch (error) {
          console.error("Verification failed", error);
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);




  const Logout = () => {
    // removeCookie("token", { path: "/" });
    setCookie("token", null)
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand head-title" to="/">
            BlogFluent
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
          {(!isAuth) ?
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="get-started btn btn-outline-dark"
                  onClick={() => {navigate("/read")}}
                >
                  Read Blogs
                </button>
              </li>
            </ul>
            : 
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/create"
                >
                  Write
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/read">
                  Read
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="get-started btn btn-outline-dark"
                  onClick={Logout}
                >
                  Logout
                </button>
              </li>
            </ul>

          }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
