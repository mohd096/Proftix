import React from "react";
import { Link } from "react-router-dom";

const Error = ({ errorMessage, redirectUrl }) => {
    redirectUrl = "/home";
  return (
    <div>
      <p>{errorMessage}</p>
        <p>Click the button below to go back to the previous page.</p>
      <Link to={redirectUrl}>Go back</Link>
    </div>
  );
};

export default Error;
