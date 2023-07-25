import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ForgetPassword = () => {
  const { uidb64, token } = useParams();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password1') {
      setPassword1(value);
    } else if (name === 'password2') {
      setPassword2(value);
    }
  };
  console.log({ uidb64, token, password1, password2 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { uidb64, token, password1, password2 };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/password-reset/confirm/`,
        data
      );
      console.log(response);
      // Handle successful response, e.g., show success message or redirect
    } catch (error) {
      console.log(error);
      // Handle error, e.g., show error message or redirect to an error page
    }
  };

  return (
    <>
      <div>ForgetPassword</div>
      <div>{uidb64}</div>
      <div>{token}</div>
      <input type="password" name="password1" onChange={handleChange} value={password1} />
      <input type="password" name="password2" onChange={handleChange} value={password2} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default ForgetPassword;
