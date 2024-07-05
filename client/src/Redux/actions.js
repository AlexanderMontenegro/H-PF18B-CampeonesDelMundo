import axios from "axios";
import Swal from "sweetalert2";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORY = "GET_CATEGORY";
export const POST_CATEGORY = "POST_CATEGORY";
export const POST_PRODUCT = "POST_PRODUCT";

export const FILTER_PRODUCTO = "FILTER_PRODUCTO";
export const NO_FILTER = "NO_FILTER";
export const SORT_PRICE_ASCENDING_ORDER = "SORT_PRICE_ASCENDING_ORDER";
export const SORT_PRICE_DESCENDING_ORDER = "SORT_PRICE_DESCENDING_ORDER";
export const NO_SORT = "NO_SORT";
export const POST_USER = "POST_USER";
export const POST_LOGIN = 'POST_LOGIN';
export const SET_USER = 'SET_USER';

export const getProducts = () => {
  return async function (dispatch) {
    const endpoint = "/productos"; //modificar de acuerdo a ruta del back

    const response = await axios.get(endpoint);
    return dispatch({
      type: GET_PRODUCTS,
      payload: response.data,
    });
  };
};

export const getCategory = () => {
  return async function (dispatch) {
    const endpoint = "/categoria"; //modificar de acuerdo a ruta del back

    const response = await axios.get(endpoint);
    return dispatch({
      type: GET_CATEGORY,
      payload: response.data,
    });
  };
};

export const postCategory = (newCategory) => {
  const endpoint = "/categoria"; //modificar de acuerdo a ruta del back

  return async function (dispatch) {
    try {
      const response = await axios.post(endpoint, newCategory);
      return dispatch({
        type: POST_CATEGORY,
        payload: response,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        text: "",
        timer: 5000,
      });
    }
  };
};

export const postNewProduct = (newProduct) => {
  const endpoint = "/productos"; //modificar de acuerdo a ruta del back

  return async function (dispatch) {
    try {
      const response = await axios.post(endpoint, newProduct);
      return dispatch({
        type: POST_PRODUCT,
        payload: response,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: 'Error en el servidor',
        text: "",
        timer: 5000,
      });
    }
  };
};

export const filterByProducto = (producto) => {
  if (producto !== "none") {
    return {
      type: FILTER_PRODUCTO,
      payload: producto,
    };
  } else {
    return {
      type: NO_FILTER,
    };
  }
};

export const noFilters = () => {
  return {
    type: NO_FILTER,
  };
};

export const sort = (sortType) => {
  switch (sortType) {
    case "ratingAsc":
      return {
        type: SORT_PRICE_ASCENDING_ORDER,
      };
    case "ratingDesc":
      return {
        type: SORT_PRICE_DESCENDING_ORDER,
      };
    default:
      return {
        type: NO_SORT,
      };
  }
};


export const postUser = (user) => {
  const endpoint = '/auth/register';
  return async function (dispatch) {
      try {
          const response = await axios.post(endpoint, user);
          return dispatch({
              type: POST_USER,
              payload: response.data
          });
      }
      catch (error) {
          return dispatch({
              type:POST_USER,
              payload: error
      });
      }
  }
};

export const postLogin = (login) => {
  const endpointLogin = '/auth/login';
  return async function (dispatch) {
      try {
          const response = await axios.post(endpointLogin, login);
          return dispatch({
              type: POST_LOGIN,
              payload: response.data
          });
      }
      catch (error) {
          return dispatch({
              type:POST_LOGIN,
              payload: error
      });
      }
  };
};

export const setUser = (data) => {
  return {
      type: SET_USER,
      payload: data
  }
}
