import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import Login from './components/Login';
import EmailVerificationComponent from './components/EmailVerificationComponent';
import GoogleLoginComponent from './components/GoogleLoginComponent';
// import Logout from './components/Logout';



const App = () => {
  const [franchises, setFranchises ] = useState([]);
  const [branches, setBranches ] = useState([]);

  const responseMessage = (response) => {
    console.log(response);
};
  const errorMessage = (error) => {
    console.log(error);
};
const [ user, setUser ] = useState([]);
const [ profile, setProfile ] = useState([]);

const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);

// log out function to log the user out of google and set the profile array to null
const logOut = () => {
    googleLogout();
    setProfile(null);
};

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/franchises/');
      setFranchises(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/branches/');
      setBranches(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchBranches();
  }, []);


  
  return (
    
    <div>      
        
        <div>
            <h2>Google Login</h2>

            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    
      <Dashboard />
      <EmailVerificationComponent />
      <GoogleLoginComponent />
      <Router>
      <div>
            <Link to="/register">Signup</Link> &nbsp;
      <h2>List of Franchises:</h2>
            <Link to="/login">Signin</Link> &nbsp;
            {/* <Link to="/logout" onClick={logoutHandler}>logout</Link> &nbsp; */}
          </div>
        <Routes>
        <Route exact path="/register" element={<Registration/>} />
        <Route exact path="/login" element={<Login  />} />
        {/* <Route exact path="/logout" element={<Logout logout={logoutHandler} />} /> */}
        </Routes>
    </Router>

      <ul>
        {franchises.map((franchise) => (
          <li key={franchise.id}>{franchise.name}</li>
        ))}

      </ul>
      <h2>List of Branches:</h2>
      <ul>
        {branches.map((branch) => (
          <li key={branch.id}>{branch.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
