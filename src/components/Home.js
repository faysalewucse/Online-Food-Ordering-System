import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home(props) {
  return (
    <div className="container">
      <div className="row homepage-section">
        <div className="col-sm-6 text-start">
          {props.restaurent ? (
            <h6 className="font-italic">Want to be a great Bussinessman?</h6>
          ) : (
            <h6 className="font-italic">Are You Hungry?</h6>
          )}
          <h1 className="dont--wait">Don't Wait!?</h1>
          <div>
            {props.restaurent ? (
              <Nav.Link
                as={Link}
                to={"/myrestaurent"}
                className="order--now--btn"
              >
                My Restaurent
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to={"/restaurents"}
                className="order--now--btn"
              >
                Order Now
              </Nav.Link>
            )}
          </div>
        </div>
        <div className="col-sm-6">
          <img
            className="homepage-pizza"
            src="foods/three-burger.png"
            alt="pizza"
          />
        </div>
      </div>
    </div>
  );
}
