import { useCallback, useState, useEffect, useRef } from "react";
import PriceDetail from "../PriceDetails/PriceDetail";
import useRazorpay from "react-razorpay";

import logo from "../../Navbar/NavbarImages/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Formpage.css";


import { cleanCart } from "../redux/action";


function FormPage() {
  const [countdown, setCountdown] = useState(5);
  const dispatch = useDispatch();
  //=========================>>>>
  const data = useSelector((store) => store.CartReducer);

  let details = data.reduce(
    (acc, e) => {
      return {
        ...acc,
        qty: acc.qty + e.qty,
        total: acc.total + Number(e.price) * e.qty,
      };
    },
    { qty: 0, total: 0 }
  );
  console.log(details);
  const ammount = details.total - Math.round((details.total * 24) / 100);

  //==========================>>>>
  const [Razorpay, isLoaded] = useRazorpay();
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();
  const handlePayment = useCallback(() => {
    const options = {
      key: "rzp_test_yswl3N40ETtM35", // Replace with your actual API Key
      amount: ammount * 100,
      currency: "INR",
      name: "WOOD FANS",
      description: "Test Transaction",
      image: logo,
      // order_id: 1, // Pass the order ID obtained from createOrder
      handler: (res) => {
        setShowThankYou(true);

        setTimeout(() => {
          setShowThankYou(false);
          navigate("/");
        }, 5000);
      },
      prefill: {
        name: "Ashutosh Verma",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);
  //==========================>>>>
  //form validation
  // const [valid, setValid] = useState(true);
  let { current: valid } = useRef(true);
  const [firstname, setfirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [houseNumber, setHouseNumber] = useState("")
  const [city, setCity] = useState("")
  const [area, setArea] = useState("")
  const [pincode, setPincode] = useState("")
  if (firstname != "" && lastname != "" && contactNumber.length == 10 && houseNumber != "" && city != "" && area != "" && pincode.length == 6) {
    valid = false;
  } else {
    valid = true;
  }
  //==========================>>>>

  useEffect(() => {
    if (showThankYou) {
      dispatch(cleanCart())
      const countdownInterval = setInterval(() => {
        setCountdown(countdown - 1);

        if (countdown === 0) {
          clearInterval(countdownInterval);
          setShowThankYou(false);
          navigate("/");
        }
      }, 1000); // Update the countdown every 1 second (1000ms)

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [showThankYou, countdown, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click")
  }

  return (
    <div className="wrapperDivFormPage">
      {showThankYou ? (
        <div className="thankYouContainer">
          <div className="thank-you-message">
            <p className="thankyouMsg">Thank you for your Purchase!</p>
            <img
              src="https://i.pinimg.com/originals/66/22/ab/6622ab37c6db6ac166dfec760a2f2939.gif"
              alt="Thank You"
              width={400}
              height={300}
            />
            <p className="CountDown">{`You will be redirected to home page in ${countdown} sec`}</p>
          </div>
        </div>
      ) : (
        <div className="paymentContainer">
          <div>
            <div id="delivery-address">
              <div className="form">
                <form action="" onSubmit={() => { handleSubmit }}>
                  <h4 className="color-666666">Personal Details</h4>
                  <div id="name-contact">
                    <div>
                      <div id="name">
                        <label htmlFor="first-name">
                          <span className="color-red">*&nbsp;</span>Enter first
                          name
                        </label>
                        <input type="text" id="first-name" required value={firstname} onChange={(e) => { setfirstName(e.target.value) }} />
                      </div>
                    </div>

                    <div>
                      <div id="last-name">
                        <label htmlFor="lastname">
                          <span className="color-red">*&nbsp;</span>Enter last
                          name
                        </label>
                        <input type="text" id="lastname" required value={lastname} onChange={(e) => { setLastName(e.target.value) }} />
                      </div>
                    </div>

                    <div>
                      <div id="phone">
                        <label htmlFor="contact">
                          <span className="color-red">*&nbsp;</span>Enter
                          contact number
                        </label>
                        <input type="number" id="contact" required value={contactNumber} onChange={(e) => { setContactNumber(e.target.value) }} />
                      </div>
                    </div>
                  </div>

                  <div id="Address-details">
                    <div id="Address">
                      <label htmlFor="houseNumber">
                        <span className="color-red">*&nbsp;</span>House No
                      </label>
                      <input type="number" id="houseNumber" required value={houseNumber} onChange={(e) => { setHouseNumber(e.target.value) }} />
                    </div>
                    <div>
                      <label htmlFor="apartment">Enter your address</label>
                      <input type="text" id="apartment" />
                    </div>
                  </div>

                  <div id="Street-details">
                    <div id="street-det">
                      <label htmlFor="street">Enter street details</label>
                      <input type="text" id="street" />
                    </div>
                    <div>
                      <label htmlFor="landmark">
                        Enter landmark for easy reach out
                      </label>
                      <input type="text" id="landmark" />
                    </div>
                  </div>

                  <div id="city-details">
                    <div id="city-name">
                      <label htmlFor="city">* Enter city name</label>
                      <select type="text" id="city" value={city} onChange={(e) => { setCity(e.target.value) }}>
                        <option value="">Select City</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="banglore">Bangalore</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="area-det">
                        <span className="color-red">*&nbsp;</span>Area details
                      </label>
                      <select type="text" id="area-det" value={area} onChange={(e) => { setArea(e.target.value) }}>
                        <option value="">Select Area</option>
                        <option value="Sarojani" >Sarojni</option>
                        <option value="Anand Vihar">Anand Vihar</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="pincode">
                        <span className="color-red">*&nbsp;</span>Pincode
                      </label>
                      <input type="text" id="pincode" style={{ height: "21px" }} required value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
                    </div>
                  </div>
                </form>
              </div>

              <div>
                <PriceDetail onclick={handlePayment} valid={valid} title={"Pay Now"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormPage;
