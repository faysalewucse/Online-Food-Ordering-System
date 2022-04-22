import React from "react";
import FoodCard from "../cards/FoodCard";
import ReactSearchBox from "react-search-box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ShopPage(props) {
  const [open, setOpen] = React.useState(false);
  const vertical = "bottom",
    horizontal = "center";

  let allrestaurent = props.allrestaurent;
  const data = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let foods;
  if (allrestaurent) {
    allrestaurent.map((res) => {
      if (res.res_email === props.res_email) {
        foods = res.items.map((item) => {
          return (
            <FoodCard
              {...item}
              setCartCount={props.setCartCount}
              user={props.user}
              setUser={props.setUser}
              setAllRestaurent={props.setAllRestaurent}
              res_email={props.res_email}
              res_name={res.res_name}
              setOpen={setOpen}
              className="col res--card"
            />
          );
        });
      }
    });
  }

  return (
    <div className="p-4 container">
      <div className="row mb-5">
        <div className="col-2 res--list--category">
          <h2 className="mb-5" style={{ color: "white", textAlign: "center" }}>
            Categories
          </h2>
          <h3>Rice</h3>
          <h3>Burger</h3>
          <h3>Pizza</h3>
          <h3>Set Menu</h3>
          <h3>Vegetables</h3>
          <h3>Drinks</h3>
          <h3>Snacks</h3>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <ReactSearchBox
                className="react-search-box"
                placeholder="Search Restaurent"
                value="Doe"
                data={data}
                callback={(record) => console.log(record)}
                inputBackgroundColor="#128db3"
                inputFontColor="white"
                inputFontSize="20px"
              />
            </div>
            <div className="box col">
              <select>
                <option>Delivery Charge</option>
                <option>Name</option>
                <option>Rating</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row">{foods}</div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Added to Cart Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ShopPage;
