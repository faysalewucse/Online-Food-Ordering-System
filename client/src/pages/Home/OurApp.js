import React from "react";
import "../../css/HealthyFood.css";

export default function OurApp() {
  return (
    <div className="healthy-food">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col">
            <h1>
              <b>Make the delicious food and Download our app</b>
            </h1>
            <p>
              Our company is engaged in the delivery of healthy and tasty food
              arround the city, Special cooking and delivery technologies allow
              you to buy fresh and healthy food and you can download our app to
              order food more easily.
            </p>
            <button className="order-now-btn">Download Now</button>
          </div>
          <div className="col">
            <img className="img-fluid" src="images/our-app.png" alt="mobile" />
          </div>
        </div>
      </div>
    </div>
  );
}
