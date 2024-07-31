import { createSlice } from "@reduxjs/toolkit";
// import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    State:  [],
};

const stateSystem = createSlice({
    name: "stateData",
    initialState,
    reducers: {
        updateState: (state, action) => {
            state.State = action.payload

        }
    }
}
);
export const { updateState } = stateSystem.actions;
export default stateSystem.reducer;


