import React from "react";
import "../../css/Subscribe.css";

export default function Subscribe() {
  return (
    <div className="subscribe text-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <h1>
              <b>Subscribe our newsletter</b>
            </h1>
            <p>
              Browse local restaurant and businesses for delivery by entering
              your address below.
            </p>
            <div>
              <input
                type="text"
                className="text-black font-bold"
                placeholder="Enter Your Email"
              />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
          <div className="col ready-to-order">
            <h1>
              <b>Ready to Order?</b>
            </h1>
            <button className="order-now-btn">Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
