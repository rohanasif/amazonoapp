import axios from "axios";
import { PRODUCTSURL, GET_ALL_PRODUCTS } from "../constants";

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
