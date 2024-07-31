import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoginFormOpen: Boolean,
};
const viewCartSlice = createSlice({
  name: "ui",
  initialState: {
    isLoginFormOpen: false,
  },
  reducers: {
    openLoginForm: (state) => {
      state.isLoginFormOpen = state;
    },
    closeLoginForm: (state) => {
      state.isLoginFormOpen = state;
    },
  },
});

export const { openLoginForm, closeLoginForm } = viewCartSlice.actions;
export default viewCartSlice.reducer;
