import { createSlice } from "@reduxjs/toolkit";

const modalTopSlice = createSlice({
  name: "modalTop",
  initialState: {
    isTopOpen: false,
  },
  reducers: {
    openModalTop: (state) => {
      state.isTopOpen = true;
    },
    closeModalTop: (state) => {
      state.isTopOpen = false;
    },
  },
});
export const { openModalTop, closeModalTop } = modalTopSlice.actions;
export default modalTopSlice.reducer;

/**
 * z-index 배치
 * 최하: 페이지
 * 중간: 노트, 정렬
 * 최상: 태그
 */
