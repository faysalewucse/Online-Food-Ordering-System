import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "../features/auth/authApi";
import { removeFromCart } from "../features/cart/cartSlice";

function CartCard(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [addToCart] = useAddToCartMutation();

  const removeFromCartHandler = ({ _id }) => {
    // removefromcart(
    //   props.setCartCount,
    //   props.user.email,
    //   food_name,
    //   food_price,
    //   img_path,
    //   res_email
    // );
    if (!user) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const filteredCartItems = cartItems.filter((item) => item._id !== _id);
      localStorage.setItem("cart", JSON.stringify(filteredCartItems));
      dispatch(removeFromCart(JSON.parse(localStorage.getItem("cart"))));
    }
  };

  // function reduceFromCart(food_id) {
  //   reducefromcart(props.setCartCount, props.user.email, food_id);
  //   fetchPrivateData(props.setUser, props.setAllRestaurent, props.setCartCount);
  // }

  return (
    <div>
      <div className="bg-lime-50 mb-3 rounded shadow-md">
        <div className="p-2 d-flex justify-content-between">
          <div className="flex gap-2">
            <img
              className="w-24 h-24 rounded object-cover"
              src={props.img_path}
              alt="food_image"
            />
            <div>
              <h4 className="font-bold">{props.food_name}</h4>
              <h6>
                {props.food_price} x {props.count}
              </h6>
              <div className="flex gap-2 items-center">
                <i
                  // onClick={() => reduceFromCart(props._id)}
                  className="fas fa-minus border border-black p-2 hover:bg-black hover:text-white transition duration-200"
                ></i>
                <i
                  onClick={() =>
                    addToCart({
                      email: user.email,
                      food_id: props.food_id,
                      food_name: props.food_name,
                      foor_price: props.food_price,
                      img_path: props.img_path,
                      res_email: props.res_email,
                      res_name: props.res_name,
                      res_address: props.res_address,
                      latlong: props.latlong,
                    })
                  }
                  className="fas fa-plus border border-black p-2 hover:bg-black hover:text-white transition duration-200"
                ></i>
                <i
                  onClick={() => removeFromCartHandler(props)}
                  className="fas fa-trash text-red-400 border border-black p-2 hover:bg-black hover:text-white transition duration-200"
                ></i>
              </div>
            </div>
          </div>
          <h6 className="mt-auto">{props.food_price * props.count} BDT</h6>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
