import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import { useState, useEffect } from "react";
import {
  fetchResData,
  fetchPrivateData,
  getAllUser,
  fetchRiderData,
  getAllRider,
} from "./api/resdata";

const App = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [rider, setRider] = useState("");
  const [restaurent, setRestaurent] = useState("");
  const [allUser, setAllUser] = useState("");
  const [allRider, setAllRider] = useState("");
  const [allrestaurent, setAllRestaurent] = useState("");
  const [cart_count, setCartCount] = useState();
  const [orders_count, setOrdersCount] = useState();

  useEffect(() => {
    fetchPrivateData(setUser, setAllRestaurent, setCartCount);
    fetchRiderData(setRider, setAllRestaurent);
    getAllUser(setAllUser);
    getAllRider(setAllRider);
    fetchResData(setRestaurent, setOrdersCount);
  }, []);

  let total = 0,
    pending = 0,
    totalSpent = 0;
  if (user) {
    user.my_orders.forEach((order) => {
      order.result.forEach((item) => {
        totalSpent += parseInt(item.food_price);
      });
      total += 1;
      if (order.status === "Cooking" || order.status === "Delivered")
        pending += 1;
    });
    localStorage.setItem("totalOrder", total);
    localStorage.setItem("pendingOrder", pending);
    localStorage.setItem("totalSpent", totalSpent);
  }

  return (
    <div className="App">
      <NavbarComp
        user={user}
        setUser={setUser}
        allUser={allUser}
        rider={rider}
        allRider={allRider}
        setRider={setRider}
        setAllRider={setAllRider}
        setAllUser={setAllUser}
        restaurent={restaurent}
        setRestaurent={setRestaurent}
        allrestaurent={allrestaurent}
        setAllRestaurent={setAllRestaurent}
        cart_count={cart_count}
        orders_count={orders_count}
        setCartCount={setCartCount}
        setOrdersCount={setOrdersCount}
      />
    </div>
  );
};

export default App;
