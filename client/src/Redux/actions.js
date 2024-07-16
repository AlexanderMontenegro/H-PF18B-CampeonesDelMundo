import axios from "axios";
import Swal from "sweetalert2";
import { auth, googleProvider, signInWithPopup } from"../../fireBaseConfig";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORY = "GET_CATEGORY";
export const POST_CATEGORY = "POST_CATEGORY";
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_DETAILS = "GET_DETAILS";

export const FILTER_PRODUCTO = "FILTER_PRODUCTO";
export const FILTER_CATEGORIA = "FILTER_CATEGORIA";
export const FILTER_MARCAS = "FILTER_MARCAS";
export const NO_FILTER = "NO_FILTER";
export const SORT_PRICE_ASCENDING_ORDER = "SORT_PRICE_ASCENDING_ORDER";
export const SORT_PRICE_DESCENDING_ORDER = "SORT_PRICE_DESCENDING_ORDER";
export const NO_SORT = "NO_SORT";
export const SEARCH_PRODUCTS_BY_TYPE = "SEARCH_PRODUCTS_BY_TYPE";

export const POST_USER = "POST_USER";
export const POST_LOGIN = 'POST_LOGIN';
export const SET_USER = 'SET_USER';
export const POST_IMAGE = 'POST_IMAGE';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const getDetails = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/productos/${id}`);
      if (response.status === 200) {
        const producto = response.data;
        return dispatch({
          type: GET_DETAILS,
          payload: producto,
        });
      } else {
        console.error("Error: Producto no encontrado");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
};

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
        title: "Error en el servidor",
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
//FILTER CATEGORIA
export const filterByCategoria = (producto) => {
  if (producto !== "none") {
    return {
      type: FILTER_CATEGORIA,
      payload: producto,
    };
  } else {
    return {
      type: NO_FILTER,
    };
  }
};
//FILTER MARCA
export const filterByMarca = (producto) => {
  if (producto !== "none") {
    return {
      type: FILTER_MARCAS,
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
export const searchProductsByType = (tipo) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/productos?tipo=${tipo}`
      );
      return dispatch({
        type: SEARCH_PRODUCTS_BY_TYPE,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
};

export const postUser = (user) => {
  // const endpoint = '/auth/register';
  const endpoint = 'http://localhost:3001/auth/register';
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
              payload: error.response ? error.response.data : { message: error.message }
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
              payload: error.response ? error.response.data : { message: error.message }
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

export const postImageLocal = (image) => {
  const endpoint = '/api/images/upload';
  return async function (dispatch) {
      try {
        const formData = new FormData();
        formData.append('image', image);
          const response = await axios.post(endpoint, formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
          );
          return dispatch({
              type: POST_IMAGE,
              payload: response.data
          });
      }
      catch (error) {
          return dispatch({
              type:POST_IMAGE,
              payload: error
      });
      }
  }
};

export const postImageRemota = (imageUrl) => {
  const endpoint = '/api/images/upload-from-url';
  return async function (dispatch) {
      try {
          const response = await axios.post(endpoint, {imageUrl});
          return dispatch({
              type: POST_IMAGE,
              payload: response.data
          });
      }
      catch (error) {
          return dispatch({
              type:POST_IMAGE,
              payload: error
      });
      }
  }
};

/* export const loginWithGoogle = () => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Google sign-in result:", result);  
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    console.error("Google sign-in error:", error);  
    dispatch({ type: LOGIN_FAILURE, error });
  }
}; */
// Acción para cerrar sesión
export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: LOGOUT });
};


export const loginWithGoogle = () => {

  return async function (dispatch) {
      try {
        const response = await signInWithPopup(auth, googleProvider);
        
          return dispatch({
              type: LOGIN_SUCCESS,
              payload: response
          });
      }
      catch (error) {
          return dispatch({
              type:LOGIN_FAILURE,
              payload: error.response ? error.response.data : { message: error.message }
      });
      }
  };
};
