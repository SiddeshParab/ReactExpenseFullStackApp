import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  isProfileCompleted: false,
  userEmail: null,
  setIsProfileCompleted: (boolean) => {},
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialUserEmail = localStorage.getItem('userEmail');
  const timeAtTokenCreated = localStorage.getItem('expiresIn');
  const initialIsProfileCompleted = localStorage.getItem('isProfileCompleted');

  const [token, setToken] = useState(initialToken);
  const [userEmail, setUserEmail] = useState(initialUserEmail);

  const userIsLoggedIn = !!token;

  const [isProfileCompleted, setIsProfileCompleted] = useState(
    JSON.parse(initialIsProfileCompleted)
  );

  const timer = 30 * 60 * 1000;

  const loginHandler = (token, userEmail) => {
    localStorage.setItem('token', token);
    setToken(token);

    const newUserEmail = userEmail.replace(/@/g, '').replace(/\./g, '');

    localStorage.setItem('userEmail', newUserEmail);
    setUserEmail(newUserEmail);
    localStorage.setItem('expiresIn', Date.now());
  };

  const profileUpdateHandler = (boolean) => {
    localStorage.setItem('isProfileCompleted', JSON.stringify(boolean));
    setIsProfileCompleted(boolean);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('isProfileCompleted');
    setUserEmail(null);
    setToken(null);
  };

  useEffect(() => {
    const tId = setTimeout(() => {
      if (Object.keys(localStorage).indexOf('expiresIn') !== -1) {
        if (Date.now() - timer > timeAtTokenCreated) {
          logoutHandler();
          toast.error('Session expired! Login Again', {
            position: 'top-center',
          });
        }
      }
    }, 50);

    return () => clearTimeout(tId);
  }, []);

  const authContext = {
    token: token,
    userEmail: userEmail,
    isLoggedIn: userIsLoggedIn,
    isProfileCompleted: isProfileCompleted,
    setIsProfileCompleted: profileUpdateHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
