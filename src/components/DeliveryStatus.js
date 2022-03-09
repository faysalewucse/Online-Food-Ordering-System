import React from "react";
import { Table } from "react-bootstrap";
import "../css/DeliveryStatus.css";

function DeliveryStatus() {
  return (
    <div className="container delivery-status-container">
      <Table>
        <tbody>
          <tr>
            <td>
              <img
                className="del-sta-icon"
                src="./images/shopping-bag.png"
                alt="shopping-bag"
              />
            </td>
            <td>.</td>
            <td>Order Placed</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default DeliveryStatus;
