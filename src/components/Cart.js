import React, { useState } from "react";
import "../css/Cart.css";
import CartCard from "../cards/CartCard";
import { confirmorder, fetchPrivateData, fetchResData } from "../api/resdata";
import { useNavigate } from "react-router-dom";

function Cart({ user, setCartCount, setUser, setAllRestaurent, cart_count }) {
  const [orderaddress, setOrderAddress] = useState(user.address);

  const navigate = useNavigate();
  let cartItem,
    result,
    totalCost = 0,
    res_name,
    res_email;

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
        res_name = item.res_name;
        res_email = item.res_email;
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

  function confirmOrder(result) {
    console.log(result);

    confirmorder(user.email, user, res_email, result, setCartCount);
    fetchPrivateData(setUser, setAllRestaurent, setCartCount);
    fetchResData(setAllRestaurent, setCartCount);
    navigate("/myorders");
  }

  return (
    <div className="p-5">
      <h2 className="text-center mb-5 cart--header">
        Ordered {cart_count} Items From {res_name}
      </h2>
      <div className="row">
        {totalCost !== 0 ? (
          <div className="col-lg-6 mb-5">{cartItem}</div>
        ) : (
          <div className="col-lg-6">
            <div className="text-center">
              <img
                src="images/cart-empty.svg"
                alt="cart-empty"
                className="cart--empty--png"
              />
              <h3 className="text-center cart-empty-text">
                Your Cart Is Empty
              </h3>
              <h6 className="text-center cart-empty-text mb-5">
                Please Add Some Food and Order
              </h6>
            </div>
          </div>
        )}

        <div className="col-lg-6">
          <div className="total--cost--card">
            <h2>Cost</h2>
            <hr />
            <div className="d-flex justify-content-between">
              <h6>Restaurent Name :</h6>
              <h6 style={{ color: "tomato" }}>{res_name}</h6>
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
              {totalCost !== 0 ? (
                <h6 className="mt-2 apply--voucher--btn">Apply Voucher</h6>
              ) : (
                <h6 className="mt-2 apply--voucher--btn--inv">Apply Voucher</h6>
              )}
              <input className="voucher--input" type="text" />
            </div>
            <textarea
              className="address--input"
              type="text"
              placeholder="address"
              defaultValue={user.address}
              onChange={(e) => setOrderAddress(e.target.value)}
            />
            {totalCost !== 0 ? (
              <h6
                className="mt-2 apply--voucher--btn"
                onClick={() => confirmOrder(result)}
              >
                Confirm Order
              </h6>
            ) : (
              <h6 className="mt-2 apply--voucher--btn--inv">Confirm Order</h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
