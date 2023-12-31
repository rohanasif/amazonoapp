import axios from "axios";
import {
  USERSURL,
  PRODUCTSURL,
  GET_USERS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  // EDIT_USER_SUCCESS,
  // EDIT_USER_ERROR,
  UPDATE_STOCK,
  GET_ALL_PRODUCTS,
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  EMPTY_CART,
} from "../constants";

// User Actions
export const getUsers = async (dispatch) => {
  try {
    const response = await axios.get(USERSURL);
    const users = response.data;
    dispatch({ type: GET_USERS, payload: users });
    return users;
  } catch (e) {
    console.error(e);
  }
};

export const registerUser = async (user, dispatch) => {
  const { repeatPassword, ...userToRegister } = user;
  const allUsers = await getUsers(dispatch);
  let error = null;

  if (user.password !== user.repeatPassword) {
    error = "Passwords don't match";
  } else if (
    allUsers.length === 0 ||
    !allUsers.find((u) => u.email === user.email)
  ) {
    try {
      const response = await axios.post(USERSURL, userToRegister);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (e) {
      error = "Registration failed. Please try again later.";
      console.error(e);
    }
  } else {
    error = "User already registered";
  }

  if (error) {
    dispatch({ type: REGISTER_ERROR, payload: error });
  }
};

export const loginUser = async (user, dispatch) => {
  const allUsers = await getUsers(dispatch);
  const userLoggingIn = allUsers.find(
    (u) =>
      u.password === user.password &&
      (u.name === user.name || u.email === user.email)
  );

  if (user.isLoggedin) {
    dispatch({
      type: LOGIN_ERROR,
      payload: `${user.name} is already logged in! Go to <Link to={"/"}>Home</Link>`,
    });
  } else if (userLoggingIn) {
    try {
      const response = await axios.patch(`${USERSURL}/${userLoggingIn.id}`, {
        ...user,
        isLoggedin: true,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (e) {
      console.error(e);
    }
  } else {
    dispatch({ type: LOGIN_ERROR, payload: "Invalid Credentials" });
  }
};

export const getLoggedUser = async () => {
  try {
    const response = await axios.get(`${USERSURL}?isLoggedin=true`);
    const userArr = response.data;
    const user = userArr[0];
    return user;
  } catch (e) {
    console.error(e);
  }
};

export const logoutUser = async (user, dispatch) => {
  let error = null;
  try {
    if (user.isLoggedin) {
      const response = await axios.patch(`${USERSURL}/${user.id}`, {
        isLoggedin: false,
      });
      dispatch({ type: LOGOUT, payload: response.data });
    } else {
      error = "User not logged in! Please refresh!";
      alert(error);
    }
  } catch (e) {
    console.error(e);
  }
};

// export const editUserDetails = async () => {};

// Product Actions
export const getAllProducts = async (dispatch) => {
  try {
    const response = await axios.get(`${PRODUCTSURL}`);
    const products = response.data;
    dispatch({ type: GET_ALL_PRODUCTS, payload: products.data });
    return products;
  } catch (e) {
    console.error(e);
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${PRODUCTSURL}/${productId}`);
    const product = response.data;
    return product;
  } catch (e) {
    console.error(e);
  }
};

export const updateStock = async (dispatch, productId, updatedProduct) => {
  try {
    const response = await axios.patch(
      `${PRODUCTSURL}/${productId}`,
      updatedProduct
    );
    dispatch({
      type: UPDATE_STOCK,
      payload: { updatedProduct, productId },
    });
  } catch (e) {
    console.error(e);
  }
};

// Cart Actions
export const getCartItems = async (dispatch, userId) => {
  try {
    const response = await axios.get(`${USERSURL}/${userId}`);
    const cart = response.data.cart;
    dispatch({ type: GET_CART_ITEMS, payload: cart });
    return cart;
  } catch (e) {
    console.error(e);
  }
};

export const addToCart = async (dispatch, userId, productId, qty) => {
  try {
    const product = await getProduct(productId);
    const productToAdd = { ...product, quantity: 0 };
    const inStockQty = productToAdd.countInStock;
    const cartItems = await getCartItems(dispatch, userId);
    const isInCart = cartItems.find((item) => item?.id === productId);
    const totalQuantityInCart = isInCart
      ? cartItems.reduce(
          (total, item) =>
            item.id === productId ? total + item.quantity : total,
          0
        )
      : 0;
    if (qty + totalQuantityInCart > inStockQty) {
      dispatch({
        type: ADD_TO_CART,
        payload: { message: `Not enough stock for ${productToAdd.name}` },
      });
    } else {
      const updatedProduct = {
        ...productToAdd,
        quantity: productToAdd.quantity + qty,
        countInStock: inStockQty - qty,
      };

      await updateStock(dispatch, productId, updatedProduct);

      let updatedCartItems;
      if (!isInCart) {
        updatedCartItems = [...cartItems, updatedProduct];
      } else {
        updatedCartItems = cartItems.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + qty,
                countInStock: item.countInStock - qty,
              }
            : item
        );
      }

      await updateCart(dispatch, userId, updatedCartItems);
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeFromCart = async (dispatch, userId, productId) => {
  try {
    const productToRemove = await getProduct(productId);
    const inStockQty = productToRemove.countInStock;
    const cartItems = await getCartItems(dispatch, userId);
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    await updateCart(dispatch, userId, updatedCart);
    const qtyInCart =
      cartItems.find((item) => item.id === productId)?.quantity || 0;
    const updatedProduct = {
      ...productToRemove,
      countInStock: inStockQty + qtyInCart,
    };
    await updateStock(dispatch, productId, updatedProduct);
    const { quantity, ...cartItem } = updatedProduct;
    dispatch({ type: REMOVE_FROM_CART, payload: cartItem });
  } catch (e) {
    console.error(e);
  }
};

export const emptyCart = async (dispatch, userId) => {
  try {
    await axios.patch(`${USERSURL}/${userId}`, { cart: [] });
    dispatch({ type: EMPTY_CART });
  } catch (e) {
    console.error(e);
  }
};

// Cart Update Action
export const updateCart = async (dispatch, userId, updatedCart) => {
  try {
    await axios.patch(`${USERSURL}/${userId}`, { cart: updatedCart });
    dispatch({
      type: UPDATE_CART,
      payload: { updatedCart, userId },
    });
  } catch (e) {
    console.error(e);
  }
};
