import { postData } from "./action";

const intialState = [];

const CartReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case "add": {
      let check = false;
      let map = state.map((ele) => {
        if (ele.title == payload[0].title) {
          check = true;
          return { ...ele, qty: ele.qty + 1 };
        } else {
          return ele;
        }
      });
      if (check) {
        postData({ cart: map });
        return map;
      } else {
        postData({ cart: [...state, ...payload] });
        return [...state, ...payload];
      }
    }
    case "remove": {
      let fil = state.filter((ele) => {
        return ele.title != payload;
      });
      postData({ cart: fil });
      return fil;
    }
    case "increase": {
      let map = state.map((ele) => {
        if (ele.title == payload) {
          return { ...ele, qty: ele.qty + 1 };
        } else {
          return ele;
        }
      });
      postData({ cart: map });
      return map;
    }
    case "decrease": {
      let map = state.map((ele) => {
        if (ele.title == payload && ele.qty > 1) {
          return { ...ele, qty: ele.qty - 1 };
        } else {
          return ele;
        }
      });
      postData({ cart: map });
      return map;
    }
    case "cartload": {
      return payload;
    }
    case "cleanCart": {
      postData({ cart: [] });
      return [];
    }

    default:
      return state;
  }
};

export default CartReducer;
