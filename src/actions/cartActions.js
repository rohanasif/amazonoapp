import axios from "axios";
import {
  USERSURL,
  PRODUCTSURL,
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  UPDATE_STOCK,
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

export const addToCart = async (dispatch, userId, productId, qty) => {
  try {
    const productResponse = await axios.get(`${PRODUCTSURL}/${productId}`);
    const productToAdd = { ...productResponse.data, quantity: 0 };
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
        payload: {
          message: `Not enough stock for ${productToAdd.name}`,
        },
      });
    } else {
      const updatedProduct = {
        ...productToAdd,
        quantity: productToAdd.quantity + qty,
        countInStock: inStockQty - qty,
      };
      await updateStock(productId, updatedProduct);
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
      const updatedCartResponse = await axios.patch(`${USERSURL}/${userId}`, {
        cart: updatedCartItems,
      });
      const updatedCart = updatedCartResponse.data;
      dispatch({ type: ADD_TO_CART, payload: updatedCart });
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = async () => {};

export const emptyCart = async () => {};

export const updateStock = async (productId, updatedProduct) => {
  try {
    const updateResponse = await axios.patch(
      `${PRODUCTSURL}/${productId}`,
      updatedProduct
    );
    const updatedStock = updateResponse.data.countInStock;
    console.log(updatedStock);
  } catch (error) {
    console.error(error);
  }
};
