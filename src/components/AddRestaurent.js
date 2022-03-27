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
  const [resphoto, setResPhoto] = useState("");

  const ResPhotoChange = (e) => {
    setResPhoto(e.target.files[0]);
  };

  const AddRestaurent = async (data) => {
    try {
      await axios.post("/api/auth/resregister", data);
    } catch (error) {
      throw error;
    }
  };

  const registerRestaurentHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", resphoto);
    formData.append("name", name);
    formData.append("res_name", res_name);
    formData.append("res_email", res_email);
    formData.append("lattitude", lattitude);
    formData.append("longitude", longitude);
    formData.append("res_password", res_password);
    formData.append("res_address", res_address);

    await AddRestaurent(formData);
    navigate("/restaurentlogin");
    //window.location.reload(false);
  };
  // const registerRestaurentHandler = async (e) => {
  //   e.preventDefault();

  //   const config = {
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   try {
  //     const { data } = await axios.post(
  //       "/api/auth/resregister",
  //       {
  //         name,
  //         res_name,
  //         res_email,
  //         res_address,
  //         lattitude,
  //         longitude,
  //         res_password,
  //       },
  //       config
  //     );

  //     localStorage.setItem("authTokenRes", data.token);

  //     navigate("/restaurentlogin");
  //   } catch (error) {
  //     setError(error.response.data.error);
  //     setTimeout(() => {
  //       setError("");
  //     }, 5000);
  //   }
  // };

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
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    class="input"
                    className="form-input form-class"
                  />
                </div>
                <div className="form-group right">
                  <label htmlFor="lastname" className="label-title">
                    Restaurent Name *
                  </label>
                  <input
                    name="res_name"
                    onChange={(e) => setResName(e.target.value)}
                    type="text"
                    class="input"
                    className="form-input form-class"
                  />
                </div>
                <>
                  <div className="form-group">
                    <label htmlFor="email" className="label-title">
                      Business Email*
                    </label>
                    <input
                      name="res_email"
                      onChange={(e) => setResEmail(e.target.value)}
                      type="email"
                      class="input"
                      className="form-input form-class"
                    />
                  </div>
                  <div className="horizontal-group">
                    <div className="form-group left">
                      <label htmlFor="password" className="label-title">
                        Password *
                      </label>
                      <input
                        name="res_password"
                        onChange={(e) => setResPassword(e.target.value)}
                        type="password"
                        class="input"
                        className="form-input form-class"
                      />
                    </div>
                    <div className="form-group right">
                      <label htmlFor="confirm-password" className="label-title">
                        Confirm Password *
                      </label>
                      <input
                        name="res_confirm_password"
                        onChange={(e) => setResConfirmPassword(e.target.value)}
                        type="password"
                        class="input"
                        className="form-input form-class"
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
                          <input
                            type="file"
                            id="choose-file"
                            size={100}
                            onChange={(e) => ResPhotoChange(e)}
                          />
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
