import React, { useEffect, useState } from "react";
import "../css/MyRestaurent.css";
import "../css/FoodList.css";
import EditableCard from "../cards/EditableCard";
import { Modal } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { fetchResData } from "../api/resdata";

function MyRestaurent({ restaurent, setRestaurent }) {
  useEffect(() => {
    fetchResData(setRestaurent);
  }, []);
  const [editmodalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);

  //Edit Food State Variable
  const [food_id, setFoodId] = useState("");
  const [food_name, setFoodName] = useState("");
  const [img_path, setImgPath] = useState(null);
  const [food_price, setFoodPrice] = useState("");

  let foods;
  if (restaurent.items) {
    foods = restaurent.items.map((item) => {
      return (
        <EditableCard
          img_path={item.img_path}
          food_name={item.food_name}
          food_price={item.food_price}
          food_id={item._id}
          setAddModalShow={setAddModalShow}
          setEditModalShow={setEditModalShow}
          setImgPath={setImgPath}
          setFoodName={setFoodName}
          setFoodPrice={setFoodPrice}
          setFoodId={setFoodId}
          res_email={restaurent.res_email}
          setRestaurent={setRestaurent}
        />
      );
    });
  }

  function showAddModal() {
    setAddModalShow(true);
  }

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
          <div className="restaurent--name">{restaurent.res_name}</div>
          <h6 className="restaurent--address">
            Addresss: {restaurent.res_address}
          </h6>
          <div className="restaurent--contact">
            Contact No: {restaurent._id}
          </div>
        </div>
      </div>
      <div className="edit-text d-flex justify-content-between">
        <h4>Add, Edit, Delete Items In Your Restaurent</h4>
        <div className="d-flex justify-content-between align-items-center">
          <i
            className="refresh--btn fas fa-redo-alt"
            onClick={() => window.location.reload(false)}
          ></i>
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
        show={editmodalShow}
        onHide={() => setEditModalShow(false)}
        img_path={img_path}
        food_name={food_name}
        food_price={food_price}
        food_id={food_id}
        setRestaurent={setRestaurent}
        setEditModalShow={setEditModalShow}
        res_email={restaurent.res_email}
      />
      <AddFoodFloatingModal
        show={addModalShow}
        setAddModalShow={setAddModalShow}
        restaurent={restaurent}
        setRestaurent={setRestaurent}
        onHide={() => setAddModalShow(false)}
      />
    </div>
  );
}
// Floating Card
function EditFoodFloatingModal(props) {
  const [food_name, setFoodName] = useState(props.food_name);
  const [img_path, setImgPath] = useState(props.img_path);
  const [food_price, setFoodPrice] = useState(props.food_price);
  const [food_id, setFoodId] = useState(props.food_id);
  const [photoFile, setPhotoFile] = useState("");

  const PhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const updateFood = async (data) => {
    try {
      await axios.put("/api/auth/updatefood", data);
    } catch (error) {
      throw error;
    }
  };

  const updateFoodHandler = async (e) => {
    const updateFormData = new FormData();
    updateFormData.append("file", photoFile);
    updateFormData.append("food_name", food_name);
    updateFormData.append("food_price", food_price);
    updateFormData.append("food_id", props.food_id);
    updateFormData.append("res_email", props.res_email);

    if (updateFormData) await updateFood(updateFormData);
    props.setEditModalShow(false);

    fetchResData(props.setRestaurent);

    //window.location.reload(false);
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <div className="row">
          <img src={props.img_path} style={{ width: "100%" }} alt="" />
          <div className="add--food horizontal-group">
            <div className="form-group">
              <label htmlFor="choose-file" className="label-title">
                Change Picture
              </label>
              <br />
              <input
                type="file"
                className="form-class"
                id="choose-file"
                size={100}
                onChange={(e) => PhotoChange(e)}
              />
            </div>
          </div>
          <h6 className="change--food--title">Name</h6>
          <input
            name="text"
            defaultValue={props.food_name}
            onChange={(e) => setFoodName(e.target.value)}
            type="text"
            class="input"
            className="change--food--input"
          ></input>
          <h6 className="change--food--title">Price</h6>
          <input
            name="text"
            defaultValue={props.food_price}
            onChange={(e) => setFoodPrice(e.target.value)}
            type="number"
            class="input"
            className="change--food--input"
          ></input>
        </div>
        <h4 onClick={updateFoodHandler} className="update--food--btn">
          Update
        </h4>
      </div>
    </Modal>
  );
}

function AddFoodFloatingModal(props) {
  const res_email = props.restaurent.res_email;

  const [food_name, setFoodName] = useState("");
  const [food_img, setFoodImg] = useState(null);
  const [food_price, setFoodPrice] = useState("");
  const [singleFile, setSingleFile] = useState("");

  const SingleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSingleFile(e.target.files[0]);
  };

  const singleFileUpload = async (data) => {
    try {
      await axios.post("/api/auth/addfood", data);
    } catch (error) {
      throw error;
    }
  };
  const addFoodHandler = async (e) => {
    const formData = new FormData();
    formData.append("file", singleFile);
    formData.append("food_name", food_name);
    formData.append("food_price", food_price);
    formData.append("res_email", res_email);

    await singleFileUpload(formData);
    props.setAddModalShow(false);

    fetchResData(props.setRestaurent);

    //window.location.reload(false);
  };

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
          <div className="add--food horizontal-group">
            <div className="form-group">
              <label htmlFor="choose-file" className="label-title">
                Upload Picture
              </label>
              <br />

              <input
                type="file"
                className="form-class"
                id="choose-file"
                size={100}
                onChange={(e) => SingleFileChange(e)}
              />
            </div>
          </div>
          <h6 className="change--food--title">Name</h6>
          <input
            name="food_name"
            onChange={(e) => setFoodName(e.target.value)}
            type="text"
            class="input"
            className="change--food--input form-class"
          ></input>
          <h6 className="change--food--title">Price</h6>
          <input
            name="food_price"
            onChange={(e) => setFoodPrice(e.target.value)}
            type="number"
            class="input"
            className="change--food--input from-class"
          ></input>
        </div>
        <input
          type="submit"
          value="Add"
          className="update--food--btn"
          onClick={() => addFoodHandler()}
        />
      </div>
    </Modal>
  );
}

export default MyRestaurent;
