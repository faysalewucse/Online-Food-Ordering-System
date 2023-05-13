import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Banner.css";

export default function Banner() {
  // page navigator
  const navigate = useNavigate();

  return (
    <div className="banner position-relative">
      <div className="blury-green"></div>
      <div className="blury-red"></div>
      <div className="blury-green2"></div>
      <div className="blury-red2"></div>

      <div className="container">
        <div className="row justify-content-center align-items-center gap-5">
          <div className="col d-flex">
            <div>
              <h1 className="font-bold text-6xl bg-clip-text bg-gradient-to-br from-red-200  to-lime-100 text-transparent">
                Hungry? We've got you covered!
              </h1>
              <p className="text-white leading-normal my-5">
                We believe that food is not just about satisfying hunger, but
                also about creating an unforgettable experience. From local
                favorites to international cuisines, we've got you covered.
                Order now and let us bring the restaurant experience to you!
              </p>
              <button
                onClick={() => navigate("/restaurants")}
                className="order-now-btn"
              >
                Order Now
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img
              className="delivery-man img-fluid"
              src="images/delivery-man.png"
              alt="delivery-man"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
