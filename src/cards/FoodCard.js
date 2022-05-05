import React from "react";
import "./FoodCard.css";
import { Nav, Alert } from "react-bootstrap";
import { addtocart, fetchPrivateData } from "../api/resdata";

function FoodCard(props) {
  function addToCart(
    food_id,
    food_name,
    food_price,
    img_path,
    res_email,
    res_name,
    setOpen,
    res_address,
    latlong
  ) {
    addtocart(
      props.user.email,
      food_id,
      food_name,
      food_price,
      img_path,
      res_email,
      res_name,
      res_address,
      latlong
    );

    fetchPrivateData(props.setUser, props.setAllRestaurent, props.setCartCount);
    setOpen({ open: true });
  }

  function setModalProps(setReviewsModalShow, item, setItem) {
    if (item.reviews.length > 0) {
      setReviewsModalShow(true);
      setItem(item);
    }
  }

  let foodTotal = 0;
  let length = props.item.rating.length - 1;
  props.item.rating.forEach(({ star }) => (foodTotal += parseInt(star)));
  let avgStar = Math.floor(foodTotal / length);

  return (
    <div
      className="card"
      style={{ width: "16rem", paddingLeft: "0px", paddingRight: "0px" }}
    >
      <img
        onClick={() =>
          setModalProps(props.setReviewsModalShow, props.item, props.setItem)
        }
        className="card-img-top"
        src={props.img_path}
        alt="Card image cap"
        style={{ width: "100%", height: "20vh", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h4 className="card-title text-success">{props.food_name}</h4>
        <h6 className="card-title cost">BDT: {props.food_price} /-</h6>
        <h6 className="card-title">Sold: {props.sold}</h6>
        <small className="fa fa-person-biking">: {15} Tk</small>
        <br />
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={
                index <= avgStar ? "star-button on" : "star-button off"
              }
            >
              <span className="fa fa-star" />
            </button>
          );
        })}
      </div>
      <div className="card-body-btn d-flex">
        {/* <Nav.Link href="#" className="buy--now--btn">
          Buy Now
        </Nav.Link> */}
        <Nav.Link
          href="#"
          onClick={() =>
            addToCart(
              props._id,
              props.food_name,
              props.food_price,
              props.img_path,
              props.res_email,
              props.res_name,
              props.setOpen,
              props.res_address,
              props.latlong
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
