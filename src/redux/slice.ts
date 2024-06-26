import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addProductAsync,
  deleteProductAsync,
  editProductAsync,
  fetchProductByIdAsync,
  fetchProducts,
} from "./thunk";
import { Product, ProductToAdd } from "@/types/product/product";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    item: {
      id: "",
      name: "",
      imageUrl: "",
      description: "",
      size: {
        width: 0,
        height: 0,
      },
      weight: 0,
      comments: [
        {
          id: "",
          date: "",
          description: "",
        },
      ],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addProductAsync.fulfilled,
        (state, action: PayloadAction<ProductToAdd>) => {
          state.status = "succeeded";
          state.items.push(action.payload);
        }
      )
      .addCase(addProductAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteProductAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";

        const index = state.items.findIndex(
          (item: Product) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editProductAsync.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProductByIdAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
