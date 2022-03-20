import React from "react";
import "../css/RestaurentOrders.css";
import Countdown from "react-countdown";

function RestaurentOrders({
  setOp,
  setOc,
  setPrep,
  setOfd,
  setComplete,
  setOpp,
  setOcp,
  setPp,
  setOfdp,
}) {
  const [time, setTime] = React.useState();

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

  setOp(1);
  setOpp(75);
  function order_confirmed() {
    setOp(75);
  }

  return (
    <div className="container">
      <div className="orders--container">
        <h2 className="text-center mt-5 mb-5">
          Continiously Update Order Status to Help Customer to Track Delivery
        </h2>
        <div className="orders-card p-5">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <h3>Ordered Items(3)</h3>
              <h6>2 x BBQ Burger</h6>
              <h6>2 x Naga Burger</h6>
              <h6>2 x Cheese Burger</h6>
              <h6>2 x Pizza</h6>
            </div>
            <div>
              <div className="mb-5">Order ID: 54dsf5s4df5g4sd54fg</div>
              <div onClick={order_confirmed} className="status--box">
                Confirm
              </div>
              <div className="status--box">Cancel</div>
              <div className="status--box active-status">Cooking</div>
              <div className="status--box">Delivered</div>
            </div>
          </div>
          <div className="d-flex  justify-content-center align-items-center">
            <h4 className="text-center">Set Expectation Time to Deliver: </h4>
            <input className="time--input" type="number" />
            <h4>Minutes</h4>
          </div>
          <div className="time--container">
            <Countdown date={Date.now() + 5000000} renderer={renderer} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurentOrders;
