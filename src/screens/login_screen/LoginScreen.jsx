import React from "react";

import { useDispatch } from "react-redux";

import { login } from "../../redux/actions/authAction";

import "./login_screen.scss";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <div className='login'>
      <div className='login_container'>
        <img
          src='https://pngimg.com/uploads/youtube/youtube_PNG2.png'
          alt=''
        />
        <button onClick={handleLogin}>login With Goggle</button>
        <p>This Project is made using YouTube Data API</p>
      </div>
    </div>
  );
};

export default LoginScreen;
