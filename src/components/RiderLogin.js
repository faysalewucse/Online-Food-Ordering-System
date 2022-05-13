import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import { makeFormEffect } from "./FormStyle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RiderLogin = ({ setRider }) => {
  const navigate = useNavigate();

  const form_effect = () => {
    makeFormEffect();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchRiderData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authTokenRider")}`,
      },
    };

    try {
      const { data } = await axios.get("/api/riderdata", config);

      console.log(data);

      setRider(data.data);
    } catch (error) {
      localStorage.removeItem("authTokenRider");
      setError("You are not authorized please login");
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/auth/riderlogin",
        { email, password },
        config
      );

      localStorage.setItem("authTokenRider", data.token);
      localStorage.setItem("showSnackbar", true);

      fetchRiderData();
      navigate("/");
    } catch (e) {
      setError(e.response.data.error);
      console.log("Error");
      toast.error(e.response.data.error, {
        position: "top-center",
      });
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  makeFormEffect();

  return (
    <div className="login--body">
      <img class="wave" src="images/wave.png" />
      <div class="container" id="form--container">
        <div class="img">
          <img src="images/undraw_bike_ride.svg" />
        </div>
        <div class="login-content">
          <div className="form">
            <img src="images/undraw_bike_ride.svg" />
            <h2 class="title">Rider Login</h2>
            <div onClick={form_effect} class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Email</h5>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  class="input"
                ></input>
              </div>
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
                  class="input"
                ></input>
              </div>
            </div>
            <Nav.Link id="forgot--pass" href="/forgotpassword">
              Forgot Password?
            </Nav.Link>
            <input
              onClick={loginHandler}
              type="submit"
              class="btn"
              value="Login"
            ></input>
            <h6>
              Don't Have an Account?{" "}
              <span onClick={() => navigate("/rider_registration")} id="sign--up">
                Sign Up
              </span>
            </h6>
          </div>
        </div>
      </div>
      <ToastContainer toastClassName="dark-toast" />
    </div>
  );
};

export default RiderLogin;
