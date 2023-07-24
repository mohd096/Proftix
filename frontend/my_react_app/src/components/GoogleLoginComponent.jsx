import React from "react";
import axios from "axios";

const GoogleLoginComponent = () => {
  const handleGoogleLogin = () => {
    // Assuming you have set up a URL for Google login in your Django project
    axios.get("http://localhost:8000/api/auth/google/")
      .then((response) => {
        // Redirect the user to the Google login page
        window.location.href = response.data.auth_url;
      })
      .catch((error) => {
        // Handle error here
        console.error("Google login error:", error);
      });
  };

  return (
    <div>
      <h2>Google Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleLoginComponent;
