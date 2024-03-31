import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import AllRoutes from './Routes/AllRoutes'
import Footer from './components/Footer/Footer'

import Navbar from './components/Navbar/Navbar.jsx'
import { useEffect } from 'react';
import { getData } from './components/CartPage/redux/action.js';
import { baseUrl } from '../configs.js';

// import LoginAndSignUpPage from './pages/LoginAndSignUpPage'


function App() {
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const token = useSelector((store) => store.AuthReducer.token);
  const cart = useSelector((store) => store.CartReducer);
  const dispatch = useDispatch();
  // console.log(cart)

  useEffect(() => {
    dispatch(getData(baseUrl + "/cart", token))
  }, [isAuth])



  return (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  )
}

export default App
