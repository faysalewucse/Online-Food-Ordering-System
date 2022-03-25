import axios from "axios";

export const fetchResData = async (setRestaurent, setFoodList) => {
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

export const getFoods = async () => {
  try {
    const { data } = await axios.get("/api/auth/getfoods");
    return data;
  } catch (error) {
    throw error;
  }
};
