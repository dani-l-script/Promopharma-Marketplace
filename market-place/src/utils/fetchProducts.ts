// utils/fetchProducts.ts

import axios, { AxiosResponse } from "axios";
import { Product } from "../common/types/Product";

/**
 * Fetches products from the Express server.
 *
 * @returns {Promise<Product[]>} Array of product objects.
 * @throws {Error} Throws an error if the request fails.
 */
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get(
      "http://localhost:3002/products",
      {
        timeout: 7000,
      }
    );
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    if (!Array.isArray(response.data)) {
      throw new Error("Invalid data format: Expected an array of products.");
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Server Error: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error("Network Error: No response received from the server.");
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Network Error: Request timed out.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export default fetchProducts;
