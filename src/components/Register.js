import React from "react";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeFormEffect } from "./FormStyle";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const form_effect = () => {
    makeFormEffect();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        address,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Success");
      console.log("Registration Success");
      navigate("/login");
    }
  }

  makeFormEffect();
  return (
    <div>
      <div className="register--body">
        <img class="wave" src="images/wave.png" />
        <div class="container" id="form--container">
          <div class="img">
            <img src="images/undraw_hamburger.svg" />
          </div>
          <div class="login-content">
            <div className="form">
              <img src="images/undraw_profile.svg" />
              <h2 class="title">Register</h2>
              <div onClick={form_effect} class="input-div one">
                <div class="i">
                  <i class="fas fa-user"></i>
                </div>
                <div class="div">
                  <h5>Name</h5>
                  <input
                    type="text"
                    name="name"
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
              <input
                onClick={registerUser}
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
