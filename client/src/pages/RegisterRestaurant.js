import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegisterRestaurant.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAddRestaurantMutation } from "../features/restaurant/restaurantApi";

function AddRestaurent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [res_name, setResName] = useState("");
  const [res_email, setResEmail] = useState("");
  const [res_address, setResAddress] = useState("");
  const [res_contact, setResContact] = useState("");
  const [res_password, setResPassword] = useState("");
  const [res_confirm_password, setResConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  // const [res_image, setResImage] = useState("");
  const [lattitude, setLattitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    navigator.geolocation.getCurrentPosition(function (position) {
      setLattitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const [addRestaurant, { isLoading, error: responseError }] =
    useAddRestaurantMutation();

  const RegisterRestaurant = async (data) => {
    try {
      const result = await addRestaurant(data);
      return result.data.success;
    } catch (e) {
      setError(responseError);
    }
  };

  const registerRestaurentHandler = async (e) => {
    e.preventDefault();

    try {
      if (name === "") throw new Error("Name field is required.");
      else if (res_name === "")
        throw new Error("Outlate name field is required.");
      else if (res_name === "")
        throw new Error("Outlate name field is required.");
      else if (res_contact === "" || res_contact.length < 11)
        throw new Error("Contact field is required & 11 digit mobile number.");
      else if (lattitude === "" || longitude === "")
        throw new Error("Allow location and refresh page");
      else if (res_email === "")
        throw new Error("Business email field is required.");
      if (res_password !== res_confirm_password || res_password === "")
        throw new Error("Password and confirm password didn't match.");

      const success = await RegisterRestaurant({
        name,
        res_name,
        res_email,
        res_address,
        lattitude,
        longitude,
        res_password,
        res_contact,
      });

      if (success) setSuccessModal(true);
    } catch (error) {
      // console.log(error.message);
      setError(error.message);
      // hide error message after 2 seconds
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div
      className="register-restaurant"
      style={{
        background: `linear-gradient(rgb(255, 255, 255, 0), rgba(43, 43, 43)), url("images/background/foods.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="dark-overlay"></div>
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <form className="signup-form">
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
                    required
                    className="input form-input form-class"
                  />
                </div>
                <div className="form-group right">
                  <label htmlFor="lastname" className="label-title">
                    Outlet Name *
                  </label>
                  <input
                    name="res_name"
                    onChange={(e) => setResName(e.target.value)}
                    type="text"
                    required
                    className="input form-input form-class"
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
                      required
                      className="input form-input form-class"
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
                        required
                        className="input form-input form-class"
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
                        required
                        className="input form-input form-class"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="choose-file" className="label-title">
                      Contact Number
                    </label>
                    <input
                      className="form-input"
                      name="res_contact"
                      type="number"
                      defaultValue={res_contact}
                      onChange={(e) => setResContact(e.target.value)}
                    />
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
              </div>
            </div>

            <>
              <div className="form-footer">
                {isLoading && (
                  <div className="d-flex justify-content-center text-light">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                <h6 className="text-danger">{error}</h6>
                <span>* required</span>
                <button
                  type="submit"
                  className="create-btn order-now-btn"
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
      {successModal && (
        <div className="success position-absolute top-0 w-100 h-100">
          <div className="modal-bg">
            <div className="modal-dialog modal-confirm">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="icon-box">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <h4 className="modal-title w-100 mb-2">Awesome!</h4>
                </div>
                <div className="modal-body">
                  <p className="text-center">
                    Your registration has been completed. We will contact with
                    you very soon. Check your email for furhter login
                    information.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-success btn-block"
                    data-dismiss="modal"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddRestaurent;
