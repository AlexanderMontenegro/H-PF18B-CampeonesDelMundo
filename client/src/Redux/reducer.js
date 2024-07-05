import {
  GET_PRODUCTS,
  GET_CATEGORY,
  FILTER_PRODUCTO,
  FILTER_CATEGORIA,
  FILTER_MARCAS,
  NO_FILTER,
  SORT_PRICE_ASCENDING_ORDER,
  SORT_PRICE_DESCENDING_ORDER,
  NO_SORT,
  GET_DETAILS,
  SEARCH_PRODUCTS_BY_TYPE,
} from "./actions";

// state inicial
const initialState = {
  details: null,
  allProducts: [],
  allCategory: [],
  productos: [],
  preSortProductos: [],
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
        productos: payload,
        preSortProductos: payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        allCategory: payload,
      };
    case SEARCH_PRODUCTS_BY_TYPE:
      return {
        ...state,
        productos: payload,
      };
    // Filters
    case NO_FILTER:
      return {
        ...state,
        productos: state.allProducts,
        preSortProductos: state.allProducts,
      };
    case FILTER_PRODUCTO:
      return {
        ...state,
        productos: state.allProducts.filter(
          (producto) => producto.tipo === payload
        ),
        preSortProductos: state.allProducts.filter(
          (producto) => producto.tipo === payload
        ),
      };
    case FILTER_CATEGORIA:
      return {
        ...state,
        productos: state.allProducts.filter(
          (producto) => producto.categoria === payload
        ),
        preSortProductos: state.allProducts.filter(
          (producto) => producto.categoria === payload
        ),
      };

    case FILTER_MARCAS:
      return {
        ...state,
        productos: state.allProducts.filter(
          (producto) => producto.marca === payload
        ),
        preSortProductos: state.allProducts.filter(
          (producto) => producto.marca === payload
        ),
      };

    // Sorts
    case NO_SORT:
      return {
        ...state,
        productos: state.preSortProductos.length
          ? [...state.preSortProductos]
          : [...state.productos],
      };
    case SORT_PRICE_ASCENDING_ORDER:
      return {
        ...state,
        productos: [...state.productos].sort((p1, p2) => p1.precio - p2.precio),
      };
    case SORT_PRICE_DESCENDING_ORDER:
      return {
        ...state,
        productos: [...state.productos].sort((p1, p2) => p2.precio - p1.precio),
      };

    default:
      return state;
  }
};

export default rootReducer;
