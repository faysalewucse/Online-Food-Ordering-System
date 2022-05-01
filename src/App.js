import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import { useState, useEffect } from "react";
import {
  fetchResData,
  fetchPrivateData,
  getAllUser,
  fetchRiderData,
} from "./api/resdata";

const App = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [rider, setRider] = useState("");
  const [allUser, setAllUser] = useState("");
  const [restaurent, setRestaurent] = useState("");
  const [allrestaurent, setAllRestaurent] = useState("");
  const [cart_count, setCartCount] = useState();
  const [orders_count, setOrdersCount] = useState();

  useEffect(() => {
    fetchPrivateData(setUser, setAllRestaurent, setCartCount);
    fetchRiderData(setRider, setAllRestaurent);
    getAllUser(setAllUser);
    fetchResData(setRestaurent, setOrdersCount);

    console.log(rider);
  }, []);

  return (
    <div className="App">
      <NavbarComp
        user={user}
        setUser={setUser}
        allUser={allUser}
        rider={rider}
        setRider={setRider}
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
