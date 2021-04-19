import React from 'react';
import { useActions } from '../../hooks/useActions'
const video = require('./production_ID_4435753.mp4');

const LoginPage: React.FC = () => {
  const { startLogin } = useActions()

  const login = () => {
    startLogin();
  };
  return (
    <div className="login-page">
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop aria-describedby="Video by Edmond Dantès from Pexels">
          <source src={video} type="video/mp4" />
          Video by Edmond Dantès from Pexels. Your browser is not supported!
        </video>
      </div>
      <div className="login-page__box">
        <h1>Card Matey</h1>
        <button className="button" type="button" onClick={login}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
