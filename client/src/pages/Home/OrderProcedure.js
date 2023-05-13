import React from "react";
import "../../css/OrderProcedure.css";

export default function OrderProcedure() {
  return (
    <div className="bg-dark order-procedure py-5">
      <div className="container text-center text-light">
        <h1 className="fw-bold">How To Order</h1>
        <p>Follow the Procedure</p>
        <div className="row py-5 align-items-center">
          <div className="col order-procedure-card">
            <img
              className="img-fluid"
              src="images/order/location.png"
              alt="location"
            />
            <p>1</p>
            <h4>Choose Your Location</h4>
          </div>
          <div className="col">
            <img
              className="img-fluid"
              src="images/order/direction.png"
              alt=""
            />
          </div>
          <div className="col order-procedure-card">
            <img
              className="img-fluid"
              src="images/order/restaurant.png"
              alt="location"
            />
            <p>2</p>
            <h4>Choose Your Restaurant</h4>
          </div>
          <div className="col">
            <img
              className="img-fluid"
              src="images/order/direction.png"
              alt=""
            />
          </div>
          <div className="col order-procedure-card">
            <img
              className="img-fluid"
              src="images/order/trolley.png"
              alt="location"
            />
            <p>3</p>
            <h4>Make your Order</h4>
          </div>
          <div className="col">
            <img
              className="img-fluid"
              src="images/order/direction.png"
              alt=""
            />
          </div>
          <div className="col order-procedure-card">
            <img
              className="img-fluid"
              src="images/order/food-delivery.png"
              alt="location"
            />
            <p>4</p>
            <h4>Food is On the way</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
