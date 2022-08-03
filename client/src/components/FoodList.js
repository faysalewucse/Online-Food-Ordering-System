import React from "react";
import FoodCard from "../cards/FoodCard";
import "../css/FoodList.css";
import foodData from "../database/FoodData";

function FoodList() {
  function foods(data) {
    return <FoodCard {...data} />;
  }

  const restaurents = foodData.map((data, index) => {
    return data.status == true ? (
      <div className="card--container p-4">
        <h1>Restaurent Name</h1>
        <div className="d-flex">{foods(data)}</div>
      </div>
    ) : null;
  });
  return <div>{restaurents}</div>;
}

export default FoodList;
