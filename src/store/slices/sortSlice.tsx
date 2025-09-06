import { createSlice } from "@reduxjs/toolkit";

interface Modal {
  sortOption: string;
  searchTitle: string;
}

const initialState: Modal = {
  sortOption: "",
  searchTitle: "",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    // 정렬
    sortChange: (state, action) => {
      state.sortOption = action.payload;
    },
    // 제목 검색
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
  },
});

export const { sortChange, setSearchTitle } = sortSlice.actions;
export default sortSlice.reducer;
