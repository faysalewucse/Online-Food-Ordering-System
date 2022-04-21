import React from "react";
import "../css/RestaurentOrders.css";
import OrderCard from "../cards/OrderCard";

function RestaurentOrders({
  restaurent,
  user,
  setAllUser,
  setRestaurent,
  setUser,
  setOrdersCount,
  setAllRestaurent,
  setCartCount,
}) {
  let orders,
    length = 0;
  if (restaurent.orders) {
    orders = restaurent.orders.map((item) => {
      if (item.status !== "Delivered") {
        length += 1;
        return (
          <OrderCard
            items={item}
            setRestaurent={setRestaurent}
            setUser={setUser}
            setAllUser={setAllUser}
            setOrdersCount={setOrdersCount}
            setAllRestaurent={setAllRestaurent}
            setCartCount={setCartCount}
          />
        );
      }
    });
  }

  return (
    <div>
      {length !== 0 ? (
        <div className="container orders--container">
          <h2 className="text-center mt-5 mb-5 orders--text">
            Continiously Update Order Status to Help Customer to Track Delivery
          </h2>
          <div className="container-fluid">
            <div className="row justify-content-center food--items">
              {orders}
            </div>
          </div>
        </div>
      ) : (
        <div className="row empty-orders">
          <div className="col">
            <div className="text-center">
              <img
                src="images/cart-empty.svg"
                alt="cart-empty"
                className="cart--empty--png"
              />
              <h3 className="text-center cart-empty-text">
                You have no pending Orders
              </h3>
              <h6 className="text-center cart-empty-text mb-5">
                Wait for user order request
              </h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurentOrders;
