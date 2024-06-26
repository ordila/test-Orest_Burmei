import { Product, ProductToAdd } from "@/types/product/product";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) throw new Error("Network response was not ok");
      const products = await response.json();
      return products;
    } catch (error) {
      if (error instanceof Error)
        return rejectWithValue("An unknown error occurred");
    }
  }
);

export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async (productData: ProductToAdd, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      if (error instanceof Error)
        return rejectWithValue("An unknown error occurred");
    }
  }
);

export const editProductAsync = createAsyncThunk(
  "products/editProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return productId;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (productId: string | number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const product = await response.json();
      return product;
    } catch (error) {
      if (error instanceof Error)
        return rejectWithValue("An unknown error occurred");
    }
  }
);
