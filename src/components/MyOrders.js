import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPrivateData } from "../api/resdata";
import "../css/MyOrders.css";

function MyOrders({ user, setOrderID }) {
  useEffect(() => {
    if (localStorage.getItem("loadOrders")) {
      window.location.reload(false);
      localStorage.removeItem("loadOrders");
    }
  }, []);

  const navigate = useNavigate();
  function setOrderId(order_id, status, reviewed) {
    setOrderID(order_id);
    if (status !== "Complete" && reviewed !== "true")
      navigate("/delivery-status");
    else if (reviewed !== "false") navigate("/order-review-page");
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
          <td>{order.reviewed === "false" ? "N/A" : "Available"}</td>
        </tr>
      );
    });
  }

  console.log(user.my_orders);

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
    </div>
  );
}

export default MyOrders;
