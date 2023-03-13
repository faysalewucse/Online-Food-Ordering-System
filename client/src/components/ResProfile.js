import React, { useEffect, useState } from "react";
import "../css/MyRestaurent.css";
import "../css/FoodList.css";
import EditableCard from "../cards/EditableCard";
import axios from "axios";
import { fetchResData } from "../api/resdata";
import { useSelector } from "react-redux";
import LoadingButton from "../utils/LoadingButton";

function ResProfile() {
  //get restaurant data
  const { restaurant } = useSelector((state) => state.restaurants);

  const [editmodalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);

  //Edit Food State Variable
  const [food_id, setFoodId] = useState("");
  const [food_name, setFoodName] = useState("");
  const [img_path, setImgPath] = useState(null);
  const [food_price, setFoodPrice] = useState("");

  let foods;
  if (restaurant?.items) {
    foods = restaurant?.items?.map((item) => {
      return (
        <EditableCard
          img_path={item.img_path}
          food_name={item.food_name}
          food_price={item.food_price}
          food_id={item._id}
          sold={item.sold}
          setAddModalShow={setAddModalShow}
          setEditModalShow={setEditModalShow}
          setImgPath={setImgPath}
          setFoodName={setFoodName}
          setFoodPrice={setFoodPrice}
          setFoodId={setFoodId}
          res_email={restaurant.res_email}
          // setrestaurant={setrestaurant}
          // setOrdersCount={setOrdersCount}
        />
      );
    });
  }

  function showAddModal() {
    setAddModalShow(true);
  }

  function hideAddModal() {
    setAddModalShow(false);
  }

  return (
    <div className="container">
      {/* Banner */}
      <div className="py-5">
        <div class="hero rounded h-30 bg-[url('https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg?w=1380&t=st=1678708060~exp=1678708660~hmac=9127ae83c5e17713e585b1969df229b79825f472a30bd003c7a552cc8b00af28')]">
          <div class="hero-overlay bg-opacity-80 rounded"></div>
          <div class="hero-content text-center text-neutral-content">
            <div class="p-10">
              <h1 class="text-5xl font-bold">{restaurant.res_name}</h1>
              <h6 class="mb-5 font-bold">{restaurant.res_address}</h6>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <button
            onClick={() => setAddModalShow(true)}
            className="w-full border border-black py-1 px-4 rounded hover:bg-gray-200"
          >
            Add Item +
          </button>
        </div>
      </div>

      <div className="mb-10 p-10 border">
        {foods.length !== 0 ? (
          <div className="row justify-content-center food--items">{foods}</div>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center">
            <img className="w-1/6" src="images/no-food.png" alt="no-food" />
            <h1>No Items Yet</h1>
          </div>
        )}
      </div>

      {/* Food Adding Modal */}
      <>
        {addModalShow ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Modal Title</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setAddModalShow(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      I always felt like I could do anything. That’s the main
                      thing people are controlled by! Thoughts- their perception
                      of themselves! They're slowed down by their perception of
                      themselves. If you're taught you can’t do anything, you
                      won’t do anything. I was taught I could do everything.
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setAddModalShow(false)}
                    >
                      Cancel
                    </button>
                    <LoadingButton
                      text={"Upload"}
                      onClickHandler={hideAddModal}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
      {/* <EditFoodFloatingModal
        show={editmodalShow}
        onHide={() => setEditModalShow(false)}
        img_path={img_path}
        food_name={food_name}
        food_price={food_price}
        food_id={food_id}
        setrestaurant={setrestaurant}
        setEditModalShow={setEditModalShow}
        res_email={restaurant.res_email}
        setOrdersCount={setOrdersCount}
      /> */}
      {/* <AddFoodFloatingModal
        show={addModalShow}
        setAddModalShow={setAddModalShow}
        restaurant={restaurant}
        // setrestaurant={setrestaurant}
        onHide={() => setAddModalShow(false)}
        // setOrdersCount={setOrdersCount}
      /> */}
    </div>
  );
}
// // Floating Card
// function EditFoodFloatingModal(props) {
//   const [food_name, setFoodName] = useState(props.food_name);
//   //const [img_path, setImgPath] = useState(props.img_path);
//   const [food_price, setFoodPrice] = useState(props.food_price);
//   //const [food_id, setFoodId] = useState(props.food_id);
//   const [photoFile, setPhotoFile] = useState("");

//   const PhotoChange = (e) => {
//     setPhotoFile(e.target.files[0]);
//   };

//   const updateFood = async (data) => {
//     try {
//       await axios.put("http://localhost:3000/api/auth/updatefood", data);
//     } catch (error) {
//       throw error;
//     }
//   };

//   const updateFoodHandler = async (e) => {
//     const updateFormData = new FormData();
//     updateFormData.append("file", photoFile);
//     updateFormData.append("food_name", food_name);
//     updateFormData.append("food_price", food_price);
//     updateFormData.append("food_id", props.food_id);
//     updateFormData.append("res_email", props.res_email);

//     if (updateFormData) await updateFood(updateFormData);
//     props.setEditModalShow(false);

//     fetchResData(props.setrestaurant, props.setOrdersCount);

//     //window.location.reload(false);
//   };
//   return (
//     <Modal
//       {...props}
//       size="md"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <div>
//         <div className="row">
//           <img src={props.img_path} style={{ width: "100%" }} alt="" />
//           <div className="add--food horizontal-group">
//             <div className="form-group">
//               <label htmlFor="choose-file" className="label-title">
//                 Change Picture
//               </label>
//               <br />
//               <input
//                 type="file"
//                 className="form-class"
//                 id="choose-file"
//                 size={100}
//                 onChange={(e) => PhotoChange(e)}
//               />
//             </div>
//           </div>
//           <h6 className="change--food--title">Name</h6>
//           <input
//             name="text"
//             defaultValue={props.food_name}
//             onChange={(e) => setFoodName(e.target.value)}
//             type="text"
//             className="change--food--input"
//           ></input>
//           <h6 className="change--food--title">Price</h6>
//           <input
//             name="text"
//             defaultValue={props.food_price}
//             onChange={(e) => setFoodPrice(e.target.value)}
//             type="number"
//             className="change--food--input"
//           ></input>
//         </div>
//         <h4 onClick={updateFoodHandler} className="update--food--btn">
//           Update
//         </h4>
//       </div>
//     </Modal>
//   );
// }

// function AddFoodFloatingModal(props) {
//   const res_email = props.restaurant.res_email;

//   const [food_name, setFoodName] = useState("");
//   const [food_img, setFoodImg] = useState(null);
//   const [food_price, setFoodPrice] = useState("");
//   const [singleFile, setSingleFile] = useState("");

//   const SingleFileChange = (e) => {
//     console.log(e.target.files[0]);
//     setSingleFile(e.target.files[0]);
//   };

//   const singleFileUpload = async (data) => {
//     try {
//       await axios.post("http://localhost:3000/api/auth/addfood", data);
//     } catch (error) {
//       throw error;
//     }
//   };
//   const addFoodHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("file", singleFile);
//     formData.append("food_name", food_name);
//     formData.append("food_price", food_price);
//     formData.append("res_email", res_email);

//     await singleFileUpload(formData);
//     props.setAddModalShow(false);

//     fetchResData(props.setrestaurant, props.setOrdersCount);

//     //window.location.reload(false);
//   };

//   return (
//     <Modal
//       {...props}
//       size="md"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <div>
//         <div className="row">
//           <i className="fas fa-camera"></i>
//           <div className="add--food horizontal-group">
//             <div className="form-group">
//               <label htmlFor="choose-file" className="label-title">
//                 Upload Picture
//               </label>
//               <br />

//               <input
//                 type="file"
//                 className="form-class"
//                 id="choose-file"
//                 size={100}
//                 onChange={(e) => SingleFileChange(e)}
//               />
//             </div>
//           </div>
//           <h6 className="change--food--title">Name</h6>
//           <input
//             name="food_name"
//             onChange={(e) => setFoodName(e.target.value)}
//             type="text"
//             className="change--food--input form-class"
//           ></input>
//           <h6 className="change--food--title">Price</h6>
//           <input
//             name="food_price"
//             onChange={(e) => setFoodPrice(e.target.value)}
//             type="number"
//             className="change--food--input from-class"
//           ></input>
//         </div>
//         <input
//           type="submit"
//           value="Add"
//           className="update--food--btn"
//           onClick={() => addFoodHandler()}
//         />
//       </div>
//     </Modal>
//   );
// }

export default ResProfile;
