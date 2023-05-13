import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/HealthyFood.css";

export default function ConvenceRestaurants() {
  // instance of useNative
  const navigate = useNavigate();
  return (
    <div className="healthy-food">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col">
            <img
              className="img-fluid"
              src="images/man-cooking.png"
              alt="healthy"
            />
          </div>
          <div className="col">
            <h1>
              <b>Are you a Master of Cooking?</b>
            </h1>
            <p>
              Would you like millions of new customers to enjoy your amazing
              food and groceries? So would we! It's simple: we list your menu
              and product lists online, help you process orders, pick them up,
              and deliver them to hungry pandas – in a heartbeat! Interested?
              Let's start our partnership today!
            </p>
            <button
              onClick={() => navigate("/restaurant-register")}
              className="order-now-btn"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
