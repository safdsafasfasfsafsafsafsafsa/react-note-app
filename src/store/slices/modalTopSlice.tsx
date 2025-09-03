import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Modal {
  isTopOpen: boolean;
}

const initialState: Modal = {
  isTopOpen: false,
};

const modalTopSlice = createSlice({
  name: "modalTop",
  // initialState: {
  //   isTopOpen: false,
  // },
  initialState,
  reducers: {
    openModalTop: (state) => {
      state.isTopOpen = true;
    },
    closeModalTop: (state) => {
      state.isTopOpen = false;
    },
    toggleModalTop: (state, action: PayloadAction<boolean>) => {
      state.isTopOpen = action.payload;
    },
  },
});
export const { openModalTop, closeModalTop, toggleModalTop } =
  modalTopSlice.actions;
export default modalTopSlice.reducer;

/**
 * z-index 배치
 * 최하: 페이지
 * 중간: 노트, 정렬
 * 최상: 태그
 */
