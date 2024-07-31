import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Order: [],
};

const orderSystem = createSlice({
  name: "orderData",
  initialState,
  reducers: {
    updateAllOrder: (state, action) => {
      state.Order = action.payload;
    },
  },
});
export const { updateAllOrder } = orderSystem.actions;
export default orderSystem.reducer;
