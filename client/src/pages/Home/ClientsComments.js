import React from "react";
import "../../css/HealthyFood.css";

export default function ClientsComments() {
  return (
    <div className="healthy-food">
      <div className="container">
        <div className="row align-items-center">
          <div className="col p-5">
            <img
              className="img-fluid w-75"
              src="images/client.png"
              alt="client"
            />
          </div>
          <div className="col">
            <h1>
              <b>What Our Clients Say About Us</b>
            </h1>
            <p>
              I am grateful to the company for the timely and exceptionally
              accurate delivery of food. Everything is very tasty and high
              quality. And it follows that the weight less plan i have chosen
              really works! I was surprised
            </p>
            <div className="d-flex align-items-center justify-content-between reviewer">
              <div>
                <h3>
                  <b>Faysal Ahmad</b>
                </h3>
                <h6>Demra. Dhaka</h6>
                <div className="d-flex">
                  <i className="text-warning fa-solid fa-star"></i>
                  <i className="text-warning fa-solid fa-star"></i>
                  <i className="text-warning fa-solid fa-star"></i>
                  <i className="text-warning fa-solid fa-star"></i>
                  <i className="text-warning fa-solid fa-star"></i>
                </div>
              </div>
              <div className="d-flex">
                <i className="arrow fa-solid fa-chevron-left me-2"></i>
                <i className="arrow fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
