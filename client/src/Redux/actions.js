import axios from "axios";
import Swal from "sweetalert2";
import { auth, facebookProvider, githubProvider, googleProvider, signInWithPopup } from"../../fireBaseConfig";

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
export const SET_PREFERENCE_ID = 'SET_PREFERENCE_ID';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SET_FAVORITES = 'SET_FAVORITES';

export const GET_REVIEWS = 'GET_REVIEWS';
export const POST_REVIEW = 'POST_REVIEW';
export const PUT_REVIEW = 'PUT_REVIEW';
export const DELETE_REVIEW = "DELETE_REVIEW";




export const fetchPreferenceId = (carrito) => async dispatch => {
  try {
    // Aquí hacemos la solicitud a nuestro backend para obtener el preferenceId
    const response = await axios.post('/api/payments/create-preference', { items: carrito });
    const { id } = response.data;

    dispatch({
      type: SET_PREFERENCE_ID,
      payload: id,
    });
  } catch (error) {
    console.error('Error fetching preference ID:', error);
  }
};

// PARA REVIEWS
// GET_REVIEWS
export const fetchReviews = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(`/producto/${productId}`);
    dispatch({
      type: GET_REVIEWS,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

// POST_REVIEW
export const addToReviews = (producto, user) => async (dispatch) => {
  console.log("Dispatching Add to Favorites:", producto.id, user);
  try {
    const response = await axios.post('/', {
      user_email: user.email, 
      productos_id: producto.id
    });
    console.log(JSON.stringify(response))
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: response.data,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo agregar a favoritos(Error😭😢)",
    });
  }
};



export const fetchUserFavorites = (useremail) => async (dispatch) => {
  try {
    const response = await axios.get(`/favorites/${useremail}`);
     console.log(JSON.stringify(response))
    dispatch({
      type: SET_FAVORITES,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
};

export const addToFavorites = (producto, user) => async (dispatch) => {
  console.log("Dispatching Add to Favorites:", producto.id, user);
  try {
   
    const response = await axios.post('/favorites', {
      user_email: user.email, 
      productos_id: producto.id
    });
    console.log(JSON.stringify(response))
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: response.data,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo agregar a favoritos(Error😭😢)",
    });
  }
};

export const removeFromFavorites = (id) => async (dispatch) => {
  try {
    await axios.delete(`/favorites/${id}`);
    dispatch({
      type: REMOVE_FROM_FAVORITES,
      payload: id,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar de favoritos",
    });
  }
};


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
export const loginWithFacebook = () => {

  return async function (dispatch) {
      try {
        const response = await signInWithPopup(auth, facebookProvider);
        
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
};export const loginWithGithub = () => {

  return async function (dispatch) {
      try {
        const response = await signInWithPopup(auth, githubProvider);
        
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