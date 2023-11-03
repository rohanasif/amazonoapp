import axios from "axios";
import { PRODUCTSURL, GET_ALL_PRODUCTS, UPDATE_STOCK } from "../constants";

export const getAllProducts = async (dispatch) => {
  try {
    const response = await axios.get(`${PRODUCTSURL}`);
    const products = response.data;
    dispatch({ type: GET_ALL_PRODUCTS, payload: products });
    return products;
  } catch (e) {
    console.error(e);
  }
};

export const updateStock = async (dispatch, productId, qty) => {
  try {
    const response = await axios.get(`${PRODUCTSURL}/${productId}`);
    // TODO
  } catch (e) {
    console.error(e);
  }
};
