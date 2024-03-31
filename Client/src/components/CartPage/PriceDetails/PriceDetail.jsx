import { useSelector } from "react-redux";
import "./PriceDetail.css";
import { Link } from "react-router-dom";
const PriceDetail = ({ title, onclick, valid = false }) => {
  const data = useSelector((store) => store.CartReducer)
  let details = data.reduce((acc, e) => {
    return { ...acc, qty: acc.qty + e.qty, total: acc.total + Number(e.price) * e.qty }
  }, { qty: 0, total: 0 })
  console.log(details)
  const discount = Math.round(details.total * 24 / 100);

  return (
    <div id="mainContainer">
      <div id="priceContainer">
        <div>
          <h3 className="priceDetail">Price Details</h3>
        </div>
        <hr />
        <div className="priceTags">
          <p>Price ({details.qty} items)</p>
          <h4>{details.total}</h4>
        </div>
        <div className="priceTags">
          <p>Discount</p>
          <h4>{discount}</h4>
        </div>
        <div className="priceTags">
          <p>Delivery Charges</p>
          <p>
            <span id="deliveryCharges">₹40</span>
            <span id="deliveryFree">Free</span>
          </p>
        </div>
        <hr className="dotted-line"></hr>
      </div>
      <div className="totalAmount priceTags">
        <h3>Total Amount</h3>
        <h3>{details.total - discount}</h3>
      </div>
      <hr className="dotted-line"></hr>
      <div className="checkOutContainer">
        <button className={valid ? "checkOutBtnNotValid" : "checkOutBtn"} onClick={() => { onclick() }} disabled={valid} >
          {/* <Link className="checkoutLink" >{title}</Link> */}
          {valid ? "Fill Your Address" : title}
        </button>
      </div>
    </div>
  );
};

export default PriceDetail;
