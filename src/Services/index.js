import axios from "axios";

export const signIn = (email, pass) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/auth/local`;
  return axios.post(url, {
    identifier: email,
    password: pass,
  });
};

export const getOrders = () => {
  const url = `${process.env.REACT_APP_SERVER_URL}/orders`;
  return axios.get(url, {
    headers: getAuthHeaders(),
  });
};

export const getCategories = () => {
  const url = `${process.env.REACT_APP_SERVER_URL}/categories`;
  return axios.get(url, {
    headers: getAuthHeaders(),
  });
};

export const getReservations = () => {
  const url = `${process.env.REACT_APP_SERVER_URL}/reservations`;
  return axios.get(url, {
    headers: getAuthHeaders(),
  });
};
export const addFoodItems = (params) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/food-items`;
  return axios.post(url, params, {
    headers: getAuthHeaders(),
  });
};
export const getFoodItems = () => {
  const url = `${process.env.REACT_APP_SERVER_URL}/food-items?populate=categories`;
  return axios.get(url);
};

export const deleteMenu = (id) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/orders?id=${id}`;
  return axios.delete(url);
};

export const deleteOrders = (id) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/orders?id=${id}`;
  return axios.delete(url);
};

export const updateFoodItems = (params, id) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/food-items/${id}`;
  return axios.put(url, params, {
    headers: getAuthHeaders(),
  });
};

/**
 * @function getAuthHeaders
 * @desc This handles returns the auth headers array, which can be used in
 * making api requests
 */
export const getAuthHeaders = () => {
  const authToken = localStorage.getItem("Auth_token");
  if (authToken) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };
    return headers;
  }
  return null;
};
