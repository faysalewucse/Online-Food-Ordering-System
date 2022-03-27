import axios from "axios";

export const fetchPrivateData = async (
  setUser,
  setAllRestaurent,
  setCartCount
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  try {
    const { data } = await axios.get("/api/private", config);
    getAllRes(setAllRestaurent);
    setUser(data.data);

    const keys = ["food_name", "img_path"];
    const filtered = data.data.cart.filter(
      (
        (s) => (o) =>
          ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join("|"))
      )(new Set())
    );

    setCartCount(filtered.length);
  } catch (error) {
    localStorage.removeItem("authToken");
    console.log("You are not authorized please login");
  }
};

export const fetchResData = async (setRestaurent) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authTokenRes")}`,
    },
  };

  try {
    const { data } = await axios.get("/api/resdata", config);
    setRestaurent(data.data);
  } catch (error) {
    localStorage.removeItem("authTokenRes");
    console.log("You are not authorized please login");
  }
};

export const getAllRes = async (setAllRestaurent) => {
  try {
    const { data } = await axios.get("/api/auth/getallres");
    setAllRestaurent(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getResFood = async (setResFood, res_email) => {
  try {
    const { data } = await axios.post("/api/auth/getresfood", { res_email });
    setResFood(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const addtocart = async (
  setCartCount,
  email,
  food_name,
  food_price,
  img_path,
  res_email
) => {
  try {
    const { data } = await axios.post("/api/auth/addtocart", {
      email,
      food_name,
      food_price,
      img_path,
      res_email,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const removefromcart = async (
  setCartCount,
  email,
  food_name,
  food_price,
  img_path,
  res_email
) => {
  try {
    const { data } = await axios.post("/api/auth/removefromcart", {
      email,
      food_name,
      food_price,
      img_path,
      res_email,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const reducefromcart = async (setCartCount, email, food_id) => {
  try {
    const { data } = await axios.post("/api/auth/reducefromcart", {
      email,
      food_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
