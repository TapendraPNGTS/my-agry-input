import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Categories: [],
    SubCategories:[],
    CategoryAndSubCategories:[],
};
//internally using immer lib (can create mutable state)
export const categoriesSlice = createSlice({
  name: "categoriesData",
  initialState,
  reducers: {
    updateAllCategories: (state, action) => {
      state.Categories = action.payload;
    },
    updateSubCategory: (state, action) => {
      state.SubCategories = action.payload;
    },
    updateCategoryAndSubCategory: (state, action) => {
      const sortedData = [...action.payload].sort((a, b) => a.Name.localeCompare(b.Name));

      state.CategoryAndSubCategories = sortedData;
    },

  },
});
// this is for dispatch
export const {  updateAllCategories,updateSubCategory,updateCategoryAndSubCategory } = categoriesSlice.actions;
// this is for configureStore
export default categoriesSlice.reducer;