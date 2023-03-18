import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function HomeRoute({ children }) {
  const { restaurant } = useSelector((state) => state.restaurants);
  return !restaurant ? children : <Navigate to="/res-profile" />;
}
