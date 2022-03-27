import React, { useState } from "react";
import UsersCart from "../database/UsersCart";
import FoodData from "../database/FoodData";
import "../css/Cart.css";
import CartCard from "../cards/CartCard";

function Cart({ user, setCartCount, setUser, setAllRestaurent }) {
  let cartItem,
    result,
    totalCost = 0;

  if (user.cart) {
    result = [
      ...user.cart
        .reduce((mp, o) => {
          if (!mp.has(o.img_path)) mp.set(o.img_path, { ...o, count: 0 });
          mp.get(o.img_path).count++;
          return mp;
        }, new Map())
        .values(),
    ];

    if (result) {
      result.forEach((item) => {
        totalCost += item.food_price * item.count;
      });
    }

    cartItem = result.map((item) => {
      return (
        <CartCard
          {...item}
          setCartCount={setCartCount}
          user={user}
          setUser={setUser}
          setAllRestaurent={setAllRestaurent}
        />
      );
    });
  }

  return (
    <div className="p-5">
      <h2 className="text-center mb-5">
        Ordered 3 Items From Cheap & Best Restaurent
      </h2>
      <div className="row">
        <div className="col-lg-6 mb-5">{cartItem}</div>

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
              <h6>{totalCost} BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Delivery Charge :</h6>
              <h6>14 BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Discount :</h6>
              <h6>00 BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Total :</h6>
              <h6>{totalCost} BDT</h6>
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
            <h6 className="mt-2 apply--voucher--btn">Confirm Order</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
