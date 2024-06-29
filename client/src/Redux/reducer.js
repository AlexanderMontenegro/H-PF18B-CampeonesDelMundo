

//import actions 
import {GET_PRODUCTS, GET_CATEGORY} from "./actions";
 
// state inicial
const initialState = {
    allProducts:[],
    allCategory:[],

  };

  const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) { 
        case GET_PRODUCTS:
            return {
                ...state,
                allProducts: payload,
              }; 
        case GET_CATEGORY:
                return {
                    ...state,
                    allCategory: payload,
                  }; 
        
        default:
        return state;
    }
  };

  export default rootReducer;