import React, { useState } from "react";
import "./ReviewCard.css";

function ReviewCard({ items, setReviews, reviews }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function SetRating(index, id) {
    setRating(index);
    for (const obj of reviews) {
      if (obj.id === id) {
        obj.rating = index;
        break;
      }
    }
    setReviews(reviews);
    console.log(reviews);
  }

  function setReview(value, id) {
    for (const obj of reviews) {
      if (obj.id === id) {
        obj.review = value;
        break;
      }
    }
    setReviews(reviews);
    console.log(reviews);
  }
  return (
    <div className="review-card mb-4">
      <div className="p-2 d-flex justify-content-between">
        <div className="d-flex justify-content-start">
          <img
            className="review-card-img"
            src={items.img_path}
            alt=""
            style={{ width: "70%", height: "24vh", objectFit: "cover" }}
          />
          <div>
            <h4>Name: {items.food_name}</h4>
            <h6>Price: {items.food_price}</h6>
            <textarea
              className="review-card-textarea"
              name="review"
              placeholder="Write Your Review Here..."
              onChange={(e) => setReview(e.target.value, items.food_id)}
            ></textarea>
            <br />
            <h6 style={{ marginTop: "10px" }}>Rate the Food</h6>
            {/* <span id="star_1" className="fa fa-star" onClick={() => fillStar(1)} /> */}
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
                    onClick={() => SetRating(index, items.food_id)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="fa fa-star" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
