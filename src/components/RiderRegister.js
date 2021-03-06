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
        "/api/auth/rider_register",
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
        <img class="wave" src="images/wave.png" alt="wavepng" />
        <div class="container" id="form--container">
          <div className="img">
            <img src="images/undraw_bike_ride.svg" alt="wavepng" />
          </div>
          <div class="login-content">
            <div className="form">
              <img
                style={{ marginTop: 10 }}
                src="images/undraw_bike_ride.svg"
                alt="wavepng"
              />
              <h2 class="title">Register</h2>
              {error && <span className="error-message">{error}</span>}
              <div onClick={form_effect} class="input-div one">
                <div class="i">
                  <i class="fas fa-user"></i>
                </div>
                <div class="div">
                  <h5>Name</h5>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="input"
                  ></input>
                </div>
              </div>
              <div onClick={form_effect} class="input-div one">
                <div class="i">
                  <i class="fas fa-at"></i>
                </div>
                <div class="div">
                  <h5>Email</h5>
                  <input
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    class="input"
                  ></input>
                </div>
              </div>
              <div onClick={form_effect} class="input-div address">
                <div class="i">
                  <i class="fas fa-user"></i>
                </div>
                <div class="div">
                  <h5>Address</h5>
                  <input
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    class="input"
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

              <div onClick={form_effect} class="input-div pass">
                <div class="i">
                  <i class="fas fa-lock"></i>
                </div>
                <div class="div">
                  <h5>Password</h5>
                  <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    class="input"
                  ></input>
                </div>
              </div>
              <input
                onClick={riderRegisterHandler}
                type="submit"
                class="btn"
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
