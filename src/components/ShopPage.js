import React, { useState, useEffect } from "react";
import FoodCard from "../cards/FoodCard";
import ReactSearchBox from "react-search-box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Modal } from "react-bootstrap";
import "../css/ShopPage.css";
import Select from "react-select";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ShopPage(props) {
  useEffect(() => {
    if (props.allrestaurent) {
      props.allrestaurent.forEach((res) => {
        if (res.res_email === props.res_email) {
          setFoodsArray(res.items);
          setRes(res);
        }
      });
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const vertical = "bottom",
    horizontal = "right";

  const [reviewsModalShow, setReviewsModalShow] = useState(false);
  const [itemInReviewModel, setItem] = useState();

  let allrestaurent = props.allrestaurent;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let foods;
  let [foodsArray, setFoodsArray] = useState();
  let [res, setRes] = useState();
  if (foodsArray) {
    foods = foodsArray.map((item) => {
      return (
        <FoodCard
          {...item}
          item={item}
          setCartCount={props.setCartCount}
          user={props.user}
          setUser={props.setUser}
          setAllRestaurent={props.setAllRestaurent}
          res_email={props.res_email}
          res_name={res.res_name}
          res_address={res.res_address}
          latlong={`${res.lattitude}, ${res.longitude}`}
          setOpen={setOpen}
          className="col"
          setReviewsModalShow={setReviewsModalShow}
          setItem={setItem}
        />
      );
    });
  }

  let searchData = [{}];
  for (let index in foodsArray) {
    searchData.push({
      key: foodsArray[index].food_name.toLowerCase().replace(/\s+/g, ""),
      value: foodsArray[index].food_name,
    });
  }

  const lowh = () => {
    const newArray = [...foodsArray].sort((a, b) => {
      return a.food_price - b.food_price;
    });

    if (newArray) setFoodsArray(newArray);
  };

  const highl = () => {
    const newArray = [...foodsArray].sort((a, b) => {
      return b.food_price - a.food_price;
    });

    if (newArray) setFoodsArray(newArray);
  };

  const rating = () => {
    const newArray = [...foodsArray].sort((a, b) => {
      let x = 0,
        xl = [...a.rating].length;
      [...a.rating].forEach(({ star }) => (x += parseInt(star)));
      let y = 0,
        yl = [...b.rating].length;
      [...b.rating].forEach(({ star }) => (y += parseInt(star)));
      return Math.floor(y / yl) - Math.ceil(x / xl);
    });

    if (newArray) setFoodsArray(newArray);
  };

  const sell = () => {
    const newArray = [...foodsArray].sort((a, b) => {
      return b.sold - a.sold;
    });

    if (newArray) setFoodsArray(newArray);
  };

  const name = () => {
    const newArray = [...foodsArray].sort((a, b) => {
      let fa = a.food_name.toLowerCase(),
        fb = b.food_name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    if (newArray) setFoodsArray(newArray);
  };

  const searchSort = () => {
    Array.closest = (function () {
      function levenshtein(s, t) {
        if (!s.food_name.length) return t.food_name.length;
        if (!t.food_name.length) return s.food_name.length;

        return Math.min(
          levenshtein(
            (s.substring(1), t) + 1,
            levenshtein(
              (t.substring(1), s) + 1,
              levenshtein(
                (s.substring(1), t.substring(1)) + (s[0] !== t[0] ? 1 : 0)
              )
            )
          )
        );
      }

      return function (arr, str) {
        return arr.sort(function (a, b) {
          return levenshtein((a, str) - levenshtein((b, str)));
        });
      };
    })();
  };

  const aquaticCreatures = [
    { label: "Name", value: "name" },
    { label: "Price(Low > High)", value: "lowh" },
    { label: "Price (High > Low", value: "highl" },
    { label: "Rating", value: "rating" },
    { label: "Sell", value: "sell" },
  ];

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
                placeholder="Search Food"
                value="Doe"
                data={searchData}
                onSelect={(record) => console.log(record.item.value)}
                inputBackgroundColor="#128db3"
                inputFontColor="white"
                inputFontSize="20px"
              />
            </div>
            <div className="box col">
              <Select
                className="mb-3 sort-by-select"
                options={aquaticCreatures}
                placeholder="-Sort By-"
                onChange={(e) =>
                  e.value === "name"
                    ? name()
                    : e.value === "highl"
                    ? highl()
                    : e.value === "lowh"
                    ? lowh()
                    : e.value === "rating"
                    ? rating()
                    : sell()
                }
              />
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
      {itemInReviewModel ? (
        <FoodReviews
          show={reviewsModalShow}
          onHide={() => setReviewsModalShow(false)}
          item={itemInReviewModel}
        />
      ) : null}
    </div>
  );
}

function FoodReviews(props) {
  let reviews;
  if (props.item.reviews) {
    reviews = props.item.reviews.map((review) => {
      return <div className="reviews-card">{review.review}</div>;
    });
  }

  let foodTotal = 0;
  let length = props.item.rating.length - 1;
  props.item.rating.forEach(({ star }) => (foodTotal += parseInt(star)));
  let avgStar = Math.floor(foodTotal / length);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <div className="row food-reviews-modal-container">
          <div className="col">
            <img
              className="img-fluid"
              style={{ borderRadius: "10px" }}
              src={props.item.img_path}
              alt=""
            />
          </div>
          <div className="col">
            <h4>Name: {props.item.food_name}</h4>
            <h6>Price: {props.item.food_price} BDT</h6>
            <div>
              <h6>
                Rating:{" "}
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={
                        index <= avgStar ? "star-button on" : "star-button off"
                      }
                    >
                      <span className="fa fa-star" />
                    </button>
                  );
                })}
              </h6>
            </div>
          </div>
          <h4 style={{ marginTop: "20px" }}>Reviews</h4>
          <hr />
          {reviews}
        </div>
      </div>
    </Modal>
  );
}
export default ShopPage;
