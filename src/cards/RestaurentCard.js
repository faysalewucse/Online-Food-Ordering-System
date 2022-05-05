import React from "react";
import "./RestaurentCard.css";
import { useNavigate } from "react-router-dom";

const RestaurentCard = (props) => {
  console.log(props.setIdandPath);
  const navigate = useNavigate();
  function handleChange() {
    const url = props.res_name.replace(/\s+/g, "").toLowerCase();

    props.setRestaurentPath(`/${url}`);
    navigate(`/${url}`);
  }

  let totalSold = 0;
  props.items.forEach(({ sold }) => (totalSold += parseInt(sold)));

  return (
    <div
      className="card"
      onClick={() => {
        handleChange();

        props.setResEmail(props.res_email);
      }}
      style={{ width: "16rem", paddingLeft: "0px", paddingRight: "0px" }}
    >
      <img className="card-img-top" src={props.res_img_path} alt="card-img" />
      <div className="card-body">
        <h6 className="card-title">
          {props.res_name}
          {` (${totalSold})`}
        </h6>
        <small className="fa fa-person-biking">: {15} Tk</small>
      </div>
    </div>
  );
};

export default RestaurentCard;
