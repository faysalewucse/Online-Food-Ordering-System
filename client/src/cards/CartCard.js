import React from "react";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "../features/auth/authApi";

function CartCard(props) {
  const { user } = useSelector((state) => state.auth);
  const [addToCart] = useAddToCartMutation();

  // function removeFromCart(food_name, food_price, img_path, res_email) {
  //   removefromcart(
  //     props.setCartCount,
  //     props.user.email,
  //     food_name,
  //     food_price,
  //     img_path,
  //     res_email
  //   );
  //   fetchPrivateData(props.setUser, props.setAllRestaurent, props.setCartCount);
  // }

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
              <div className="flex gap-3 items-center">
                <i
                  // onClick={() => reduceFromCart(props._id)}
                  className="fas fa-minus border border-black p-1"
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
                  className="fas fa-plus border border-black p-1"
                ></i>
                <i
                  // onClick={() =>
                  //   removeFromCart(
                  //     props.food_name,
                  //     props.food_price,
                  //     props.img_path,
                  //     props.res_email
                  //   )
                  // }
                  className="fas fa-trash text-red-400 border border-black p-1"
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
