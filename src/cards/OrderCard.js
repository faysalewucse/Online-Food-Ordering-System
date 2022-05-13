import axios from "axios";
import React, { useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import "./OrderCard.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { fetchPrivateData, fetchResData, getAllUser } from "../api/resdata";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

function OrderCard({
  items,
  setRestaurent,
  setUser,
  allRider,
  setAllUser,
  setOrdersCount,
  setAllRestaurent,
  setCartCount,
  getAllRider,
  setAllRider,
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

  console.log(allRider);

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
              {items.status === "Cooking" ? "Deliver" : "Confirm"}
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
        result={items.result}
        user={items.user}
        user_mail={items.user.email}
        res_mail={items.result[0].res_email}
        setTimeModalShow={SetTimeModalShow}
        setRestaurent={setRestaurent}
        setOrdersCount={setOrdersCount}
        setUser={setUser}
        allRider={allRider}
        setAllUser={setAllUser}
        setAllRestaurent={setAllRestaurent}
        setCartCount={setCartCount}
        setAllRider={setAllRider}
        getAllRider={getAllRider}
      />
      <ToastContainer toastClassName="dark-toast" />
    </div>
  );
}

function SetTimeModal(props) {
  const [del_time, setDeliveryTime] = useState(10);
  const [riderEmail, setRiderEmail] = useState("null");

  const orderConfirmed = async (e) => {
    const statusTrueConfirmOrder = async (props, del_time, riderEmail) => {
      var current_time = new Date();
      await axios.put("/api/auth/updatestatus_user", {
        order_id: props.order_id,
        user_mail: props.user_mail,
        delivery_time: del_time,
        rider_mail: riderEmail,
        time:
          current_time.toLocaleDateString("en-US") +
          " " +
          current_time.toLocaleTimeString(),
      });

      await axios.put("/api/auth/updatestatus_restaurent", {
        order_id: props.order_id,
        res_mail: props.res_mail,
        delivery_time: del_time,
        rider_mail: riderEmail,
        time:
          current_time.toLocaleDateString("en-US") +
          " " +
          current_time.toLocaleTimeString(),
      });

      await axios.put("/api/auth/update_rider_orders", {
        order_id: props.order_id,
        rider_mail: riderEmail,
        result: props.result,
        res_name: props.result[0].res_name,
        user_name: props.user.name,
        user_email: props.user.email,
        user_phone: props.user.phone,
        res_address: props.result[0].res_address,
        res_latlong: props.result[0].latlong,
        user_latlong: `${props.user.lattitude}, ${props.user.longitude}`,
        user_address: props.user.address,
      });

      fetchResData(props.setRestaurent, props.setOrdersCount);
      fetchPrivateData(
        props.setUser,
        props.setAllRestaurent,
        props.setCartCount
      );
      getAllUser(props.setAllUser);
      props.setTimeModalShow(false);
    };

    try {
      const rider = await axios.post("/api/auth/get_rider", {
        rider_mail: riderEmail,
      });

      if (rider.data.availibility === "true") {
        statusTrueConfirmOrder(props, del_time, riderEmail);
      } else {
        toast.error("Rider is Not Available", {
          position: "top-center",
        });
        setTimeout(() => {}, 5000);
      }
    } catch (e) {
      // toast.error("Error Occured", {
      //   position: "top-center",
      // });
      // setTimeout(() => {}, 5000);
      console.log(e);
    }
  };

  const aquaticCreatures = [{ label: "Name(Address, Charge)", value: "null" }];

  props.allRider.forEach((rider) => {
    if (rider.availibility === "true")
      aquaticCreatures.push({ label: rider.name, value: rider.email });
  });
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <div className="row p-3 justify-content-center">
          <h4
            className="text-center d-flex"
            style={{ fontFamily: "Righteous", fontSize: "20px" }}
          >
            Set Expectation Time to Deliver <br />
            <input
              name="delivery_time"
              className="input time--input"
              type="number"
              defaultValue={10}
              onChange={(e) => setDeliveryTime(e.target.value)}
            />
            <h4 style={{ fontFamily: "Righteous", fontSize: "20px" }}>
              Minutes
            </h4>
          </h4>
          <Select
            className="mb-3"
            options={aquaticCreatures}
            placeholder="Select Rider"
            onMenuOpen={() => props.getAllRider(props.setAllRider)}
            onMenuClose={() => props.getAllRider(props.setAllRider)}
            onChange={(e) => setRiderEmail(e.value)}
          />
          <div
            className="status--box-confirm"
            onClick={riderEmail !== "null" && orderConfirmed}
          >
            Confirm
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OrderCard;
