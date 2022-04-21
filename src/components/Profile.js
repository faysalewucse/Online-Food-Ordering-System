import React, { useState, useEffect } from "react";
import "../css/Profile.css";

export default function Profile({ user }) {
  const [display, setDisplay] = useState();

  useEffect(() => {
    setDisplay(Dashboard);
  }, []);

  let completeOrders;
  if (user) {
    completeOrders = user.my_orders.map((data) => {
      console.log(data.result);
    });
  }

  function changeState(state) {
    if (state === "dashboard") setDisplay(Dashboard);
    if (state === "user-about") setDisplay(UserAbout);
    if (state === "user-order-history") setDisplay(UserOrderHistory);
    if (state === "settings") setDisplay(Settings);
    if (state === "logout") setDisplay(LogOut);
  }
  function Dashboard() {
    return (
      <div className="text-center p-3">
        <div className="row">
          <div className="col dashboard-card">
            <i className="fa-solid fa-book-open dashboard-icon"></i>
            <h4>Total Order</h4>
            <h1>{2}</h1>
          </div>
          <div className="col dashboard-card">
            <i class="fa-solid fa-clock dashboard-icon"></i>
            <h4>Active Order</h4>
            <h1>2</h1>
          </div>
          <div className="col dashboard-card">
            <i class="fa-solid fa-sack-dollar dashboard-icon"></i>
            <h4>Total Spent</h4>
            <h1>285TK</h1>
          </div>
        </div>
      </div>
    );
  }
  function UserAbout() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <h4 className="user--about">Name: {user.name}</h4>
            <h4 className="user--about">Email: {user.email}</h4>
          </div>
          <div className="col">
            <h4 className="user--about">Address: {user.address}</h4>
            <h4 className="user--about">Phone Number: {}</h4>
          </div>
        </div>
      </div>
    );
  }
  function UserOrderHistory() {
    return "UserOrderHistory";
  }
  function Settings() {
    return "Settings";
  }
  function LogOut() {
    return "Logout";
  }
  return (
    <div className="container profile-container">
      <div className="profile-img-container">
        <img
          className="profile-image"
          src="images/pro_pic.jpg"
          alt="pro_pic"
        ></img>

        <h4>
          <strong>{user.name}</strong>
        </h4>
      </div>
      <hr className="dashboard--hr" />
      <div className="dashboard-container">
        <div className="row">
          <div className="col-3 left-dash">
            <h4
              onClick={() => changeState("dashboard")}
              className="left-dash-item"
            >
              Dashboard
            </h4>
            <h4
              onClick={() => changeState("user-about")}
              className="left-dash-item"
            >
              About
            </h4>
            <h4
              onClick={() => changeState("user-order-history")}
              className="left-dash-item"
            >
              Completed Order
            </h4>
            <hr></hr>
            <h4
              onClick={() => changeState("settings")}
              className="left-dash-item"
            >
              Settings
            </h4>
            <h4
              onClick={() => changeState("logout")}
              className="left-dash-item"
            >
              Logout
            </h4>
          </div>
          <div className="col-9">{display}</div>
        </div>
      </div>
    </div>
  );
}
