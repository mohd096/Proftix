import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ForgetPassword = () => {
  const { uid, token } = useParams();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [data, setdata] = useState({uid, token});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === 'password1') {
    //   setPassword1(value);
    // } else if (name === 'password2') {
    //   setPassword2(value);
    // }
    setdata({...data, [name]:value})

  };
  console.log({ uid, token, password1, password2 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = { uid, token, password1, password2 };
console.log(data);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/password/reset/confirm/`,
        data
      );
      console.log(response);
      // Handle successful response, e.g., show success message or redirect
      alert('Password reset successfully!');
    } catch (error) {
      console.log(error);
      // Handle error, e.g., show error message or redirect to an error page
    }
  };

  return (
    <>

<section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Forgot Password</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <div>{uid}</div>
                            <div>{token}</div>
                            <label className="form-label" htmlFor="form3Example3c">New Password</label>
                            <input type="password" name="new_password1"  className="form-control" onChange={handleChange} value={data.new_password1} />
                            <label className="form-label" htmlFor="form3Example3c">Repeat your password</label>
                            <input type="password" name="new_password2"  className="form-control" onChange={handleChange} value={data.new_password2} />
                            
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Submit</button>
                        </div>
                        </div>
                        </div>
                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://i.imgur.com/XCSxO8w_d.webp?maxwidth=760&fidelity=grand"
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;

{/* 




      <div>ForgetPassword</div>
      <div>{uid}</div>
      <div>{token}</div>
      <input type="password" name="new_password1" onChange={handleChange} value={data.new_password1} />
      <input type="password" name="new_password2" onChange={handleChange} value={data.new_password2} />
      <button onClick={handleSubmit}>Submit</button> */}