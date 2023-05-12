import React from "react";
import "./RestaurentCard.css";
import { useNavigate } from "react-router-dom";

const RestaurentCard = (props) => {
  const navigate = useNavigate();

  let totalSold = 0;
  props.items.forEach(({ sold }) => (totalSold += parseInt(sold)));

  return (
    <div
      className="shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={() => navigate(`/restaurant/${props._id}`)}
    >
      <img
        className="object-cover rounded-t-lg h-40 w-full"
        src={`images/restaurant/res_${Math.floor(Math.random() * 5)}.jpg`}
        alt="card-img"
      />
      <div className="p-2">
        <h6 className="font-bold text-lg">
          {props.res_name}
          {` (${totalSold})`}
        </h6>
        <small className="fa fa-person-biking">: {15} Tk</small>
      </div>
    </div>
  );
};

export default RestaurentCard;
