import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../css/MyOrders.css";

function MyOrders() {
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
        <tbody>
          <tr>
            <td>
              <Nav.Link className="order--id" as={Link} to={"/delivery-status"}>
                123456
              </Nav.Link>
            </td>
            <td>Cooking</td>
            <td>285</td>
            <td>03/12/2022 10:46 PM</td>
            <td>Available</td>
          </tr>
          <tr className="active-row">
            <td>123456</td>
            <td>Delivered</td>
            <td>145</td>
            <td>03/12/2022 10:46 PM</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>123456</td>
            <td>Delivered</td>
            <td>145</td>
            <td>03/12/2022 10:46 PM</td>
            <td>N/A</td>
          </tr>
          <tr className="active-row">
            <td>123456</td>
            <td>Delivered</td>
            <td>145</td>
            <td>03/12/2022 10:46 PM</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>123456</td>
            <td>Delivered</td>
            <td>145</td>
            <td>03/12/2022 10:46 PM</td>
            <td>N/A</td>
          </tr>
          <tr className="active-row">
            <td>123456</td>
            <td>Delivered</td>
            <td>145</td>
            <td>03/12/2022 10:46 PM</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MyOrders;
