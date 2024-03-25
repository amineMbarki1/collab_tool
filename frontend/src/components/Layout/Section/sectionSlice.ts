import { createSlice } from "@reduxjs/toolkit";

const initialState = { showSidesection: false } as { showSidesection: boolean };

const slice = createSlice({
  name: "sidesection",
  initialState,
  reducers: {
    toggleSidesection: (state) => {
      state.showSidesection = !state.showSidesection;
    },
  },
});

export default slice.reducer;

export const { toggleSidesection } = slice.actions;
