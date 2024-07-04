

//import actions 
import {GET_PRODUCTS, GET_CATEGORY, GET_DETAILS} from "./actions";
 
// state inicial
const initialState = {
    allProducts:[],
    allCategory:[],
    details:null,

  };

  const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) { 

        case GET_DETAILS:
            return {
                ...state,
                details: payload,
        };
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