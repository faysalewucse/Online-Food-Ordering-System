import axios from "axios";
import React from "react";
import { Nav } from "react-bootstrap";
import { fetchResData } from "../api/resdata";
import "./EditableCard.css";

function EditableCard({
  img_path,
  food_name,
  food_price,
  food_id,
  sold,
  setEditModalShow,
  setImgPath,
  setFoodName,
  setFoodPrice,
  setFoodId,
  res_email,
  setRestaurent,
  setOrdersCount,
}) {
  const deleteFood = async () => {
    try {
      await axios.put("http://localhost:3000/api/auth/deletefood", {
        res_email,
        food_id,
      });

      fetchResData(setRestaurent, setOrdersCount);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div
      className="card"
      style={{ width: "16rem", paddingLeft: "0px", paddingRight: "0px" }}
    >
      <img
        className="card-img-top"
        src={`/${img_path}`}
        alt="Card image cap"
        style={{ width: "100%", height: "20vh", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h4 className="card-title text-success">{food_name}</h4>
        <h6 className="card-title cost">BDT: {food_price} /-</h6>
        <h6>Sold ({sold})</h6>
      </div>
      <div className="card-body-btn d-flex">
        <Nav.Link
          href="#"
          style={{ color: "white" }}
          className="item--edit--btn"
          onClick={() => {
            setEditModalShow(true);
            setImgPath(img_path);
            setFoodName(food_name);
            setFoodPrice(food_price);
            setFoodId(food_id);
          }}
        >
          Edit
        </Nav.Link>
        <Nav.Link
          href="#"
          onClick={deleteFood}
          style={{ color: "white" }}
          className="item--dlt--btn"
        >
          Delete
        </Nav.Link>
      </div>
    </div>
  );
}

export default EditableCard;
