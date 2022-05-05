import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "../css/RiderPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchRiderData } from "../api/resdata";

function RiderPage({ rider, setRider, setAllRestaurent }) {
  const [value, setValue] = useState(rider.availibility);

  const orderCompleted = async (order_id, res_email, user_email) => {
    const updateUserResState = async (order_id, res_email, user_email) => {
      await axios.put("/api/auth/updatestatus_user_deli", {
        order_id: order_id,
        user_mail: user_email,
        status: "Completed",
      });
      await axios.put("/api/auth/updatestatus_restaurent_deli", {
        order_id: order_id,
        res_mail: res_email,
        status: "Completed",
      });

      await axios.put("/api/auth/updatestatus_rider", {
        order_id: order_id,
        rider_email: rider.email,
        status: "completed",
      });
      fetchRiderData(setRider, setAllRestaurent);
    };

    try {
      const data = await axios.get("/api/auth/get_order_state", {
        params: { res_email: res_email },
      });
      console.log(data.data[0].orders);
      if (data.data[0].orders) {
        data.data[0].orders.forEach((order) => {
          console.log(order);
          if (order.order_id === order_id) {
            console.log(order.status);
            if (order.status === "Delivered") {
              updateUserResState(order_id, res_email, user_email);
            } else {
              toast.error("Restaurant Does Not Delivered the Food Yet", {
                position: "top-center",
              });
              setTimeout(() => {}, 5000);
            }
          }
        });
      }

      //getAllRider(setAllRider);
    } catch (e) {
      toast.error("Error Occured", {
        position: "top-center",
      });
      setTimeout(() => {}, 5000);
    }
  };

  console.log(value);

  let orders,
    order_length = 0;
  if (rider) {
    orders = rider.my_orders.map((order) => {
      if (order.status === "notcompleted") {
        order_length += 1;
        return (
          <div className="rider-order-card col-4 mr-5">
            <div>
              <div>
                <h3 style={{ color: "green" }}>Restaurant</h3>
                <h6>{order.res_address}</h6>
                <h6>{order.res_name}</h6>
                <div className="d-flex align-items-center location">
                  <div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/search/${order.res_latlong}/@${order.res_latlong},17z`}
                    >
                      <i
                        style={{ color: "white", fontSize: "25px" }}
                        class="fa-solid fa-map-location-dot"
                      ></i>
                    </a>
                  </div>
                  <h6 style={{ marginTop: "10px", marginLeft: "10px" }}>
                    Watch Location In Google Map
                  </h6>
                </div>
                <br />
                <h3 style={{ color: "green" }}>Customer</h3>
                <h6>{order.user_name}</h6>
                <h6>{order.user_address}</h6>
                <h6>{order.user_phone}</h6>
                <div className="d-flex align-items-center location">
                  <div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/search/${order.user_latlong}/@${order.user_latlong},17z`}
                    >
                      <i
                        style={{ color: "white", fontSize: "25px" }}
                        class="fa-solid fa-map-location-dot"
                      ></i>
                    </a>
                  </div>
                  <h6 style={{ marginTop: "10px", marginLeft: "10px" }}>
                    Watch Location In Google Map
                  </h6>
                </div>
                <h6
                  onClick={() =>
                    orderCompleted(
                      order.order_id,
                      order.result[0].res_email,
                      order.user_email
                    )
                  }
                  className="rider-confirm-btn text-center"
                >
                  Complete
                </h6>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  const setAvailibility = async (rider_mail) => {
    setValue(value === "true" ? "false" : "true");
    await axios.put("/api/auth/rider_avail_update", {
      rider_mail: rider_mail,
      status: value === "true" ? "false" : "true",
    });
  };
  return (
    <div className="rider-page">
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">{rider.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav style={{ marginLeft: "auto" }}>
                <Nav.Link className="notify" eventKey={2} href="#memes">
                  <i className="fa badge fa-lg" value={2}>
                    <i
                      style={{ fontSize: "20px" }}
                      class="fa-solid fa-bell"
                    ></i>
                  </i>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div class="container">
          <div className="switch-btn d-flex justify-content-between">
            <h3>I'm Not Available to Receive Order</h3>
            <div>
              <input
                checked={value === "true" ? true : false}
                onChange={() => setAvailibility(rider.email)}
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
              />
              <label
                style={{ background: value === "true" && "#239b37" }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
              >
                <span className={`react-switch-button`} />
              </label>
            </div>
            <h3>I'm Available to Receive Order</h3>
          </div>
          {order_length === 0 ? (
            <div className="row empty-orders">
              <div className="col">
                <div className="text-center">
                  <img
                    src="images/cart-empty.svg"
                    alt="cart-empty"
                    className="cart--empty--png"
                  />
                  <h3 className="text-center cart-empty-text">
                    You have no pending Orders
                  </h3>
                  <h6 className="text-center cart-empty-text mb-5">
                    Wait for Restaurant order request
                  </h6>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">{orders}</div>
          )}
        </div>
      </div>
      <ToastContainer toastClassName="dark-toast" />
    </div>
  );
}

export default RiderPage;
