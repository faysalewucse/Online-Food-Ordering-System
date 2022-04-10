import React from "react";
import "../css/DeliveryStatus.css";
import { ProgressBar } from "react-bootstrap";
import io from "socket.io-client";

function DeliveryStatus({ order_id, user, allUser, delivery_status }) {
  console.log(allUser);

  var socket = io();

  if (order_id) {
    socket.emit("join", `order_${order_id}`);
  }

  socket.on("orderUpdated", (data) => {
    console.log(data);
  });

  let order_info,
    item,
    totalCost = 0;
  if (user.my_orders) {
    // for (let order of user.my_orders) {
    //   if (order.order_id === order_id) {
    //     order_info = order;
    //     //flag = 1;
    //     break;
    //   }
    // }
    let flag = 0;
    for (let each_user of allUser) {
      if (each_user.email === user.email) {
        for (let order of each_user.my_orders) {
          if (order.order_id === order_id) {
            order_info = order;
            flag = 1;
            break;
          }
        }
      }
      if (flag === 1) {
        break;
      }
    }
  }

  // for (let each_user of allUser) {
  //   if (each_user.email === user.email) {
  //     for (let order of each_user.my_orders) {
  //       if (order.order_id === order_id) {
  //         console.log(order);
  //       }
  //     }
  //   }
  // }

  if (order_info) {
    item = order_info.result.map((food) => {
      return (
        <h6>
          {food.count} x {food.food_name}
        </h6>
      );
    });
  }

  if (order_info) {
    order_info.result.forEach((item) => {
      totalCost += item.food_price * item.count;
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
              {order_info.order_id}
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
              style={{ opacity: order_info.status === "Cooking" ? "1" : "0.5" }}
              className="col text-center"
            >
              <i class="fas fa-check-circle"></i>
              <h6>Order Confirmed</h6>
            </div>
            <div style={{ opacity: 1 }} className="col progress--line">
              <ProgressBar
                animated
                now={order_info.status === "Cooking" ? "100" : "0.5"}
              />
            </div>
            <div
              style={{ opacity: order_info.status === "Cooking" ? "1" : "0.5" }}
              className="col text-center"
            >
              <i class="fas fa-pizza-slice"></i>
              <h6>Preparing</h6>
            </div>
            <div
              style={{ opacity: order_info.status === "Cooking" ? "1" : "0.5" }}
              className="col progress--line"
            >
              <ProgressBar
                animated
                now={order_info.status === "Cooking" ? "75" : "0.5"}
              />
            </div>
            <div style={{ opacity: 0.5 }} className="col text-center">
              <i class="fas fa-biking"></i>
              <h6>Out For Delivery</h6>
            </div>
            <div style={{ opacity: 0.5 }} className="col progress--line">
              <ProgressBar animated now={0} />
            </div>
            <div style={{ opacity: 0.5 }} className="col text-center">
              <i class="fas fa-laugh-wink"></i>
              <h6>Complete</h6>
            </div>
          </div>
          <h3 className="text-center">About 25 Minutes to go</h3>
          <div style={{ opacity: 1 }} className="col progress--line">
            <ProgressBar variant="success" animated now={25} />
          </div>
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
