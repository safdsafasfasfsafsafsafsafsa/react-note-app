import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Modal {
  isOpen: boolean;
}

const initialState: Modal = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  // initialState: {
  //   isOpen: false,
  // },
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    // PayloadAction을 사용하여 페이로드의 타입을 정의할 수도 있습니다.
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});
export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;

/**
 * z-index 배치
 * 최하: 페이지
 * 중간: 노트, 정렬
 * 최상: 태그
 */
