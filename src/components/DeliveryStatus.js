import React from "react";
import "../css/DeliveryStatus.css";
import { ProgressBar } from "react-bootstrap";

function DeliveryStatus({
  order_placed,
  order_confirmed,
  preparing,
  out_for_delivery,
  complete,
  time_progress,
  order_placed_progress,
  order_confirmed_progress,
  preparing_progress,
  out_for_delivery_progress,
}) {
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
              asdf57a68sd7fa6s5d7f
            </h6>
            <input id="hiddenInput" type="hidden" />
          </div>
          <div className="row">
            <div style={{ opacity: order_placed }} className="col text-center">
              <i className="fas fa-clipboard-check"></i>
              <h6>Order Placed</h6>
            </div>
            <div style={{ opacity: "1" }} className="col progress--line">
              <ProgressBar animated now={order_placed_progress} />
            </div>
            <div
              style={{ opacity: order_confirmed }}
              className="col text-center"
            >
              <i class="fas fa-check-circle"></i>
              <h6>Order Confirmed</h6>
            </div>
            <div
              style={{ opacity: order_confirmed_progress }}
              className="col progress--line"
            >
              <ProgressBar animated now={0} />
            </div>
            <div style={{ opacity: preparing }} className="col text-center">
              <i class="fas fa-pizza-slice"></i>
              <h6>Preparing</h6>
            </div>
            <div
              style={{ opacity: preparing_progress }}
              className="col progress--line"
            >
              <ProgressBar animated now={0} />
            </div>
            <div
              style={{ opacity: out_for_delivery }}
              className="col text-center"
            >
              <i class="fas fa-biking"></i>
              <h6>Out For Delivery</h6>
            </div>
            <div
              style={{ opacity: out_for_delivery_progress }}
              className="col progress--line"
            >
              <ProgressBar animated now={0} />
            </div>
            <div style={{ opacity: complete }} className="col text-center">
              <i class="fas fa-laugh-wink"></i>
              <h6>Complete</h6>
            </div>
          </div>
          <h3 className="text-center">About 25 Minutes to go</h3>
          <div
            style={{ opacity: time_progress }}
            className="col progress--line"
          >
            <ProgressBar variant="success" animated now={25} />
          </div>
          <hr />
          <h1>Ordered Items</h1>
          <div>
            <p>2 * BBQ Burger</p>
            <p>1 * Naga Burger</p>
            <p>3 * Chicken Burger</p>
            <p>1 * Pizza</p>
            <hr />
            <div className="d-flex justify-content-between">
              <h6>Total</h6>
              <h6>440 Tk</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryStatus;
