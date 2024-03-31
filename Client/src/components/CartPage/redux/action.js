import axios from "axios";
import { baseUrl } from "../../../../configs";

export const addToCart = (payload) => {
  return {
    type: "add",
    payload: payload,
  };
};
export const removeFromCart = (payload) => {
  return {
    type: "remove",
    payload: payload,
  };
};
export const increaseQty = (payload) => {
  return {
    type: "increase",
    payload: payload,
  };
};
export const decreaseQty = (payload) => {
  return {
    type: "decrease",
    payload: payload,
  };
};
export const cleanCart = () => {
  return {
    type: "cleanCart",
  };
};

export const getData = (url, token) => async (dispatch) => {
  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.data.message === "Please login first") {
      dispatch(cleanCart());
    } else {
      dispatch({ type: "cartload", payload: data.data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const postData = async (obj) => {
  const token = JSON.parse(localStorage.getItem("userDetails")).token;
  try {
    const data = await axios.patch(baseUrl + "/cart", obj, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
