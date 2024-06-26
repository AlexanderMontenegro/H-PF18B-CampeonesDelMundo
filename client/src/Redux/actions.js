import axios from 'axios';

export const GET_PRODUCTS = "GET=PRODUCTS"

export const getProducts = () => {
    return async function (dispatch) {
        
        const endpoint = '/ruta'; //modificar de acuerdo a ruta del back

        const response = await axios.get(endpoint);
        return dispatch({
            type: GET_PRODUCTS,
            payload: response.data
        })
    }
}