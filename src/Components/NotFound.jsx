import React from "react";
import image from "../Assets/Images/pageNotFound.png";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="nf-container">
      <img height="300px" src={image} />
      <p>The page you are requesting for does not exist</p>
      <button onClick={() => navigate("/")}>Back to Homepage</button>
    </div>
  );
}

export default NotFound;
