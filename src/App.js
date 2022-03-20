import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import { useState } from "react";

const App = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [restaurent, setRestaurent] = useState("");

  return (
    <div className="App">
      <NavbarComp
        user={user}
        setUser={setUser}
        restaurent={restaurent}
        setRestaurent={setRestaurent}
      />
    </div>
  );
};

export default App;
