import axios from 'axios';

const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
  import.meta.env.VITE_FIREBASE_API_KEY
}`;

const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
  import.meta.env.VITE_FIREBASE_API_KEY
}`;

export const signUpUser = async (signUpData) => {
  return axios.post(signUpUrl, signUpData);
};

export const loginUser = async (loginData) => {
  return axios.post(loginUrl, loginData);
};
