import React, { useState, useEffect } from "react";
import "../css/DeliveryStatus.css";
import { Nav, ProgressBar } from "react-bootstrap";
import io from "socket.io-client";
import { fetchPrivateData } from "../api/resdata";
import { Link, useNavigate } from "react-router-dom";

function DeliveryStatus({
  order_id,
  user,
  setUser,
  setAllRestaurent,
  setCartCount,
}) {
  const [status, setStatus] = useState();
  const [del_time, setDelTime] = useState(0);
  const [item, setItem] = useState();
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    filterOrder(order_id, user, setDelTime, setItem, setTotalCost, setStatus);
  }, []);

  const navigate = useNavigate();
  function filterOrder(
    order_id,
    user,
    setDelTime,
    setItem,
    setTotalCost,
    setStatus
  ) {
    if (user.my_orders) {
      for (let order of user.my_orders) {
        if (order.order_id === order_id) {
          if (order.delivery_time) setDelTime(order.delivery_time);
          setStatus(order.status);
          const items = order.result.map((food) => {
            return (
              <h6>
                {food.count} x {food.food_name}
              </h6>
            );
          });
          setItem(items);
          let totalCost = 0;
          order.result.forEach((item) => {
            totalCost += item.food_price * item.count;
          });
          setTotalCost(totalCost);
          return order;
        }
      }
    }
  }

  var socket = io();

  if (order_id) {
    socket.emit("join", `order_${order_id}`);
    socket.on("orderUpdated", (data) => {
      setStatus(data.status);
      console.log(status);
      localStorage.setItem("loadOrders", true);
      fetchPrivateData(setUser, setAllRestaurent, setCartCount);
      data.time ?? setDelTime(data.time);
    });
  }

  return (
    <div className="status">
      <div className="container p-5">
        {status !== "Canceled" ? (
          <div className="status-box">
            <div className="d-flex justify-content-between mb-12">
              <h1>Track delivery status</h1>
              <h6
                style={{ color: "tomato" }}
                className="bg-white py-1 rounded-full px-4 text-green-600 text-xs"
              >
                {order_id}
              </h6>
              <input id="hiddenInput" type="hidden" />
            </div>
            <div className="row">
              <div style={{ opacity: 1 }} className="col text-center">
                <i className="fas fa-clipboard-check"></i>
                <h6>Order Placed</h6>
              </div>
              <div style={{ opacity: "1" }} className="col progress--line">
                <ProgressBar animated now={100} />
              </div>
              <div
                style={{
                  opacity: status ? "1" : "0.5",
                }}
                className="col text-center"
              >
                <i className="fas fa-check-circle"></i>
                <h6>Order Confirmed</h6>
              </div>
              <div style={{ opacity: 1 }} className="col progress--line">
                <ProgressBar animated now={status ? "100" : "0.5"} />
              </div>
              <div
                style={{
                  opacity: status ? "1" : "0.5",
                }}
                className="col text-center"
              >
                <i className="fas fa-pizza-slice"></i>
                <h6>Preparing</h6>
              </div>
              <div
                style={{
                  opacity:
                    status === "Cooking" || "Delivered" || "Completed"
                      ? "1"
                      : "0.5",
                }}
                className="col progress--line"
              >
                <ProgressBar
                  animated
                  now={
                    status === "Cooking"
                      ? "75"
                      : status === "Delivered"
                      ? "100"
                      : status === "Completed"
                      ? "100"
                      : "0.5"
                  }
                />
              </div>
              <div
                style={{
                  opacity:
                    status === "Cooking"
                      ? "0.5"
                      : status === "Delivered"
                      ? "1"
                      : status === "Completed"
                      ? "1"
                      : "0.5",
                }}
                className="col text-center"
              >
                <i className="fas fa-biking"></i>
                <h6>Out For Delivery</h6>
              </div>
              <div
                style={{
                  opacity:
                    status === "Delivered"
                      ? "1"
                      : status === "Completed"
                      ? "1"
                      : "0.5",
                }}
                className="col progress--line"
              >
                <ProgressBar
                  animated
                  now={
                    status === "Delivered"
                      ? "75"
                      : status === "Completed"
                      ? "100"
                      : "0.5"
                  }
                />
              </div>
              <div
                style={{
                  opacity:
                    status === "Completed"
                      ? "1"
                      : status === "Delivered"
                      ? "0.5"
                      : "0.5",
                }}
                className="col text-center"
              >
                <i className="fas fa-laugh-wink"></i>
                <h6>Complete</h6>
              </div>
            </div>
            {del_time ? (
              <div>
                <h3 className="text-center">About {del_time} Minutes to go</h3>
                <div style={{ opacity: 1 }} className="col progress--line">
                  <ProgressBar variant="success" animated now={25} />
                </div>
              </div>
            ) : null}
            <hr />
            <h1>Ordered Items</h1>
            <div>
              {item}
              <hr />
              <div className="d-flex justify-content-between">
                <h6>Total</h6>
                <h6>{totalCost} Tk</h6>
              </div>
            </div>
          </div>
        ) : (
          <div className="status-box">
            <div className="col">
              <div className="text-center">
                <i
                  style={{
                    color: "red",
                    fontSize: "200px",
                    marginBottom: "40px",
                  }}
                  className="fa-solid fa-ban"
                ></i>
                <h3
                  style={{ color: "red" }}
                  className="text-center cart-empty-text"
                >
                  Your Order is Canceled for some reason.
                </h3>
                <h6 className="text-center cart-empty-text mb-5">
                  Order Again from another Restaurent
                </h6>
                {/* <h6 className="order-cancel-res-btn" onclick={()=> navigate("/restaurents")}>Restaurants</h6> */}
                <Nav.Link
                  as={Link}
                  to={"/restaurents"}
                  className="order-cancel-res-btn"
                  style={{ color: "white" }}
                >
                  Restaurants
                </Nav.Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryStatus;
