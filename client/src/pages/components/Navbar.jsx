import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({isAuthenticated}) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand head-title" href="/">
            BlogFluent
          </a>
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About us
                </a>
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
