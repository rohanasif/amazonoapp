import {
  GET_USERS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  UPDATE_STOCK,
  GET_ALL_PRODUCTS,
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  EMPTY_CART,
} from "../constants";

const rootReducer = (state, action) => {
  switch (action.type) {
    // USER CASES
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        message: { text: "Registration successful" },
      };
    case REGISTER_ERROR:
      return {
        ...state,
        message: { text: action.payload },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.email
            ? { ...user, isLoggedin: true }
            : user
        ),
        message: { text: "Login successful" },
      };
    case LOGIN_ERROR:
      return {
        message: { text: action.payload },
      };
    case LOGOUT:
      return {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.email
            ? { ...user, isLoggedin: false }
            : user
        ),
        message: { text: "Logout successful" },
      };

    case EDIT_USER_SUCCESS:
      return {};
    case EDIT_USER_ERROR:
      return {};

    // PRODUCT CASES
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case UPDATE_STOCK:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? action.payload.updatedProduct
            : product
        ),
      };

    // CART CASES
    case GET_CART_ITEMS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.isLoggedin ? { ...user, cart: action.payload } : user
        ),
      };
    case ADD_TO_CART:
      return {
        ...state,
        users: state.users.map((user) =>
          user.isLoggedin
            ? {
                ...user,
                cart: user.cart.map((item) =>
                  item.id === action.payload.productId
                    ? (item.quantity += action.payload.qty)
                    : item
                ),
              }
            : user
        ),
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? (product.countInStock -= action.payload.qty)
            : product
        ),
        message: {
          text: `${action.payload} added to cart!`,
        },
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        users: state.users.map((user) =>
          user.isLoggedin
            ? {
                ...user,
                cart: user.cart.map((item) =>
                  item.id === action.payload.productId
                    ? (item.quantity = 0)
                    : item
                ),
              }
            : user
        ),
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? (product.countInStock += state.users[
                action.payload.userId - 1
              ].cart.find(
                (item) => item.id === action.payload.productId
              ).quantity)
            : product
        ),
        message: {
          text: `${action.payload} removed from cart!`,
        },
      };
    case EMPTY_CART:
      return {
        ...state,
        users: state.users.map((user) =>
          user.isLoggedin
            ? {
                ...user,
                cart: [],
              }
            : user
        ),
      };

    case UPDATE_CART:
      return {};

    default:
      throw new Error("Unknown action: " + action.type);
  }
};

export default rootReducer;
