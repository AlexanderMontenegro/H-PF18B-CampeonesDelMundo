import axios from 'axios';
import Swal from 'sweetalert2';

export const GET_PRODUCTS = "GET_PRODUCTS"
export const GET_CATEGORY = "GET_CATEGORY"
export const POST_CATEGORY = "POST_CATEGORY"
export const POST_PRODUCT = "POST_PRODUCT"
export const GET_DETAILS = "GET_DETAILS"

///********************************************** */
export const getDetails = (id) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/productos/${id}`);
        if (response.status === 200) {
          const producto = response.data;
          return dispatch({
            type: GET_DETAILS,
            payload: producto,
          });
        } else {
          console.error('Error: Producto no encontrado');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
  };
//******************************************************** */
export const getProducts = () => {
    return async function (dispatch) {
        
        const endpoint = 'http://localhost:3001/productos'; //modificar de acuerdo a ruta del back

        const response = await axios.get(endpoint);
        return dispatch({
            type: GET_PRODUCTS,
            payload: response.data
        })
    }
}

export const getCategory = () => {
    return async function (dispatch) {
        
        const endpoint = 'http://localhost:3001/categoria'; //modificar de acuerdo a ruta del back

        const response = await axios.get(endpoint);
        return dispatch({
            type: GET_CATEGORY,
            payload: response.data
        })
    }
}

export const postCategory = (newCategory) => {
        const endpoint = 'http://localhost:3001/categoria'; //modificar de acuerdo a ruta del back

        return async function (dispatch) {
            try {
                const response = await axios.post(endpoint, newCategory);
                return dispatch({
                    type: POST_CATEGORY,
                    payload: response
                });
            }
            catch (error) {
                Swal.fire({
                    icon: "error",
                    title: error,
                    text: "",
                    timer: 5000
                  })
            }
        };
    }

    export const postNewProduct = (newProduct) => {
        const endpoint = 'http://localhost:3001/productos'; //modificar de acuerdo a ruta del back

        return async function (dispatch) {
            try {
                const response = await axios.post(endpoint, newProduct);
                return dispatch({
                    type: POST_PRODUCT,
                    payload: response
                });
            }
            catch (error) {
                Swal.fire({
                    icon: "error",
                    title: error,
                    text: "",
                    timer: 5000
                  })
            }
        };
    }
