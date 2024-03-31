import React, { useState } from 'react';
import './Login.css';
import google from "./Assets/google.jpg"
import facebook from "./Assets/facebook.png"
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../../configs';
import axios from 'axios';


const Login = ({ isLoginSelected, setIsLoginSelected }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isAuth = useSelector((store) => store.AuthReducer.isAuth)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: formData.email,
      password: formData.password,
    }
    try {
      const res = await axios.post(baseUrl + "/user/login", user)
      console.log(res)
      dispatch({ type: "login", payload: { name: res.data.name, token: res.data.token, role: res.data.role } })
      navigate("/")
    } catch (error) {
      console.log(error)
      if (error.response.data.message) {
        alert(error.response.data.message)
        setIsLoginSelected(false)
      }
    }
  };


  const handleToggleForm = () => {
    setIsLoginSelected(!isLoginSelected);
  };


  const handleGoogleSignIn = async () => {

  };

  if (isAuth) {
    return <Navigate to={'/'} />
  }
  return (

    <div className='loginPage'>
      <div className='backgroundImage'>
        <form onSubmit={handleSubmit} >
          <h2>Login</h2>

          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className='inputCheckbox'>
            <p><input type="checkbox" /> <span>Rememeber me</span></p>
            <p>Forgot Password?</p>
          </div>
          <input type="submit" className='LoginButton' value="Login" />
          <button className='toggle' onClick={handleToggleForm}>
            Don't have an account? Sign Up
          </button>
          <div className='facebookAndGoogle'>
            <div><img src={facebook} alt="" /></div>
            <div><img src={google} onClick={handleGoogleSignIn} alt="" /></div>
          </div>
        </form>
        <div>
          <h2>Furniture is meant<br /> <span style={{ color: "brown" }}>to be used</span> <br /> and enjoyed</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
