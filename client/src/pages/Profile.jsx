import {useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/profile.css"
import DOMPurify from 'dompurify';


const Profile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      } else {
        try {
          const { data } = await axios.get("http://localhost:4000/profile", {
            withCredentials: true
          });
          if (data.user) {
            setUser(data.user);
            toast(`Hello ${data.user.username}`, {
              position: "top-right",
            });
          } else {
            removeCookie("token");
            navigate("/login");
          }
        } catch (error) {
          console.error("Verification failed", error);
          removeCookie("token", { path: '/' });
          navigate("/login");
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token", { path: '/' });
    navigate("/login");
  };
  
  if (!user) {
    // If user is null (data not yet fetched), return loading message or spinner
    return <div>Loading...</div>;
  }
return (
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '230px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px'  }}>
                    <img
                      src={user?.avatar}
                      alt="Generic placeholder"
                      className="img-fluid img-thumbnail  mb-2"
                      style={{ width: '150px', zIndex: 1 }}
                    />
                    <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1, marginTop:"55px" }}>
                      Start writing
                    </button>
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px', background:"#000" }}>
                    <h5 style={{background:"#000"}}>{user?.username}</h5>
                    <p style={{background:"#000"}} >{user?.email}</p>
                  </div>
                </div>
                <div className="pt-4 px-4 pb-1 text-black" style={{ backgroundColor: '#f8f9fa' }}>
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
                    {/* <p className="mb-0"><a href="/#" className="text-muted">Show all</a></p> */}
                  </div>
                  <ul className="timeline">
                  {user.posts && user.posts.map((post, index) => (
                    <li key={post._id}>
                    <Link to={`/post/${post._id}`} className="blog-link">
                      <div className="timeline-body">
                        <div className="timeline-header">
                          <span className="userimage"><img src={user.avatar} alt="profile"/></span>
                          <span className="username"><a href="/#">{user.username}</a></span>
                        </div>
                        
                        
                        <div className="timeline-title">
                          <h5>{post.postTitle.length >= 100 ? post.postTitle.slice(0,100) + "..." : post.postTitle}</h5>
                        </div>
                        <div className="timeline-content" style={{background: "#e0e0e0"}}>
                          <p>{post.postBody.length >= 100 ? post.postBody.slice(0,100) + "..." : post.postBody}</p>
                        </div>
                        <div class="timeline-likes">
                                 <div class="stats-right">
                                    <span class="stats-text">{post.comments.length} comments</span>
                                 </div>
                                 <div class="stats">
                                    <span class="fa-stack fa-fw stats-icon">
                                    <i class="fa fa-circle fa-stack-2x text-danger"></i>
                                    <i class="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                                    </span>
                                    <span class="fa-stack fa-fw stats-icon">
                                    <i class="fa fa-circle fa-stack-2x text-primary"></i>
                                    <i class="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <span class="stats-total">{post.likes.length} likes</span>
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
  );
}

  

export default Profile;