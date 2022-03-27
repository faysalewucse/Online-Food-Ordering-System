import React from "react";
import "./FoodCard.css";
import { Nav, Alert } from "react-bootstrap";
import { addtocart, fetchPrivateData } from "../api/resdata";

function FoodCard(props) {
  function addToCart(food_name, food_price, img_path, res_email) {
    addtocart(
      props.setCartCount,
      props.user.email,
      food_name,
      food_price,
      img_path,
      res_email
    );

    fetchPrivateData(props.setUser, props.setAllRestaurent, props.setCartCount);
  }

  return (
    <div
      className="card"
      style={{ width: "16rem", paddingLeft: "0px", paddingRight: "0px" }}
    >
      <img
        className="card-img-top"
        src={props.img_path}
        alt="Card image cap"
        style={{ width: "100%", height: "20vh", objectFit: "cover" }}
      />
      <div className="card-body">
        <h4 className="card-title text-success">{props.food_name}</h4>
        <h6 className="card-title cost">BDT: {props.food_price} /-</h6>
        <small className="fa fa-person-biking">: {props.delivery} Tk</small>
        <br />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star" />
      </div>
      <div className="card-body-btn d-flex">
        {/* <Nav.Link href="#" className="buy--now--btn">
          Buy Now
        </Nav.Link> */}
        <Nav.Link
          href="#"
          onClick={() =>
            addToCart(
              props.food_name,
              props.food_price,
              props.img_path,
              props.res_email
            )
          }
          style={{ color: "white" }}
          className="add--to--cart--btn"
        >
          Add to Cart
        </Nav.Link>
      </div>
    </div>
  );
}

export default FoodCard;
