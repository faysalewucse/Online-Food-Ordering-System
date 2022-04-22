import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home(props) {
  const [open, setOpen] = React.useState(false);
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
  });

  return (
    <div className="container">
      <div className="row homepage-section">
        <div className="col-sm-6 text-start">
          {props.restaurent ? (
            <h6 className="font-italic">Want to be a great Bussinessman?</h6>
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
            ) : (
              <Nav.Link
                as={Link}
                to={"/restaurents"}
                className="order--now--btn"
              >
                Order Now
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Logged In Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
