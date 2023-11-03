import axios from "axios";
import {
  USERSURL,
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
} from "../constants";
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

export const addToCart = async () => {};

export const removeFromCart = async () => {};

export const emptyCart = async () => {};
