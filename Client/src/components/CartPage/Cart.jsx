import { useSelector } from "react-redux";
import "../CartPage/Cart.css";
import CartElement from "./CartElement/CartElement";
import PriceDetail from "./PriceDetails/PriceDetail";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const isAuth = useSelector((store) => store.AuthReducer.isAuth)
  const data = useSelector((store) => store.CartReducer)



  useEffect(()=>{
    try {
      
    } catch (error) {
      
    }
  },[])




  const navigate = useNavigate();
  //============>
  let details = data.reduce((acc, e) => {
    return { ...acc, qty: acc.qty + e.qty, total: acc.total + Number(e.price) * e.qty }
  }, { qty: 0, total: 0 })
  console.log(details)
  const discount = Math.round(details.total * 24 / 100);
  //============>
  return data.length == 0 ? (
    <div className="emptyCardContainer">
      <div className="emptyBox">
        <img
          className="emptyImage"
          src="https://iticsystem.com/img/empty-cart.png"
          alt="Empty Cart"
        />
        <div className="emptyBtnContainer">
          <button className="emptyBtn" onClick={() => { navigate("/product") }}>Shop Now</button>
        </div>
      </div>
    </div>
  ) : (
    <div id="cartContainer">
      <div id="Container">
        <div id="address">
          <h3>Total Items :- {details.qty}</h3>
          <h3>Total Amount :- {details.total - discount}</h3>
        </div>
        <div id="CardElement">
          {data.map((ele) => {
            return (
              <CartElement
                key={ele.id}
                name={ele.title}
                seller={"Wood Fans"}
                image={ele.image}
                price={Number(ele.price)}
                discount={24}
                quantity={ele.qty}
              />
            );
          })}
        </div>
      </div>
      <div>
        {
          isAuth ? (<PriceDetail onclick={() => { navigate("/address") }} title={"Checkout"} />) : (<PriceDetail onclick={() => { navigate("/login") }} title={"First Login"} />)
        }

      </div>
    </div>
  );
};

export default Cart;
