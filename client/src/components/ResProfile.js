import "../css/FoodList.css";
import "../css/MyRestaurent.css";
import React, { useState } from "react";
import LoadingButton from "../utils/LoadingButton";
import { useSelector } from "react-redux";
import { createClient } from "pexels";
import {
  useAddItemToRestaurantMutation,
  useGetRestaurantQuery,
} from "../features/restaurant/restaurantApi";

function ResProfile() {
  // Initialize variables
  const defaultCategories = [
    "Bread",
    "Burgers",
    "Desserts",
    "Drinks",
    "Fish",
    "Lentils",
    "Meat",
    "Pizza",
    "Rice",
    "Sandwiches",
    "Set Menu",
    "Shawarma",
    "Snacks",
    "Sweets",
    "Vegetables",
    "Street food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryInModal, setCategoryInModal] = useState("");
  const [addModalShow, setAddModalShow] = useState();

  // Query Mutaions Function
  const [addItemToRestaurant, { loading }] = useAddItemToRestaurantMutation();

  //get restaurant data
  const { restaurant: loggedInRestaurant } = useSelector(
    (state) => state.restaurants
  );

  const {
    data: restaurant = [],
    isLoading,
    isError,
  } = useGetRestaurantQuery(loggedInRestaurant?.res_email);

  //Variables for adding food in modal
  const [images, setImages] = useState([]);
  const [food_id, setFoodId] = useState(undefined);
  const [food_name, setFoodName] = useState("");
  const [food_img, setFoodImg] = useState(null);
  const [food_price, setFoodPrice] = useState("");
  const [modalError, setModalError] = useState("");

  //Get Image
  const client = createClient(process.env.REACT_APP_PEXEL_KEY);

  const getImages = async (query) => {
    if (food_name === "") {
      setImages([]);
      modalErrorHandler("Please Write Food Name!");
    }
    return new Promise(function (resolve, reject) {
      client.photos.search({ query, per_page: 10 }).then((photos) => {
        setImages(photos?.photos);
      });
      resolve();
    });
  };

  //  What to render
  let items = [];
  if (isLoading) {
    items = <h6>Loading...</h6>;
  } else if (!isLoading && isError) {
    items = <h6>Error Occured!</h6>;
  } else if (restaurant?.items) {
    items = restaurant?.items.map(
      ({ _id, food_name, food_price, food_img, category, rating }, index) => {
        return (
          <div
            key={_id}
            className="flex gap-2 bg-[#E9F8F9] text-black items-center rounded-md"
          >
            <img
              className="w-32 h-32 rounded-md object-cover"
              src={food_img}
              alt="food"
            />
            <div className="">
              <h5>
                {food_id === _id ? (
                  <input
                    className="block w-3/4"
                    type="text"
                    defaultValue={food_name}
                  />
                ) : (
                  <b>{food_name}</b>
                )}
                <span>
                  <i
                    onClick={() => setFoodId(_id)}
                    className={`ml-2 fa-solid ${
                      food_id === _id ? "fa-trash" : "fa-pen"
                    } text-sm opacity-30 hover:opacity-100 transition-all duration-300`}
                  ></i>
                </span>
              </h5>
              <h6>{food_price}</h6>
              <h6>rating: {5}</h6>
            </div>
          </div>
        );
      }
    );
  }

  function hideAddModal() {
    setAddModalShow(false);
  }

  // Category on change handler
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const modalErrorHandler = (errorMsg) => {
    setModalError(errorMsg);
    setTimeout(() => {
      setModalError();
    }, 2000);
    return;
  };
  const addItemTotheRestaurant = async () => {
    if (!food_img) return modalErrorHandler("Please Select Image");
    if (food_price === "") return modalErrorHandler("Please Enter Food Price");
    if (categoryInModal === "")
      return modalErrorHandler("Please Select Category");

    await addItemToRestaurant({
      res_email: restaurant.res_email,
      food_name,
      food_price,
      food_img,
      category: categoryInModal,
    }).then(hideAddModal());
  };

  return (
    <div className="bg-dark text-white">
      <div className="container">
        {/* Banner */}
        <div className="py-5">
          <div className="hero rounded h-30 bg-[url('https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg?w=1380&t=st=1678708060~exp=1678708660~hmac=9127ae83c5e17713e585b1969df229b79825f472a30bd003c7a552cc8b00af28')]">
            <div className="hero-overlay bg-opacity-80 rounded"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="p-10">
                <h1 className="text-5xl font-bold">{restaurant.res_name}</h1>
                <h6 className="mb-5 font-bold">{restaurant.res_address}</h6>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <div className="flex-grow mb-10">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Foods</h3>
                <div className="flex gap-3 items-center">
                  <h6 className="border-2 border-white rounded-full px-3 cursor-pointer">
                    All
                  </h6>
                  <select
                    className="text-black focus:outline-none border-2 border-gray-900 rounded-full px-3 -mt-2"
                    name="categories"
                    id="categories"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select Category</option>
                    {defaultCategories.map((category, index) => (
                      <option key={index} className="p-2" value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {items?.length !== 0 ? (
                <div className="grid grid-cols-3 gap-3">{items}</div>
              ) : (
                <div className="border rounded p-5 flex flex-col gap-2 justify-center items-center">
                  <img
                    className="w-1/6"
                    src="images/no-food.png"
                    alt="no-food"
                  />
                  <h3>No Items Yet</h3>
                </div>
              )}
            </div>
            <div className="text-center w-1/6">
              <button
                onClick={() => setAddModalShow(true)}
                className="w-full bg-green text-white py-1 px-4 rounded-full hover:bg-greenHover"
              >
                Add Item +
              </button>
            </div>
          </div>
        </div>

        {/* Food Adding Modal */}
        <div className="text-black">
          {addModalShow ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Food Informations
                      </h3>
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
                    <div className="relative p-10">
                      <div className="flex flex-col gap-2">
                        <select
                          className="border border-gray-900 rounded-full px-3 py-1"
                          name="categories"
                          id="categories"
                          onChange={(e) => setCategoryInModal(e.target.value)}
                          placeholder="Write category"
                        >
                          <option value="">Select Category</option>
                          {defaultCategories.map((category, index) => (
                            <option
                              key={index}
                              className="p-2"
                              value={category}
                            >
                              {category}
                            </option>
                          ))}
                        </select>
                        <input
                          className="border border-gray-900 rounded-full px-3 py-1"
                          type="text"
                          placeholder="Write Food name"
                          onChange={(e) => setFoodName(e.target.value)}
                        />
                        <input
                          className="border border-gray-900 rounded-full px-3 py-1"
                          type="number"
                          placeholder="Price"
                          onChange={(e) => setFoodPrice(e.target.value)}
                        />
                        <LoadingButton
                          text={"Get Images"}
                          onClickHandler={() => getImages(food_name)}
                        />

                        <div className="grid grid-cols-5 gap-2">
                          {images.map((image) => (
                            <div key={image.id} className="relative">
                              <img
                                className={`h-24 w-24 object-cover ${
                                  image.src.large === food_img
                                    ? "border-5 border-green"
                                    : "border-none"
                                }`}
                                src={image.src.large}
                                alt={image.alt}
                                onClick={() => setFoodImg(image.src.large)}
                              />
                              {image.src.large === food_img && (
                                <i className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fas fa-check bg-white rounded-full p-2"></i>
                              )}
                            </div>
                          ))}
                        </div>
                        {modalError && (
                          <p className="text-red-600">{modalError}</p>
                        )}
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => setAddModalShow(false)}
                      >
                        Cancel
                      </button>
                      <LoadingButton
                        text={"Add"}
                        loading={loading}
                        onClickHandler={addItemTotheRestaurant}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
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
