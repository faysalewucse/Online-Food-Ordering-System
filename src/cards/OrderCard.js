import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./OrderCard.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { fetchPrivateData, fetchResData, getAllUser } from "../api/resdata";

function OrderCard({
  items,
  setRestaurent,
  setUser,
  setAllUser,
  setOrdersCount,
  setAllRestaurent,
  setCartCount,
}) {
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

  console.log(items);

  function delivery_time() {
    var current = new Date();
    console.log(items.time);
    var date1 = new Date(items.time);
    var date2 = new Date(
      current.toLocaleDateString("en-US") + " " + current.toLocaleTimeString()
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

  const orderDeliveredorCanceled = async (status) => {
    try {
      await axios.put("/api/auth/updatestatus_user_deli", {
        order_id: items.order_id,
        user_mail: items.user.email,
        status: status,
      });

      await axios.put("/api/auth/updatestatus_restaurent_deli", {
        order_id: items.order_id,
        res_mail: items.result[0].res_email,
        status: status,
      });

      fetchResData(setRestaurent, setOrdersCount);
      fetchPrivateData(setUser, setAllRestaurent, setCartCount);
      getAllUser(setAllUser);
    } catch (error) {
      throw error;
    }
  };
  function showSetTimeModal() {
    items.status === "Confirm"
      ? SetTimeModalShow(true)
      : orderDeliveredorCanceled("Delivered");
  }

  function cancelOrder() {
    orderDeliveredorCanceled("Canceled");
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
                <div className="text-center">
                  <div className="d-flex justify-content-center mb-3">
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
                  </div>
                  <h4 style={{ fontFamily: "Righteous" }}>
                    Add
                    <input
                      name="delivery_time"
                      className="input time--input"
                      type="number"
                      defaultValue={10}
                    />
                    Minutes
                  </h4>
                </div>
              ) : null}
            </div>
          </div>
          <div className="d-flex justify-content-between confirm--cancel--btn">
            <div className="status--box-confirm" onClick={showSetTimeModal}>
              {items.status === "Cooking" ? "Delivered" : "Confirm"}
            </div>
            <div
              className="status--box-cancel"
              onClick={() => cancelOrder(items.order_id, items.user.email)}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
      <SetTimeModal
        show={timeModalShow}
        onHide={() => SetTimeModalShow(false)}
        order_id={items.order_id}
        user_mail={items.user.email}
        res_mail={items.result[0].res_email}
        setTimeModalShow={SetTimeModalShow}
        setRestaurent={setRestaurent}
        setOrdersCount={setOrdersCount}
        setUser={setUser}
        setAllUser={setAllUser}
        setAllRestaurent={setAllRestaurent}
        setCartCount={setCartCount}
      />
    </div>
  );
}

function SetTimeModal(props) {
  const [del_time, setDeliveryTime] = useState(10);

  const orderConfirmed = async (e) => {
    try {
      //console.log(props.user_mail);
      var current_time = new Date();
      await axios.put("/api/auth/updatestatus_user", {
        order_id: props.order_id,
        user_mail: props.user_mail,
        delivery_time: del_time,
        time:
          current_time.toLocaleDateString("en-US") +
          " " +
          current_time.toLocaleTimeString(),
      });

      await axios.put("/api/auth/updatestatus_restaurent", {
        order_id: props.order_id,
        res_mail: props.res_mail,
        delivery_time: del_time,
        time:
          current_time.toLocaleDateString("en-US") +
          " " +
          current_time.toLocaleTimeString(),
      });
      fetchResData(props.setRestaurent, props.setOrdersCount);
      fetchPrivateData(
        props.setUser,
        props.setAllRestaurent,
        props.setCartCount
      );
      getAllUser(props.setAllUser);
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
              name="delivery_time"
              className="input time--input"
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
