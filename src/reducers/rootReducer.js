import {
  GET_USERS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  GET_LOGGED_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  GET_ALL_PRODUCTS,
  UPDATE_STOCK,
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
} from "../constants";

const rootReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {};
    case REGISTER_SUCCESS:
      return {};
    case REGISTER_ERROR:
      return {};
    case LOGIN_SUCCESS:
      return {};
    case LOGIN_ERROR:
      return {};
    case GET_LOGGED_USER:
      return {};
    case LOGOUT:
      return {};
    case EDIT_USER_SUCCESS:
      return {};
    case EDIT_USER_ERROR:
      return {};

    case GET_ALL_PRODUCTS:
      return {};
    case UPDATE_STOCK:
      return {};

    case GET_CART_ITEMS:
      return {};
    case ADD_TO_CART:
      return {};
    case REMOVE_FROM_CART:
      return {};
    case EMPTY_CART:
      return {};

    default:
      throw new Error("Unknown action: " + action.type);
  }
};

export default rootReducer;