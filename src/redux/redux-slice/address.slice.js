import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Address: [],
 
};
//internally using immer lib (can create mutable state)
export const addressSlice = createSlice({
  name: "addressData",
  initialState,
  reducers: {
    updateAllAddress: (state, action) => {
      state.Address = action.payload;
    },
    resetAddress: (state, action)=>{
      state.Address = []; 
    }
  },
});
// this is for dispatch
export const {  updateAllAddress,resetAddress } = addressSlice.actions;
// this is for configureStore
export default addressSlice.reducer;