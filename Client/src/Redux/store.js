import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import AuthReducer from "../components/Login/redux/AuthReducer";
import thunk from "redux-thunk";
import ProductReducer from "../components/ProductPage/ProductReducer/productReducer";
import ProductDetailReducer from "../components/ProductPage/Redux/ProductDetailReducer/ProductDetailReducer";

import CartReducer from "../components/CartPage/redux/CartReducers";
const combinereducers = combineReducers({
  AuthReducer,
  CartReducer,
  ProductReducer,
  ProductDetailReducer,
});
export const store = legacy_createStore(
  combinereducers,
  applyMiddleware(thunk)
);
