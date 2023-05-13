import React, { useEffect } from "react";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeFormEffect } from "./FormStyle";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const form_effect = () => {
    makeFormEffect();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
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

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          lattitude,
          longitude,
          address,
          phone,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);
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
      <div className="register--body">
        <img className="wave" src="images/wave.png" />
        <div className="container" id="form--container">
          <div className="img">
            <img src="images/undraw_hamburger.svg" />
          </div>
          <div className="login-content">
            <div className="form">
              <img src="images/undraw_profile.svg" />
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
              <div onClick={form_effect} className="input-div address">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Phone No</h5>
                  <input
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="input"
                  ></input>
                </div>
              </div>
              <input
                onClick={registerHandler}
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
