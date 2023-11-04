import { createContext, useReducer, useState } from "react";
import rootReducer from "../reducers/rootReducer";

import {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  emptyCart,
  updateStock,
  getAllProducts,
  getProduct,
  getUsers,
  registerUser,
  loginUser,
  getLoggedUser,
  logoutUser,
  editUserDetails,
} from "../actions/appActions";

import { searchProducts } from "../actions/searchActions";

const initialState = { users: [], products: [], message: { text: "" } };

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [loggedin, setLoggedin] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,

        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,

        products,
        setProducts,

        searchProducts,

        cart,
        setCart,

        loggedin,
        setLoggedin,

        getUsers,
        registerUser,
        loginUser,
        getLoggedUser,
        logoutUser,
        editUserDetails,

        getAllProducts,
        getProduct,
        updateStock,

        getCartItems,
        addToCart,
        removeFromCart,
        emptyCart,
        updateCartQuantity,

        searchResults,
        setSearchResults,
        query,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
