import React from "react";
import "./FoodCard.css";
import { Nav } from "react-bootstrap";

function FoodCard(props) {
  function handleChange() {
    console.log(props);
    props.setIdandPath.setCartCount((prev_cart_count) => {
      return prev_cart_count + 1;
    });
  }
  return (
    <div
      className="card"
      style={{ width: "16rem", paddingLeft: "0px", paddingRight: "0px" }}
    >
      <img className="card-img-top" src={props.img} alt="Card image cap" />
      <div className="card-body">
        <h4 className="card-title text-success">{props.name}</h4>
        <h6 className="card-title">
          {props.restaurent}
          {` (${props.sold})`}
        </h6>
        <h6 className="card-title cost">BDT: {props.cost} /-</h6>
        <small className="fa fa-person-biking">: {props.delivery} Tk</small>
        <br />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star" />
      </div>
      <div className="card-body-btn d-flex">
        <Nav.Link href="#" className="buy--now--btn">
          Buy Now
        </Nav.Link>
        <Nav.Link
          href="#"
          onClick={handleChange}
          className="add--to--cart--btn"
        >
          Add to Cart
        </Nav.Link>
      </div>
    </div>
  );
}

export default FoodCard;
