import React from "react";
import UsersCart from "../database/UsersCart";
import FoodData from "../database/FoodData";

function Cart() {
  console.log(FoodData);
  return (
    <div>
      <div>{UsersCart[0].cart} Items</div>

      <div>{UsersCart[0].res_id} Items</div>
      <div>{UsersCart[0].userid} Items</div>
    </div>
  );
}

export default Cart;
