// import React, { useState } from 'react';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // API endpoint for login in Django
//     const url = 'http://localhost:8000/api/auth/login/';

//     // Data to be sent to the server
//     const data = {
//       username: username,
//       password: password
//     };

//     // Send a POST request to the server
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': ('csrftoken') // Replace 'csrftoken' with your CSRF cookie name
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Handle the response from the server, for example, display a success message
//       console.log(data);
//     })
//     .catch(error => {
//       // Handle errors if the login fails
//       console.error('Error:', error);
//     });
//   };

//   // Helper function to get CSRF token from cookies (same as before)
//   // ...

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import axios from "axios";
import {Container, Form, Button} from 'react-bootstrap'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import ForgetPassword from "./ForgetPassword";
import PasswordRest from "./PasswordRest";


const LoginComponent = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState(""); // [1]
  const [password, setPassword] = useState("");
  const [ profile, setProfile ] = useState([]);
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

  const handleLogin = () => {
    const data = {
      username: username,
      // email: email,
      password: password,
    };

    axios.post("http://localhost:8000/api/auth/login/", data, {
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
    })
      .then((response) => {
        // Handle successful login here
        
        console.log("Login successful:", response.data);
        // save token to local storage
        console.log(user);
        localStorage.setItem("token", response.data.key);
        // save user to local storage

        // redirect to home page
        window.location.href = "/";

      })
      .catch((error) => {
        // Handle login error here
        console.error("Login error:", error);
      });
  };

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
                    // save token in local storage
                    localStorage.setItem('token', user.access_token);
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
  return (
    <>
    <Container>
      
        <Form.Group >
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button type="submit" onClick={handleLogin}>
          Login
        </Button>
      
    </Container>
    <div>
<h2>Forget Password ?</h2>   

<PasswordRest />
<ForgetPassword />
</div>
           <div>
            <h4>Or Try ...</h4>
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
  
</> 


    // <div>
      
    //   <h2>Login</h2>
    //   <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
    //   {/* <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> */}
    //   <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
    //   <button onClick={handleLogin}>Login</button>
    // </div>
  );
};

export default LoginComponent;
