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
      const { data } = await axios.get(
        "http://localhost:3000/api/resdata",
        config
      );
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
        "http://localhost:3000/api/auth/reslogin",
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
      <img className="wave" src="images/wave-orange.png" />
      <div className="container" id="form--container">
        <div className="img">
          <img src="images/pngegg.png" className="img-fluid" />
        </div>
        <div className="login-content">
          <div className="form">
            <img src="images/chef.png" />
            <h2 className="title">Login</h2>
            <div onClick={form_effect} className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  name="email"
                  value={res_email}
                  onChange={(e) => setResEmail(e.target.value)}
                  type="text"
                  className="input"
                ></input>
              </div>
            </div>
            <div onClick={form_effect} className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  name="password"
                  value={res_password}
                  onChange={(e) => setResPassword(e.target.value)}
                  type="password"
                  className="input"
                ></input>
              </div>
            </div>
            <Nav.Link id="forgot--pass" href="#">
              Forgot Password?
            </Nav.Link>
            <input
              onClick={resloginHandler}
              type="submit"
              className="btn"
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
