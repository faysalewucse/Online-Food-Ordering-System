import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import PublicRoute from "./middleware/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart";
import RegisterRestaurant from "./pages/RegisterRestaurant";
import PrivateRoute from "./middleware/PrivateRoute";
import Footer from "./components/Footer";
import Restaurants from "./components/Restaurents";
import Panel from "./pages/Admin Panel/Panel";
import AdminAuth from "./pages/Admin Panel/AdminAuth";

const App = () => {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/admin-auth" element={<AdminAuth />} />
          <Route path="/admin-panel" element={<Panel />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/restaurant-register"
            element={
              <PublicRoute>
                <RegisterRestaurant />
              </PublicRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
