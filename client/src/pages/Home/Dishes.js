import React from "react";
import "../../css/Dishes.css";

export default function Dishes() {
  return (
    <div className="py-5 bg-dark">
      <div className="glass-1"></div>
      <div className="glass-2"></div>
      <div className="container text-center">
        <h1 className="fw-bold start-text text-light">
          More Then 20,000 Dishes To Order!
        </h1>
        <p>Welcome to the Big Online Food Delivery System.</p>
        <div className="row gap-5 mt-5 p-5">
          <div className="col dish-card">
            <div className="dish-img-bg">
              <img
                className="dish-img"
                src="images/dishes/burger.png"
                alt="burger"
              />
            </div>
            <h4>Burger</h4>
          </div>
          <div className="col dish-card">
            <div className="dish-img-bg">
              <img
                className="dish-img"
                src="images/dishes/salad.png"
                alt="burger"
              />
            </div>
            <h4>Salad</h4>
          </div>
          <div className="col dish-card">
            <div className="dish-img-bg">
              <img
                className="dish-img"
                src="images/dishes/drinks.png"
                alt="drinks"
              />
            </div>
            <h4>Drinks</h4>
          </div>
          <div className="col dish-card">
            <div className="dish-img-bg">
              <img
                className="dish-img"
                src="images/dishes/hot-dog.png"
                alt="burger"
              />
            </div>
            <h4>Hot Dogs</h4>
          </div>
          <div className="col dish-card">
            <div className="dish-img-bg">
              <img
                className="dish-img img-fluid"
                src="images/dishes/rice.png"
                alt="burger"
              />
            </div>
            <h4>BURGER</h4>
          </div>
          <div className="col dish-card">
            <div className="dish-img-bg">
              <img
                className="dish-img"
                src="images/dishes/dessert.png"
                alt="dessert"
              />
            </div>
            <h4>Dessert</h4>
          </div>
        </div>
        <div className="d-flex justify-content-end pe-5">
          <i className="arrow fa-solid fa-chevron-left me-2"></i>
          <i className="arrow fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
}
