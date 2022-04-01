import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchResData, fetchPrivateData } from "./api/resdata";

const App = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [restaurent, setRestaurent] = useState("");
  const [allrestaurent, setAllRestaurent] = useState("");
  const [cart_count, setCartCount] = useState();
  const [orders_count, setOrdersCount] = useState();

  useEffect(() => {
    fetchPrivateData(setUser, setAllRestaurent, setCartCount);
  }, []);

  useEffect(() => {
    fetchResData(setRestaurent, setOrdersCount);
  }, []);

  return (
    <div className="App">
      <NavbarComp
        user={user}
        restaurent={restaurent}
        setUser={setUser}
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
