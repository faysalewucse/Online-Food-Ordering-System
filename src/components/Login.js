import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import { makeFormEffect } from "./FormStyle";
import axios from "axios";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const form_effect = () => {
    makeFormEffect();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchPrivateDate = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const { data } = await axios.get("/api/private", config);
      setUser(data.data);
    } catch (error) {
      localStorage.removeItem("authToken");
      setError("You are not authorized please login");
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

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

  return (
    <div className="login--body">
      <img class="wave" src="images/wave.png" />
      <div class="container" id="form--container">
        <div class="img">
          <img src="images/undraw_hamburger.svg" />
        </div>
        <div class="login-content">
          <div className="form">
            <img src="images/undraw_profile.svg" />
            <h2 class="title">Login</h2>
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
              <span onClick={() => navigate("/register")} id="sign--up">
                Sign Up
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
