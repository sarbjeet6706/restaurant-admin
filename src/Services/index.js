import axios from "axios";

export const signIn = (email, pass) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/auth/local`;
  return axios.post(url, {
    identifier: email,
    password: pass,
  });
};

// update orders api
export const updateFoodItems = (params, id) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/food-items/${id}`;
  return axios.put(url, params, {
    headers: getAuthHeaders(),
  });
};

export const updateOrder = (id, param) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/orders/${id}`;
  return axios.put(url, param, {
    headers: getAuthHeaders(),
  });
};
// get order list api
export const getOrders = (pageNo, perPage) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/orders?pagination[page]=${pageNo}&pagination[pageSize]=${perPage}`;
  return axios.get(url, {
    headers: getAuthHeaders(),
  });
};
// delete the order from the api
export const deleteOrder = (id) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/orders/${id}`;
  return axios.delete(url, {
    headers: getAuthHeaders(),
  });
};

//get reservation from the api
export const getReservations = (pageNo, perPage) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/reservations?pagination[page]=${pageNo}&pagination[pageSize]=${perPage}`;
  return axios.get(url, {
    headers: getAuthHeaders(),
  });
};

// function to authenticate the user
export const getAuth = () => {
  const authToken = localStorage.getItem("Auth_token");
  return authToken ? authToken : null;
};

//update reservation api
export const updateReservation = (id, param) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/reservations/${id}`;
  return axios.put(url, param, {
    headers: getAuthHeaders(),
  });
};

// delete reservation api
export const deleteReservation = (id) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/reservations/${id}`;
  return axios.delete(url, {
    headers: getAuthHeaders(),
  });
};

//fetch categories api
export const getCategories = () => {
  const url = `${process.env.REACT_APP_SERVER_URL}/categories`;
  return axios.get(url, {
    headers: getAuthHeaders(),
  });
};

//add api
export const addFoodItems = (params) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/food-items`;
  return axios.post(url, params, {
    headers: getAuthHeaders(),
  });
};

// fetch food items from api
export const getFoodItems = (pageNo, perPage, name) => {
  const url = `${
    process.env.REACT_APP_SERVER_URL
  }/food-items?populate=categories&pagination[page]=${pageNo}&pagination[pageSize]=${perPage}${
    name ? `&filters[food_item_name][$contains]=${name}` : ""
  }`;
  return axios.get(url);
};

// delete the food items from the api
export const deleteFoodItem = (id) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/food-items/${id}`;
  return axios.delete(url, {
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
