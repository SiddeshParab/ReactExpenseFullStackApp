import React, { useEffect, useReducer, useContext } from 'react';
import {
  getUserData,
  sendEmailVerificationCode,
  updateProfile,
} from '../services/userServices';
import AuthContext from './auth-context';
import { toast } from 'react-toastify';

const UserContext = React.createContext({
  userDetails: { emailVerified: false },
  updateProfile: async (formData) => {},
  emailVerification: async () => {},
});

const initialUserDetails = { userDetails: { emailVerified: false } };

const userReducer = (state, action) => {
  if (action.type === 'GET_USER_DETAILS') {
    return { userDetails: { ...state.userDetails, ...action.userDetails } };
  }

  if (action.type === 'UPDATE_PROFILE') {
    return {
      userDetails: { ...state.userDetails, ...action.updatedUserDetails },
    };
  }

  if (action.type === 'EMAIL_VERIFICATION') {
    return {
      userDetails: {
        ...state.userDetails,
        emailVerified: action.emailVerified,
      },
    };
  }

  if (action.type === 'LOGOUT') {
    return initialUserDetails;
  }

  return state;
};

export const UserProvider = (props) => {
  const authCtx = useContext(AuthContext);

  const [userState, userDispatch] = useReducer(userReducer, initialUserDetails);

  useEffect(() => {
    const tId = setTimeout(() => {
      if (authCtx.token) {
        getUserData(authCtx.token)
          .then(({ success, userDetails }) => {
            //   console.log(userDetails);
            if (success)
              userDispatch({
                type: 'GET_USER_DETAILS',
                userDetails: userDetails,
              });
          })
          .catch((err) => console.log(err.message));
      } else userDispatch({ type: 'LOGOUT' });
    }, 500);

    return () => clearTimeout(tId);
  }, [authCtx.isLoggedIn]);

  const updateProfileHandler = async (formData) => {
    try {
      const { success, updatedUserDetails } = await updateProfile({
        ...formData,
        idToken: authCtx.token,
      });
      //   console.log(updatedUserDetails);

      if (success) {
        toast.success('Profile updated!');
        userDispatch({
          type: 'UPDATE_PROFILE',
          updatedUserDetails: updatedUserDetails,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const emailVerificationHandler = async () => {
    try {
      const { success } = await sendEmailVerificationCode(authCtx.token);
      // console.log(data);
      if (success) {
        // userDispatch({ type: 'EMAIL_VERIFICATION', emailVerified: true });
        toast.success('Successfully sent verification link');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const userContext = {
    userDetails: userState.userDetails,
    updateProfile: updateProfileHandler,
    emailVerification: emailVerificationHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
