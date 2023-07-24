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


import React, { useState } from "react";
import axios from "axios";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
    };

    axios.post("http://localhost:8000/api/auth/login/", data)
      .then((response) => {
        // Handle successful login here
        console.log("Login successful:", response.data);
      })
      .catch((error) => {
        // Handle login error here
        console.error("Login error:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
