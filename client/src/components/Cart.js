import React, { useState, useRef } from "react";
import "../css/Cart.css";
import CartCard from "../cards/CartCard";
import { confirmorder, fetchPrivateData, fetchResData } from "../api/resdata";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function Cart({ user, setCartCount, setUser, setAllRestaurent, cart_count }) {
  const [orderaddress, setOrderAddress] = useState(user.address);
  const [open, setOpen] = React.useState(false);
  const form = useRef();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const data = await confirmOrder(result);
    if(data){
      emailjs
      .sendForm(
        "service_3v0w01r",
        "template_7o3awvk",
        form.current,
        "YiqxE4MGs2K72WJZl"
      )
      .then(
        (result) => {
          fetchPrivateData(setUser, setAllRestaurent, setCartCount);
          fetchResData(setAllRestaurent, setCartCount);
          localStorage.setItem("loadOrders", true);
          localStorage.setItem("orderSent", true);
          navigate("/myorders");
        },
        (error) => {
          console.log(error.text);
        }
      );
    }
  };

  const navigate = useNavigate();
  let cartItem,
    result,
    totalCost = 0,
    res_name,
    res_email,
    res_address;

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
        res_address = item.res_address;
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

  const confirmOrder = async (result) => {
    const data = await confirmorder(
      user.email,
      user,
      res_email,
      res_address,
      result,
      setCartCount
    );
    return data;
  };

  return (
    <div className="p-5 container cart-page-container">
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
              <h6>15 BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Discount :</h6>
              <h6>00 BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Total :</h6>
              <h6>{totalCost == 0 ? totalCost : totalCost + 15} BDT</h6>
            </div>
            <div className="d-flex justify-content-between mb-2">
              {totalCost !== 0 ? (
                <h6 className="mt-2 apply--voucher--btn">Apply Voucher</h6>
              ) : (
                <h6 className="mt-2 apply--voucher--btn--inv">Apply Voucher</h6>
              )}
              <input className="voucher--input" type="text" />
              <textarea hidden name="message" defaultValue={"OP"} />
            </div>
            {totalCost !== 0 ? (
              <h6
                type="submit"
                className="mt-2 apply--voucher--btn"
                onClick={() => setOpen(true)}
              >
                Confirm Order
              </h6>
            ) : (
              <h6 className="mt-2 apply--voucher--btn--inv">Confirm Order</h6>
            )}
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you Sure to Confirm Order from ? {res_name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{color: 'red'}} onClick={handleClose}>Cancel</Button>
          <form ref={form} onSubmit={sendEmail}>
            <div className="input-box">
              <input type="hidden" name="user_name" defaultValue={user.name} />
            </div>
            <div className="input-box">
              <input
                type="hidden"
                name="user_email"
                defaultValue={user.email}
              />
            </div>
            <div className="input-box message-box">
              <textarea
                hidden
                type="text"
                name="message"
                defaultValue={"Your Order has been placed"}
              />
            </div>

            <input
              style={{ border: "none" }}
              className="final-confirm-btn"
              type="submit"
              value="Confirm Order"
            />
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Cart;
