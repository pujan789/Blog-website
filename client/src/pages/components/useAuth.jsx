// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const useAuth = () => {
  const [cookies, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      } else {
        try {
          const { data } = await axios.get(import.meta.env.VITE_APP_BACKEND + "/profile", {
            withCredentials: true
          });
          if (data.user) {
            setUser(data.user);
          } else {
            // removeCookie("token");
            navigate("/login");
          }
        } catch (error) {
          console.error("Verification failed", error);
          // removeCookie("token", { path: '/' });
          navigate("/login");
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return user;
};

export default useAuth;
