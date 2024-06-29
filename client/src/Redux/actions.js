import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS"
export const GET_CATEGORY = "GET_CATEGORY"
export const POST_CATEGORY = "POST_CATEGORY"


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
                error = {message:"Error en registrar categoria"};
                return dispatch({
                    type:POST_CATEGORY,
                    payload: error
            });
            }
        };
    }
