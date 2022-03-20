import React, { Component } from "react";
import "../css/Profile.css";

export default function Profile({ user }) {
  return (
    <div className="container profile-container">
      <div className="profile-img-container">
        <img className="profile-image" src="images/pro_pic.jpg" alt=""></img>

        <h4>
          <strong>{user.name}</strong>
        </h4>
      </div>
      <hr className="dashboard--hr" />
      <div className="dashboard-container">
        <div className="col-3 left-dash">
          <h4 className="left-dash-item">Dashboard</h4>
          <h4 className="left-dash-item">Profile</h4>
          <h4 className="left-dash-item">Past Order</h4>
          <h4 className="left-dash-item">Offer</h4>
          <hr></hr>
          <h4 className="left-dash-item">Settings</h4>
          <h4 className="left-dash-item">Logout</h4>
        </div>
      </div>
    </div>
  );
}
