import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import { makeFormEffect } from "./FormStyle";
import axios from "axios";

const RestaurentLogin = ({ setRestaurent }) => {
  const navigate = useNavigate();
  const form_effect = () => {
    makeFormEffect();
  };

  const [res_email, setResEmail] = useState("");
  const [res_password, setResPassword] = useState("");
  const [error, setError] = useState("");

  const fetchPrivateDate = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authTokenRes")}`,
      },
    };

    try {
      const { data } = await axios.get("/api/resdata", config);
      setRestaurent(data.data);
    } catch (error) {
      localStorage.removeItem("authTokenRes");
      setError("You are not authorized please login");
    }
  };

  const resloginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/reslogin",
        { res_email, res_password },
        config
      );

      localStorage.setItem("authTokenRes", data.token);

      fetchPrivateDate();

      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  makeFormEffect();

  console.log(localStorage.getItem("authTokenRes"));
  return (
    <div className="login--body">
      <img class="wave" src="images/wave-orange.png" />
      <div class="container" id="form--container">
        <div class="img">
          <img src="images/pngegg.png" className="img-fluid" />
        </div>
        <div class="login-content">
          <div className="form">
            <img src="images/chef.png" />
            <h2 class="title">Login</h2>
            <div onClick={form_effect} class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Email</h5>
                <input
                  name="email"
                  value={res_email}
                  onChange={(e) => setResEmail(e.target.value)}
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
                  value={res_password}
                  onChange={(e) => setResPassword(e.target.value)}
                  type="password"
                  class="input"
                ></input>
              </div>
            </div>
            <Nav.Link id="forgot--pass" href="#">
              Forgot Password?
            </Nav.Link>
            <input
              onClick={resloginHandler}
              type="submit"
              class="btn"
              value="Login"
            ></input>
            <h6>
              Don't Have a Restaurent Account?{" "}
              <span onClick={() => navigate("/addrestaurent")} id="sign--up">
                Sign Up
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurentLogin;
