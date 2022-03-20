import React from "react";
import "../css/MyRestaurent.css";
import "../css/FoodList.css";
import foodData from "../database/FoodData";
import EditableCard from "../cards/EditableCard";
import { Button, Modal } from "react-bootstrap";
import { Nav } from "react-bootstrap";

function MyRestaurent() {
  const [modalShow, setModalShow] = React.useState(false);
  const [addModalShow, setAddModalShow] = React.useState(false);

  function showAddModal() {
    setAddModalShow(true);
  }
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
      <div className="edit-text d-flex justify-content-between">
        <h4>Add, Edit, Delete Items In Your Restaurent</h4>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Nav.Link href="/orders">
              <i className="fa orders-badge fa-lg" value={5}>
                <div className="orders--btn">Orders</div>
              </i>
            </Nav.Link>
          </div>
          <h5 className="add--item--btn" onClick={showAddModal}>
            Add Item
          </h5>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center food--items">{foods}</div>
      </div>
      <EditFoodFloatingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <AddFoodFloatingModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
      />
    </div>
  );
}
// Floating Card
function EditFoodFloatingModal(props) {
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

function AddFoodFloatingModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <div className="row">
          <i class="fas fa-camera"></i>
          <h6 className="change--food--img">Upload Photo</h6>
          <h6 className="change--food--title">Name</h6>
          <input
            name="text"
            // onChange={(e) => setPassword(e.target.value)}
            type="text"
            class="input"
            className="change--food--input"
          ></input>
          <h6 className="change--food--title">Price</h6>
          <input
            name="text"
            // onChange={(e) => setPassword(e.target.value)}
            type="number"
            class="input"
            className="change--food--input"
          ></input>
        </div>
        <h4 className="update--food--btn">Add</h4>
      </div>
    </Modal>
  );
}

export default MyRestaurent;
