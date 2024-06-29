

//import actions 
import {GET_PRODUCTS} from "./actions";
 
// state inicial
const initialState = {
    allProducts:[],

  };

  const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) { 
        case GET_PRODUCTS:
            return {
                ...state,
                allProducts: payload,
              }; 
        
        default:
        return state;
    }
  };

  export default rootReducer;