// import React, { useState } from 'react';

// const Registration = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password1, setPassword] = useState('');
//   // const [password2, setPassword] = useState('');


//   const handleRegister = (e) => {
//     e.preventDefault();

//     // API endpoint for registration in Django
//     const url = 'http://localhost:8000/api/auth/register/';
    
//     // Data to be sent to the server
//     const data = {
//       username: username,
//       email: email,
//       pass1: password1,
//       // pass2: password2

//     };

//     // Send a POST request to the server
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': getCookie('csrftoken') // Replace 'csrftoken' with your CSRF cookie name
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Handle the response from the server
//       // For example, you could redirect to a success page or display a success message
//       console.log(data);
//     })
//     .catch(error => {
//       // Handle errors if the registration fails
//       console.error('Error:', error);
//     });
//   };

//   // Helper function to get CSRF token from cookies
//   function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//       const cookies = document.cookie.split(';');
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === (name + '=')) {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   }

//   return (
//     <form onSubmit={handleRegister}>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="pass1"
//         placeholder="Enter password"
//         value={password1}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       {/* <input type="password2"
//       placeholder='Confirm password'
//       value={password2}
//       onChange={(e) => setPassword(e.target.value)}
//       required
//       /> */}
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Registration;

import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleRegister = () => {
    const data = {
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password1: password1,
      password2: password2,
    };

    axios.post("http://localhost:8000/api/auth/register/", data)
      .then((response) => {
        // Handle successful registration here
        console.log("Registration successful:", response.data);
      })
      .catch((error) => {
        // Handle registration error here
        console.error("Registration error:", error);
      });
  };

  return (
    <>
    <h1 className="sign-logo">Register</h1>
    <Container>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control name="username" onChange={(e) => setUsername(e.target.value)} ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control name="emailAddress" onChange={(e) => setEmail(e.target.value)}></Form.Control>
      </Form.Group> 
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password1" onChange={(e) => setPassword1(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" name="password2" onChange={(e) => setPassword2(e.target.value)}></Form.Control>
      </Form.Group>

      <Button onClick={handleRegister} 
      variant="primary">
        Register
      </Button>

    </Container>
  </>










    // <div>
    //   <h2>Register</h2>
    //   <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
    //   <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
    //   <input type="password" placeholder="Password" onChange={(e) => setPassword1(e.target.value)} />
    //   <input type="password" placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)} />
    //   <button onClick={handleRegister}>Register</button>
    // </div>
  );
};

export default RegisterComponent;
