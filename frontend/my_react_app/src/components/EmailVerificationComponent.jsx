import React from "react";
import axios from "axios";

const EmailVerificationComponent = () => {
  const handleResendVerification = () => {
    axios.post("http://localhost:8000/api/auth/register/resend-email/")
      .then((response) => {
        // Handle successful resend here
        console.log("Verification email resent:", response.data);
      })
      .catch((error) => {
        // Handle resend error here
        console.error("Resend verification error:", error);
      });
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <p>Click the link in the email you received to verify your email address.</p>
      <button onClick={handleResendVerification}>Resend Verification Email</button>
    </div>
  );
};

export default EmailVerificationComponent;
