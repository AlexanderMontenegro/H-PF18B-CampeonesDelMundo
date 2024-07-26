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
  SET_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  POST_USER,
  POST_LOGIN,
  SET_PREFERENCE_ID,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_FAVORITES,
  GET_REVIEWS,
  POST_REVIEW,
  PUT_REVIEW,
  DELETE_REVIEW,
} from "./actions";

const initialState = {
  details: null,
  allProducts: [],
  allCategory: [],
  productos: [],
  preSortProductos: [],
  isAuthenticated: false,
  preferenceId: null,
  user: null,
  loading: false,
  error: null,
  favorites: [],
  filters: {
    producto: "none",
    categoria: "none",
    marca: "none",
  },
  reviews: [],
};

const applyFilters = (products, filters) => {
  return products.filter((producto) => {
    const matchesProducto =
      filters.producto === "none" || producto.tipo === filters.producto;
    const matchesCategoria =
      filters.categoria === "none" || producto.categoria === filters.categoria;
    const matchesMarca =
      filters.marca === "none" || producto.marca === filters.marca;
    return matchesProducto && matchesCategoria && matchesMarca;
  });
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PREFERENCE_ID:
      return {
        ...state,
        preferenceId: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        productos: applyFilters(payload, state.filters),
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

    case NO_FILTER:
      return {
        ...state,
        filters: {
          producto: "none",
          categoria: "none",
          marca: "none",
        },
        productos: state.allProducts,
        preSortProductos: state.allProducts,
      };
    case FILTER_PRODUCTO:
      const updatedFiltersProducto = { ...state.filters, producto: payload };
      return {
        ...state,
        filters: updatedFiltersProducto,
        productos: applyFilters(state.allProducts, updatedFiltersProducto),
        preSortProductos: applyFilters(
          state.allProducts,
          updatedFiltersProducto
        ),
      };
    case FILTER_CATEGORIA:
      const updatedFiltersCategoria = { ...state.filters, categoria: payload };
      return {
        ...state,
        filters: updatedFiltersCategoria,
        productos: applyFilters(state.allProducts, updatedFiltersCategoria),
        preSortProductos: applyFilters(
          state.allProducts,
          updatedFiltersCategoria
        ),
      };
    case FILTER_MARCAS:
      const updatedFiltersMarca = { ...state.filters, marca: payload };
      return {
        ...state,
        filters: updatedFiltersMarca,
        productos: applyFilters(state.allProducts, updatedFiltersMarca),
        preSortProductos: applyFilters(state.allProducts, updatedFiltersMarca),
      };
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
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case POST_USER:
    case POST_LOGIN:
      return {
        ...state,
        user: payload.user || null,
        error: payload.error || null,
      };

    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== action.payload),
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };

    // PARA REVIEWS
    case GET_REVIEWS:
      const { productId, reviews } = action.payload;
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [productId]: reviews,
        },
      };

    // case POST_REVIEW:
    case POST_REVIEW:
      const { product_id, newReview } = payload;
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [product_id]: [...(state.reviews[product_id] || []), newReview],
        },
      };

    case PUT_REVIEW:
      return {
        ...state,
        [action.payload.productId]: state[action.payload.productId].map(
          (review) =>
            review.id === action.payload.id ? action.payload : review
        ),
      };
    case DELETE_REVIEW:
      return {
        ...state,
        [action.payload.productId]: state[action.payload.productId].filter(
          (review) => review.id !== action.payload.reviewId
        ),
      };
    // FIN - REVIEWS

    default:
      return state;
  }
};

export default rootReducer;
