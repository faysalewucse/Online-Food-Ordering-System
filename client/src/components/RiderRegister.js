import React, { useEffect } from "react";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import { makeFormEffect } from "./FormStyle";
import { useState } from "react";
import axios from "axios";

export default function RiderRegister() {
  const navigate = useNavigate();
  const form_effect = () => {
    makeFormEffect();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [lattitude, setLattitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLattitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const riderRegisterHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/rider_register",
        {
          name,
          email,
          vehicle,
          lattitude,
          longitude,
          address,
          password,
        },
        config
      );

      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  makeFormEffect();
  return (
    <div>
      <div
        className="rider--register--body"
        style={{ height: "90vh", alignItems: "center" }}
      >
        <img className="wave" src="images/wave.png" alt="wavepng" />
        <div className="container" id="form--container">
          <div className="img">
            <img src="images/undraw_bike_ride.svg" alt="wavepng" />
          </div>
          <div className="login-content">
            <div className="form">
              <img
                style={{ marginTop: 10 }}
                src="images/undraw_bike_ride.svg"
                alt="wavepng"
              />
              <h2 className="title">Register</h2>
              {error && <span className="error-message">{error}</span>}
              <div onClick={form_effect} className="input-div one">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Name</h5>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                  ></input>
                </div>
              </div>
              <div onClick={form_effect} className="input-div one">
                <div className="i">
                  <i className="fas fa-at"></i>
                </div>
                <div className="div">
                  <h5>Email</h5>
                  <input
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="input"
                  ></input>
                </div>
              </div>
              <div onClick={form_effect} className="input-div address">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Address</h5>
                  <input
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="input"
                  ></input>
                </div>
              </div>
              <div className="text-start radio--input">
                <h4 style={{ fontFamily: "Righteous" }}>Vehicle Type</h4>
                <form>
                  <label className="radio-inline" style={{ marginRight: 25 }}>
                    <input
                      style={{ marginRight: 10 }}
                      type="radio"
                      name="optradio"
                      value="Bicycle"
                      required
                      onChange={(e) => setVehicle(e.target.value)}
                    />
                    Bicycle
                  </label>
                  <label className="radio-inline">
                    <input
                      style={{ marginRight: 10 }}
                      type="radio"
                      name="optradio"
                      value="Bike"
                      required
                      onChange={(e) => setVehicle(e.target.value)}
                    />
                    Bike
                  </label>
                </form>
              </div>

              <div onClick={form_effect} className="input-div pass">
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <h5>Password</h5>
                  <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    className="input"
                  ></input>
                </div>
              </div>
              <input
                onClick={riderRegisterHandler}
                type="submit"
                className="btn"
                value="Register"
              ></input>
              <h6>
                Already Have an Account?{" "}
                <span onClick={() => navigate("/login")} id="log--in">
                  Login
                </span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
