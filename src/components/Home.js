import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  //const navigate = useNavigate();
  // fetch(
  //   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //     "23.711162" +
  //     "," +
  //     "90.489894" +
  //     "&key=" +
  //     "AIzaSyDcHOzgk3jw0MI84f1bVlGynoTEh-n5MYs"
  // )
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log(
  //       "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
  //     );
  //   });
  return (
    <div className="container">
      <div className="row homepage-section">
        <div className="col-sm-6 text-start">
          <h6 className="font-italic">Are You Hungry?</h6>
          <h1 className="dont--wait">Don't Wait!?</h1>
          <div>
            <Nav.Link as={Link} to={"/restaurents"} className="order--now--btn">
              Order Now
            </Nav.Link>
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
