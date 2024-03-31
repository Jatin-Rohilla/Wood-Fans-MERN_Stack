import { Add_To_Cart, Handle_Product_Navbar } from "./actionType";

const initialState = {
  cartArr: [],
  productType: "Sofas",
  // Initialize cartArr as an empty array.
};
const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case Add_To_Cart: {
      return {
        ...state,
        cartArr: [...state.cartArr, action.payload],
      };
    }
    case Handle_Product_Navbar: {
      return { ...state, productType: action.payload };
    }
    default:
      return state;
  }
};
export default ProductReducer;
