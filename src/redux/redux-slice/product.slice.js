import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Products: [],
  Topproduct: [],
};
//internally using immer lib (can create mutable state)
export const productSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    updateAllProduct: (state, action) => {
      state.Products = action.payload;
    },
    updateAllHomeProduct: (state, action) => {
      state.Topproduct = action.payload;
    },
  },
});
// this is for dispatch
export const { updateAllProduct,updateAllHomeProduct } = productSlice.actions;
// this is for configureStore
export default productSlice.reducer;