import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home(props) {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("Logged In Successfully");
  const vertical = "bottom",
    horizontal = "center";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("showSnackbar")) {
      setOpen(true);
      localStorage.removeItem("showSnackbar");
    }
    if (localStorage.getItem("mailsent")) {
      setMsg(localStorage.getItem("mailsent"));
      setOpen(true);
      localStorage.removeItem("mailsent");
    }
  });

  return (
    <>
      <Carousel>
        <Carousel.Item interval={2000}>
          <div className="container">
            <div className="row homepage-section">
              <div className="col-sm-6 text-start">
                {props.restaurent ? (
                  <h6 className="font-italic">
                    Want to be a great Bussinessman?
                  </h6>
                ) : (
                  <h6 className="font-italic">Are You Hungry?</h6>
                )}
                <h1 className="dont--wait">Don't Wait!?</h1>
                <div>
                  {props.restaurent ? (
                    <Nav.Link
                      as={Link}
                      to={"/myrestaurent"}
                      className="order--now--btn"
                    >
                      My Restaurent
                    </Nav.Link>
                  ) : props.user ? (
                    <Nav.Link
                      as={Link}
                      to={"/restaurents"}
                      className="order--now--btn"
                    >
                      Order Now
                    </Nav.Link>
                  ) : (
                    <Nav.Link
                      as={Link}
                      to={"/riderpage"}
                      className="order--now--btn"
                    >
                      My Orders
                    </Nav.Link>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                <img
                  className="homepage-pizza"
                  src="foods/three-burger.png"
                  alt="pizza"
                />
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <div className="container">
            <div className="row homepage-section">
              <div className="col-sm-6 text-start">
                {props.restaurent ? (
                  <h6 className="font-italic">
                    Want to be a great Bussinessman?
                  </h6>
                ) : (
                  <h6 className="font-italic">Are You Hungry?</h6>
                )}
                <h1 className="dont--wait">Don't Wait!?</h1>
                <div>
                  {props.restaurent ? (
                    <Nav.Link
                      as={Link}
                      to={"/myrestaurent"}
                      className="order--now--btn"
                    >
                      My Restaurent
                    </Nav.Link>
                  ) : props.user ? (
                    <Nav.Link
                      as={Link}
                      to={"/restaurents"}
                      className="order--now--btn"
                    >
                      Order Now
                    </Nav.Link>
                  ) : (
                    <Nav.Link
                      as={Link}
                      to={"/riderpage"}
                      className="order--now--btn"
                    >
                      My Orders
                    </Nav.Link>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                <img
                  className="homepage-pizza"
                  src="images/Serving-Food.png"
                  alt="pizza"
                />
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <div className="container">
            <div className="row homepage-section">
              <div className="col-sm-6 text-start">
                {props.restaurent ? (
                  <h6 className="font-italic">
                    Want to be a great Bussinessman?
                  </h6>
                ) : (
                  <h6 className="font-italic">Are You Hungry?</h6>
                )}
                <h1 className="dont--wait">Don't Wait!?</h1>
                <div>
                  {props.restaurent ? (
                    <Nav.Link
                      as={Link}
                      to={"/myrestaurent"}
                      className="order--now--btn"
                    >
                      My Restaurent
                    </Nav.Link>
                  ) : props.user ? (
                    <Nav.Link
                      as={Link}
                      to={"/restaurents"}
                      className="order--now--btn"
                    >
                      Order Now
                    </Nav.Link>
                  ) : (
                    <Nav.Link
                      as={Link}
                      to={"/riderpage"}
                      className="order--now--btn"
                    >
                      My Orders
                    </Nav.Link>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                <img
                  className="homepage-pizza"
                  src="images/kindpng.png"
                  alt="pizza"
                />
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}
