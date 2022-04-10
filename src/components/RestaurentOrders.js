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
  setDeliveryStatus,
}) {
  const [time, setTime] = React.useState();

  let orders, length;
  if (restaurent.orders) {
    orders = restaurent.orders.map((item) => {
      return (
        <OrderCard
          items={item}
          setRestaurent={setRestaurent}
          setUser={setUser}
          setAllUser={setAllUser}
          setOrdersCount={setOrdersCount}
          setAllRestaurent={setAllRestaurent}
          setCartCount={setCartCount}
          setDeliveryStatus={setDeliveryStatus}
        />
      );
    });
  }

  return (
    <div>
      <div className="container orders--container">
        <h2 className="text-center mt-5 mb-5 orders--text">
          Continiously Update Order Status to Help Customer to Track Delivery
        </h2>
        <div className="container-fluid">
          <div className="row justify-content-center food--items">{orders}</div>
        </div>
      </div>
    </div>
  );
}

export default RestaurentOrders;
