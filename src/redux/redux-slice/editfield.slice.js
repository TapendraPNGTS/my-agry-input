// redux-slice/editfield.slice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formsData: null, // Initialize formData to null
  loading: false,
  error: null,
};

const editFieldSlice = createSlice({
  name: 'editField',
  initialState,
  reducers: {
    setFormsData(state, action) {
        state.formsData = action.payload; // Update formData state with the payload
      },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setFormsData, setLoading, setError } = editFieldSlice.actions;

export default editFieldSlice.reducer;

