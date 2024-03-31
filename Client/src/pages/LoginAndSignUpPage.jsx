import React, { useState } from 'react';
import Signup from '../components/Login/Signup';
import Login from '../components/Login/Login';
import '../components/Login/Login.css';

const LoginAndSignUpPage = () => {
  const [isLoginSelected, setIsLoginSelected] = useState(false);

  return (
    <div className='loginPageWrapper'>
      <div className='main-container'>
        <div className='handlesignupandlogin'>
          {isLoginSelected ? (
            <Signup isLoginSelected={isLoginSelected} setIsLoginSelected={setIsLoginSelected} />
          ) : (
            <Login isLoginSelected={isLoginSelected} setIsLoginSelected={setIsLoginSelected} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignUpPage;
