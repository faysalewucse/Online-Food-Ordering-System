import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addtocart, fetchPrivateData } from "../api/resdata";
import "../css/MyOrders.css";
import io from "socket.io-client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyOrders({
  user,
  setOrderID,
  setUser,
  setAllRestaurent,
  setCartCount,
}) {
  useEffect(() => {
    if (localStorage.getItem("loadOrders")) {
      window.location.reload(false);
      localStorage.removeItem("loadOrders");
    }
    if (localStorage.getItem("reviewed")) {
      window.location.reload(false);
      localStorage.removeItem("reviewed");
    }
  }, []);
  const [open, setOpen] = React.useState(false);
  const vertical = "center",
    horizontal = "center";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const navigate = useNavigate();
  var socket = io();

  if (user.email) {
    socket.emit("join", `order_${user.email}`);
    socket.on("myorderUpdated", (data) => {
      if (data) {
        setOpen(true);
      }
    });
  }

  const [orderAgainModalShow, setOrderAgainModalShow] = useState(false);
  const [orderID, setORDERID] = useState();

  function setOrderId(order_id, status, reviewed) {
    setOrderID(order_id);
    setORDERID(order_id);
    if (status !== "Complete" && reviewed !== "true")
      navigate("/delivery-status");
    else if (reviewed !== "true") navigate("/order-review-page");
    else if (reviewed === "true") setOrderAgainModalShow(true);
  }
  let orders;
  if (user.my_orders) {
    const reversedOrders = [...user.my_orders].reverse();

    orders = reversedOrders.map((order) => {
      let totalCost = 0;
      if (order) {
        order.result.forEach((item) => {
          totalCost += item.food_price * item.count;
        });
      }

      return (
        <tr>
          <td
            className="order--id"
            onClick={() =>
              setOrderId(order.order_id, order.status, order.reviewed)
            }
          >
            {order.order_id}
          </td>
          <td>{order.status ? order.status : "Not Confirmed"}</td>
          <td>{totalCost}</td>
          <td>{order.time}</td>
          <td>{order.reviewed === "true" ? "N/A" : "Available"}</td>
        </tr>
      );
    });
  }

  return (
    <div className="container delivery-status-container">
      <h4 className="track--order--text text-center">{`Click "Order ID" to "Track" Your Order`}</h4>

      <table className="styled-table text-center">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>STATUS</th>
            <th>Cost</th>
            <th>Date & Time</th>
            <th>Tracking Status</th>
          </tr>
        </thead>
        <tbody>{orders}</tbody>
      </table>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Delivery Status Updated Reload Page
        </Alert>
      </Snackbar>
      <OrderAgainFloatingModal
        show={orderAgainModalShow}
        onHide={() => setOrderAgainModalShow(false)}
        order_id={orderID}
        user={user}
        setUser={setUser}
        setAllRestaurent={setAllRestaurent}
        setCartCount={setCartCount}
      />
    </div>
  );
}

function OrderAgainFloatingModal(props) {
  let items,
    totalCost = 0,
    itemsArray;

  const navigate = useNavigate();

  props.user.my_orders.forEach((order) => {
    if (order.order_id == props.order_id) {
      itemsArray = order;
      items = order.result.map((item) => {
        totalCost += item.food_price * item.count;
        return (
          <div className="order-again-food-card d-flex justify-content-between">
            <div className="d-flex">
              <img
                style={{ width: "20%", marginRight: "10px" }}
                src={item.img_path}
                alt=""
              />
              <h4>
                {item.food_name} X {item.count}
              </h4>
            </div>
            <div>
              <h6 style={{ width: "50px" }}>{item.food_price} BDT</h6>
            </div>
          </div>
        );
      });
    }
  });

  const orderAgain = async (user, itemsArray) => {
    await axios.put("/api/auth/afterconfirm_removecart", {
      user_mail: user.email,
    });

    itemsArray.result.forEach((item) => {
      for (let i = 0; i < item.count; i++) {
        addtocart(
          props.user.email,
          item.food_id,
          item.food_name,
          item.food_price,
          item.img_path,
          item.res_email,
          item.res_name
        );
        fetchPrivateData(
          props.setUser,
          props.setAllRestaurent,
          props.setCartCount
        );
      }
    });
    navigate("/cart");
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="p-2">
        <div>{items}</div>
        <hr />
        <h4 className="text-end">{totalCost} BDT</h4>
        <div
          style={{ width: "200px", marginLeft: "auto", marginRight: "auto" }}
          className="item--edit--btn text-center mt-5"
          onClick={() => orderAgain(props.user, itemsArray)}
        >
          Order Again
        </div>
        <h6 className="text-center">
          N.B:- If You Press Order Again Your Cart Will Updated With These
          Foods. You Lost Your Previous Cart Item
        </h6>
      </div>
    </Modal>
  );
}

export default MyOrders;
