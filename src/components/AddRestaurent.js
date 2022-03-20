import React from "react";
import "../css/AddRestaurent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRestaurent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [res_name, setResName] = useState("");
  const [res_email, setResEmail] = useState("");
  const [res_address, setResAddress] = useState("");
  const [lattitude, setLattitude] = useState("90.2356478");
  const [longitude, setLongitude] = useState("85.2415632");
  const [res_password, setResPassword] = useState("");
  const [res_confirm_password, setResConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerRestaurentHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/resregister",
        {
          name,
          res_name,
          res_email,
          res_address,
          lattitude,
          longitude,
          res_password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      navigate("/restaurentlogin");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <form className="signup-form" action="/register" method="post">
            <div className="form-header">
              <h1>Create Account</h1>
            </div>
            <div className="form-body">
              <div className="horizontal-group">
                <div className="form-group left">
                  <label htmlFor="firstname" className="label-title">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="name"
                    className="form-input"
                    placeholder="enter your first name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group right">
                  <label htmlFor="lastname" className="label-title">
                    Restaurent Name *
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="res_name"
                    className="form-input"
                    placeholder="enter your last name"
                    value={res_name}
                    onChange={(e) => setResName(e.target.value)}
                  />
                </div>
                <>
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email" className="label-title">
                      Business Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="res_email"
                      className="form-input"
                      placeholder="enter your email"
                      value={res_email}
                      onChange={(e) => setResEmail(e.target.value)}
                    />
                  </div>
                  {/* Passwrod and confirm password */}
                  <div className="horizontal-group">
                    <div className="form-group left">
                      <label htmlFor="password" className="label-title">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="password"
                        className="form-input"
                        placeholder="Country"
                      />
                    </div>
                    <div className="form-group right">
                      <label htmlFor="confirm-password" className="label-title">
                        District *
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        id="confirm-password"
                        placeholder="District"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="horizontal-group">
                    <div className="form-group left">
                      <label htmlFor="password" className="label-title">
                        Thana *
                      </label>
                      <input
                        type="text"
                        id="password"
                        className="form-input"
                        placeholder="Thana"
                        required="required"
                      />
                    </div>
                    <div className="form-group right">
                      <label htmlFor="confirm-password" className="label-title">
                        Area *
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        id="confirm-password"
                        placeholder="Area"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="horizontal-group">
                    <div className="form-group left">
                      <label htmlFor="password" className="label-title">
                        Password *
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="res_password"
                        className="form-input"
                        placeholder="enter your password"
                        value={res_password}
                        onChange={(e) => setResPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group right">
                      <label htmlFor="confirm-password" className="label-title">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        className="form-input"
                        id="confirm-password"
                        name="res_confirm_password"
                        placeholder="enter your password again"
                        required="required"
                        value={res_confirm_password}
                        onChange={(e) => setResConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <>
                    <>
                      <div className="horizontal-group">
                        <div className="form-group">
                          <label htmlFor="choose-file" className="label-title">
                            Upload Profile Picture
                          </label>
                          <br />
                          <input type="file" id="choose-file" size={100} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="choose-file" className="label-title">
                          Full Address
                        </label>
                        <textarea
                          className="form-input"
                          rows={4}
                          cols={50}
                          name="res_address"
                          style={{ height: "auto" }}
                          defaultValue={res_address}
                          onChange={(e) => setResAddress(e.target.value)}
                        />
                      </div>
                    </>
                  </>
                </>
              </div>
            </div>

            <>
              <div className="form-footer">
                <span>* required</span>
                <button
                  type="submit"
                  className="btn"
                  onClick={registerRestaurentHandler}
                >
                  Create
                </button>
              </div>
            </>
          </form>
        </div>
        <div className="col-md-3 mt-4">
          <div className="advise-to-add-res">
            <h3>Get Started In Just 3 Steps</h3>
            <ul>
              <li>
                <h6>Give Your Restaurent Information</h6>
              </li>
              <li>
                <h6>Varify Your Email</h6>
              </li>
              <li>
                <h6>Login to Access</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRestaurent;
