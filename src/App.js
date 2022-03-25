import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchResData } from "./api/resdata";

const App = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [restaurent, setRestaurent] = useState("");

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setUser(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        console.log("You are not authorized please login");
      }
    };

    fetchPrivateData();
  }, []);

  useEffect(() => {
    fetchResData(setRestaurent);
  }, []);

  return (
    <div className="App">
      <NavbarComp
        user={user}
        restaurent={restaurent}
        setUser={setUser}
        setRestaurent={setRestaurent}
      />
    </div>
  );
};

export default App;
