import React from "react";
import "../css/AddRestaurent.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { useState } from "react";

function AddRestaurent() {
  // const [name, setName] = useState("");
  // const [res_name, setResName] = useState("");
  // const [res_email, setResEmail] = useState("");
  // const [res_country, setResCountry] = useState("");
  // const [res_district, setResDistrict] = useState("");
  // const [res_thana, setResThana] = useState("");
  // const [res_area, setResArea] = useState("");
  // const [res_password, setResPassword] = useState("");
  // const [res_confirm_password, setResConfirmPassword] = useState("");
  // const [res_full_addresss, setResFullAddress] = useState("");

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
                    className="form-input"
                    placeholder="enter your first name"
                    required="required"
                  />
                </div>
                <div className="form-group right">
                  <label htmlFor="lastname" className="label-title">
                    Restaurent Name *
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="form-input"
                    placeholder="enter your last name"
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
                      className="form-input"
                      placeholder="enter your email"
                      required="required"
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
                        required="required"
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
                        className="form-input"
                        placeholder="enter your password"
                        required="required"
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
                        placeholder="enter your password again"
                        required="required"
                      />
                    </div>
                  </div>
                  <>
                    {/* Gender and Hobbies */}
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
                          style={{ height: "auto" }}
                          defaultValue={""}
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
                <button type="submit" className="btn">
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
