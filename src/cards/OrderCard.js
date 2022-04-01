import React from "react";
import Countdown from "react-countdown";
import "./OrderCard.css";

function OrderCard({ items }) {
  console.log(items);

  let item;
  if (items) {
    item = items.result.map((food) => {
      return (
        <h6>
          {food.count} x {food.food_name}
        </h6>
      );
    });
  }
  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="d-flex align-items-center">
          <h6 className="time-card">{hours}</h6>
          <h6 className="time-card">{minutes}</h6>
          <h6 className="time-card">{seconds}</h6>
        </div>
      );
    }
  };

  return (
    <div className="orders-card p-4 mb-5">
      <div>
        <div>
          <h3 style={{ fontFamily: "Poppins" }}>
            Ordered Items({items.result.length})
          </h3>
          {item}
          <div className="mt-5 d-flex justify-content-between">
            <div className="status--box-confirm">Confirm</div>
            <div className="status--box-cancel">Cancel</div>
          </div>
        </div>
        <div>
          {/* <div className="mb-5">Order ID: 54dsf5s4df5g4sd54fg</div> */}
          {/* <div className="status--box active-status">Cooking</div>
          <div className="status--box">Delivered</div> */}
        </div>
      </div>
      {/* <div className="d-flex  justify-content-center align-items-center">
        <h6 className="text-center">Set Expectation Time to Deliver: </h6>
        <input className="time--input" type="number" />
        <h4>Minutes</h4>
      </div> */}
      {/* <div className="time--container">
        <Countdown date={Date.now() + 5000000} renderer={renderer} />
      </div> */}
    </div>
  );
}

export default OrderCard;
