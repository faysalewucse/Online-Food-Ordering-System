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
import UsersCart from "../database/UsersCart";
import DeliveryStatus from "./DeliveryStatus";

export default function NavbarComp() {
  const [res_id, setResId] = useState();
  const [restaurent_path, setRestaurentPath] = useState();
  const [cart_count, setCartCount] = useState(UsersCart[0].cart);

  console.log(UsersCart);

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
                <Nav.Link as={Link} to={"/home"}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={"/register"}>
                  Register
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
              <Nav>
                <Nav.Link href="/delivery-status">Track</Nav.Link>
                <Nav.Link href="/cart">
                  <i className="fa badge fa-lg" value={cart_count}>
                    <img src="images/cart.png" alt="cart" />
                  </i>
                </Nav.Link>
                <NavDropdown
                  title="Faysal Ahmad"
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {/* Routes */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery-status" element={<DeliveryStatus />} />
          <Route path="/addrestaurent" element={<AddRestaurent />} />
          <Route
            path="/restaurents"
            element={
              <RestaurentList
                setResId={setResId}
                setRestaurentPath={setRestaurentPath}
              />
            }
          />
          <Route
            path={restaurent_path}
            element={<ShopPage res_id={res_id} setCartCount={setCartCount} />}
          />
        </Routes>
      </div>
      <div>
        <footer className="bg-dark text-center text-white">
          <div className="container p-4 pb-0">
            <section className="">
              <form action="">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-6">
                    <h1>FoodsBD for Business</h1>
                    <h6>Add Your Restaurent & Make Money</h6>
                    <Nav.Link
                      as={Link}
                      to={"/addrestaurent"}
                      className="business--btn"
                    >
                      Register
                    </Nav.Link>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <div>
                      <h6>JavaScript</h6>
                      <h6>NodeJs</h6>
                      <h6>MongoDB</h6>
                    </div>
                    <div>
                      <h6>React</h6>
                      <h6>ExpressJS</h6>
                      <h6>Atlas</h6>
                    </div>
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
