// import React, { useEffect } from 'react';

// const Logout = () => {
//   useEffect(() => {
//     // API endpoint for user logout in Django
//     const url = 'http://localhost:8000/api/auth/logout/';

//     // Send a POST request to the server to logout the user
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': ('csrftoken') // Replace 'csrftoken' with your CSRF cookie name
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Handle the response from the server, for example, display a success message
//       console.log(data);
//       // Redirect to the login page after logout
//       window.location.href = '/login';
//     })
//     .catch(error => {
//       // Handle errors if logout fails
//       console.error('Error:', error);
//     });
//   }, []);

//   // Helper function to get CSRF token from cookies (same as before)
//   // ...

//   return (
//     <div>
//       Logging out...
//     </div>
//   );
// };

// export default Logout;


import React from "react";
import axios from "axios";
import { useState } from "react";


const LogoutComponent = () => {

  const [  setUser ] = useState([]);
  const [ setIsAuth] = useState(false);//check if user is authenticated

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
      {/* <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default LogoutComponent;
