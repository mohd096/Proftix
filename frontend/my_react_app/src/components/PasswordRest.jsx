import React, { useState } from "react";
import axios from "axios";

const PasswordRest = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/auth/password/reset/", { email })
      .then((res) => {
        console.log("Password reset email sent successfully!");
        // You can show a success message to the user or redirect to another page
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        // Handle the error, e.g., show an error message to the user
      });
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={handleChange} />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordRest;
