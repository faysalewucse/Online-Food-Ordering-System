import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);
  const resAuth = useSelector((state) => state.restaurants);

  if (auth?.accessToken && auth?.user) {
    return true;
  } else if (resAuth?.accessToken && resAuth?.restaurant) {
    return true;
  } else {
    return false;
  }
}
