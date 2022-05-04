import React from "react";
import {
  addtocart,
  fetchPrivateData,
  removefromcart,
  reducefromcart,
} from "../api/resdata";
import "./CartCard.css";

// props.user.email,
//       food_id,
//       food_name,
//       food_price,
//       img_path,
//       res_email,
//       res_name,
//       res_address,
//       latlong

function CartCard(props) {
  function addQuantity(
    food_id,
    food_name,
    food_price,
    img_path,
    res_email,
    res_name,
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
  }

  function removeFromCart(food_name, food_price, img_path, res_email) {
    removefromcart(
      props.setCartCount,
      props.user.email,
      food_name,
      food_price,
      img_path,
      res_email
    );
    fetchPrivateData(props.setUser, props.setAllRestaurent, props.setCartCount);
  }

  function reduceFromCart(food_id) {
    reducefromcart(props.setCartCount, props.user.email, food_id);
    fetchPrivateData(props.setUser, props.setAllRestaurent, props.setCartCount);
  }

  return (
    <div>
      <div className="cart-card mb-4">
        <div className="p-2 d-flex justify-content-between">
          <div className="d-flex justify-content-start">
            <img
              className="card-image"
              src={props.img_path}
              alt=""
              style={{ width: "50%", height: "10vh", objectFit: "cover" }}
            />
            <div>
              <h4>{props.food_name}</h4>
              <h6>
                {props.food_price} x {props.count}
              </h6>
              <div className="d-flex justify-content-between align-items-center plus--minus--remove">
                <i
                  onClick={() => reduceFromCart(props._id)}
                  class="fas fa-minus minus"
                ></i>
                <i
                  onClick={() =>
                    addQuantity(
                      props.food_id,
                      props.food_name,
                      props.food_price,
                      props.img_path,
                      props.res_email,
                      props.res_name,
                      props.res_address,
                      props.latlong
                    )
                  }
                  class="fas fa-plus plus"
                ></i>
                <i
                  onClick={() =>
                    removeFromCart(
                      props.food_name,
                      props.food_price,
                      props.img_path,
                      props.res_email
                    )
                  }
                  className="fas fa-trash remove--icon"
                ></i>
              </div>
            </div>
          </div>
          <h4 className="total--taka">{props.food_price * props.count} BDT</h4>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
