import { createSlice } from "@reduxjs/toolkit";

interface Modal {
  sortOption: string;
}

const initialState: Modal = {
  sortOption: "",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    sortChange: (state, action) => {
      state.sortOption = action.payload;
    },
  },
});

export const { sortChange } = sortSlice.actions;
export default sortSlice.reducer;
