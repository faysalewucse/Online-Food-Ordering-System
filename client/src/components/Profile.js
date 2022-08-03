import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchPrivateData } from "../api/resdata";
import "../css/Profile.css";

export default function Profile({
  user,
  setUser,
  setAllRestaurent,
  setCartCount,
}) {
  const [display, setDisplay] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setDisplay(Dashboard);
  }, []);

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
            <h1>{localStorage.getItem("totalOrder")}</h1>
          </div>
          <div className="col dashboard-card">
            <i class="fa-solid fa-clock dashboard-icon"></i>
            <h4>Active Order</h4>
            <h1>{localStorage.getItem("pendingOrder")}</h1>
          </div>
          <div className="col dashboard-card">
            <i class="fa-solid fa-sack-dollar dashboard-icon"></i>
            <h4>Total Spent</h4>
            <h1>{localStorage.getItem("totalSpent")}TK</h1>
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
            <h4 className="user--about">Name</h4>
            <h4 className="user--about">Email</h4>
            <h4 className="user--about">Address</h4>
            <h4 className="user--about">Phone Number</h4>
          </div>
          <div className="col">
            <h4 className="user--about">: {user.name}</h4>
            <h4 className="user--about">: {user.email}</h4>
            <h4 className="user--about">: {user.address}</h4>
            <h4 className="user--about">: {user.phone}</h4>
          </div>
        </div>
      </div>
    );
  }
  function UserOrderHistory() {
    return (
      <div className="container delivery-status-container">
        <h4 className="track--order--text text-center">{`All Completed Orders. Go to Track for Details`}</h4>

        <table className="styled-table text-center">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {user.my_orders.map((order) => {
              if (order.status === "Completed")
                return (
                  <tr>
                    <td className="order--id">{order.order_id}</td>
                    <td>{order.time}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  function Settings() {
    return "Will Update in the Next Update of Site";
  }
  function LogOut() {
    const logoutHandler = () => {
      localStorage.removeItem("authToken");
      setUser("");
      navigate("/");
    };
    return (
      <div style={{ fontSize: "20px" }}>
        Are You Sure You wanted to Log out{" "}
        <span
          style={{ padding: "5px", borderRadius: "5px", cursor: "pointer" }}
          className="btn-danger"
          onClick={logoutHandler}
        >
          Yes
        </span>
      </div>
    );
  }

  const [editmodalShow, setEditModalShow] = useState(false);
  function showEditModal() {
    setEditModalShow(true);
  }

  return (
    <div className="container profile-container">
      <div className="profile-img-container">
        <i
          style={{ fontSize: "70px" }}
          className="fa-solid fa-camera profile-image img-fluid"
        ></i>

        <h4 className="d-flex">
          <strong className="ml-5">{user.name}</strong>{" "}
          <i
            onClick={showEditModal}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            class="fa-solid fa-pen"
          ></i>
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
              Completed Orders
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
      <EditFoodFloatingModal
        show={editmodalShow}
        onHide={() => setEditModalShow(false)}
        setEditModalShow={setEditModalShow}
        user_name={user.name}
        user_mail={user.email}
        setUser={setUser}
        setAllRestaurent={setAllRestaurent}
        setCartCount={setCartCount}
      />
    </div>
  );
}

function EditFoodFloatingModal(props) {
  const [newName, setNewName] = useState(props.user_name);

  const updateName = async () => {
    try {
      await axios.put("/api/auth/update_user_name", {
        newName: newName,
        user_mail: props.user_mail,
      });
      props.setEditModalShow(false);
      fetchPrivateData(
        props.setUser,
        props.setAllRestaurent,
        props.setCartCount
      );
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
        <div className="row">
          <div className="add--food horizontal-group">
            <div className="form-group">
              Enter New Name:
              <input
                name="text"
                defaultValue={newName}
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                class="input"
                placeholder={newName}
                className="change--food--input"
              ></input>
            </div>
          </div>
        </div>
        <h4 onClick={updateName} className="update--food--btn">
          Update
        </h4>
      </div>
    </Modal>
  );
}
