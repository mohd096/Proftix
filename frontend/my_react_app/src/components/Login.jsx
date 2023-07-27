import React, { useState, useEffect } from "react";
import axios from "axios";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom';
import ForgetPassword from "./ForgetPassword";
import PasswordRest from "./PasswordRest";
import {FcGoogle} from "react-icons/fc";

const LoginComponent = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      setUser(JSON.parse(token));
    } else {
      setIsAuth(false);
      setUser({});
    }
  }, [isAuth]);


  const handleLogin = async () => {
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login/", data);
      console.log("Login successful:", response.data);
      // Save token and user info to local storage
      localStorage.setItem("token", JSON.stringify(response.data));
      setIsAuth(true);
      setUser(response.data);
      // Redirect the user to the home page or perform other actions after login
      window.location.href = "/home";
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error, show an error message, or redirect to an error page
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user && user.access_token) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          // Save token and user info to local storage
          localStorage.setItem('token', JSON.stringify(user));
          // Redirect the user to the home page 
          setIsAuth(true);
          setUser(res.data);
          window.location.href = "/home";

        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setIsAuth(false);
    setUser({});
    // Clear the token from local storage on logout
    localStorage.removeItem("token");
  };
  return (
    <>
    
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" onChange={(e) => setUsername(e.target.value)} value={username} />
                            <label className="form-label" htmlFor="form3Example1c">Username</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                        <label className="form-check-label" htmlFor="form2Example3">
                         <div>
                         <Link to='/password-reset'>Forget Password ?</Link>
                         <Routes>
                          <Route path='/password-reset' element={<PasswordRest />} />
                         </Routes>
                         </div>                          
                        </label>
                         </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" onClick={handleLogin}>Login</button> &nbsp;&nbsp;
                          <Link to="/register" className="btn btn-primary btn-lg">Register</Link>

                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://i.imgur.com/XCSxO8w_d.webp?maxwidth=760&fidelity=grand"
                        className="img-fluid" alt="Sample image" />

                  
      <div className="d-flex justify-content-center my-4">
        {profile ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut} className="btn btn-danger">Log out</button>
          </div>
        ) : (
          
          <button onClick={() => login()} className="btn-google"><FcGoogle/> </button>
        
        )}
      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default LoginComponent;
