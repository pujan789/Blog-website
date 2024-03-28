import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/profile.css";
import Navbar from "./components/Navbar"; // Update the import path according to your project structure
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";




const Profile = () => {
  const [user, setUser] = useState(null);
  const [showReload, setShowReload] = useState(false);

    const [cookies, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();


    useEffect(() => {
      const verifyCookie = async () => {
        console.log(cookies.token)
        if (!cookies.token) {
          console.log("cookies not found")
          navigate("/login");
        } else {
          try {
            console.log("fetching profile")
            axios.defaults.withXSRFToken = true
            axios.defaults.withCredentials = true
            res.setHeader('Access-Control-Allow-Credentials',true);



            const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/profile`, {
              withCredentials: true,
              headers: {
                  'Access-Control-Allow-Origin': '*', 
                  'Content-Type': 'application/json'
              }
            });
            if (data.user) {
              setUser(data.user);
              console.log("set user properties in user")
            } else {
              console.log("data not fetched and removed cookie")
              // removeCookie("token");
              navigate("/login");
            }
          } catch (error) {
            console.error("Verification failed", error);
            // removeCookie("token", { path: "/" });
            navigate("/login");
          }
        }
      };
      verifyCookie();
    });

  const reloadAvatar = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND}/avatar`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        avatar: data.avatar,
      }));
      window.location.reload(); 
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  function convertToPlain(html) {
    var tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "230px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <div
                      className="avatar-container"
                      onMouseEnter={() => setShowReload(true)}
                      onMouseLeave={() => setShowReload(false)}
                    >
                      <img
                        src={user?.avatar}
                        alt="User Avatar"
                        className="img-fluid img-thumbnail mb-2"
                        style={{ width: "150px", zIndex: 1 }}
                      />
                      {showReload && (
                        <button
                          type="button"
                          className="btn btn-light reload-btn"
                          onClick={reloadAvatar}
                        >
                          Reload
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      data-mdb-ripple-color="dark"
                      style={{ zIndex: 1, marginTop: "55px" }}
                      onClick={() => navigate("/create")}
                    >
                      Start writing
                    </button>
                  </div>
                  <div
                    className="ms-3"
                    style={{ marginTop: "130px", background: "#000" }}
                  >
                    <h5 style={{ background: "#000" }}>{user?.username}</h5>
                    <p style={{ background: "#000" }}>{user?.email}</p>
                  </div>
                </div>
                <div
                  className="pt-4 px-4 pb-1 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">{user.posts?.length || 0}</p>
                      <p className="small text-muted mb-0">Posts</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3 text-black">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent posts</p>
                  </div>
                  <ul className="timeline">
                    {user.posts &&
                      user.posts.map((post, index) => (
                        <li key={post._id}>
                          <Link to={`/post/${post._id}`} className="blog-link">
                            <div className="timeline-body">
                              <div className="timeline-header">
                                <span className="userimage">
                                  <img src={user.avatar} alt="profile" />
                                </span>
                                <span className="username">
                                  <Link to="/">{user.username}</Link>
                                </span>
                              </div>

                              <div className="timeline-title">
                                <h5>
                                  {post.postTitle.length >= 100
                                    ? post.postTitle.slice(0, 100) + "..."
                                    : post.postTitle}
                                </h5>
                              </div>
                              <div
                                className="timeline-content"
                                style={{ background: "#e0e0e0" }}
                              >
                                <p>
                                  {convertToPlain(post.postBody).length >= 100
                                    ? convertToPlain(post.postBody).slice(
                                        0,
                                        115
                                      ) + "..."
                                    : convertToPlain(post.postBody)}
                                </p>
                              </div>
                              <div className="timeline-likes">
                                <div className="stats-right">
                                  <span className="stats-text">
                                    {post.comments.length} comments
                                  </span>
                                </div>
                                <div className="stats">
                                  <span className="fa-stack fa-fw stats-icon">
                                    <i className="fa fa-circle fa-stack-2x text-danger"></i>
                                    <i className="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                                  </span>
                                  <span className="fa-stack fa-fw stats-icon">
                                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                    <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                                  </span>
                                  <span className="stats-total">
                                    {post.likes.length} likes
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;