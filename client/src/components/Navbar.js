import React from "react";
import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../features/auth/authSlice";
import { restaurantLoggedOut } from "../features/restaurant/restaurantSlice";

export default function Navbar() {
  // user from redux store
  const { user } = useSelector((state) => state.auth);
  const { restaurant } = useSelector((state) => state.restaurants);
  const { cartItems } = useSelector((state) => state.cart);

  // Dipatcher
  const dispatch = useDispatch();

  // logout handler
  const logoutHandler = () => {
    console.log(user, restaurant);
    user
      ? dispatch(userLoggedOut())
      : restaurant && dispatch(restaurantLoggedOut());
    localStorage.clear();
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark py-3">
      <div className="container">
        <button
          className="navbar-toggler me-auto"
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
          <NavLink className="navbar-brand " to="/">
            Foods
            <span style={{ color: "#38ac33", fontWeight: "700" }}>Hub</span>
          </NavLink>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className={`nav-item ${restaurant && "mr-5"}`}>
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item mt-2">
              <NavLink className="nav-link" to="/cart">
                <i className="fa cart-count" value={cartItems?.length}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </i>
              </NavLink>
            </li>
          </ul>
          {user ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mt-1">
                <NavLink className="nav-link" to="/track">
                  Track
                </NavLink>
              </li>
            </ul>
          ) : (
            !restaurant && (
              <li>
                <Link to="/login" className="login-btn" type="submit">
                  Login
                </Link>
              </li>
            )
          )}
        </div>
        {(user || restaurant) && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="border-2 rounded-full w-10 h-10 flex justify-center items-center text-white"
            >
              {user?.name[0] || restaurant?.res_name[0]}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72"
            >
              {/* <li>
              <h2>
                <b>{user.name}</b>
              </h2>
            </li> */}
              <li>
                <a className="text-dark no-underline" href="/">
                  Profile
                </a>
              </li>
              <li>
                <a className="text-dark no-underline" href="/">
                  My Orders
                </a>
              </li>
              <li>
                <a
                  onClick={logoutHandler}
                  className="text-danger no-underline"
                  href="/"
                >
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
