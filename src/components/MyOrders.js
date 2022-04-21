import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPrivateData } from "../api/resdata";
import "../css/MyOrders.css";

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
  }, []);

  const navigate = useNavigate();
  function setOrderId(order_id) {
    setOrderID(order_id);
    navigate("/delivery-status");
  }
  let orders;
  if (user.my_orders) {
    orders = user.my_orders.map((order) => {
      return (
        <tr>
          <td className="order--id" onClick={() => setOrderId(order.order_id)}>
            {order.order_id}
          </td>
          <td>{order.status}</td>
          <td>285</td>
          <td>{order.time}</td>
          <td>Available</td>
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
    </div>
  );
}

export default MyOrders;
