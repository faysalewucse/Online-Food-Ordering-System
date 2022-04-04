import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Countdown from "react-countdown";
import "./OrderCard.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function OrderCard({ items }) {
  var current = new Date();

  const [timeModalShow, SetTimeModalShow] = useState(false);

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

  function delivery_time() {
    var current = new Date();
    console.log(items.time);
    var date1 = new Date(items.time);
    var date2 = new Date(
      current.toLocaleDateString() + " " + current.toLocaleTimeString()
    );

    var diff = date2.getTime() - date1.getTime();

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    return items.delivery_time * 60 - ss;
  }
  // const Completionist = () => <span>You are good to go!</span>;
  // const renderer = ({ hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     // Render a completed state
  //     return <Completionist />;
  //   } else {
  //     // Render a countdown
  //     return (
  //       <div className="d-flex align-items-center">
  //         <h6 className="time-card">{hours}</h6>
  //         <h6 className="time-card">{minutes}</h6>
  //         <h6 className="time-card">{seconds}</h6>
  //       </div>
  //     );
  //   }
  // };

  function showSetTimeModal() {
    SetTimeModalShow(true);
  }

  return (
    <div className="orders-card p-4 mb-5">
      <div>
        <div>
          <h3 style={{ fontFamily: "Poppins" }}>
            Ordered Items({items.result.length})
          </h3>
          <div className="row">
            <div className="col-6">
              <div className="ordered--items">{item}</div>
            </div>
            <div className="col-6">
              {items.status === "Cooking" ? (
                <CountdownCircleTimer
                  isPlaying
                  duration={delivery_time()}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[
                    delivery_time(),
                    delivery_time() / 2,
                    delivery_time() / 3,
                    delivery_time() / 4,
                  ]}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              ) : null}
            </div>
          </div>
          <div className="d-flex justify-content-between confirm--cancel--btn">
            <div className="status--box-confirm" onClick={showSetTimeModal}>
              {items.status === "Cooking" ? "Delivered" : "Confirm"}
            </div>
            <div className="status--box-cancel">Cancel</div>
          </div>
        </div>
      </div>
      {/* <div className="d-flex  justify-content-center align-items-center">
        <h6 className="text-center">Set Expectation Time to Deliver: </h6>
        <input className="time--input" type="number" />
        <h4>Minutes</h4>
      </div> */}

      {/* <Countdown date={Date.now() + 5000000} renderer={renderer} /> */}
      <SetTimeModal
        show={timeModalShow}
        onHide={() => SetTimeModalShow(false)}
        order_id={items.order_id}
        user_mail={items.user.email}
        res_mail={items.result[0].res_email}
        setTimeModalShow={SetTimeModalShow}
      />
    </div>
  );
}

function SetTimeModal(props) {
  const [delivery_time, setDeliveryTime] = useState();

  const orderConfirmed = async (e) => {
    try {
      //console.log(props.user_mail);
      var current_time = new Date();
      await axios.put("/api/auth/updatestatus_user", {
        order_id: props.order_id,
        user_mail: props.user_mail,
      });

      await axios.put("/api/auth/updatestatus_restaurent", {
        order_id: props.order_id,
        res_mail: props.res_mail,
        delivery_time: delivery_time,
        time:
          current_time.toLocaleDateString() +
          " " +
          current_time.toLocaleTimeString(),
      });
      props.setTimeModalShow(false);
    } catch (error) {
      throw error;
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <div className="row p-3 justify-content-center">
          <h4 className="text-center" style={{ fontFamily: "Righteous" }}>
            Set Expectation Time to Deliver <br />
            <input
              className="time--input"
              type="number"
              defaultValue={10}
              onChange={(e) => setDeliveryTime(e.target.value)}
            />
            <h4>Minutes</h4>
          </h4>
          <div className="status--box-confirm" onClick={orderConfirmed}>
            Confirm
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OrderCard;
