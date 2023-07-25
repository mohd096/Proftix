import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css';
// import { GoogleLogin } from '@react-oauth/google';
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import Login from './components/Login';
import EmailConfirmation from './components/EmailConfirmation';
import GoogleLoginComponent from './components/GoogleLoginComponent';
// import Logout from './components/Logout';
import ForgetPassword from './components/ForgetPassword';
import Error from './components/Error';



const App = () => {
const [user, setUser] = useState(null);
const [isAuth, setIsAuth] = useState(false);//check if user is authenticated

useEffect(() => {
  let token = localStorage.getItem("token");
  if (token != null) {
      let user = (token);
      if (user) {
          setIsAuth(true);
          setUser(user);
          } else {
          localStorage.remove("token");
          setIsAuth(false);

          }
}
}, [isAuth])

const handleLogout = () => {

  axios.post("http://localhost:8000/api/auth/logout/")
    .then((response) => {
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser(null);
      // Redirect to the login page after logout
      window.location.href = "/login";
      // Handle successful logout here
      console.log("Logout successful:", response.data);
    })
    .catch((error) => {
      // Handle logout error here
      console.error("Logout error:", error);
    });
};
 
  return (
    
    <div>     


    <Router >     
           <nav>
  <div className="navbar">
    {isAuth ? null : (
      <>
        <Link to="/login">Log in</Link>&nbsp;
        <Link to="/register">Register</Link>&nbsp;
        <Link to="/api/auth/google/">Google Login</Link>&nbsp;
        
      </>
    )}
    {isAuth && <Link to="/logout" onClick={handleLogout}>Logout</Link> }
    <Link to="/">Home</Link>&nbsp;

    
  </div>
          </nav>
            <Routes>
                <Route
                path="/"
                element={<Dashboard />}
                />
                <Route
                path="/api/auth/google/"
                element={<GoogleLoginComponent />}
                />

                <Route
                path="/login"
                element={<Login />}
                />
                <Route
                path="/register"
                element={<Registration />}
                />
                
                <Route 
                path="/email/confirm/:key/" 
                element={<EmailConfirmation/> } 
                />
                <Route 
                path="/password-reset/confirm/:uidb64/:token/" 
                element={<ForgetPassword/> } 
                />
                <Route
                path="/error"
                element={<Error />}
                />
                {/* <Route
                path="/password-reset/"
                element={<PasswordReset />}
                />
                    */}
            </Routes>
        </Router>








        
    </div>


  );
};

export default App;
