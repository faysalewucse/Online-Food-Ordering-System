import React from "react";
import "../../css/OrderProcedure.css";

export default function OrderProcedure() {
  return (
    <div className="bg-dark order-procedure py-5">
      <div className="container text-center text-light">
        <h1 className="fw-bold">How To Order</h1>
        <p>Follow the Procedure</p>
        <div className="md:flex py-5 items-center">
          <div>
            <img
              className="img-fluid"
              src="images/order/location.png"
              alt="location"
            />
            <p className="border border-lime-600 p-2 rounded-full mx-auto my-3 w-10 h-10">
              1
            </p>
            <h4>Choose Your Location</h4>
          </div>
          <div>
            <img
              className="rotate-90 md:-rotate-0"
              src="images/order/direction.png"
              alt="direction"
            />
          </div>
          <div>
            <img
              className=""
              src="images/order/restaurant.png"
              alt="location"
            />
            <p className="border border-lime-600 p-2 rounded-full mx-auto my-3 w-10 h-10">
              2
            </p>
            <h4>Choose Your Restaurant</h4>
          </div>
          <div>
            <img
              className="rotate-90 md:-rotate-0"
              src="images/order/direction.png"
              alt=""
            />
          </div>
          <div>
            <img className="" src="images/order/trolley.png" alt="location" />
            <p className="border border-lime-600 p-2 rounded-full mx-auto my-3 w-10 h-10">
              3
            </p>
            <h4>Make your Order</h4>
          </div>
          <div>
            <img
              className="rotate-90 md:-rotate-0"
              src="images/order/direction.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="img-fluid"
              src="images/order/food-delivery.png"
              alt="location"
            />
            <p className="border border-lime-600 p-2 rounded-full mx-auto my-3 w-10 h-10">
              4
            </p>
            <h4>Food is On the way</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
