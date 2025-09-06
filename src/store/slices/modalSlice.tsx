import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface Modal {
  isNoteOpen: boolean;
  isNoteOpenUpdate: boolean;
  isTagOpen: boolean;
  isSortOpen: boolean;
}

const initialState: Modal = {
  isNoteOpen: false,
  isNoteOpenUpdate: false,
  isTagOpen: false,
  isSortOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalNote: (state) => {
      state.isNoteOpen = true;
    },
    closeModalNote: (state) => {
      state.isNoteOpen = false;
    },
    openModalNoteUpdate: (state) => {
      state.isNoteOpenUpdate = true;
    },
    closeModalNoteUpdate: (state) => {
      state.isNoteOpenUpdate = false;
    },
    openModalTag: (state) => {
      state.isTagOpen = true;
    },
    closeModalTag: (state) => {
      state.isTagOpen = false;
    },
    openModalSort: (state) => {
      state.isSortOpen = true;
    },
    closeModalSort: (state) => {
      state.isSortOpen = false;
    },
  },
});

export const {
  openModalNote,
  closeModalNote,
  openModalNoteUpdate,
  closeModalNoteUpdate,
  openModalTag,
  closeModalTag,
  openModalSort,
  closeModalSort,
} = modalSlice.actions;
export default modalSlice.reducer;

/**
 * z-index 배치
 * 최하: 페이지
 * 중간: 노트, 정렬
 * 최상: 태그
 */
