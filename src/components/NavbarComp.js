import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import "../css/NavbarComp.css";
import "../css/Footer.css";
import "../css/Home.css";
import AddRestaurent from "./AddRestaurent";
import RestaurentList from "./RestaurentList";
import ShopPage from "./ShopPage";
import Cart from "./Cart";
import DeliveryStatus from "./DeliveryStatus";
import MyRestaurent from "./MyRestaurent";
import MyOrders from "./MyOrders";
import RestaurentOrders from "./RestaurentOrders";
import RestaurentLogin from "./RestaurentLogin";
import ForgotPasswordScreen from "./ForgotPassword";
import ResetPasswordScreen from "./ResetPassword";
import About from "./About";
import ContactPage from "./ContactPage";
import RiderRegister from "./RiderRegister";
import ReviewPage from "./ReviewPage";
import NotFound from "./NotFound";

export default function NavbarComp({
  user,
  allUser,
  setAllUser,
  setUser,
  restaurent,
  setRestaurent,
  allrestaurent,
  setAllRestaurent,
  cart_count,
  orders_count,
  setCartCount,
  setOrdersCount,
}) {
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    setUser("");
  };
  const reslogoutHandler = () => {
    localStorage.removeItem("authTokenRes");
    setRestaurent("");
  };

  console.log(allUser);

  const [res_id, setResId] = useState();
  const [res_email, setResEmail] = useState(restaurent.res_email);
  const [restaurent_path, setRestaurentPath] = useState();
  //For User Food Tracking
  const [order_id, setOrderID] = React.useState();
  //For User Food Tracking

  return (
    <Router>
      <div>
        <Navbar bg="dark" expand="md" variant={"dark"} className="nav--bar">
          <Container>
            <Navbar.Brand className="navbar--brand" href="#home">
              FoodsBD
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/"}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={"/contact"}>
                  Contact
                </Nav.Link>
                <Nav.Link as={Link} to={"/about"}>
                  About
                </Nav.Link>
                <NavDropdown title="Categories">
                  <NavDropdown.Item href="#action/3.1">Burger</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Cakes</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Chicken
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Rice Item
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {user || restaurent ? (
                <Nav>
                  {user ? <Nav.Link href="/myorders">Track</Nav.Link> : null}
                  {user ? (
                    <Nav.Link href="/cart">
                      <i className="fa badge fa-lg" value={cart_count}>
                        <img src="images/cart.png" alt="cart" />
                      </i>
                    </Nav.Link>
                  ) : null}
                  <NavDropdown
                    title={user ? user.name : restaurent.res_name}
                    id="basic-nav-dropdown"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item
                      href={user ? "/profile" : "/myrestaurent"}
                    >
                      {user ? "Profile" : "My Shop"}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={user ? logoutHandler : reslogoutHandler}
                      href="/"
                    >
                      Logout
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav.Link
                  as={Link}
                  to={"/login"}
                  className="login--btn"
                  style={{ color: "white" }}
                >
                  Login
                </Nav.Link>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {/* Routes */}
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home user={user} restaurent={restaurent} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/notFound" element={<NotFound />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
          <Route
            path="/passwordreset/:resetToken"
            element={<ResetPasswordScreen />}
          />

          {/* User Routes */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route
            path="/cart"
            element={
              user ? (
                <Cart
                  user={user}
                  setUser={setUser}
                  setAllRestaurent={setAllRestaurent}
                  setCartCount={setCartCount}
                  cart_count={cart_count}
                />
              ) : (
                <NotFound />
              )
            }
          />
          <Route
            path="/delivery-status"
            element={
              user ? (
                <DeliveryStatus order_id={order_id} user={user} />
              ) : (
                <NotFound />
              )
            }
          />

          <Route
            path="/order-review-page"
            element={
              user ? (
                <ReviewPage order_id={order_id} user={user} allUser={allUser} />
              ) : (
                <NotFound />
              )
            }
          />

          <Route
            path="/myorders"
            element={
              user ? (
                <MyOrders
                  user={user}
                  setOrderID={setOrderID}
                  setUser={setUser}
                  setAllRestaurent={setAllRestaurent}
                  setCartCount={setCartCount}
                />
              ) : (
                <NotFound />
              )
            }
          />
          <Route
            path="/restaurents"
            element={
              <RestaurentList
                setResEmail={setResEmail}
                setRestaurentPath={setRestaurentPath}
                user={user}
                allrestaurent={allrestaurent}
                setAllRestaurent={setAllRestaurent}
              />
            }
          />
          <Route
            path={restaurent_path}
            element={
              <ShopPage
                res_email={res_email}
                allrestaurent={allrestaurent}
                user={user}
                setUser={setUser}
                setAllRestaurent={setAllRestaurent}
                setCartCount={setCartCount}
              />
            }
          />

          {/* Restaurant Routes */}
          <Route
            path="/restaurentlogin"
            element={<RestaurentLogin setRestaurent={setRestaurent} />}
          />
          <Route path="/addrestaurent" element={<AddRestaurent />} />
          <Route
            path="/orders"
            element={
              restaurent ? (
                <RestaurentOrders
                  restaurent={restaurent}
                  user={user}
                  setAllUser={setAllUser}
                  setRestaurent={setRestaurent}
                  setOrdersCount={setOrdersCount}
                  setUser={setUser}
                  setAllRestaurent={setAllRestaurent}
                  setCartCount={setCartCount}
                />
              ) : (
                <NotFound />
              )
            }
          />
          <Route
            path="/myrestaurent"
            element={
              restaurent ? (
                <MyRestaurent
                  restaurent={restaurent}
                  setRestaurent={setRestaurent}
                  orders_count={orders_count}
                  setOrdersCount={setOrdersCount}
                />
              ) : (
                <NotFound />
              )
            }
          />

          {/* Rider Routes */}
          <Route path="/rider_registration" element={<RiderRegister />} />
        </Routes>
      </div>
      <div>
        <footer className="bg-dark text-center text-white">
          <div className="container p-4 pb-0">
            <section className="">
              <form action="">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-4">
                    <div className="row">
                      <h3>FoodsBD for Business</h3>
                      <h6>Add Your Restaurent & Make Money</h6>
                    </div>
                    {localStorage.getItem("authTokenRes") == null ? (
                      <div className="row">
                        <div className="col">
                          <Nav.Link
                            as={Link}
                            to={"/addrestaurent"}
                            className="business--btn--reg"
                            style={{ color: "black" }}
                          >
                            Register
                          </Nav.Link>
                        </div>
                        <div className="col">
                          <Nav.Link
                            as={Link}
                            to={"/restaurentlogin"}
                            className="business--btn--login"
                            style={{ color: "white" }}
                          >
                            Login
                          </Nav.Link>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="col d-flex justify-content-center">
                          <Nav.Link
                            as={Link}
                            onClick={reslogoutHandler}
                            to={"/"}
                            className="business--btn--logout"
                            style={{ color: "white", width: "20vw" }}
                          >
                            Logout
                          </Nav.Link>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-4"></div>
                  <div className="col-md-4">
                    {/* <div>
                      <h6>JavaScript</h6>
                      <h6>NodeJs</h6>
                      <h6>MongoDB</h6>
                    </div>
                    <div>
                      <h6>React</h6>
                      <h6>ExpressJS</h6>
                      <h6>Atlas</h6>
                    </div>
                    <div>
                      <h6>HTML</h6>
                      <h6>CSS</h6>
                      <h6>React Bootstrap</h6>
                    </div> */}
                    <div>
                      <h3>Are you like to ride?</h3>
                      <h6>Create an Account for make your profession</h6>
                    </div>
                    {localStorage.getItem("authTokenRider") == null ? (
                      <div className="row">
                        <div className="col">
                          <Nav.Link
                            as={Link}
                            to={"/rider_registration"}
                            className="business--btn--reg"
                            style={{ color: "black" }}
                          >
                            Register
                          </Nav.Link>
                        </div>
                        <div className="col">
                          <Nav.Link
                            as={Link}
                            to={"/restaurentlogin"}
                            className="business--btn--login"
                            style={{ color: "white" }}
                          >
                            Login
                          </Nav.Link>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="col d-flex justify-content-center">
                          <Nav.Link
                            as={Link}
                            onClick={reslogoutHandler}
                            to={"/"}
                            className="business--btn--logout"
                            style={{ color: "white", width: "20vw" }}
                          >
                            Logout
                          </Nav.Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </section>
          </div>

          <div
            className="text-center p-3 mt-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
          >
            © 2022 Copyright: <strong>AAF Production</strong>
          </div>
        </footer>
      </div>
    </Router>
  );
}
