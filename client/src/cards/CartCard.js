import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../features/cart/cartSlice";

function CartCard(props) {
  const {
    _id,
    food_name,
    food_price,
    img_path,
    res_email,
    res_name,
    res_address,
    latlong,
    count,
  } = props;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const [addToCart] = useAddToCartMutation();

  const removeFromCartHandler = (_id) => {
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
      dispatch(updateCart(JSON.parse(localStorage.getItem("cart"))));
    }
  };

  function reduceFromCartHandler(_id) {
    // reducefromcart(props.setCartCount, props.user.email, food_id);
    // fetchPrivateData(props.setUser, props.setAllRestaurent, props.setCartCount);
    if (!user) {
      let cartItems = JSON.parse(localStorage.getItem("cart"));
      let index = cartItems.findIndex((item) => item._id === _id);
      if (index !== -1) {
        cartItems.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      dispatch(updateCart(JSON.parse(localStorage.getItem("cart"))));
    }
  }

  const addToCartHandler = (item) => {
    if (!user) {
      // if user not logged in then add item to local storage
      let cartItems = JSON.parse(localStorage.getItem("cart"));
      cartItems.push(item);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      dispatch(updateCart(JSON.parse(localStorage.getItem("cart"))));
    }
  };

  return (
    <div>
      <div className="bg-white mb-3 rounded shadow-md">
        <div className="p-2 d-flex justify-content-between">
          <div className="flex gap-2">
            <img
              className="w-24 h-24 rounded object-cover"
              src={img_path}
              alt="food_image"
            />
            <div>
              <h4 className="font-bold">{food_name}</h4>
              <h6>
                {food_price} x {count}
              </h6>
              <div className="flex gap-2 items-center">
                <i
                  onClick={() => reduceFromCartHandler(_id)}
                  className="fas fa-minus border border-black p-2 hover:bg-black hover:text-white transition duration-200"
                ></i>
                <i
                  onClick={() =>
                    addToCartHandler({
                      _id,
                      food_name,
                      food_price,
                      img_path,
                      res_email,
                      res_name,
                      res_address,
                      latlong,
                    })
                  }
                  className="fas fa-plus border border-black p-2 hover:bg-black hover:text-white transition duration-200"
                ></i>
                <i
                  onClick={() => removeFromCartHandler(_id)}
                  className="fas fa-trash text-red-400 border border-black p-2 hover:bg-black hover:text-white transition duration-200"
                ></i>
              </div>
            </div>
          </div>
          <h6 className="mt-auto mb-0">{food_price * count} BDT</h6>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
