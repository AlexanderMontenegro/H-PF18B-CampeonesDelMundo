import { GET_PRODUCTS, GET_CATEGORY, FILTER_PRODUCTO, NO_FILTER, SORT_PRICE_ASCENDING_ORDER, SORT_PRICE_DESCENDING_ORDER, NO_SORT, GET_DETAILS } from "./actions";

<<<<<<< HEAD

//import actions 
import {GET_PRODUCTS, GET_CATEGORY, GET_DETAILS} from "./actions";
 
// state inicial
const initialState = {
    allProducts:[],
    allCategory:[],
    details:null,
=======
// state inicial
const initialState = {
  details:null,
  allProducts: [],
  allCategory: [],
  productos: [],
  preSortProductos: []
};
>>>>>>> e4b8bed15c23507d06e9b052e73d97a15f4003d0

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DETAILS:
      return {
        ...state,
        details:payload,        
      }
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        productos: payload,
        preSortProductos: payload
      };
    case GET_CATEGORY:
      return {
        ...state,
        allCategory: payload,
      };
    // Filters
    case NO_FILTER:
      return {
        ...state,
        productos: state.allProducts,
        preSortProductos: state.allProducts
      };
    case FILTER_PRODUCTO:
      return {
        ...state,
        productos: state.allProducts.filter(
          producto => producto.tipo === payload
        ),
        preSortProductos: state.allProducts.filter(
          producto => producto.tipo === payload
        )
      };

<<<<<<< HEAD
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
=======
    // Sorts
    case NO_SORT:
      return {
        ...state,
        productos: state.preSortProductos.length ? [...state.preSortProductos] : [...state.productos]
      };
    case SORT_PRICE_ASCENDING_ORDER:
      return {
        ...state,
        productos: [...state.productos].sort((p1, p2) => p1.precio - p2.precio)
      };
    case SORT_PRICE_DESCENDING_ORDER:
      return {
        ...state,
        productos: [...state.productos].sort((p1, p2) => p2.precio - p1.precio)
      };
>>>>>>> e4b8bed15c23507d06e9b052e73d97a15f4003d0

    default:
      return state;
  }
};

export default rootReducer;
// //import actions
// import { GET_PRODUCTS, GET_CATEGORY } from "./actions";
// import {FILTER_PRODUCTO, NO_FILTER, SORT_PRICE_ASCENDING_ORDER, SORT_PRICE_DESCENDING_ORDER, NO_SORT}from "./actions"

// // state inicial
// const initialState = {
//   allProducts: [],
//   allCategory: [],
//   copyProducts: [],
//   productos: [],
//   preSortProductos: [] 
// };

// const rootReducer = (state = initialState, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case GET_PRODUCTS:
//       return {
//         ...state,
//         allProducts: payload,
//       };
//     case GET_CATEGORY:
//       return {
//         ...state,
//         allCategory: payload,
//       };
//     // Filters
//     case NO_FILTER:
//       return {
//         ...state,
//         productos: state.allProductos,
//       };
//     case FILTER_PRODUCTO:
//       return {
//         ...state,
//         productos: state.allProductos.filter(
//           producto =>producto.tipo ===payload
//         ),
//       };

//     // Sorts
//     case NO_SORT:
//       return {
//         ...state,
//         preSortProductos: [],
//         productos: state.preSortProductos.length ? [...state.preSortProductos] : [...state.productos]
//       };
//     case SORT_PRICE_ASCENDING_ORDER:
//       return {
//         productos: state.preSortProductos.length ? [...state.preSortProductos] : [...state.productos]
//       };
//     case SORT_PRICE_DESCENDING_ORDER:
//       return {
//         ...state,
//         preSortProductos: state.preSortProductos.length ? [...state.preSortProductos] : [...state.productos],
//         productos: [...state.productos].sort((p1, p2) => p2.precio - p1.precio)
//       };

//     default:
//       return state;
//   }
// };

// export default rootReducer;
