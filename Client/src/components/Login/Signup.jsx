import React, { useState } from 'react';
import userIcon from './Assets/person.png';
import emailIcon from './Assets/email.png';
import passwordIcon from './Assets/password.png';
import google from "./Assets/google.jpg"
import facebook from "./Assets/facebook.png"
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../configs';



const Signup = ({ isLoginSelected, setIsLoginSelected }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isAuth = useSelector((store) => store.AuthReducer.isAuth)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }
    try {
      const res = await axios.post(baseUrl + "/user/signup", user)
      // console.log(res)

      dispatch({ type: "login", payload: { name: res.data.name, token: res.data.token, role: res.data.role } })
      navigate("/")
    } catch (error) {
      console.log(error)
      if (error.response.data.message === "User already exists. Please login or sign in with google!") {
        alert(error.response.data.message)
        setIsLoginSelected(false)
      }
    }
  };




  const handleGoogleSignIn = async () => {
  }

  const handleToggleForm = () => {
    setIsLoginSelected(!isLoginSelected);
  };

  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='loginPage'>
      <div className='backgroundImage'>
        <form onSubmit={handleSubmit} id='signupForm'>
          <h2>Signup</h2>
          <div>
            <div className="input-group">
              <img src={userIcon} alt="User" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div className="input-group">
              <img src={emailIcon} alt="Email" />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div className="input-group">
              <img src={passwordIcon} alt="Password" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <input type="submit" className='LoginButton' value="Sign Up" />
          <button className='toggle' onClick={handleToggleForm}>
            {!isLoginSelected ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
          <div className='facebookAndGoogle'>
            <div><img src={facebook} alt="" /></div>
            <div><img src={google} onClick={handleGoogleSignIn} alt="" /></div>
          </div>
        </form>
        <div className='signUpBackground'>
          {/* <img src={background} alt="" /> */}
          <h2>Unlock a world! <br /> <span style={{ color: "brown" }}>of furniture</span> <br /> Designs</h2>
        </div>
        {/* {error && <p className="error">{error}</p>} */}
      </div>
    </div>
  );
};

export default Signup;
