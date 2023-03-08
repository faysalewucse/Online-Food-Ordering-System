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
    const { data } = await axios.get(
      "http://localhost:3000/api/private",
      config
    );
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

export const fetchRiderData = async (setRider, setAllRestaurent) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authTokenRider")}`,
    },
  };

  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/riderdata",
      config
    );
    getAllRes(setAllRestaurent);
    setRider(data.data);
  } catch (error) {
    console.log(":EIJAYGAY HOSSE");
    localStorage.removeItem("authTokenRider");
    console.log("You are not authorized please login");
  }
};

export const fetchResData = async (setRestaurent, setOrdersCount) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authTokenRes")}`,
    },
  };

  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/resdata",
      config
    );
    setRestaurent(data.data);
    let order_length = 0;
    data.data.orders.map((item) => {
      if (
        item.status !== "Delivered" &&
        item.status !== "Completed" &&
        item.status !== "Canceled"
      )
        order_length++;
    });
    setOrdersCount(order_length);
  } catch (error) {
    localStorage.removeItem("authTokenRes");
    console.log("You are not authorized please login");
  }
};

export const getAllRes = async (setAllRestaurent) => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/auth/getallres"
    );
    setAllRestaurent(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllUser = async (setAllUser) => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/auth/getalluser"
    );
    setAllUser(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllRider = async (setAllRider) => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/auth/getallrider"
    );
    setAllRider(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getResFood = async (setResFood, res_email) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/auth/getresfood",
      {
        res_email,
      }
    );
    setResFood(data);
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
    const { data } = await axios.post(
      "http://localhost:3000/api/auth/removefromcart",
      {
        email,
        food_name,
        food_price,
        img_path,
        res_email,
      }
    );
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

export const confirmorder = async (
  user_mail,
  user,
  res_email,
  res_address,
  result,
  setCartCount
) => {
  try {
    console.log("Confirm");
    const { data } = await axios.post(
      "http://localhost:3000/api/auth/confirmorder",
      {
        user,
        res_email,
        res_address,
        result,
      }
    );

    console.log("Removing");
    await axios.put("http://localhost:3000/api/auth/afterconfirm_removecart", {
      user_mail,
    });

    setCartCount(0);

    const { res } = await axios.post(
      "http://localhost:3000/api/auth/afterremovecart_deliverystatus",
      {
        data,
        result,
        user_mail,
        res_email,
        res_address,
      }
    );

    console.log(res);

    return data;
  } catch (error) {
    throw error;
  }
};
