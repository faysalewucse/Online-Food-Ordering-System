import React from "react";
import UsersCart from "../database/UsersCart";
import FoodData from "../database/FoodData";
import "../css/Cart.css";

function Cart() {
  console.log(FoodData);
  return (
    <div className="p-5">
      <h2 className="text-center mb-5">
        Ordered 3 Items From Cheap & Best Restaurent
      </h2>
      <div className="row">
        <div className="col-lg-6 mb-5">
          <div className="cart-card">
            <div className="p-2 d-flex justify-content-between">
              <div className="d-flex justify-content-between">
                <img className="card-image" src="foods/b1.jpg" alt="" />
                <div>
                  <h4>BBQ Burger</h4>
                  <h6>220 TK x 1</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <i class="fas fa-minus minus"></i>
                    <i class="fas fa-plus plus"></i>
                    <i className="fas fa-trash remove--icon"></i>
                  </div>
                </div>
              </div>
              <h4 className="total--taka">220 TK</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="total--cost--card">
            <h2>Cost</h2>
            <hr />
            <div className="d-flex justify-content-between">
              <h6>Order ID :</h6>
              <h6 style={{ color: "tomato" }}>dsf4gsd5f4gs5d4fg</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Sub Total :</h6>
              <h6>245 BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Delivery Charge :</h6>
              <h6>14 BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Discount :</h6>
              <h6>00 BDT</h6>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <h6 className="apply--voucher--btn">Apply Voucher</h6>
              <input className="voucher--input" type="text" />
            </div>
            <textarea
              className="address--input"
              type="text"
              placeholder="address"
            />
            <h6 className="apply--voucher--btn">Confirm Order</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
