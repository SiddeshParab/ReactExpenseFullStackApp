import axios from 'axios';
const baseUrl = import.meta.env.VITE_FIREBASE_DB_LINK;

export const addExpense = async (expense, userEmail) => {
  return axios.post(`${baseUrl}/expenses/${userEmail}.json`, expense);
};

export const getExpenses = (userEmail) => {
  return axios.get(`${baseUrl}/expenses/${userEmail}.json`);
};

export const updateExpense = (id, expense, userEmail) => {
  return axios.put(`${baseUrl}/expenses/${userEmail}/${id}.json`, expense);
};

export const deleteExpense = (id, userEmail) => {
  return axios.delete(`${baseUrl}/expenses/${userEmail}/${id}.json`);
};
