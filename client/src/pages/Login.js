import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import { makeFormEffect } from "../components/FormStyle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "../features/auth/authApi";

const Login = () => {
  const form_effect = () => {
    makeFormEffect();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    login({
      email,
      password,
    });
  };

  makeFormEffect();

  return (
    <div className="login-body">
      <div className="container form-container">
        <div className="login-content">
          <div className="form">
            <img src="images/undraw_profile.svg" alt="profile" />
            <h2 className="title">Login</h2>
            <div onClick={form_effect} className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="input"
                ></input>
              </div>
            </div>
            <Nav.Link id="forgot--pass" href="/forgotpassword">
              Forgot Password?
            </Nav.Link>
            <input
              onClick={handleSubmit}
              type="submit"
              className="btn"
              value="Login"
            ></input>
            <h6 className="title">
              Don't Have an Account?{" "}
              <span onClick={() => navigate("/register")} className="sign-up">
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

export default Login;
