import React from "react";
import "../css/MyRestaurent.css";
import "../css/FoodList.css";
import foodData from "../database/FoodData";
import EditableCard from "../cards/EditableCard";
import { Button, Modal } from "react-bootstrap";

function MyRestaurent() {
  const [modalShow, setModalShow] = React.useState(false);

  const foods = foodData.map((data) => {
    return (
      <EditableCard
        {...data}
        setModalShow={setModalShow}
        // setIdandPath={props}
        className="col res--card"
      />
    );
  });

  return (
    <div className="container">
      <div className="res--cover">
        <img
          src="images/271687.jpg"
          alt="res-cover"
          className="res--cover--image"
          style={{ width: "100%", height: "30vh", objectFit: "cover" }}
        />
        <div className="top-left">
          <div className="restaurent--name">Cheap And Best Restaurent</div>
          <h6 className="restaurent--address">
            Address: Hajinogor, Sharulia, Demra, Dhaka-1361
          </h6>
          <div className="restaurent--contact">Contact No: +8801634495020</div>
        </div>
      </div>
      <div className="edit-text">
        <h4>Add, Edit, Delete Items In Your Restaurent</h4>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center food--items">{foods}</div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
// Floating Card
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <div className="row">
          <img src="foods/bbq-burger.jpg" style={{ width: "100%" }} alt="" />
          <h6 className="change--food--img">Change Photo</h6>
          <h6 className="change--food--title">Name</h6>
          <input
            name="text"
            value="BBQ Burger"
            // onChange={(e) => setPassword(e.target.value)}
            type="text"
            class="input"
            className="change--food--input"
          ></input>
          <h6 className="change--food--title">Price</h6>
          <input
            name="text"
            value="78"
            // onChange={(e) => setPassword(e.target.value)}
            type="number"
            class="input"
            className="change--food--input"
          ></input>
        </div>
        <h4 className="update--food--btn">Update</h4>
      </div>
    </Modal>
  );
}

export default MyRestaurent;
