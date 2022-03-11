import React from "react";
import { Nav } from "react-bootstrap";
import "./EditableCard.css";

function EditableCard(props) {
  function handleChange() {
    console.log(props);
    props.setIdandPath.setCartCount((prev_cart_count) => {
      return prev_cart_count + 1;
    });
  }
  return (
    <div
      className="card"
      style={{ width: "16rem", paddingLeft: "0px", paddingRight: "0px" }}
    >
      <img className="card-img-top" src={props.img} alt="Card image cap" />
      <div className="card-body">
        <h4 className="card-title text-success">{props.name}</h4>
        <h6 className="card-title cost">BDT: {props.cost} /-</h6>
        <h6>Sold ({props.sold})</h6>
      </div>
      <div className="card-body-btn d-flex">
        <Nav.Link
          href="#"
          style={{ color: "white" }}
          className="item--edit--btn"
          onClick={() => props.setModalShow(true)}
        >
          Edit
        </Nav.Link>
        <Nav.Link
          href="#"
          onClick={handleChange}
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
