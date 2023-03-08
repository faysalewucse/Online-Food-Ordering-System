import React, { useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../features/auth/authSlice";

export default function Navbar() {
  // Initialize Variables
  const [subMenu, setSubMenu] = useState(false);

  // user from redux store
  const { user } = useSelector((state) => state.auth);
  const { cart } = user || 0;

  // Dipatcher
  const dispatch = useDispatch();

  // When scrolling hide sub menu
  window.addEventListener("scroll", function () {
    setSubMenu(false);
  });

  // logout handler
  const logoutHandler = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark py-3">
      <div className="container">
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            Foods
            <span style={{ color: "#38ac33", fontWeight: "700" }}>Hub</span>
          </a>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
          {user ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/track">
                  Track
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  <i className="fa badge fa-lg" value={cart?.length}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </i>
                </a>
              </li>
              <li className="mt-1 profile-avatar">
                <h5 onClick={() => setSubMenu(!subMenu)} className="avatar">
                  {user.name[0]}
                </h5>
                {subMenu ? (
                  <ul className="sub-menu">
                    <li>
                      <h2>
                        <b>{user.name}</b>
                      </h2>
                    </li>
                    <li>
                      <a className="nav-link text-dark" href="#">
                        My Orders
                      </a>
                    </li>
                    <li>
                      <a className="nav-link text-dark" href="#">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={logoutHandler}
                        className="nav-link text-dark"
                        href="/"
                      >
                        Log Out
                      </a>
                    </li>
                  </ul>
                ) : null}
              </li>
            </ul>
          ) : (
            <li>
              <Link to="/login" className="login-btn" type="submit">
                Login
              </Link>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
}
