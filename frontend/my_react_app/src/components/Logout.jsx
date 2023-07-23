import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    // API endpoint for user logout in Django
    const url = '/logout/';

    // Send a POST request to the server to logout the user
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': ('csrftoken') // Replace 'csrftoken' with your CSRF cookie name
      }
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server, for example, display a success message
      console.log(data);
      // Redirect to the login page after logout
      window.location.href = '/login';
    })
    .catch(error => {
      // Handle errors if logout fails
      console.error('Error:', error);
    });
  }, []);

  // Helper function to get CSRF token from cookies (same as before)
  // ...

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;
