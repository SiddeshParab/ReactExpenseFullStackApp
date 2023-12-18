import axios from 'axios';
import { toast } from 'react-toastify';

export const getUserData = async (token) => {
  try {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
        import.meta.env.VITE_FIREBASE_API_KEY
      }`,
      { idToken: token }
    );

    return {
      success: true,
      userDetails: {
        displayName: data.users[0].displayName,
        email: data.users[0].email,
        emailVerified: data.users[0].emailVerified,
        photoUrl: data.users[0].photoUrl,
      },
    };
  } catch (error) {
    const errMsg =
      error.response?.data?.error?.message ||
      error.message ||
      'Failed to get user data!';
    toast.error(errMsg);
    console.log(error);
    return { success: false, errMsg };
  }
};

export const updateProfile = async (formData) => {
  try {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
        import.meta.env.VITE_FIREBASE_API_KEY
      }`,
      formData
    );
    // console.log(data);

    return {
      success: true,
      updatedUserDetails: {
        displayName: data.displayName,
        email: data.email,
        emailVerified: data.emailVerified,
        photoUrl: data.photoUrl,
      },
    };
  } catch (error) {
    const errMsg =
      error.response?.data?.error?.message ||
      error.message ||
      'Failed to update user profile!';
    toast.error(errMsg);
    console.log(error);
    return { success: false, errMsg };
  }
};

export const sendEmailVerificationCode = async (token) => {
  try {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${
        import.meta.env.VITE_FIREBASE_API_KEY
      }`,
      { requestType: 'VERIFY_EMAIL', idToken: token }
    );

    return { success: true, data };
  } catch (error) {
    const errMsg =
      error.response?.data?.error?.message ||
      error.message ||
      'Failed to send verification email!';
    toast.error(errMsg);
    console.log(error);
    return { success: false, errMsg };
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${
        import.meta.env.VITE_FIREBASE_API_KEY
      }`,
      { requestType: 'PASSWORD_RESET', email: email }
    );

    // console.log(data);

    return { success: true, data };
  } catch (error) {
    const errMsg =
      error.response?.data?.error?.message ||
      error.message ||
      'Failed to send password reset email!';
    toast.error(errMsg);
    console.log(error);
    return { success: false, errMsg };
  }
};

// export const verifyEmail = async (code) => {
//   try {
//     const { data } = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
//         import.meta.env.VITE_FIREBASE_API_KEY
//       }`,
//       { oobCode: code }
//     );

//     return { success: true, data };
//   } catch (error) {
//     const errMsg = error.response.data.error.message || error.message;
//     alert(errMsg);
//     console.log(error);
//     return { success: false, errMsg };
//   }
// };
