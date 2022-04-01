import React from "react";
import "../css/RestaurentOrders.css";
import Countdown from "react-countdown";
import OrderCard from "../cards/OrderCard";

function RestaurentOrders({
  restaurent,
  setOp,
  setOc,
  setPrep,
  setOfd,
  setComplete,
  setOpp,
  setOcp,
  setPp,
  setOfdp,
}) {
  const [time, setTime] = React.useState();

  setOp(1);
  setOpp(75);

  console.log(restaurent.orders);

  let orders;
  if (restaurent.orders) {
    orders = restaurent.orders.map((item) => {
      return <OrderCard items={item} />;
    });
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-5 orders--text">
        Continiously Update Order Status to Help Customer to Track Delivery
      </h2>
      <div className="container-fluid">
        <div className="row justify-content-center food--items">{orders}</div>
      </div>
      {/* <EditFoodFloatingModal
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
      /> */}
    </div>
  );
}

export default RestaurentOrders;
