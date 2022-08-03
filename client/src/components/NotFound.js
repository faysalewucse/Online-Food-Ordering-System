import React from "react";
import "../css/NotFound.css";
const NotFound = () => {
  return (
    <div className="container text-center">
      <div className="four_zero_four_bg">
        <h1 className="text-center ">404</h1>
      </div>
      <div>
        <h3 className="h2">Look like you're lost</h3>
        <p>the page you are looking for not avaible!</p>
        <a href="/" className="link_404">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
