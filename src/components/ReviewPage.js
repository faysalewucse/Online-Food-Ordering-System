import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../cards/ReviewCard";
import "../css/ReviewPage.css";

function ReviewPage({ order_id, user }) {
  const [checked, setChecked] = useState(false);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();
  let orders;
  if (order_id) {
    while (reviews.length > 0) {
      reviews.pop();
    }
    for (let order of user.my_orders) {
      if (order.order_id === order_id) {
        orders = order;
        orders.result.forEach((items) => {
          reviews.push({ id: items.food_id, review: "", rating: 0 });
        });
        break;
      }
    }
  }

  let ordered_items;
  if (orders) {
    ordered_items = orders.result.map((items) => {
      return (
        <ReviewCard items={items} setReviews={setReviews} reviews={reviews} />
      );
    });
  }

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function SetRating(index) {
    setRating(index);
    for (const obj of reviews) {
      obj.rating = index;
    }
    setReviews(reviews);
  }

  function setReview(value) {
    for (const obj of reviews) {
      obj.review = value;
    }
    setReviews(reviews);
  }

  function checkboxFunction() {
    const checkbox = document.getElementById("checkbox");
    if (checkbox.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }

  const postReview = async () => {
    reviews.forEach(async (item) => {
      try {
        await axios.post("/api/auth/postreview", {
          res_email: orders.result[0].res_email,
          food_id: item.id,
          review: item.review,
          rating: item.rating,
        });
      } catch (error) {
        throw error;
      }
    });
    try {
      // Update Review Status
      const { data } = await axios.put("/api/auth/update_review_status", {
        user_mail: user.email,
        order_id: orders.order_id,
      });

      if (data) {
        localStorage.setItem("reviewed", true);
        navigate("/myorders");
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="container review-page">
      <div className=""></div>
      <h1 style={{ marginBottom: "20px" }}>
        Restaurent Name: {orders.result[0].res_name}
      </h1>
      <input id="checkbox" type="checkbox" onClick={checkboxFunction} />
      <label style={{ marginLeft: "20px" }} for="vehicle1">
        {" "}
        One Review for All food
      </label>
      <br />
      {checked === false ? (
        <div className="mt-2">{ordered_items}</div>
      ) : (
        <div>
          <textarea
            className="review-card-textarea"
            name="review"
            placeholder="Write Your Review Here..."
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <h6 style={{ marginTop: "10px" }}>Rate the Foods</h6>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={
                    index <= (hover || rating)
                      ? "star-button on"
                      : "star-button off"
                  }
                  onClick={() => SetRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="fa fa-star" />
                </button>
              );
            })}
          </div>
        </div>
      )}
      <h6 className="mt-5">N:B- Your Review Help a Restaurant to Grow Up</h6>
      <div className="rvw-apply-btn" onClick={postReview}>
        Apply Review
      </div>
    </div>
  );
}

export default ReviewPage;
