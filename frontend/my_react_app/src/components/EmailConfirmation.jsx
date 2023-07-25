import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Error from "./Error";

const EmailConfirmation = () => {
  const { key } = useParams();
  const [confirmationStatus, setConfirmationStatus] = useState("pending");
  const hasError = true;
//
// const { uid, token } = useParams();

// const [data, setdata] = useState({uid, token});
// <input type="password" name="password1" onChange={handleChange} value={data.password1}/>
// <input type="password" name="password2"/>
// const handleChange=(e)=>{
// const {name, value}=e.target;
// setdata({...data, [name]:value})
// }
//
  useEffect(() => {
    console.log(key);
    const confirmEmail = async () => {
      try {
        // Make a GET request to the backend API to confirm the email
        await axios.post(`http://localhost:8000/api/auth/account-confirm-email/`, {key});
        // Email confirmed successfully
        setConfirmationStatus("success");
        // window.location.href = "/login"; 
      } catch (error) {
        // Failed to confirm email
        setConfirmationStatus("error");
        // window.location.href = "/error"; 
      }
    };

    confirmEmail();
  }, [key]);

  return (
    <div>
      {hasError ? (
        <Error
          errorMessage="Failed to confirm email. Please try again later."
          redirectUrl="/home" 
        />
      ) : (
        <>
          {confirmationStatus === "pending" && <p>Confirming your email...</p>}
          {confirmationStatus === "success" && (
            <>
              <p>Email confirmed successfully!</p>
            </>
          )}
          {confirmationStatus === "error" && (
            <p>Failed to confirm email. Please try again later.</p>
          )}
        </>
      )} 
    </div>
  );
};

export default EmailConfirmation;

