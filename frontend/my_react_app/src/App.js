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
import PasswordRest from './components/PasswordRest';
import logoImage from './components/image/logo.png';
import AdminPanel from './components/AdminPanel';
import {LuLogOut} from 'react-icons/lu';
import Bar from './components/Bar';
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
      window.location.href = "/";
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

    {isAuth && <Link className='logout-btn' to="/logout" onClick={handleLogout}><LuLogOut/></Link> }
         <a href="/home">
        <img  src={logoImage} alt="Proftix"  />
      </a> 

    
  </div>
          </nav>
            <Routes>
              {isAuth &&  <Route 
                path="/home"
                element={<Dashboard />}
                />}
                <Route
                path="/api/auth/google/"
                element={<GoogleLoginComponent />}
                />

                <Route
                path="*"
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
                path="/password-reset/confirm/:uid/:token/" 
                element={<ForgetPassword/> } 
                />
                <Route
                path="/error"
                element={<Error />}
                />
                <Route
                path="/password-reset/"
                element={<PasswordRest />}
                />
                {isAuth &&<Route
                path="/admin"
                element={<AdminPanel />}
                />}
                <Route
                path="bar"
                element={<Bar />}
                />
                   
            </Routes>
        </Router>

    </div>


  );
};

export default App;
