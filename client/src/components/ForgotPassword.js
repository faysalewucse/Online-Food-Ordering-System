import React, { useState, useRef } from "react";
import axios from "axios";
import "../css/ForgotPassword.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const form = useRef();
  const vertical = "bottom",
    horizontal = "center";
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios
        .post(
          "http://localhost:3000/api/auth/forgotpassword",
          { email },
          config
        )
        .then((response) => {
          console.log(response.data.data);
          setMsg(response.data.data);
        })
        .catch((error) => {
          console.log("ERROR");
        });
    } finally {
      emailjs
        .sendForm(
          "service_3v0w01r",
          "template_7o3awvk",
          form.current,
          "YiqxE4MGs2K72WJZl"
        )
        .then(
          (result) => {
            setSuccess("Email Sent");
            toast.success("Email Was sent successfully.Check Your Email", {
              position: "top-center",
            });
            setTimeout(() => {
              setError("");
            }, 5000);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <div className="forgotpassword-screen">
      <form
        ref={form}
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <label className="email--text" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            required
            name="user_email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-form-input"
          />
          <textarea hidden name="message" defaultValue={msg} />
        </div>
        <button type="submit" className="send--email--btn">
          Send Email
        </button>
      </form>
      <ToastContainer toastClassName="dark-toast" />
    </div>
  );
};

export default ForgotPasswordScreen;
