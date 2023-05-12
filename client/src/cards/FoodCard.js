import React from "react";
import "./FoodCard.css";
import { addCartItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

function FoodCard({ item, restaurant }) {
  const { _id, food_name, food_img, food_price, sold } = item;
  const { res_name, res_email, res_address, lattitude, longitude } = restaurant;

  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const [addCartItem, { data, isLoading, error: responseError }] =
  //   useAddCartItemMutation();

  const addToCart = (item) => {
    // if user not logged in then add item to local storage
    let storedItem = JSON.parse(localStorage.getItem("cart"));
    console.log(storedItem);
    if (storedItem) {
      storedItem.push(item);
      console.log(storedItem);
      localStorage.setItem("cart", JSON.stringify(storedItem));
    } else localStorage.setItem("cart", JSON.stringify([item]));
    dispatch(addCartItem(JSON.parse(localStorage.getItem("cart"))));
    // addCartItem(item);
  };

  // function setModalitem(setReviewsModalShow, item, setItem) {
  //   if (item.reviews.length > 0) {
  //     setReviewsModalShow(true);
  //     setItem(item);
  //   }
  // }

  let foodTotal = 0;
  // let length = item.rating.length - 1;
  item.rating.forEach(({ star }) => (foodTotal += parseInt(star)));
  // let avgStar = Math.floor(foodTotal / length);

  return (
    <div className="text-center shadow-md rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
      <img
        // onClick={() =>
        //   setModalitem(item.setReviewsModalShow, item.item, item.setItem)
        // }
        className="w-full h-48 object-cover rounded-t-lg"
        src={food_img}
        alt="card_image"
      />
      <div className="p-2">
        <h4 className="text-green font-bold mt-2">
          {food_name}({sold})
        </h4>

        <h6 className="text-indigo-500 font-bold">BDT: {food_price} /-</h6>

        <small className="fa fa-person-biking">: {15} Tk</small>
        <div className="my-2">
          {[...Array(5)].map((key, index) => {
            return <span key={index} className="fa fa-star" />;
          })}
        </div>
        <button
          onClick={() =>
            addToCart({
              _id,
              food_name,
              food_price,
              img_path: food_img,
              res_email,
              res_name,
              res_address,
              latlong: `${lattitude}#${longitude}`,
            })
          }
          className="text-white bg-green hover:bg-greenHover px-3 py-1 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
