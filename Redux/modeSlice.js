import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: { mode: "light" },
  reducers: {
    change(state, action) {
      state.mode = action.payload;
    },
  },
});

export const { change } = modeSlice.actions;
export default modeSlice.reducer;
