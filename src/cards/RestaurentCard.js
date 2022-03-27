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
          {` (${props.sold})`}
        </h6>
        <small className="fa fa-person-biking">
          : {props.delivery_charge} Tk
        </small>
        <br />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star checked" />
        <span className="fa fa-star" />
      </div>
    </div>
  );
};

export default RestaurentCard;
