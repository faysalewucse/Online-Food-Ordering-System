import React, { useState, useEffect } from "react";
import "../css/DeliveryStatus.css";
import { ProgressBar } from "react-bootstrap";
import io from "socket.io-client";

function DeliveryStatus({ order_id, user, allUser }) {
  console.log(order_id);
  const [status, setStatus] = useState();
  const [del_time, setDelTime] = useState(0);
  const [item, setItem] = useState();
  const [totalCost, setTotalCost] = useState(0);
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    filterOrder(
      order_id,
      user,
      setOrderInfo,
      setDelTime,
      setItem,
      setTotalCost,
      setStatus
    );
  }, []);

  function filterOrder(
    order_id,
    user,
    setOrderInfo,
    setDelTime,
    setItem,
    setTotalCost,
    setStatus
  ) {
    if (user.my_orders) {
      for (let order of user.my_orders) {
        if (order.order_id === order_id) {
          setOrderInfo(order);
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
      localStorage.setItem("loadOrders", true);
      data.time ?? setDelTime(data.time);
      console.log(status);
    });
  }

  return (
    <div className="status">
      <div className="container p-5">
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
              <i class="fas fa-check-circle"></i>
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
              <i class="fas fa-pizza-slice"></i>
              <h6>Preparing</h6>
            </div>
            <div
              style={{
                opacity: status === "Cooking" || "Delivered" ? "1" : "0.5",
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
                    : "0.5"
                }
              />
            </div>
            <div
              style={{
                opacity:
                  status === "Delivered"
                    ? "1"
                    : status === "Cooking"
                    ? "0.5"
                    : "0.5",
              }}
              className="col text-center"
            >
              <i class="fas fa-biking"></i>
              <h6>Out For Delivery</h6>
            </div>
            <div
              style={{
                opacity:
                  status === "Delivered"
                    ? "1"
                    : status === "Cooking"
                    ? "0.5"
                    : "0.5",
              }}
              className="col progress--line"
            >
              <ProgressBar
                animated
                now={status === "Delivered" ? "75" : "0.5"}
              />
            </div>
            <div style={{ opacity: 0.5 }} className="col text-center">
              <i class="fas fa-laugh-wink"></i>
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
      </div>
    </div>
  );
}

export default DeliveryStatus;
