import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import CartPage from "../pages/CartPage";
import LoginAndSignUpPage from "../pages/LoginAndSignUpPage";
import ProductPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import FormPage from "../components/CartPage/FormPage/FormPage";
import Admin from "../components/Admin/Admin";
import { useSelector } from "react-redux";
import Seller from "../components/Admin/Seller";

const AllRoutes = () => {
    const role = useSelector((store) => store.AuthReducer.role)
    const isAuth = useSelector((store) => store.AuthReducer.isAuth)
    // console.log(role)
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginAndSignUpPage />} />
            <Route path="/address" element={<FormPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/productdetails/:type/:id" element={<ProductDetailsPage />} />

            <Route path="/admin" element={role == "admin" ?
                <Admin /> : <LoginAndSignUpPage />
            } />
            <Route path="/seller" element={role == "seller" ?
                <Seller /> : <LoginAndSignUpPage />
            } />
        </Routes>
    )
}



export default AllRoutes;
